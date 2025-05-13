import { Suspense } from "react"
import { categorySlugToEnum, ComponentCategoryEnum } from "@/lib/db"
import { KategoriClient } from "./client"
import { getMotherboard } from "@/lib/dal/component/motherboard"
import { getCpu } from "@/lib/dal/component/cpu"
import { getGpu } from "@/lib/dal/component/gpu"
import { getMemory } from "@/lib/dal/component/memory"
import { getPsu } from "@/lib/dal/component/psu"
import { getStorage } from "@/lib/dal/component/storage"
import { getCasing } from "@/lib/dal/component/casing"
import { getMonitor } from "@/lib/dal/component/monitor"
import LoadingComponent from "@/components/common/loading"

// Secure parameter validation
const validatePage = (value: string | undefined) => {
  const num = Number(value);
  return Number.isInteger(num) && num >= 1 ? num : 1;
};

const validatePerPage = (value: string | undefined) => {
  const num = Number(value);
  const options = [10, 20, 30, 40, 50];
  return options.includes(num) ? num : 20;
};

const validateSearchQuery = (value: string | undefined): string => {
  if (value === null || value === undefined) {
    return '';
  }
  
  return String(value).slice(0, 100);
};


async function fetchComponentDetails(
  categoryEnum: ComponentCategoryEnum, 
  limit: number = 20, 
  offset: number = 1, 
  query: string = "",
  minPrice?: number,
  maxPrice?: number
) {
  const defaultQuery = {
    product_name: query,
    min_price: minPrice ?? 0,
    max_price: maxPrice ?? 0,
    limit,
    offset,
  }

  switch (categoryEnum) {
    case ComponentCategoryEnum.Motherboard:
      return getMotherboard({}, defaultQuery)
    case ComponentCategoryEnum.CPU:
      return getCpu({}, defaultQuery)
    case ComponentCategoryEnum.GPU:
      return getGpu({}, defaultQuery)
    case ComponentCategoryEnum.Memory:
      return getMemory({}, defaultQuery)
    case ComponentCategoryEnum.PSU:
      return getPsu({}, defaultQuery)
    case ComponentCategoryEnum.Storage:
      return getStorage({}, defaultQuery)
    case ComponentCategoryEnum.Casing:
      return getCasing({}, defaultQuery)
    case ComponentCategoryEnum.Monitor:
      return getMonitor({}, defaultQuery)
    default:
      return {data: [], total: 0}
  }
}

type Params = {
  isCompatibilityChecked?: boolean;
  kategori: string;
  noTopH: boolean;
};

export default async function KategoriPage(props: {
  params: Promise<Params>
  searchParams?: Promise<{ page?: string; perPage?: string; q?: string }>
}) {
  const params = await props.params
  const searchParams = await props.searchParams ?? {}
  const kategori = params.kategori as string
  const noTopH = params.noTopH ?? false

  // Validate all input parameters
  const page = validatePage(searchParams.page);
  const perPage = validatePerPage(searchParams.perPage);
  const query = validateSearchQuery(searchParams.q);
  // const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined;
  // const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined;
  
  const categoryEnum = categorySlugToEnum[kategori]!;
  const offset = (page - 1) * perPage;

  const result = await fetchComponentDetails(
    categoryEnum, 
    perPage, 
    offset, 
    query,
    // minPrice,
    // maxPrice
  );

  const data = 'data' in result ? result.data : [];
  const total = 'total' in result ? result.total : 0;

  return (
    <Suspense fallback={<LoadingComponent />}>
      <KategoriClient 
        className="mt-0" 
        componentDetails={data} 
        kategori={kategori} 
        noTopH={noTopH} 
        page={page} 
        perPage={perPage} 
        total={total}
        initialSearch={query}
        // initialMinPrice={minPrice}
        // initialMaxPrice={maxPrice}
      />
    </Suspense>
  )
}