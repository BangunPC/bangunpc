import { createSupaServerClient } from "@/lib/supabase/server";
import { ComponentCategoryEnum, ComponentDetail, ComponentView, isValidComponentSortType } from "../../db";
import { MonitorCompatibility, ProductFilter } from "./filter";

//! Not Done yet, need to fix
export const getMonitor = async (
  { gpuId,motherboardId, monitorIds }: MonitorCompatibility,
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
    // await client_query.textSearch("product_name", `'${product_name}'`, {
    //   type: "websearch",
    //   config: "english",
    // });
  }

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

  // await client_query.order("product_name", { ascending: true });

  const { data, count, error } = await client_query;
  const monitorData = data as ComponentDetail[];

  if (!monitorData) {
    throw new Error("Motherboard data is null");
  }

  const filteredData = data as ComponentView["v_monitors"][];

  // compatibility start
  // let hdmiSlot = 0
  // let vgaSlot = 0
  // let displayPortSlot = 0

  // if (gpuId) {
  //   const { data: gpuData } = await client
  //     .schema("product")
  //     .from("v_gpus")
  //     .select("display_output")
  //     .eq("product_id", gpuId)
  //     .limit(1)
  //     .single();

  //   if (!gpuData) {
  //     throw new Error("GPU data is null");
  //   }

  //   filteredData = filteredData.filter((monitor) =>
  //     gpuData?.display_output?.includes(monitor.inputs ?? ""),
  //   );
  // }

  // if (motherboardId) {
  //   const { data: moboData } = await client
  //     .schema("product")
  //     .from("v_motherboards")
  //     .select("")
  //     .eq("product_id", motherboardId)
  //     .limit(1)
  //     .single();
  //   // filteredData = filteredData.filter(
  //   //   (motherboard) => motherboard.cpu_socket_id === moboData?.cpu_socket_id,
  //   // );
  // }

  if (error) {
    throw error;
  }

  // compatibility end

  return { data: filteredData, total: count ?? 0 };
};
