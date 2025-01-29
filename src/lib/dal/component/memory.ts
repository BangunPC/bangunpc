import { createSupaServerClient } from "@/lib/supabase/server";
import { createClient } from "../../supabase/client";
import { MemoryCompatibility, ProductFilter } from "./filter";

export const getMemory = async (
  { memories, motherboardId }: MemoryCompatibility,
  { query, min_price, max_price }: ProductFilter,
) => {
  const supabase = await createSupaServerClient()

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
  if (query) {
    await client_query.textSearch("product_name", `'${query}'`, {
      type: "websearch",
      config: "english",
    });
  }

  await client_query.order("product_name", { ascending: true });

  // filter end

  const { data: memoryData, error } = await client_query;

  if (!memoryData) {
    throw new Error("Memory data is null");
  }

  let filteredData = memoryData;

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
      throw error;
    }

    // Filter by mobo form factor
    filteredData = filteredData.filter((item) => {
      return (
        item.memory_type === motherboardData.memory_type &&
        (item.frequency_mhz ?? -1) <=
          (motherboardData?.memory_frequency_mhz ?? 0)
      );
    });

    // TODO(produk): account for quantity, not amount
    if (memories) {
      // Fetching memory required data
      const { data: memoryData, error } = await supabase
        .schema("product")
        .from("v_memories")
        .select("memory_type, capacity_gb, amount")
        .in(
          "product_id",
          memories.map((memory) => memory.id),
        );
      if (error) {
        throw error;
      }

      const totalMemorySize = memoryData.reduce((accumulator, memory) => {
        if (memory.capacity_gb !== null && memory.amount !== null) {
          return accumulator + memory.capacity_gb * memory.amount;
        }
        return accumulator;
      }, 0);
      const memoryCount = memories.length;

      filteredData = filteredData.filter((item) => {
        return (
          motherboardData.memory_type === item.memory_type &&
          motherboardData.memory_slot! >= memoryCount &&
          motherboardData.max_memory_gb! >= totalMemorySize
        );
      });
    }
  }

  // compatibility end

  if (error) {
    return error;
  }

  return filteredData;
};
