import { createSupaServerClient } from "@/lib/supabase/server";
import { GpuCompatibility, ProductFilter } from "./filter";
import { ComponentCategoryEnum, isValidComponentSortType } from "@/lib/db";

export const getGpu = async (
  { casingId, motherboardId, psuId }: GpuCompatibility,
  { product_name, min_price, max_price, offset, limit }: ProductFilter,
  { sort, sortDirection }: { sort?: string; sortDirection?: string }
) => {
  const supabase = await createSupaServerClient()

  if (!supabase) {
    throw new Error("Supabase client is null");
  }

  // filter start

  const client_query = supabase
    .schema("product")
    .from("v_gpus")
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

  if(sort && isValidComponentSortType(sort, ComponentCategoryEnum.GPU) && sortDirection) {   
    switch (sortDirection) {
      case "asc":
        client_query.order(sort, { ascending: true });
        break;
      case "desc":
        client_query.order(sort, { ascending: false });
        break;
      default:
    }
  }

  const start = typeof offset === "number" ? offset : 0;
  const end = typeof limit === "number" ? start + limit - 1 : start + 19;
  client_query.range(start, end);

  // await client_query.order("product_name", { ascending: true });

  // filter end

  const { data, count, error } = await client_query;

  if (!data) {
    throw new Error("GPU data is null");
  }

  let filteredData = data;

  // compatibility start

  if (casingId) {
    const { data: casingData } = await supabase
      .schema("product")
      .from("v_casings")
      .select("max_gpu_length_mm")
      .eq("product_id", casingId)
      .limit(1)
      .single();

    if (!casingData) {
      throw new Error("Casing data is null");
    }

    filteredData = filteredData.filter(
      (gpu) => (casingData?.max_gpu_length_mm ?? -1) >= (gpu.length_mm ?? 0),
    );
  }

  if (psuId) {
    const { data: psuData } = await supabase
      .schema("product")
      .from("v_power_supplies")
      .select("wattage")
      .eq("product_id", psuId)
      .limit(1)
      .single();

    filteredData = filteredData.filter(
      (gpu) => (psuData?.wattage ?? -1) >= (gpu.min_psu_watt ?? 0),
    );
  }

  if (motherboardId) {
    // TODO(damywise): implement filter
  }

  // compatibility end

  if (error) {
    return error;
  }

  return { data: filteredData, total: count ?? 0 };
};
