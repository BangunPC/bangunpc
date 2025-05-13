'use server'

import { createSupaServerClient } from "@/lib/supabase/server";
import { ComponentDetail, ComponentView } from "../../db";
import { MotherboardCompatibility, ProductFilter } from "./filter";

export const getMotherboard = async (
  { casingId, cpuId, memories }: MotherboardCompatibility,
  { product_name, min_price, max_price, limit, offset }: ProductFilter,
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
  if (product_name) {
    offset = 0;
    await client_query.ilike("product_name", `%${product_name}%`)
    // await client_query.textSearch("product_name", `'${product_name}'`, {
    //   type: "websearch",
    //   config: "english",
    // });
  }

  const start = typeof offset === "number" ? offset : 0;
  const end = typeof limit === "number" ? start + limit - 1 : start + 19;
  client_query.range(start, end);

  // await client_query.order("product_name", { ascending: true });

  // filter end

  const { data, count, error } = await client_query;
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

  return { data: filteredData, total: count ?? 0 };
};

// export async function getProductByNameAndCategory(
//   productName: string
// ) {
//   const supabase = await createSupaServerClient()
  
//   if(!productName) return []
  
//   const { data, error: buildError } = await supabase
//     .schema('product')
//     .from('v_products')
//     .select()
//     // .textSearch('product_name', `'${productName}'`, {
//     //   type: 'websearch',
//     //   config: 'english'
//     // })
//     .ilike('product_name', `%${productName}%`)
//     .eq('category', categoryEnumToTitle[category])
  
//   if (buildError)
//       return { data: null, error:buildError.message }
    
//   return { data?.v_builds as BuildResponseData, error: null}
// }

