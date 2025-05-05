'use server'

import { createSupaServerClient } from "@/lib/supabase/server";
import { ComponentDetail, ComponentView } from "../../db";
import { MotherboardCompatibility, ProductFilter } from "./filter";

export const getMotherboard = async (
  { casingId, cpuId, memories }: MotherboardCompatibility,
  { query, min_price, max_price, limit, offset }: ProductFilter,
) => {
  const supabase = await createSupaServerClient()

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
  if (query) {
    await client_query.textSearch("product_name", `'${query}'`, {
      type: "websearch",
      config: "english",
    });
  }

  let start = typeof offset === "number" ? offset : 0;
  let end = typeof limit === "number" ? start + limit - 1 : start + 19;
  client_query.range(start, end);

  // await client_query.order("product_name", { ascending: true });

  // filter end

  const { data, error } = await client_query;
  const motherboardData = data as ComponentDetail[];

  if (!motherboardData) {
    throw new Error("Motherboard data is null");
  }

  let filteredData = motherboardData as ComponentView["v_motherboards"][];

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
      throw new Error("Casing data is null");
    }

    filteredData = filteredData.filter((motherboard) =>
      casingData?.mobo_supports?.includes(motherboard.form_factor ?? ""),
    );
  }

  if (cpuId) {
    const { data: cpuData } = await supabase
      .schema("product")
      .from("v_cpus")
      .select("cpu_socket_id")
      .eq("product_id", cpuId)
      .limit(1)
      .single();
    filteredData = filteredData.filter(
      (motherboard) => motherboard.cpu_socket_id === cpuData?.cpu_socket_id,
    );
  }

  if (memories && memories.length > 0) {
    const { data: memoryData } = await supabase
      .schema("product")
      .from("v_memories")
      .select("product_id, memory_type, capacity_gb, frequency_mhz")
      .in(
        "product_id",
        memories.map((memory) => memory.id),
      );

    if (!memoryData) {
      throw new Error("Memory data is null");
    }
    
    if (memoryData && memoryData.length > 0) {
      filteredData = filteredData.filter((motherboard) => {
        const memoryCount = memories.reduce(
          (total, memory) => total + memory.amount,
          0,
        );

        const totalMemoryGb = memoryData.reduce((total, memory) => {
          return (
            total +
            (memory.capacity_gb ?? 0) *
              (memories.find(
                (inputMemory) => inputMemory.id === memory.product_id,
              )?.amount ?? 0)
          );
        }, 0);

        return (
          (motherboard.memory_type ?? "_") ===
            (memoryData[0]?.memory_type ?? "") &&
          (motherboard.memory_slot ?? 0) >= memoryCount &&
          (motherboard.max_memory_gb ?? 0) >= totalMemoryGb &&
          (motherboard.memory_frequency_mhz ?? 0) >=
            (memoryData[0]?.frequency_mhz ?? -1)
        );
      });
    }
  }

  if (error) {
    throw error;
  }

  // compatibility end

  return filteredData;
};

export async function getMotherboardDistinctValues(column: string) {
  const supabase = await createSupaServerClient();
  if (!supabase) throw new Error("Supabase client is null");

  // Check if column is numeric by sampling one row
  const { data: sample } = await supabase
    .schema("product")
    .from("v_motherboards")
    .select(column)
    .limit(1);
  if (!sample || sample.length === 0) return [];
  const isNumber = typeof sample?.[0]?.[column as keyof typeof sample[0]] === "number";

  if (isNumber) {
    // Get min and max
    const { data: minData } = await supabase
      .schema("product")
      .from("v_motherboards")
      .select(`${column}`)
      .order(column, { ascending: true })
      .limit(1);
    const { data: maxData } = await supabase
      .schema("product")
      .from("v_motherboards")
      .select(`${column}`)
      .order(column, { ascending: false })
      .limit(1);
    return {
      min: minData?.[0]?.[column as keyof typeof sample[0]] ?? 0,
      max: maxData?.[0]?.[column as keyof typeof sample[0]] ?? 0,
    };
  } else {
    // Get distinct values
    const { data } = await supabase
      .schema("product")
      .from("v_motherboards")
      .select(column)
      .neq(column, null);
    const unique = Array.from(new Set((data ?? []).map((row: any) => row[column])));
    return unique;
  }
}
