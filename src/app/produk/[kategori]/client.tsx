"use client";

import {
  ComponentCategoryEnum,
  ComponentDetail,
  categorySlugToEnum,
  categoryEnumToHeader,
  categoryEnumToTitle,
  categoryEnumToKey,
} from "@/lib/db";
import { SidebarClose, SidebarOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn, componentImage } from "@/lib/utils";
import { CatalogueSidebar, SidebarSection } from "./catalogue-sidebar";
import { createBuildSession, getBuildSessionId, insertBuildSessionComponent } from "@/lib/build-session";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

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

  const handleInsertOrCreateSession = async (product_id: number) => {
    const buildId = await getBuildSessionId();
  
    if (buildId) {
      const result = await insertBuildSessionComponent(componentCategoryEnum, { product_id });
      return result?.error;
    } else {
      const result = await createBuildSession(componentCategoryEnum, { product_id });
      return result?.error;
    }
  };
  
  const handleAddComponent = async (component: ComponentDetail) => {
    const { product_id } = component;
  
    if (!product_id) {
      console.error("Product ID is missing");
      return;
    }
  
    try {
      const error = await handleInsertOrCreateSession(product_id);
  
      if (!error) {
        router.push("/simulasi");
      } else {
        console.error("Error occurred:", error);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const desktopSidebarButton = (
    <Button
      variant="outline"
      className="mr-4 hidden aspect-square h-10 w-10 items-center justify-center p-0 tablet:flex desktop:hidden"
      onClick={() => setHideSidebar(!hideSidebar)}
    >
      {hideSidebar ? <SidebarOpen /> : <SidebarClose />}
    </Button>
  )

  const mobileSidebarButton = (
    <Button 
      variant="outline" 
      className="mb-4 w-full tablet:hidden" 
      onClick={() => setHideSidebar(!hideSidebar)}
    >
      {hideSidebar ? "Filter" : "Kembali"}
    </Button>
  )

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {mobileSidebarButton}
      
      <div className="flex flex-col tablet:flex-row tablet:gap-8">
        {/* Sidebar */}
        <aside className={`${hideSidebar ? "hidden" : "block"} w-full tablet:max-w-xs desktop:block`}>
          <CatalogueSidebar 
            price={100000}
            totalComponents={2} 
            isIframe={noTopH ?? false}
          >
            <SidebarSection title="Price Range">
              <div className="flex flex-col space-y-3">
                <div>
                  <label htmlFor="min-price" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Min Price
                  </label>
                  <div className="flex items-center overflow-hidden rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 dark:border-gray-600">
                    <span className="px-3 text-gray-500 dark:text-gray-400">
                      Rp
                    </span>
                    <input
                      id="min-price"
                      className="h-10 w-full border-0 bg-transparent focus:outline-none dark:text-white"
                      type="number"
                      placeholder="Min Price"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="max-price" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Max Price
                  </label>
                  <div className="flex items-center overflow-hidden rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 dark:border-gray-600">
                    <span className="px-3 text-gray-500 dark:text-gray-400">
                      Rp
                    </span>
                    <input
                      id="max-price"
                      className="h-10 w-full border-0 bg-transparent focus:outline-none dark:text-white"
                      type="number"
                      placeholder="Max Price"
                    />
                  </div>
                </div>
              </div>
            </SidebarSection>
            
            <Button
              variant="default"
              className="mt-4 w-full text-white"
              onClick={() => {
                // TODO: Implement filter
              }}
            >
              Terapkan Filter
            </Button>
          </CatalogueSidebar>
        </aside>
        
        {/* Main Content */}
        <main className={`flex-1 ${hideSidebar ? "block" : "hidden"} tablet:block`}>
          <div className="mb-6 flex flex-col tablet:flex-row tablet:items-center tablet:justify-between">
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
        </main>
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
          <div key={index} className="flex flex-col p-2">
            <div className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">{headers[index]}</div>
            <div className="font-medium">{component[key] ?? "-"}</div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {keys.map((key) => (
        <td key={key} onClick={onClick} className="py-4 px-3">
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
    <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
      Pilih {categoryEnumToTitle[category]}
    </h1>
    <p className="mt-2 text-base font-medium text-gray-600 dark:text-gray-300 sm:text-lg">
      Tersedia <span className="font-semibold">{itemCount}</span> produk siap kamu pilih
    </p>
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
    <div className="hidden w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 tablet:block">
      <table className="w-full">
        <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800">
          <tr>
            {header.map((item, index) => (
              <th key={index} className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {data?.map((component) => {
            const handleRedirect = () =>
              router.push(
                `/produk/${kategori}/${component.slug}${isIframe ? "?iframe=true" : ""}`,
              );

            return (
              <tr
                key={component.product_id}
                className="group cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="py-4 px-3 w-20">
                  <Link href={`/produk/${kategori}/${component.slug}${isIframe ? "?iframe=true" : ""}`}>
                    {component.image_filenames!.length > 0 && (
                      <div className="h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src={componentImage(component)}
                          alt={`Gambar ${component.product_name}`}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </Link>
                </td>
                <td className="py-4 px-3 font-medium" onClick={handleRedirect}>
                  {/* {component.product_name ?? "-"} */}
                  {/* <h3 className={
                    cn(
                    "text-sm font-medium text-foreground",
                    `line-clamp-2`
                  )}>
                    {component.product_name ?? "-"}
                  </h3> */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                          <h3 className={cn(
                            "text-sm font-medium text-foreground",
                            `line-clamp-2`
                          )}>
                            {component.product_name ?? "-"}
                          </h3>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p>{component.product_name ?? "-"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>

                <ComponentFallback
                  headers={headers}
                  categoryEnum={categorySlugToEnum[kategori]!}
                  component={component}
                  isMobile={false}
                  onClick={handleRedirect}
                />

                <td className="py-4 px-3 font-semibold" onClick={handleRedirect}>
                  {component.lowest_price?.toLocaleString("id-ID") ?? "-"}
                </td>
                <td className="py-4 px-3">
                  <Button
                    variant="default"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await onAddComponent(component);
                    }}
                    className="w-full text-white sm:w-auto"
                  >
                    Tambah
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const MobileTable = ({ 
  data, 
  headers, 
  kategori, 
  onAddComponent 
}: TableType) => {
  return (
    <div className="space-y-4 tablet:hidden">
      {data?.map((component) => (
        <div
          key={component.product_id}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all dark:border-gray-700 dark:bg-gray-800"
        >
          <Link
            href={`/produk/${kategori}/${component.slug}`}
            className="block p-4"
          >
            <div className="flex items-start gap-4">
              {component.image_filenames!.length > 0 && (
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={componentImage(component)}
                    alt={`Gambar ${component.product_name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-300 hover:scale-105"
                    // width={80}
                    // height={80}
                    // className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 
                // className="text-lg font-bold line-clamp-2"
                className={cn(
                              "text-sm font-medium text-foreground",
                              `line-clamp-2`,
                              `h-12`
                            )}>
                  {component.product_name}
                </h3>
                <p className="mt-2 text-base font-semibold text-gray-900 dark:text-white">
                  Rp {component.lowest_price?.toLocaleString("id-ID") ?? "-"}
                </p>
              </div>
              <div>
                <Button 
                  className="text-white" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onAddComponent(component);
                  }}
                >
                  Tambah
                </Button>
              </div>
            </div>
          </Link>
          <div className="grid grid-cols-2 gap-px bg-gray-200 dark:bg-gray-700 sm:grid-cols-4">
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