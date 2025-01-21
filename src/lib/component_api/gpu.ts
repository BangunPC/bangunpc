import { createClient } from "../supabase/client";
import { GpuCompatibility, ProductFilter } from "./filter";

export const getGpu = async (
  { casingId, motherboardId, psuId }: GpuCompatibility,
  { query, min_price, max_price }: ProductFilter,
) => {
  const client = createClient();

  if (!client) {
    throw new Error("Supabase client is null");
  }

  // filter start

  const client_query = client
    .schema("product")
    .from("v_gpus")
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

  await client_query.order("product_name", { ascending: true });

  // filter end

  const { data: gpuData, error } = await client_query;

  if (!gpuData) {
    throw new Error("GPU data is null");
  }

  let filteredData = gpuData;

  // compatibility start

  if (casingId) {
    const { data: casingData } = await client
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
    const { data: psuData } = await client
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

  return filteredData;
};
