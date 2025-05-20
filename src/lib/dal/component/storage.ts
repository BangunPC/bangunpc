import { createSupaServerClient } from "@/lib/supabase/server";
import { StorageCompatibility, ProductFilter } from "./filter";
import { ComponentCategoryEnum, isValidComponentSortType } from "@/lib/db";

export const getStorage = async (
  { motherboardId, storages }: StorageCompatibility,
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
    .from("v_internal_storages")
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

  if(sort && isValidComponentSortType(sort, ComponentCategoryEnum.Storage) && sortDirection) {   
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
    throw new Error("Internal Storage data is null");
  }

  let filteredData = data;

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

  return { data: filteredData, total: count ?? 0 };
};
