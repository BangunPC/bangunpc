// export const runtime = "edge";

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

async function fetchComponentDetails(categoryEnum: ComponentCategoryEnum, limit: number, offset: number) {
  const defaultQuery = {
    query: "",
    min_price: 0,
    max_price: 0,
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

type Params = Promise<{ 
  isCompatibilityChecked?: boolean
  kategori: string
  noTopH: boolean
}>
// type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
 
// export async function generateMetadata(props: {
//   params: Params
//   searchParams: SearchParams
// }) {
//   const params = await props.params
//   const isCompatibilityChecked = params.isCompatibilityChecked
//   const noTopH = params.noTopH ?? false
// }
export default async function KategoriPage(props: {
  params: Params
  searchParams?: { page?: string; perPage?: string }
}) {
  const params = await props.params
  const kategori = params.kategori as string
  const noTopH = params.noTopH ?? false

  const categoryEnum = categorySlugToEnum[kategori]!
  // Get page and perPage from searchParams or default
  const page = props.searchParams?.page ? parseInt(props.searchParams.page) : 1
  const perPage = props.searchParams?.perPage ? parseInt(props.searchParams.perPage) : 20
  const offset = (page - 1) * perPage

  const result = await fetchComponentDetails(categoryEnum, perPage, offset)
  const data = 'data' in result ? result.data : []
  const total = 'total' in result ? result.total : 0

  return (
    <Suspense fallback={<LoadingComponent />}>
      <KategoriClient className="mt-0" componentDetails={data} kategori={kategori} noTopH={noTopH} page={page} perPage={perPage} total={total}/>
    </Suspense>
  )
}

