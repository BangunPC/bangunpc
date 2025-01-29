import { Suspense } from "react"
import { categorySlugToEnum, ComponentCategoryEnum, ComponentDetail } from "@/lib/db"
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

async function fetchComponentDetails(categoryEnum: ComponentCategoryEnum) {
  const defaultQuery = {
    query: "",
    min_price: 0,
    max_price: 0,
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
      return []
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
}) {
  const params = await props.params
  const kategori = params.kategori as string
  const noTopH = params.noTopH ?? false

  const categoryEnum = categorySlugToEnum[kategori]!
  const componentDetails = await fetchComponentDetails(categoryEnum)

  return (
    <Suspense fallback={<LoadingComponent />}>
      <KategoriClient isCompatibilityChecked={params.isCompatibilityChecked ?? false} componentDetails={componentDetails} kategori={kategori} noTopH={noTopH} />
    </Suspense>
  )
}

