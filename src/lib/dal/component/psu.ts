import { createSupaServerClient } from "@/lib/supabase/server";
import { PsuCompatibility, ProductFilter } from "./filter";
import { ComponentCategoryEnum, isValidComponentSortType } from "@/lib/db";

export const getPsu = async (
  { cpuId, gpuId, memories, motherboardId, storages }: PsuCompatibility,
  { product_name, min_price, max_price, offset, limit }: ProductFilter,
  { sort, sortDirection }: { sort?: string; sortDirection?: string }
) => {
  const supabase = await createSupaServerClient()

  // filter start

  const client_query = supabase
    .schema("product")
    .from("v_power_supplies")
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

  if(sort && isValidComponentSortType(sort, ComponentCategoryEnum.PSU) && sortDirection) {   
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
    throw new Error("PSU data is null");
  }

  let filteredData = data;

  // compatibility start

  let currentWatt = 0;

  if (cpuId) {
    // Fetching cpu required data
    const { data: cpuData, error } = await supabase
      .schema("product")
      .from("v_cpus")
      .select("max_power_watt")
      .eq("product_id", cpuId)
      .limit(1)
      .single();
    if (error) {
      throw error;
    }

    currentWatt += cpuData.max_power_watt ?? 0;
  }

  if (gpuId) {
    // Fetching gpu required data
    const { data: gpuData, error } = await supabase
      .schema("product")
      .from("v_gpus")
      .select("min_psu_watt")
      .eq("product_id", gpuId)
      .limit(1)
      .single();
    if (error) {
      throw error;
    }

    currentWatt += gpuData.min_psu_watt ?? 0;
  }

  if (motherboardId) {
    // Fetching mobo required data
    const { data: moboData, error } = await supabase
      .schema("product")
      .from("v_motherboards")
      .select("form_factor")
      .eq("product_id", motherboardId)
      .limit(1)
      .single();
    if (error) {
      throw error;
    }

    switch (moboData.form_factor?.toLowerCase()) {
      case "mini-itx":
        currentWatt += 30;
        break;

      case "micro-itx":
        currentWatt += 60;
        break;

      case "atx":
        currentWatt += 60;
        break;

      default:
        break;
    }
  }

  if (memories) {
    // Fetching memory required data
    const { data: memoryData, error } = await supabase
      .schema("product")
      .from("v_memories")
      .select("memory_type, amount")
      .in(
        "product_id",
        memories.map((memory) => memory.id),
      );
    if (error) {
      throw error;
    }

    const totalMemoryWatt = memoryData.reduce((accumulator, memory) => {
      if (memory.memory_type !== null && memory.amount !== null) {
        if (memory.memory_type.toLowerCase() === "ddr5")
          return accumulator + 15 * memory.amount;
        else return accumulator + 10 * memory.amount;
      }
      return accumulator;
    }, 0);

    currentWatt += totalMemoryWatt;
  }
  if (storages) {
    // Fetching memory required data
    const { data: storageData, error } = await supabase
      .schema("product")
      .from("v_internal_storages")
      .select("type, form_factor")
      .in(
        "product_id",
        storages.map((storage) => storage.id),
      );
    if (error) {
      throw error;
    }

    const totalStorageWatt = storageData.reduce((accumulator, memory) => {
      if (memory.form_factor !== null && memory.type !== null) {
        if (memory.type.toLowerCase() === "ssd") {
          if (memory.form_factor.toLowerCase() === "m.2 nvme")
            return accumulator + 10;
          else return accumulator + 3;
        } else {
          return accumulator + 20;
        }
      }
      return accumulator;
    }, 0);

    currentWatt += totalStorageWatt;
  }

  filteredData = filteredData.filter((item) => item.wattage! > currentWatt);

  // compatibility end

  if (error) {
    return error;
  }

  return { data: filteredData, total: count ?? 0 };
};
