import { createSupaServerClient } from "@/lib/supabase/server";
import { ComponentCategoryEnum, ComponentDetail, ComponentView, isValidComponentSortType } from "../../db";
import { CpuCompatibility, CpuFilter } from "./filter";

export const getCpu = async (
  { motherboardId, psuId, gpuId, memoryIds }: CpuCompatibility,
  filter: CpuFilter,
  { sort, sortDirection }: { sort?: string; sortDirection?: string }
) => {
  const supabase = await createSupaServerClient()
  let errorMessage
  
  if (!supabase) {
    throw new Error("Supabase client is null");
  }

  // filter start
  const client_query = supabase
    .schema("product")
    .from("v_cpus")
    .select("*", { count: "exact" });

  if (filter.min_price) {
    await client_query.gte("lowest_price", filter.min_price);
  }
  if (filter.max_price) {
    await client_query.lte("lowest_price", filter.max_price);
  }

  if (filter.base_clock_ghz) {
    await client_query.eq("base_clock_ghz", filter.base_clock_ghz);
  }
  if (filter.base_power_watt) {
    await client_query.eq("base_power_watt", filter.base_power_watt);
  }
  if (filter.brand_name) {
    await client_query.eq("brand_name", filter.brand_name);
  }
  if (filter.code_name) {
    await client_query.eq("code_name", filter.code_name);
  }
  if (filter.cpu_family_id) {
    await client_query.eq("cpu_family_id", filter.cpu_family_id);
  }
  if (filter.cpu_socket_id) {
    await client_query.eq("cpu_socket_id", filter.cpu_socket_id);
  }
  if (filter.efficiency_core) {
    await client_query.eq("efficiency_core", filter.efficiency_core);
  }
  if (filter.integrated_gpu_id) {
    await client_query.eq("integrated_gpu_id", filter.integrated_gpu_id);
  }
  if (filter.max_clock_ghz) {
    await client_query.eq("max_clock_ghz", filter.max_clock_ghz);
  }
  if (filter.max_memory_channel) {
    await client_query.eq("max_memory_channel", filter.max_memory_channel);
  }
  if (filter.max_memory_gb) {
    await client_query.eq("max_memory_gb", filter.max_memory_gb);
  }
  if (filter.max_power_watt) {
    await client_query.eq("max_power_watt", filter.max_power_watt);
  }
  if (filter.model_line) {
    await client_query.eq("model_line", filter.model_line);
  }
  if (filter.performance_core) {
    await client_query.eq("performance_core", filter.performance_core);
  }
  if (filter.product_id) {
    await client_query.eq("product_id", filter.product_id);
  }
  if (filter.product_name) {
    filter.offset = 0;
    await client_query.ilike("product_name", `%${filter.product_name}%`)
  }
  if (filter.total_core) {
    await client_query.eq("total_core", filter.total_core);
  }
  if (filter.total_thread) {
    await client_query.eq("total_thread", filter.total_thread);
  }

  // compatibility start
  if (motherboardId) {
    const { data: motherboardData } = await supabase
      .schema("product")
      .from("v_motherboards")
      .select('cpu_socket_id')
      .eq("product_id", motherboardId)
      .limit(1)
      .single();

    if (!motherboardData) {
      errorMessage = "Data motherboard tidak ditemukan";
    } else if (motherboardData.cpu_socket_id !== undefined && motherboardData.cpu_socket_id !== null) {
      await client_query.eq("cpu_socket_id", motherboardData.cpu_socket_id);
    }
  }

  if (psuId) {
    const { data: psuData } = await supabase
      .schema("product")
      .from("v_power_supplies")
      .select('wattage')
      .eq("product_id", psuId)
      .single();

    if (!psuData) {
      errorMessage = "Data PSU tidak ditemukan";
    } else {
      let psuWatt = psuData?.wattage;
      if (psuWatt == null) {
        errorMessage = "Data wattage PSU tidak ditemukan";
      } else {
        let gpuPowerWatt = 0;
        if(gpuId) {
          const { data: gpuData } = await supabase
          .schema("product")
          .from("v_gpus")
          .select('tdp_watt, min_psu_watt')
          .eq("product_id", gpuId)
          .single();

          if (gpuData) {
            gpuPowerWatt = gpuData.tdp_watt ?? 0;
            psuWatt = gpuData.min_psu_watt ?? psuWatt;
          }
        }

        // Suppose the psu efficiency is 80%, 
        // 120% extra watt of component power
        // 50 watt for other component
        const availablePowerWatt = psuWatt * 0.8 - gpuPowerWatt * 1.2 + 50

        await client_query.lt("max_power_watt", psuWatt);
        await client_query.lt("max_power_watt", availablePowerWatt / 1.2);
      }
    }
  }

  if (memoryIds && memoryIds.length > 0) {
    const uniqueMemoryIds = [...new Set(memoryIds)];
    
    // 1. Fetch memory data
    const { data: memoryData } = await supabase
      .schema("product")
      .from("v_memories")
      .select("product_id, memory_type, capacity_gb, amount")
      .in("product_id", uniqueMemoryIds);

    if (memoryData && memoryData.length !== 0) {
      // 2. Check memory type consistency
      const firstMemoryType = memoryData[0]?.memory_type;
      const allSameType = memoryData.every(m => m.memory_type === firstMemoryType);
      
      if (!allSameType) {
        errorMessage = "Semua memori yang dipilih harus memiliki tipe yang sama";
        return { data: [], total: 0, errorMessage };
      } else {
        // 3. Calculate total memory size
        const totalMemorySizeGB = memoryData.reduce((total, memory) => {
          return total + (memory.capacity_gb ?? 0) * (memory.amount ?? 1)
        }, 0);

        // 4. Filter CPUs by memory requirements
        await client_query.gte("max_memory_gb", totalMemorySizeGB);
      }
    }
  }
  
  if(sort && isValidComponentSortType(sort, ComponentCategoryEnum.CPU) && sortDirection) {   
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

  const start = typeof filter.offset === "number" ? filter.offset : 0;
  const end = typeof filter.limit === "number" ? start + filter.limit - 1 : start + 19;
  client_query.range(start, end);

  // filter end

  const { data, count, error } = await client_query;
  const cpuData = data as ComponentDetail[]

  if (!cpuData) {
    errorMessage = "Data CPU tidak ditemukan";
    return { data: [], total: 0, errorMessage };
  }

  const filteredData = cpuData as ComponentView["v_cpus"][];

  if (error) {
    errorMessage = error.message;
  }

  return { data: filteredData, total: count ?? 0, errorMessage };
};