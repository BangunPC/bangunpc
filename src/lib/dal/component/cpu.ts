import { createSupaServerClient } from "@/lib/supabase/server";
import { ComponentDetail, ComponentView } from "../../db";
import { CpuCompatibility, CpuFilter } from "./filter";

export const getCpu = async (
  { motherboardId, psuId, gpuId, memoryIds }: CpuCompatibility,
  filter: CpuFilter,
) => {
  const supabase = await createSupaServerClient()

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
    await client_query.eq("product_name", filter.product_name);
  }
  if (filter.total_core) {
    await client_query.eq("total_core", filter.total_core);
  }
  if (filter.total_thread) {
    await client_query.eq("total_thread", filter.total_thread);
  }
  if (filter.query) {
    await client_query.textSearch("product_name", `'${filter.query}'`, {
      type: "websearch",
      config: "english",
    });
  }
  let start = typeof filter.offset === "number" ? filter.offset : 0;
  let end = typeof filter.limit === "number" ? start + filter.limit - 1 : start + 19;
  client_query.range(start, end);

  // await client_query.order("product_name", { ascending: true });

  // filter end

  const { data, count, error } = await client_query;
  const cpuData = data as ComponentDetail[]

  if (!cpuData) {
    throw new Error("CPU data is null");
  }

  let filteredData = cpuData as ComponentView["v_cpus"][];

  // compatibility start
  if (motherboardId) {
    const { data: motherboardData } = await supabase
      .schema("product")
      .from("v_motherboards")
      .select('cpu_socket_id')
      .eq("product_id", motherboardId);

    if (!motherboardData) {
      throw new Error("Motherboard data is null");
    }

    const cpuSocketId = motherboardData[0]?.cpu_socket_id;
    if (cpuSocketId == null) {
      throw new Error("CPU socket ID is null");
    }
    filteredData = filteredData.filter(
      (cpu) => cpu.cpu_socket_id == cpuSocketId,
    );
  }

  if (psuId) {
    const { data: psuData } = await supabase
      .schema("product")
      .from("v_power_supplies")
      .select('wattage')
      .eq("product_id", psuId)
      .single();

    if (!psuData) {
      throw new Error("PSU data is null");
    }

    let psuWatt = psuData?.wattage;
    if (psuWatt == null) {
      throw new Error("PSU wattage is null");
    }

    let gpuPowerWatt = 0;
    if(gpuId) {
      const { data: gpuData } = await supabase
      .schema("product")
      .from("v_gpus")
      .select('tdp_watt, min_psu_watt')
      .eq("product_id", psuId)
      .single();

      if (!gpuData) {
        throw new Error("PSU data is null");
      }

      gpuPowerWatt = gpuData.tdp_watt!;
      psuWatt = gpuData.min_psu_watt!;
    }

    // Suppose the psu efficiency is 80%, 
    // 120% extra watt of component power
    // 50 watt for other component
    const availablePowerWatt = psuWatt * 0.8 - gpuPowerWatt * 1.2 + 50

    filteredData = filteredData.filter((cpu) => 
      (cpu.max_power_watt! < psuWatt) &&
      (cpu.max_power_watt! * 1.2 < availablePowerWatt)
    );
  }

  if (memoryIds) {
    interface MemoryData {
      product_id: number | null;
      memory_type: "DDR3" | "DDR4" | "DDR5" | null;
      capacity_gb: number | null;
      amount: number | null;
    }
    const memoryData: MemoryData[] = []    

    for (const memoryId of memoryIds) {
      const { data, error } = await supabase
        .schema("product")
        .from("v_memories")
        .select("product_id, memory_type, capacity_gb, amount")
        .eq("product_id", memoryId)
        .single()

      if (error) 
        console.error(`Error fetching data for memoryId ${memoryId}:`, error);
      else
        memoryData.push(data);
    }    
    
    if (!memoryData || error !== null || memoryData.length === 0) {
      return filteredData;
    }

    // All selected memory's type should be same 
    const firstMemoryType = memoryData[0]?.memory_type;
    if (memoryData.some((memory) => memory.memory_type !== firstMemoryType)) {
      alert("Memory type mismatch");
      filteredData = [];
    } else {
      const totalMemorySizeGB = memoryData.reduce((total, memory) => {
          return total + (memory.capacity_gb ?? 0) * (memory.amount ?? 0)
      }, 0);

      filteredData = filteredData.filter((cpu) => (cpu.max_memory_gb ?? 0) >= totalMemorySizeGB);

      // const totalMemory = memoryData.reduce((total, memory) => {
      //   return total + (memory.amount ?? 0); //* inputMemory.amount
      //   //? For temporary, not use amount when selecting component, id only
      //   // const inputMemory = memories.find(
      //   //   (inputMemory) => inputMemory.id === memory.product_id,
      //   // ) ?? { amount: 0 };
      // }, 0);
      
    }
  }
  
  if (error) {
    throw error;
  }

  // compatibility end

  return { data: filteredData, total: count ?? 0 };
};
