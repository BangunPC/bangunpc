import { createSupaServerClient } from "@/lib/supabase/server";
import { StorageCompatibility, ProductFilter } from "./filter";
import { ComponentCategoryEnum, isValidComponentSortType } from "@/lib/db";

export const getStorage = async (
  { motherboardId, storages }: StorageCompatibility,
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
  }

  // compatibility start

  if (motherboardId) {
    const { data: motherboardData, error } = await supabase
      .schema("product")
      .from("v_motherboards")
      .select("sata3_slot, pcie_m2_slot")
      .eq("product_id", motherboardId)
      .limit(1)
      .single();
    
    if (error) {
      errorMessage = "Data motherboard tidak ditemukan";
    } else {
      // If motherboard has no M.2 slots, filter out M.2 NVMe drives
      if (motherboardData.pcie_m2_slot === 0) {
        await client_query.not("form_factor", "eq", "M.2 NVME");
      }

      if (storages && storages.length > 0) {
        const { data: storageData, error: storageError } = await supabase
          .schema("product")
          .from("v_internal_storages")
          .select("form_factor")
          .in(
            "product_id",
            storages.map((storage) => storage.id),
          );
        
        if (storageError) {
          errorMessage = "Data storage tidak ditemukan";
        } else {
          const totalNvme = storageData.filter(
            (item) => item.form_factor?.toUpperCase() === "M.2 NVME",
          ).length;
          const totalSata = storageData.filter(
            (item) => item.form_factor?.toUpperCase() !== "M.2 NVME",
          ).length;

          // Apply filters based on available slots
          if (totalNvme >= motherboardData.pcie_m2_slot!) {
            await client_query.not("form_factor", "eq", "M.2 NVME");
          }
          
          if (totalSata >= motherboardData.sata3_slot!) {
            await client_query.eq("form_factor", "M.2 NVME");
          }
        }
      }
    }
  }

  // compatibility end

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

  // filter end

  const { data, count, error } = await client_query;

  if (!data) {
    errorMessage = "Data storage tidak ditemukan";
    return { data: [], total: 0, errorMessage };
  }

  if (error) {
    errorMessage = error;
  }

  return { data, total: count ?? 0, errorMessage };
};