import { createSupaServerClient } from "@/lib/supabase/server";
import { ComponentDetail, ComponentView } from "../../db";
import { createClient } from "../../supabase/client";
import { MonitorCompatibility, ProductFilter } from "./filter";

//! Not Done yet, need to fix
export const getMonitor = async (
  { gpuId,motherboardId, monitorIds }: MonitorCompatibility,
  { query, min_price, max_price }: ProductFilter,
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
  if (query) {
    await client_query.textSearch("product_name", `'${query}'`, {
      type: "websearch",
      config: "english",
    });
  }

  // await client_query.order("product_name", { ascending: true });

  const { data, error } = await client_query;
  const monitorData = data as ComponentDetail[];

  if (!monitorData) {
    throw new Error("Motherboard data is null");
  }

  const filteredData = monitorData as ComponentView["v_monitors"][];

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

  return filteredData;
};
