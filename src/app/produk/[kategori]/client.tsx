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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn, componentImage } from "@/lib/utils";
import { CatalogueSidebar, SidebarSection } from "./catalogue-sidebar";
import { createBuildSession, getBuildSessionId, insertBuildSessionComponent } from "@/lib/build-session";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useDebounce } from "@/hooks/use-debounce";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
// import { getMotherboard } from "@/lib/dal/component/motherboard";

export function KategoriClient({
  className,
  componentDetails,
  kategori,
  noTopH,
  page = 1,
  perPage = 20,
  total = 0,
  // initialSearch = '',
  // initialMinPrice,
  // initialMaxPrice,
}: {
  className?: string
  componentDetails: ComponentDetail[]
  kategori: string
  noTopH: boolean
  page?: number
  perPage?: number
  total?: number
  initialSearch?: string
  initialMinPrice?: number
  initialMaxPrice?: number
}) {
  const componentCategoryEnum = categorySlugToEnum[kategori]!;
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [hideSidebar, setHideSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [minPrice, setMinPrice] = useState<number | undefined>(searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined);
  const [sortColumn, setSortColumn] = useState<string | null>(searchParams.get('sort') ?? null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    searchParams.get('direction') as 'asc' | 'desc' | null ?? null
  );
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  const isSimulasi = (searchParams.get('kategori') ?? '' )?.trim()?.length > 0;  

  const handleSort = (column: string) => {
    if (sortColumn !== column) {
      // New field - start with ascending
      setSortColumn(column);
      setSortDirection('asc');
    } else {
      if (sortDirection === 'asc') {
        // Switch to descending
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        // Remove sorting
        setSortColumn(null);
        setSortDirection(null);
      }
    }
  };

  // Combined URL update effect
  useEffect(() => {
    const params = new URLSearchParams();
    
    // Preserve iframe parameter if it exists
    if (isSimulasi) {
      params.set('kategori', searchParams.get('kategori') ?? '');
    }
    
    if (debouncedSearchQuery) {
      params.set('q', debouncedSearchQuery);
      params.set('page', '1');
    } else if (page > 1) {
      params.set('page', page.toString());
    }
    
    if (debouncedMinPrice) {
      params.set('minPrice', debouncedMinPrice.toString());
      params.set('page', '1');
    }
    if (debouncedMaxPrice) {
      params.set('maxPrice', debouncedMaxPrice.toString());
      params.set('page', '1');
    }
    
    if (perPage !== 20) {
      params.set('perPage', perPage.toString());
    }

    if (sortColumn) {
      params.set('sort', sortColumn);

      if (sortDirection) {
        params.set('direction', sortDirection);
      }
    }
    
    // Use the current pathname to maintain the route
    const pathname = window.location.pathname;
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearchQuery, debouncedMinPrice, debouncedMaxPrice, page, perPage, router, isSimulasi, sortColumn, sortDirection]);

  // Handle browser navigation (back/forward)
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const newSearch = params.get('q') ?? '';
      const newMinPrice = params.get('minPrice') ? Number(params.get('minPrice')) : undefined;
      const newMaxPrice = params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined;
      const newSortColumn = params.get('sortBy') ?? '';
      const newSortDirection = (params.get('sortDir') as 'asc' | 'desc') ?? 'asc';

      if (newSearch !== searchQuery) setSearchQuery(newSearch);
      if (newMinPrice !== minPrice) setMinPrice(newMinPrice);
      if (newMaxPrice !== maxPrice) setMaxPrice(newMaxPrice);
      if (newSortColumn !== sortColumn) setSortColumn(newSortColumn);
      if (newSortDirection !== sortDirection) setSortDirection(newSortDirection);
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [searchQuery, minPrice, maxPrice, sortColumn, sortDirection]);

  // Pagination state
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(page, totalPages); // Ensure page doesn't exceed tota
  const rowsPerPageOptions = [10, 20, 30, 40, 50];

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(window.location.search);
    
    // Preserve iframe parameter
    if (isSimulasi) {
      params.set('kategori', searchParams.get('kategori') ?? '');
    }
    
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };


  // Handle rows per page change
  const handleRowsPerPageChange = (value: string) => {
    const newPerPage = Number(value);
    const params = new URLSearchParams(window.location.search);
    
    // Preserve iframe parameter
    if (isSimulasi) {
      params.set('kategori', searchParams.get('kategori') ?? '');
    }
    
    params.set('perPage', newPerPage.toString());
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(window.location.search);
    
    // Preserve iframe parameter
    if (isSimulasi) {
      params.set('kategori', searchParams.get('kategori') ?? '');
    }
    
    if (minPrice) params.set('minPrice', minPrice.toString());
    if (maxPrice) params.set('maxPrice', maxPrice.toString());
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };
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
        router.replace('/simulasi')
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
  );

  const mobileSidebarButton = (
    <Button 
      variant="outline" 
      className="mb-4 w-full tablet:hidden" 
      onClick={() => setHideSidebar(!hideSidebar)}
    >
      {hideSidebar ? "Filter" : "Kembali"}
    </Button>
  );

  const isMobile = useMobile()

  return (
    <div className={cn(className, `modal-style container ${isSimulasi ? '' : 'mt-20'} mx-auto px-4 py-6 md:py-8`)}>
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
                      value={minPrice ?? ''}
                      onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
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
                      value={maxPrice ?? ''}
                      onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
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
              onClick={handleApplyFilters}
            >
              Terapkan Filter
            </Button>
          </CatalogueSidebar>
        </aside>
        
        {/* Main Content */}
        <main className={`flex-1 ${hideSidebar ? "block" : "hidden"} tablet:block`}>
          <div className="mb-6 flex flex-col tablet:flex-row tablet:items-center tablet:justify-between">
            {desktopSidebarButton}
            <Header 
              category={componentCategoryEnum} 
              itemCount={total.toString()} 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
          
          <div>
            {isMobile && (
              <MobileTable
                data={componentDetails}
                headers={categoryEnumToHeader[componentCategoryEnum]}
                kategori={kategori}
                isIframe={noTopH}
                onAddComponent={handleAddComponent}
                onSort={handleSort}
              />
            )}
            <DesktopTable
              data={componentDetails}
              headers={categoryEnumToHeader[componentCategoryEnum]}
              kategori={kategori}
              isIframe={noTopH}
              onAddComponent={handleAddComponent}
              onSort={handleSort}
            />
            {/* Pagination Controls */}
            <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between mt-4 gap-2">
              <div className="flex items-center gap-2">
                <span>Per page</span>
                <Select value={perPage.toString()} onValueChange={handleRowsPerPageChange}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {rowsPerPageOptions.map((option) => (
                      <SelectItem key={option} value={option.toString()}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span>Page {page} of {totalPages}</span>
                <Button variant="outline" size="icon" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                  &#171;
                </Button>
                <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  &#60;
                </Button>
                <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  &#62;
                </Button>
                <Button variant="outline" size="icon" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                  &#187;
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
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
  searchQuery,
  onSearchChange,
}: {
  category: ComponentCategoryEnum;
  itemCount: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}) => (
  <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between w-full">
    <div className="flex-1">
      <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
        Pilih {categoryEnumToTitle[category]}
      </h1>
      <p className="mt-2 text-base font-medium text-gray-600 dark:text-gray-300 sm:text-lg">
        Tersedia <span className="font-semibold">{itemCount}</span> produk siap kamu pilih
      </p>
    </div>

    {/* Search Input */}
    <div className="mt-4 tablet:mt-0 tablet:ml-4 w-full tablet:w-auto">
      <input
        type="text"
        placeholder="Cari produk..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full tablet:w-64 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      />
    </div>
  </div>
);

type TableType = {
  data: ComponentDetail[] | undefined;
  headers: string[];
  kategori: string;
  isIframe: boolean;
  onAddComponent: (component: ComponentDetail) => Promise<void>;
  onSuccess?: () => void;
  onSort?: (column: string) => void;
};

const SortIndicator = ({ direction }: { direction: 'asc' | 'desc' | null }) => {
    return (
      <span className="ml-1 inline-flex flex-col items-center">
        <span className={`h-2 ${direction === 'asc' ? 'text-primary' : 'text-gray-300'}`}><ArrowUp className="ml-2 h-3 w-3" /></span>
        <span className={`h-2 ${direction === 'desc' ? 'text-primary' : 'text-gray-300'}`}><ArrowDown className="ml-2 h-3 w-3" /></span>
      </span>
    );
  };

const DesktopTable = ({
  data,
  headers = [],
  kategori,
  isIframe,
  onAddComponent,
  onSort
}: TableType) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortField = searchParams.get('sort');
  const sortDirection = searchParams.get('direction') as 'asc' | 'desc' | null;
  const headerKeys = categoryEnumToKey[categorySlugToEnum[kategori]! ] ?? [];

  // Define which fields correspond to which header columns
  const headerFields = ['', 'product_name', ...headerKeys, 'lowest_price', ''];

  // const getSortIcon = (column: string) => {
  //   if (sortColumn !== column) return <ArrowUpDown className="ml-2 h-4 w-4" />;
  //   return sortDirection === 'asc' ? 
  //     <ArrowUp className="ml-2 h-4 w-4" /> : 
  //     <ArrowDown className="ml-2 h-4 w-4" />;
  // };

  return (
    <div className="hidden w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 tablet:block">
      <table className="w-full">
        <thead className="sticky self-start top-0 z-10 bg-gray-50 dark:bg-gray-800">
          <tr>
            {['', 'Nama Produk', ...headers, 'Harga (Rp)', ''].map((item, index) => {
              const field = headerFields[index];
              const isSortable = field && field !== '';
              const isActive = sortField === field;
              
              return (
                <th 
                  key={index} 
                  className={cn(
                    "px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400",
                    isSortable && "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                  onClick={() => isSortable && onSort && onSort(field)}
                >
                  <div className="flex items-center">
                    {item}
                    {isSortable && (
                      <SortIndicator direction={isActive ? sortDirection : null} />
                    )}
                  </div>
                </th>
              );
            })}
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
                className="group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="py-4 px-3 w-20">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={`/produk/${kategori}/${component.slug}${isIframe ? "?iframe=true" : ""}`}
                          >
                          {component.image_filenames!.length > 0 && (
                            <div className="h-16 w-16 overflow-hidden rounded-md ">
                              <div className="h-full w-full flex items-center justify-center bg-white">
                                <Image
                                  src={componentImage(component)}
                                  alt={`Gambar ${component.product_name}`}
                                  width={64}
                                  height={64}
                                  className="h-full w-full object-contain p-1"
                                />
                              </div>
                            </div>
                          )}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="p-0 border-none shadow-none ml-6">
                        <div className="relative w-64 h-64 rounded-md overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center bg-white">
                            <Image
                              src={componentImage(component)}
                              alt={`Preview ${component.product_name}`}
                              width={256}
                              height={256}
                              className="object-contain p-2"
                            />
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                <td className="py-4 px-3 font-medium" onClick={handleRedirect}>
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
  onAddComponent,
  onSort
}: TableType) => {
  const searchParams = useSearchParams();
  const sortField = searchParams.get('sort');
  const sortDirection = searchParams.get('direction') as 'asc' | 'desc' | null;
  const headerFields = categoryEnumToKey[categorySlugToEnum[kategori]!] ?? [];

  const getSortIndicator = (field: string) => {
    if (sortField !== field) return null;
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  return (
    <div className="space-y-4 tablet:hidden">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 py-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Produk</h2>
          <Select 
            value={sortField ?? ''}
            onValueChange={(value) => {
              if (value === sortField) {
                if (sortDirection === 'asc') {
                  return onSort && onSort(value);
                } else if (sortDirection === 'desc') {
                  return onSort && onSort(value);
                }
              } else {
                return onSort && onSort(value);
              }
            }}
          >
            <SelectTrigger className="w-40">
              <div className="flex items-center">
                <SelectValue placeholder="Urutkan" />
                {sortField && getSortIndicator(sortField)}
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="product_name">
                <div className="flex items-center">
                  Nama {getSortIndicator('product_name')}
                </div>
              </SelectItem>
              {headerFields.map((field, index) => (
                <SelectItem key={field} value={field}>
                  <div className="flex items-center">
                    {headers[index]} {getSortIndicator(field)}
                  </div>
                </SelectItem>
              ))}
              <SelectItem value="lowest_price">
                <div className="flex items-center">
                  Harga {getSortIndicator('lowest_price')}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
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
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 
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