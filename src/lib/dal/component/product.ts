import { getBuildSessionData } from "@/lib/build-session";
import { ComponentCategoryEnum } from "../../db";
import { getCasing } from "./casing";
import { getCpu } from "./cpu";
import { getGpu } from "./gpu";
import { getMemory } from "./memory";
import { getMonitor } from "./monitor";
import { getMotherboard } from "./motherboard";
import { getPsu } from "./psu";
import { getStorage } from "./storage";

export async function fetchProducts(
  categoryEnum: ComponentCategoryEnum, 
  limit: number = 20, 
  offset: number = 1, 
  query?: string,
  sort?: string,
  isCompatibilityChecked?: boolean,
  sortDirection?: string,
  minPrice?: number,
  maxPrice?: number
) {
  const productFilter = {
    product_name: query,
    min_price: minPrice ?? 0,
    max_price: maxPrice ?? 0,
    limit,
    offset,
  }

  let simulasiData = null
  if (isCompatibilityChecked) {
    simulasiData = (await getBuildSessionData())?.data;
  }
  switch (categoryEnum) {
    case ComponentCategoryEnum.Motherboard:
      let motherboardCompatibility = {};
      if (isCompatibilityChecked && simulasiData) {
        // If compatibility is checked, we need to get the motherboard compatibility data from the session
        // Step 1: Count occurrences of each product_id
        // const productCountMap = new Map<number, number>();

        // simulasiData.memories.forEach(item => {
        //     const currentCount = productCountMap.get(item.product_id) || 0;
        //     productCountMap.set(item.product_id, currentCount + 1);
        // });

        // // Step 2: Convert to desired format
        // const memories = Array.from(productCountMap.entries()).map(([id, amount]) => ({
        //     id,
        //     amount
        // }));

        motherboardCompatibility = {
          casingId: simulasiData.casing?.product_id,
          cpuId: simulasiData.cpu?.product_id,
          memoryIds: simulasiData.memories?.map(item => item.product_id),
        };
      }

      return getMotherboard(motherboardCompatibility, productFilter, { sort, sortDirection });   
    case ComponentCategoryEnum.CPU:
      let cpuCompatibility = {};
      if (isCompatibilityChecked && simulasiData) {
        cpuCompatibility = {
          motherboardId: simulasiData.motherboard?.product_id,
          gpuId: simulasiData.gpu?.product_id,
          psuId: simulasiData.power_supply?.product_id,
          memoryIds: simulasiData.memories?.map(item => item.product_id),
        };
      }
      
      return getCpu(cpuCompatibility, productFilter, { sort, sortDirection })
    case ComponentCategoryEnum.GPU:
      return getGpu({}, productFilter, { sort, sortDirection })
    case ComponentCategoryEnum.Memory:
      return getMemory({}, productFilter, { sort, sortDirection })
    case ComponentCategoryEnum.PSU:
      return getPsu({}, productFilter, { sort, sortDirection })
    case ComponentCategoryEnum.Storage:
      return getStorage({}, productFilter, { sort, sortDirection })
    case ComponentCategoryEnum.Casing:
      return getCasing({}, productFilter, { sort, sortDirection })
    case ComponentCategoryEnum.Monitor:
      return getMonitor({}, productFilter, { sort, sortDirection })
    default:
      return {data: [], total: 0}
  }
}