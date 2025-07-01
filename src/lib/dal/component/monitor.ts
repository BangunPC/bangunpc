import { createSupaServerClient } from "@/lib/supabase/server";
import { ComponentCategoryEnum, ComponentDetail, ComponentView, isValidComponentSortType } from "../../db";
import { MonitorCompatibility, ProductFilter } from "./filter";

//! Not Done yet, need to fix
export const getMonitor = async (
  { gpuId, motherboardId, monitorIds }: MonitorCompatibility,
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
    .from("v_monitors")
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

  if (gpuId) {
    const { data: gpuData, error } = await supabase
      .schema("product")
      .from("v_gpus")
      .select("display_output")
      .eq("product_id", gpuId)
      .limit(1)
      .single();
    
    if (error) {
      errorMessage = "Data GPU tidak ditemukan";
    } else if (gpuData?.display_output) {
      // Apply filter directly in the query
      // This is a simplified approach - may need adjustment based on how display_output and inputs are stored
      for (const output of gpuData.display_output) {
        await client_query.contains("inputs", [output]);
        break; // Just use the first output for now as a simple implementation
      }
    }
  }

  // Implement motherboard compatibility if needed
  // if (motherboardId) { ... }

  // compatibility end

  if(sort && isValidComponentSortType(sort, ComponentCategoryEnum.Monitor) && sortDirection) {   
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
    errorMessage = "Data monitor tidak ditemukan";
    return { data: [], total: 0, errorMessage };
  }

  if (error) {
    errorMessage = error;
  }

  return { data, total: count ?? 0, errorMessage };
};