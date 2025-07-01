import { createSupaServerClient } from "@/lib/supabase/server";
import { CasingCompatibility, ProductFilter } from "./filter";
import { ComponentCategoryEnum, isValidComponentSortType } from "@/lib/db";

export const getCasing = async (
  { gpuId, motherboardId }: CasingCompatibility,
  { product_name, min_price, max_price, offset, limit }: ProductFilter,
  { sort, sortDirection }: { sort?: string; sortDirection?: string }
) => {
  const supabase = await createSupaServerClient()
  let errorMessage;

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
      errorMessage = "Data motherboard tidak ditemukan";
    } else if (motherboardData.form_factor) {
      // Apply filter directly in the query
      await client_query.contains("mobo_supports", [motherboardData.form_factor]);
    }
  }

  if (gpuId) {
    const { data: gpuData, error } = await supabase
      .schema("product")
      .from("v_gpus")
      .select("length_mm")
      .eq("product_id", gpuId)
      .limit(1)
      .single();
    
    if (error) {
      errorMessage = "Data GPU tidak ditemukan";
    } else if (gpuData.length_mm) {
      // Apply filter directly in the query
      await client_query.gte("max_gpu_length_mm", gpuData.length_mm);
    }
  }

  // compatibility end

  if(sort && isValidComponentSortType(sort, ComponentCategoryEnum.Casing) && sortDirection) {   
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
    errorMessage = "Data casing tidak ditemukan";
    return { data: [], total: 0, errorMessage };
  }

  // if (error) {
  //   errorMessage = error;
  // }

  return { data, total: count ?? 0, errorMessage };
};