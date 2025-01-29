import { createSupaServerClient } from "@/lib/supabase/server";
import { StorageCompatibility, ProductFilter } from "./filter";

export const getStorage = async (
  { motherboardId, storages }: StorageCompatibility,
  { query, min_price, max_price }: ProductFilter,
) => {
  const supabase = await createSupaServerClient()

  if (!supabase) {
    throw new Error("Supabase client is null");
  }

  // filter start

  const client_query = supabase
    .schema("product")
    .from("v_internal_storages")
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

  const { data: psuData, error } = await client_query;

  if (!psuData) {
    throw new Error("Internal Storage data is null");
  }

  let filteredData = psuData;

  // compatibility start

  if (motherboardId) {
    console.log(`Filtering storage by motherboard id: ${motherboardId}`);
    const { data: motherboardData, error } = await supabase
      .schema("product")
      .from("v_motherboards")
      .select("sata3_slot, pcie_m2_slot")
      .eq("product_id", motherboardId)
      .limit(1)
      .single();
    if (error) {
      console.error(error);
      throw error;
    }

    console.log("Motherboard data:", motherboardData);

    filteredData = filteredData.filter((item) => {
      console.log(`Filtering storage by form factor: ${item.form_factor}`);
      if (motherboardData.pcie_m2_slot === 0)
        return item.form_factor?.toUpperCase() !== "M.2 NVME";
      else return item;
    });

    if (storages && storages.length > 0) {
      console.log(
        `Filtering storage by storages: ${storages.map((storage) => storage.id).join(", ")}`,
      );
      const { data: storageData, error } = await supabase
        .schema("product")
        .from("v_internal_storages")
        .select("form_factor")
        .in(
          "product_id",
          storages.map((storage) => storage.id),
        );

      if (error) {
        console.error(error);
        throw error;
      }

      const totalNvme = storageData.filter(
        (item) => item.form_factor?.toUpperCase() === "M.2 NVME",
      ).length;
      const totalSata = storageData.filter(
        (item) => item.form_factor?.toUpperCase() !== "M.2 NVME",
      ).length;

      console.log(`Total SATA: ${totalSata}, Total NVMe: ${totalNvme}`);

      filteredData = filteredData.filter((item) => {
        if (item.form_factor?.toUpperCase() === "M.2 NVME")
          return totalNvme < motherboardData.pcie_m2_slot!;
        return totalSata < motherboardData.sata3_slot!;
      });
    }
  }

  // compatibility end

  if (error) {
    return error;
  }

  return filteredData;
};
