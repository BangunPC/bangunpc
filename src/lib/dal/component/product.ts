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

  switch (categoryEnum) {
    case ComponentCategoryEnum.Motherboard:
      return getMotherboard({}, productFilter, { sort, sortDirection });   
    case ComponentCategoryEnum.CPU:
      return getCpu({}, productFilter, { sort, sortDirection })
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