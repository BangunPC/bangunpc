import { createClient } from "../supabase/client";
import { CpuCompatibility, CpuFilter } from "./filter";

export const getCpu = async (
  { motherboardId, memoryIds }: CpuCompatibility,
  {
    query,
    base_clock_ghz,
    base_power_watt,
    brand_name,
    code_name,
    cpu_family_id,
    cpu_socket_id,
    efficiency_core,
    integrated_gpu_id,
    min_price,
    max_price,
    max_clock_ghz,
    max_memory_channel,
    max_memory_gb,
    max_power_watt,
    model_line,
    performance_core,
    product_id,
    product_name,
    total_core,
    total_thread,
  }: CpuFilter,
) => {
  const client = createClient();

  if (!client) {
    throw new Error("Supabase client is null");
  }

  // filter start

  const client_query = client
    .schema("product")
    .from("v_cpus")
    .select("*", { count: "exact" });

  if (min_price) {
    await client_query.gte("lowest_price", min_price);
  }
  if (max_price) {
    await client_query.lte("lowest_price", max_price);
  }

  if (base_clock_ghz) {
    await client_query.eq("base_clock_ghz", base_clock_ghz);
  }
  if (base_power_watt) {
    await client_query.eq("base_power_watt", base_power_watt);
  }
  if (brand_name) {
    await client_query.eq("brand_name", brand_name);
  }
  if (code_name) {
    await client_query.eq("code_name", code_name);
  }
  if (cpu_family_id) {
    await client_query.eq("cpu_family_id", cpu_family_id);
  }
  if (cpu_socket_id) {
    await client_query.eq("cpu_socket_id", cpu_socket_id);
  }
  if (efficiency_core) {
    await client_query.eq("efficiency_core", efficiency_core);
  }
  if (integrated_gpu_id) {
    await client_query.eq("integrated_gpu_id", integrated_gpu_id);
  }
  if (max_clock_ghz) {
    await client_query.eq("max_clock_ghz", max_clock_ghz);
  }
  if (max_memory_channel) {
    await client_query.eq("max_memory_channel", max_memory_channel);
  }
  if (max_memory_gb) {
    await client_query.eq("max_memory_gb", max_memory_gb);
  }
  if (max_power_watt) {
    await client_query.eq("max_power_watt", max_power_watt);
  }
  if (model_line) {
    await client_query.eq("model_line", model_line);
  }
  if (performance_core) {
    await client_query.eq("performance_core", performance_core);
  }
  if (product_id) {
    await client_query.eq("product_id", product_id);
  }
  if (product_name) {
    await client_query.eq("product_name", product_name);
  }
  if (total_core) {
    await client_query.eq("total_core", total_core);
  }
  if (total_thread) {
    await client_query.eq("total_thread", total_thread);
  }
  if (query) {
    await client_query.textSearch("product_name", `'${query}'`, {
      type: "websearch",
      config: "english",
    });
  }

  await client_query.order("product_name", { ascending: true });

  // filter end

  const { data: cpuData, error } = await client_query;

  if (!cpuData) {
    throw new Error("CPU data is null");
  }

  let filteredData = cpuData;

  // compatibility start
  if (motherboardId) {
    const { data: motherboardData } = await client
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

  if (memoryIds) {
    const memoryData: any[] = []    

    for (const memoryId of memoryIds) {
      const { data, error } = await client
        .schema("product")
        .from("v_memories")
        .select("product_id, memory_type, capacity_gb, amount")
        .eq("product_id", memoryId)
        .single()

      if (error) 
        console.error(`Error fetching data for memoryId ${memoryId}:`, error);
      
      memoryData.push(data);
    }    
    
    if (!memoryData || error !== null || memoryData.length === 0) {
      return { filteredData, count: filteredData.length };
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

  return { filteredData, count: filteredData.length };
};
