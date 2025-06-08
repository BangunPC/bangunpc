'use server'

import { createSupaServerClient } from "@/lib/supabase/server";
import { ComponentCategoryEnum, ComponentDetail, ComponentView, isValidComponentSortType } from "../../db";
import { MotherboardCompatibility, ProductFilter } from "./filter";

export const getMotherboard = async (
  { casingId, cpuId, memoryIds }: MotherboardCompatibility,
  { product_name, min_price, max_price, limit, offset }: ProductFilter,
  { sort, sortDirection }: { sort?: string; sortDirection?: string }
) => {
  const supabase = await createSupaServerClient()
  let errorMessage

  if (!supabase) {
    throw new Error("Supabase client is null")
  }

  // filter start
  const client_query = supabase
    .schema("product")
    .from("v_motherboards")
    .select("*", { count: "exact" })

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

  // compatibility start

  if (casingId) {
    const { data: casingData } = await supabase
      .schema("product")
      .from("v_casings")
      .select("mobo_supports")
      .eq("product_id", casingId)
      .limit(1)
      .single();

    if (!casingData) {
      errorMessage = "Data casing tidak ditemukan";
    }

    await client_query.filter('form_factor', 'in', `(${casingData?.mobo_supports?.join(',')})`);
  }

  if (cpuId) {
    const { data: cpuData } = await supabase
      .schema("product")
      .from("v_cpus")
      .select("cpu_socket_id")
      .eq("product_id", cpuId)
      .limit(1)
      .single();
    
    if (cpuData?.cpu_socket_id !== undefined && cpuData?.cpu_socket_id !== null) {
      await client_query.eq("cpu_socket_id", cpuData.cpu_socket_id);
    }
  }

  if (memoryIds && memoryIds.length > 0) {
    const uniqueMemoryIds = [...new Set(memoryIds)];
    
    // 1. Fetch memory data
    const { data: memoryData } = await supabase
      .schema("product")
      .from("v_memories")
      .select("product_id, memory_type, capacity_gb, frequency_mhz, amount")
      .in("product_id", uniqueMemoryIds);

    if (memoryData && memoryData.length !== 0) {
      // 2. Check memory type consistency
      const firstMemoryType = memoryData[0]?.memory_type;
      const allSameType = memoryData.every(m => m.memory_type === firstMemoryType);
      
      if (!allSameType) {
        errorMessage = "Semua memori yang dipilih harus memiliki tipe yang sama";
        return { data: [], total: 0, errorMessage };
      } else {
        // 3. Calculate memory requirements
        const kitCounts = new Map<number, number>();
        memoryIds.forEach(id => kitCounts.set(id, (kitCounts.get(id) ?? 0) + 1));
  
        let totalSticks = 0;
        let totalMemoryGb = 0;
        let maxFrequency = 0;
  
        memoryData.forEach(memory => {
          const kits = kitCounts.get(memory.product_id ?? 0) ?? 0;
          const sticks = kits * (memory.amount ?? 1);
          
          totalSticks += sticks;
          totalMemoryGb += (memory.capacity_gb ?? 0) * sticks;
          maxFrequency = Math.max(maxFrequency, memory.frequency_mhz ?? 0);
        });
  
        // 4. Filter motherboards in a single query
        if (firstMemoryType !== undefined && firstMemoryType !== null) {
          client_query.eq("memory_type", firstMemoryType)
            .gte("memory_slot", totalSticks)
            .gte("max_memory_gb", totalMemoryGb)
            .gte("memory_frequency_mhz", maxFrequency);
        } 
      }
    }
  }
  
  if(sort && isValidComponentSortType(sort, ComponentCategoryEnum.Motherboard) && sortDirection) {   
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
  const motherboardData = data as ComponentDetail[]; 

  if (!motherboardData) {
    errorMessage = "Data motherboard tidak ditemukan";
    return { data: [], total: 0, errorMessage };
  }

  const filteredData = motherboardData as ComponentView["v_motherboards"][];

  if (error) {
    errorMessage = error.message;
  }

  // compatibility end

  return { data: filteredData, total: count ?? 0, errorMessage
: errorMessage};
};
