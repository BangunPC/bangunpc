import { getBuildSessionData, getBuildSessionId } from "@/lib/build-session";
import { SimulasiClient } from "./client";
import { Suspense } from "react";
import LoadingComponent from "@/components/common/loading";
import { KategoriClient } from "../produk/[kategori]/client";
import { categorySlugToEnum } from "@/lib/db";
import { fetchProducts } from "@/lib/dal/component/product";
import { validatePage, validatePerPage, validateStringQuery } from "@/lib/utils";

// export async function generateMetadata(props: {
//   params: Params
//   searchParams: SearchParams
// }) {
//   const params = await props.params
//   const searchParams = await props.searchParams
//   // const buildCode = params.buildCode
//   // const kategori = searchParams.kategori
// }
type Params = { 
  buildCode: string 
  isCompatibilityChecked?: boolean;
  kategori: string;
  noTopH: boolean;
}
type SearchParams = { 
  kategori?: string; 
  page?: string; 
  perPage?: string; 
  q?: string 
  sort?: string;
  direction?: string;
  c: string;
};

export default async function SimulasiPage(
  props: {
    params: Promise<Params>
    searchParams: Promise<SearchParams>
  }
) {
  const params = await props.params
  const searchParams = await props.searchParams
  const buildSessionId = await getBuildSessionId()
  const kategori = searchParams.kategori ?? '' as string
  const noTopH = params.noTopH ?? false
  const isCompatibilityChecked = searchParams.c !== '0';
  console.log(`isCompatibilityChecked: ${isCompatibilityChecked}`);
  

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
    isCompatibilityChecked,
    sortDirection,
    // minPrice,
    // maxPrice
  );
  
  const data = 'data' in result ? result.data : [];
  const total = 'total' in result ? result.total : 0;

  if(buildSessionId) {
    const simulasiData = await getBuildSessionData();

    return (
      <SimulasiClient 
        buildData={simulasiData!.data!}  
        buildCode={params.buildCode}
      >
        <Suspense fallback={<LoadingComponent/>}>
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
      </SimulasiClient>
    );
  } else {
    return (
      <SimulasiClient>
        <Suspense fallback={<LoadingComponent/>}>
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
      </SimulasiClient>
    );
  }
}

export const runtime = "edge";