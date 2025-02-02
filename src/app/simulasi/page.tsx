import { getBuildSessionData, getBuildSessionId } from "@/lib/build-session";
import { SimulasiClient } from "./client";
import KategoriPage from "../produk/[kategori]/page";
import { Suspense } from "react";
import LoadingComponent from "@/components/common/loading";

type Params = Promise<{ buildCode: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const buildCode = params.buildCode
  const kategori = searchParams.kategori
}

export default async function SimulasiPage(
  props: {
    params: Params
    searchParams: SearchParams
  }
) {
  const params = await props.params
  const searchParams = await props.searchParams
  const buildSessionId = await getBuildSessionId()

  if(buildSessionId) {
    const simulasiData = await getBuildSessionData();

    return (
      <SimulasiClient 
        buildData={simulasiData!.data!}  
        buildCode={params.buildCode}
      >
        <Suspense fallback={<LoadingComponent/>}>
          <KategoriPage
            params={Promise.resolve({
              isCompatibilityChecked: false,
              kategori: (searchParams.kategori! as string),
              noTopH: true
            })}
          />
        </Suspense>
      </SimulasiClient>
    );
  } else {
    return (
      <SimulasiClient>
        <Suspense fallback={<LoadingComponent/>}>
          <KategoriPage
            params={Promise.resolve({
              isCompatibilityChecked: false,
              kategori: (searchParams.kategori!) as string,
              noTopH: true
            })}
          />
        </Suspense>
      </SimulasiClient>
    );
  }
}

export const runtime = "edge";