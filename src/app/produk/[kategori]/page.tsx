import { Suspense } from "react"
import { KategoriClient } from "./client"
import LoadingComponent from "@/components/common/loading"
import { validatePage, validatePerPage, validateStringQuery } from "@/lib/utils"
import { categorySlugToEnum } from "@/lib/db";
import { fetchProducts } from "@/lib/dal/component/product";

type Params = {
  isCompatibilityChecked?: boolean;
  kategori: string;
  noTopH: boolean;
};

export default async function KategoriPage(props: {
  params: Promise<Params>
  searchParams?: Promise<{ 
    q?: string;
    page?: string; 
    perPage?: string;
    sort?: string;
    direction?: string;
  }>
}) {
  const params = await props.params
  const searchParams = await props.searchParams ?? {}
  const kategori = params.kategori as string
  const noTopH = params.noTopH ?? false

  // Validate all input parameters
  const page = validatePage(searchParams.page);
  const perPage = validatePerPage(searchParams.perPage);
  const query = validateStringQuery(searchParams.q); 
  const sort = validateStringQuery(searchParams.sort); 
  const sortDirection = validateStringQuery(searchParams.direction); 
  
  // const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined;
  // const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined;
  
  const categoryEnum = categorySlugToEnum[kategori]!;
  const offset = (page - 1) * perPage;

  const result = await fetchProducts(
    categoryEnum, 
    perPage, 
    offset, 
    query,
    sort,
    sortDirection
    // minPrice,
    // maxPrice
  );

  const data = 'data' in result ? result.data : [];
  const total = 'total' in result ? result.total : 0;

  return (
    <Suspense fallback={<LoadingComponent />}>
      <KategoriClient 
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