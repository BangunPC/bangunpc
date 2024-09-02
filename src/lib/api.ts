import { createClient } from "./supabase/client";

export class ApiPaths {
  static rakitanku = "api/rakitanku";
  static listRakitan = "api/rakitanku/list";
  static insertRakitan = "api/rakitanku/insert";
  static viewRakitan = "api/rakitanku/view";
}

export const search = async function (search_text: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema("product")
    .rpc("search_products", {
      search_text,
    });

  if (error) {
    console.error("Error searching products:", error);
    return { data: [], error };
  }

  return { data, error: null };
};

export const fetchWithId = async (url: string, id: number) => {
  switch (url) {
    case ApiPaths.viewRakitan:
      const supabase = createClient();
      const { data, error } = await supabase
        .schema("pc_build")
        .from("v_builds")
        .select("*")
        .eq("build_id", id)
        .limit(1);
      return { data, error };
    default:
      return url;
  }
};

export const fetcher = async (url: string) => {
  switch (url) {
    case ApiPaths.rakitanku:
      return getRakitanku();
    case ApiPaths.listRakitan:
      return getListRakitan();
    default:
      return url;
  }
};

async function getRakitanku() {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema("pc_build")
    .from("user_builds")
    .select("*");
  return { data, error };
}

export async function getListRakitan() {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema("pc_build")
    .from("user_builds")
    .select("title, build_id");
  return { data, error };
}

export const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;
  return { from, to };
};

export async function getRecommendRakitan() {
  const supabase = createClient();
  const { from, to } = getPagination(1, 3);
  const { data, error } = await supabase
    .schema("pc_build")
    .from("v_recommendation")
    .select("build_id, title, image_filenames, categories_name, total_price", {
      count: "exact",
    })
    .range(from, to);
  return { data, error };
}

// ------------------------------------------------------------

type InsertRakitanArgs = {
  title: string;
  cpuId?: string | undefined;
  motherboardId?: string | undefined;
  memoryId?: string | undefined;
  storageId?: string | undefined;
  gpuId?: string | undefined;
  psuId?: string | undefined;
  casingId?: string | undefined;
  caseFanId?: string | undefined;
};

export const insertRakitan = async (
  url: string,
  { arg }: { arg: InsertRakitanArgs },
) => {
  switch (url) {
    case ApiPaths.insertRakitan:
      const supabase = createClient();
      const user_id = (await supabase.auth.getUser()).data.user?.id;
      if (!user_id) {
        throw new Error("User not found");
      }
      const argsParsed = {
        cpuId: arg.cpuId ? parseInt(arg.cpuId) : undefined,
        motherboardId: arg.motherboardId
          ? parseInt(arg.motherboardId)
          : undefined,
        memoryId: arg.memoryId ? parseInt(arg.memoryId) : undefined,
        storageId: arg.storageId ? parseInt(arg.storageId) : undefined,
        gpuId: arg.gpuId ? parseInt(arg.gpuId) : undefined,
        psuId: arg.psuId ? parseInt(arg.psuId) : undefined,
        casingId: arg.casingId ? parseInt(arg.casingId) : undefined,
        caseFanId: arg.caseFanId ? parseInt(arg.caseFanId) : undefined,
      };

      const { data: build_data, error: build_error } = await supabase
        .schema("pc_build")
        .from("builds")
        .insert({
          cpu_product_id: argsParsed.cpuId,
          gpu_product_id: argsParsed.gpuId,
          motherboard_product_id: argsParsed.motherboardId,
          power_supply_product_id: argsParsed.psuId,
          cpu_cooler_product_id: argsParsed.caseFanId,
          // memory_product_id: arg.memoryId,
          // storage_product_id: arg.storageId,
          // casing_product_id: arg.casingId,
        })
        .select();
      console.log(`isError insert build: ${JSON.stringify(build_data)}`);
      console.log(`isError insert build: ${JSON.stringify(build_error)}`);
      if (!build_error) {
        const { error: user_build_error } = await supabase
          .schema("pc_build")
          .from("user_builds")
          .insert({
            build_id: build_data[0]!.id,
            title: arg.title,
            user_id: user_id,
            build_code:
              arg.title.replace(/\s/g, "_").toLowerCase() +
              "_" +
              build_data[0]!.id,
            built_at: new Date().toISOString(),
          });
        if (user_build_error) {
          console.log(
            `isError insert user_build: ${JSON.stringify(user_build_error)}`,
          );

          await supabase
            .schema("pc_build")
            .from("builds")
            .delete()
            .eq("id", build_data[0]!.id);
        }
        return true;
      }
      return false;
    default:
      throw new Error("Not found");
  }
};
