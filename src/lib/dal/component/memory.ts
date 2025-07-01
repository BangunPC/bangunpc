import { createSupaServerClient } from "@/lib/supabase/server";
import { MemoryCompatibility, ProductFilter } from "./filter";
import { ComponentCategoryEnum, isValidComponentSortType } from "@/lib/db";

export const getMemory = async (
  { memories, motherboardId }: MemoryCompatibility,
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
    .from("v_memories")
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
    // Fetching mobo required data
    const { data: motherboardData, error } = await supabase
      .schema("product")
      .from("v_motherboards")
      .select("memory_type, memory_slot, max_memory_gb, memory_frequency_mhz")
      .eq("product_id", motherboardId)
      .limit(1)
      .single();
    
    if (error) {
      errorMessage = "Data motherboard tidak ditemukan";
    } else {
      // Apply filters directly in the query
      if (motherboardData.memory_type) {
        await client_query.eq("memory_type", motherboardData.memory_type);
      }
      
      if (motherboardData.memory_frequency_mhz) {
        await client_query.lte("frequency_mhz", motherboardData.memory_frequency_mhz);
      }

      if (memories) {
        // Fetching memory required data
        const { data: memoryData, error: memoryError } = await supabase
          .schema("product")
          .from("v_memories")
          .select("memory_type, capacity_gb, amount")
          .in(
            "product_id",
            memories.map((memory) => memory.id),
          );
        
        if (memoryError) {
          errorMessage = "Data memory tidak ditemukan";
        } else {
          const totalMemorySize = memoryData.reduce((accumulator, memory) => {
            if (memory.capacity_gb !== null && memory.amount !== null) {
              return accumulator + memory.capacity_gb * memory.amount;
            }
            return accumulator;
          }, 0);
          const memoryCount = memories.length;

          // Apply additional filters based on existing memories
          if (memoryData && memoryData.length > 0 && memoryData[0]?.memory_type) {
            await client_query.eq("memory_type", memoryData[0].memory_type);
          }
        }
      }
    }
  }

  // compatibility end

  if(sort && isValidComponentSortType(sort, ComponentCategoryEnum.Memory) && sortDirection) {   
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
    errorMessage = "Data memory tidak ditemukan";
    return { data: [], total: 0, errorMessage };
  }

  if (error) {
    errorMessage = error;
  }

  return { data, total: count ?? 0, errorMessage };
};