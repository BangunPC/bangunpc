"use client";

import {
  ComponentCategoryEnum,
  ComponentDetail,
  categorySlugToEnum,
  categoryEnumToHeader,
  categoryEnumToTitle,
  categoryEnumToKey,
  ComponentPayload,
} from "@/lib/db";
import { SidebarClose, SidebarOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { componentImage } from "@/lib/utils";
import { CatalogueSidebar, SidebarSection } from "./catalogue-sidebar";
import { createBuildSession, getBuildSessionId, insertBuildSessionComponent } from "@/lib/build-session";

export function KategoriClient({
  componentDetails,
  kategori,
  noTopH
}: {
  componentDetails: ComponentDetail[]
  kategori: string
  noTopH: boolean
}) {
  const componentCategoryEnum = categorySlugToEnum[kategori]!
  const [hideSidebar, setHideSidebar] = useState(false)
  const router = useRouter()

  const handleAddComponent = async (component: ComponentDetail) => {
    const buildId = await getBuildSessionId()
    let error: string | undefined

    if (buildId) { 
      const result = await insertBuildSessionComponent(componentCategoryEnum, { product_id: component.product_id! })
      
      if (result?.error)
        error = result.error
    } else {
      const result = await createBuildSession(componentCategoryEnum, {product_id: component.product_id!})

      if (result?.error)
        error = result.error
    }

    if(!error) {
      router.push("/simulasi")
    }
  }

  const desktopSidebarButton = (
    <Button
      variant="outline"
      className="mr-2 mt-[6px] hidden aspect-square h-10 items-center justify-center p-0 tablet:flex desktop:hidden"
      onClick={() => setHideSidebar(!hideSidebar)}
    >
      {hideSidebar ? <SidebarOpen /> : <SidebarClose />}
    </Button>
  )

  const mobileSidebarButton = (
    <div className="px-4">
      <Button variant="outline" className="block w-full tablet:hidden" onClick={() => setHideSidebar(!hideSidebar)}>
        {hideSidebar ? "Filter" : "Kembali"}
      </Button>
    </div>
  )

  return (
    <div>
      <div className="py-4">
        {mobileSidebarButton}
        <div className="flex flex-row pt-4 tablet:pt-0">
          <div className={`${hideSidebar ? "hidden" : "m-auto"} tablet:m-0 desktop:block`}>
            <CatalogueSidebar 
              price={100000}
              totalComponents={2} 
              isIframe={noTopH ?? false}>
              <SidebarSection title="Price Range">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">
                    Min Price
                  </span>
                  <div className="flex flex-row items-center overflow-clip rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                    <label htmlFor="min-price" className="mx-1">
                      Rp
                    </label>
                    <input
                      id="min-price"
                      className="h-10 w-full"
                      type="number"
                      placeholder="Min Price"
                    />
                  </div>

                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">
                    Max Price
                  </span>
                  <div className="flex flex-row items-center overflow-clip rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                    <label htmlFor="max-price" className="mx-1">
                      Rp
                    </label>
                    <input
                      id="max-price"
                      className="h-10 w-full"
                      type="number"
                      placeholder="Max Price"
                    />
                  </div>
                </div>
              </SidebarSection>
              <Button
                variant="default"
                className="text-white"
                onClick={() => {
                  // TODO: Implement filter
                }}
              >
                Terapkan Filter
              </Button>
            </CatalogueSidebar>
          </div>
          <div className={`w-full flex-1 px-3 desktop:p-0 ${hideSidebar ? "" : "hidden"} tablet:block`}>
            <div className="flex flex-col tablet:flex-row">
              {desktopSidebarButton}
              <Header category={componentCategoryEnum} itemCount={componentDetails.length.toString()} />
            </div>
            <div>
              <MobileTable
                data={componentDetails}
                headers={categoryEnumToHeader[componentCategoryEnum]}
                kategori={kategori}
                isIframe={noTopH}
                onAddComponent={handleAddComponent}
              />
              <DesktopTable
                data={componentDetails}
                headers={categoryEnumToHeader[componentCategoryEnum]}
                kategori={kategori}
                isIframe={noTopH}
                onAddComponent={handleAddComponent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ComponentFallback = ({
  headers = [],
  categoryEnum,
  component,
  isMobile,
  onClick,
}: {
  headers: string[];
  categoryEnum: ComponentCategoryEnum;
  component: any;
  isMobile: boolean;
  onClick?: () => void;
}) => {
  const keys = categoryEnumToKey[categoryEnum];

  if (isMobile) {
    return (
      <>
        {keys.map((key, index) => (
          <div key={index} className="flex flex-col">
            <div className="mb-2 mt-1 text-sm">{headers[index]}</div>
            <div className="font-semibold">{component[key] ?? "-"}</div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {keys.map((key) => (
        <td key={key} onClick={onClick}>
          {component[key] ?? "-"}
        </td>
      ))}
    </>
  );
};

const Header = ({
  category,
  itemCount,
}: {
  category: ComponentCategoryEnum;
  itemCount: string;
}) => (
  <div className="flex flex-col">
    <span className="text-5xl font-semibold">
      Pilih {categoryEnumToTitle[category]}
    </span>
    <span className="flex items-center gap-2 text-lg font-semibold">
      Tersedia {itemCount} produk siap kamu pilih
    </span>
  </div>
);

type TableType = {
  data: ComponentDetail[] | undefined;
  headers: string[];
  kategori: string;
  isIframe: boolean;
  onAddComponent: (component: ComponentDetail) => Promise<void>;
  onSuccess?: () => void;
};

const DesktopTable = ({
  data,
  headers = [],
  kategori,
  isIframe,
  onAddComponent
}: TableType) => {
  const header = ["", "Nama Produk", ...headers, "Harga (Rp)", ""];
  const router = useRouter();

  return (
    <table className="hidden tablet:table">
      <thead className="sticky z-[1] text-xs backdrop-blur top-0">
        <tr>
          {header.map((item, index) => (
            <th key={index}>
              <div className="flex h-full items-end">
                <span className="text-start">{item}</span>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="h-min flex-col flex-nowrap content-start items-start justify-start gap-[3px] overflow-visible p-5">
        <tr className="h-4"></tr>
        {data?.map((component) => {
          const handleRedirect = () =>
            router.push(
              `/produk/${kategori}/${component.slug}${isIframe ? "?iframe=true" : ""}`,
            );

          return (
            <tr
              key={component.product_id}
              className="h-[56px] cursor-pointer transition-transform hover:z-10 hover:scale-[1.01]"
            >
              <td className="w-16">
                <Link href={`/produk/${kategori}/${component.slug}${isIframe ? "?iframe=true" : ""}`}>
                  {component.image_filenames!.length > 0 && (
                    <Image
                      src={componentImage(component)}
                      alt={`Gambar ${component.product_name}`}
                      width={64}
                      height={64}
                      className="aspect-square min-w-[64px]"
                    />
                  )}
                </Link>
              </td>
              <td onClick={handleRedirect}>
                {component.product_name ?? "-"}
              </td>

              <ComponentFallback
                headers={headers}
                categoryEnum={categorySlugToEnum[kategori]!}
                component={component}
                isMobile={false}
                onClick={handleRedirect}
              />

              <td onClick={handleRedirect}>
                {component.lowest_price?.toLocaleString("id-ID") ?? "-"}
              </td>
              <td className="cursor-default">
                <Button
                  variant="default"
                  onClick={async () => await onAddComponent(component)}
                  className="text-white"
                >
                  Tambah
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const MobileTable = ({ 
  data, 
  headers, 
  kategori, 
  onAddComponent 
}: TableType) => {
  return (
    <div className="flex flex-col gap-1 transition-all duration-200 tablet:hidden">
      {data?.map((component) => (
        <div
          key={component.product_id}
          className="dark:texthover:bg-zinc-700 rounded-xl border bg-white p-2 shadow-lg transition-all hover:border-zinc-300 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-700"
        >
          <Link
            href={`/produk/${kategori}/${component.slug}`}
            className="flex flex-row items-center gap-1"
          >
            <div className="flex flex-1 flex-row items-center gap-2">
              {component.image_filenames!.length > 0 && (
                <Image
                  src={componentImage(component)}
                  alt={`Gambar ${component.product_name}`}
                  width={80}
                  height={80}
                />
              )}
              <div className="flex flex-1 flex-col">
                <span className="text-lg font-bold leading-none">
                  {component.product_name}
                </span>
                <span className="mt-2 font-bold">
                  Rp {component.lowest_price?.toLocaleString("id-ID") ?? "-"}
                </span>
              </div>
            </div>
            <div>

              {/* Client component Add component */}
              <Button 
                className="text-white" 
                onClick={() => onAddComponent(component)}
              >
                Tambah
              </Button>
            </div>
          </Link>
          <div className="grid grid-cols-3 gap-1 sm:grid-cols-4">
            <ComponentFallback
              headers={headers}
              categoryEnum={categorySlugToEnum[kategori]!}
              component={component}
              isMobile={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
};