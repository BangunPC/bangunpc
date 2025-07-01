import { createSupaServerClient } from "@/lib/supabase/server";
import { GpuCompatibility, ProductFilter } from "./filter";
import { ComponentCategoryEnum, isValidComponentSortType } from "@/lib/db";

export const getGpu = async (
  { casingId, motherboardId, psuId }: GpuCompatibility,
  { product_name, min_price, max_price, offset, limit }: ProductFilter,
  { sort, sortDirection }: { sort?: string; sortDirection?: string }
) => {
  const supabase = await createSupaServerClient()
  let errorMessage;

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
  }

  // compatibility start

  if (casingId) {
    const { data: casingData, error } = await supabase
      .schema("product")
      .from("v_casings")
      .select("max_gpu_length_mm")
      .eq("product_id", casingId)
      .limit(1)
      .single();

    if (error) {
      errorMessage = "Data casing tidak ditemukan";
    } else if (casingData?.max_gpu_length_mm) {
      // Apply filter directly in the query
      await client_query.lte("length_mm", casingData.max_gpu_length_mm);
    }
  }

  if (psuId) {
    const { data: psuData, error } = await supabase
      .schema("product")
      .from("v_power_supplies")
      .select("wattage")
      .eq("product_id", psuId)
      .limit(1)
      .single();

    if (error) {
      errorMessage = "Data PSU tidak ditemukan";
    } else if (psuData?.wattage) {
      // Apply filter directly in the query
      await client_query.lte("min_psu_watt", psuData.wattage);
    }
  }

  if (motherboardId) {
    // Implement motherboard compatibility filter if needed
    // For now, this is a placeholder as per the TODO in the original code
  }

  // compatibility end

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

  // filter end

  const { data, count, error } = await client_query;

  if (!data) {
    errorMessage = "Data GPU tidak ditemukan";
    return { data: [], total: 0, errorMessage };
  }

  if (error) {
    errorMessage = error;
  }

  return { data, total: count ?? 0, errorMessage };
};