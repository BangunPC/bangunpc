import { createSupaServerClient } from "@/lib/supabase/server";
import { CasingCompatibility, ProductFilter } from "./filter";

export const getCasing = async (
  { gpuId, motherboardId }: CasingCompatibility,
  { product_name, min_price, max_price, offset, limit }: ProductFilter,
) => {
  const supabase = await createSupaServerClient()

  if (!supabase) {
    console.log("ERROR!");
    throw new Error("Supabase client is null");
  }

  // filter start

  const client_query = supabase
    .schema("product")
    .from("v_casings")
    .select("*", { count: "exact" });

  if (min_price) {
    await client_query.gte("lowest_price", min_price);
  }
  if (max_price) {
    await client_query.lte("lowest_price", max_price);
  }
  if (product_name) {
    offset = 0;
    await client_query.ilike("product_name", `%${product_name}%`)
    // await client_query.textSearch("product_name", `'${product_name}'`, {
    //   type: "websearch",
    //   config: "english",
    // });
  }

  const start = typeof offset === "number" ? offset : 0;
  const end = typeof limit === "number" ? start + limit - 1 : start + 19;
  client_query.range(start, end);

  // await client_query.order("product_name", { ascending: true });

  // filter end

  const { data, count, error } = await client_query;

  if (!data) {
    console.log("ERROR! DATA NULL");
    throw new Error("Casing data is null");
  }

  let filteredData = data;

  // compatibility start

  if (motherboardId) {
    const { data: motherboardData, error } = await supabase
      .schema("product")
      .from("v_motherboards")
      .select("form_factor")
      .eq("product_id", motherboardId)
      .limit(1)
      .single();
    if (error) {
      console.log("ERROR! MOTHERBOARD");
      throw error;
    }
    filteredData = filteredData.filter((item) =>
      item.mobo_supports?.includes(motherboardData.form_factor!),
    );
  }

  // TODO(produk): multiple gpu
  // if (gpus && gpus.length > 0) {
  //   const { data: gpuData, error } = await client
  //     .schema("product")
  //     .from("v_gpus")
  //     .select("length_mm")
  //     .in(
  //       "product_id",
  //       gpus.map((gpu) => gpu.id),
  //     )
  //     .limit(1)
  //     .single();
  //   if (error) {
  //     console.log(`ERROR! GPU`);
  //     throw error;
  //   }
  //   filteredData = filteredData.filter(
  //     (item) => item.max_gpu_length_mm! >= gpuData.length_mm!,
  //   );
  // }

  // compatibility end

  if (error) {
    return error;
  }

  return { data: filteredData, total: count ?? 0 };
};
