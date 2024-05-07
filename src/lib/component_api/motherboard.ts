import { createClient } from "../supabase/client";
import { MotherboardCompatibility, MotherboardFilter } from "./filter";

export const getMotherboard = async (
  { casingId, cpuId, memories }: MotherboardCompatibility,
  { query, min_price, max_price }: MotherboardFilter,
) => {
  const client = createClient();

  if (!client) {
    throw new Error("Supabase client is null");
  }

  // filter start

  const client_query = client
    .schema("product")
    .from("v_motherboards")
    .select("*", { count: "exact" });

  if (min_price) {
    client_query.gte("lowest_price", min_price);
  }
  if (max_price) {
    client_query.lte("lowest_price", max_price);
  }
  if (query) {
    client_query.textSearch("product_name", `'${query}'`, {
      type: "websearch",
      config: "english",
    });
  }

  client_query.order("product_name", { ascending: true });

  // filter end

  const { data: motherboardData, error, count } = await client_query;

  if (!motherboardData) {
    throw new Error("Motherboard data is null");
  }

  let filteredData = motherboardData;

  // compatibility start

  if (casingId) {
    const { data: casingData, error } = await client
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
      casingData?.mobo_supports?.includes(motherboard.form_factor || ""),
    );
  }

  if (cpuId) {
    const { data: cpuData, error } = await client
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
    const { data: memoryData, error } = await client
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
          (motherboard.memory_type ? motherboard.memory_type : "_") ===
            (memoryData[0]?.memory_type ? memoryData[0].memory_type : "") &&
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

  return { filteredData, count: filteredData.length };
};
