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
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn, componentImage } from "@/lib/utils";
import { insertOrCreateSession } from "@/lib/build-session";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useDebounce } from "@/hooks/use-debounce";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {  ArrowUp, ArrowDown } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import Switch from "@/components/ui/switch";

export function KategoriClient({
  className,
  componentDetails,
  kategori,
  noTopH,
  errorMessage,
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
  errorMessage?: string
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

// State initialization with URL params
const [hideSidebar, setHideSidebar] = useState(false);
const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
const [minPrice, setMinPrice] = useState<number | undefined>(
  searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined
);
const [maxPrice, setMaxPrice] = useState<number | undefined>(
  searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined
);
const [sortColumn, setSortColumn] = useState<string | null>(searchParams.get('sort') ?? null);
const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
  searchParams.get('direction') as 'asc' | 'desc' | null ?? null
);

// Debounced values for search and filters
const debouncedSearchQuery = useDebounce(searchQuery, 500);
const debouncedMinPrice = useDebounce(minPrice, 500);
const debouncedMaxPrice = useDebounce(maxPrice, 500);

const isSimulasi = (searchParams.get('kategori') ?? '')?.trim()?.length > 0;

// Compatibility filter
const [isCompatibilityChecked, setIsCompatibilityChecked] = useState(
  searchParams.get("c") !== "0"
);

// Pagination
const totalPages = Math.max(1, Math.ceil(total / perPage));
const currentPage = Math.min(page, totalPages);
const rowsPerPageOptions = [10, 20, 30, 40, 50];

/**
 * Updates the URL with current state values
 */
const updateURLParams = useCallback(() => {
  const params = new URLSearchParams(window.location.search);
  
  // Search query
  if (debouncedSearchQuery) {
    params.set('q', debouncedSearchQuery);
  } else {
    params.delete('q');
  }

  // Price filters
  if (debouncedMinPrice !== undefined) {
    params.set('minPrice', debouncedMinPrice.toString());
  } else {
    params.delete('minPrice');
  }

  if (debouncedMaxPrice !== undefined) {
    params.set('maxPrice', debouncedMaxPrice.toString());
  } else {
    params.delete('maxPrice');
  }

  // Pagination
  if (page > 1) {
    params.set('page', page.toString());
  }
  if (perPage !== 20) {
    params.set('perPage', perPage.toString());
  }

  // Sorting
  if (sortColumn) {
    params.set('sort', sortColumn);
    if (sortDirection) {
      params.set('direction', sortDirection);
    }
  }

  // Compatibility
  params.set('c', isCompatibilityChecked ? '1' : '0');

  // Reset to first page when filters change (except pagination)
  if (debouncedSearchQuery || debouncedMinPrice !== undefined || debouncedMaxPrice !== undefined) {
    params.set('page', '1');
  }

  // Prevent page number exceeding total pages
  if (page > totalPages) {
    params.set('page', '1');
  }

  router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
}, [
  debouncedSearchQuery,
  debouncedMinPrice,
  debouncedMaxPrice,
  page,
  perPage,
  isCompatibilityChecked,
  sortColumn,
  sortDirection,
  isSimulasi,
  router,
  searchParams,
  totalPages
]);

// Update URL when state changes
useEffect(() => {
  updateURLParams();
}, [updateURLParams]);

/**
 * Handles browser navigation (back/forward)
 */
useEffect(() => {
  const handleUrlChange = () => {
    const params = new URLSearchParams(window.location.search);
    
    setSearchQuery(params.get('q') ?? '');
    setMinPrice(params.get('minPrice') ? Number(params.get('minPrice')) : undefined);
    setMaxPrice(params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined);
    setSortColumn(params.get('sort') ?? null);
    setSortDirection((params.get('direction') as 'asc' | 'desc' | null) ?? null);
    setIsCompatibilityChecked(params.get('c') !== '0');
  };

  window.addEventListener('popstate', handleUrlChange);
  return () => window.removeEventListener('popstate', handleUrlChange);
}, []);

const handleCompatibilityToggle = useCallback(() => {
  setIsCompatibilityChecked(prev => !prev);
}, []);

const handleSort = useCallback((column: string) => {
  setSortColumn(prevColumn => {
    if (prevColumn !== column) {
      // New field - start with ascending
      setSortDirection('asc');
      return column;
    } else {
      // Toggle direction or remove sorting
      setSortDirection(prevDirection => {
        if (prevDirection === 'asc') return 'desc';
        if (prevDirection === 'desc') return null;
        return 'asc';
      });
      return prevColumn;
    }
  });
}, []);

const handlePageChange = useCallback((newPage: number) => {
  if (newPage < 1 || newPage > totalPages) return;
  router.push(`?${new URLSearchParams({
    ...Object.fromEntries(searchParams.entries()),
    page: newPage.toString()
  }).toString()}`);
}, [router, searchParams, totalPages]);

const handleRowsPerPageChange = useCallback((value: string) => {
  const newPerPage = Number(value);
  const params = new URLSearchParams(searchParams.toString());
  
  params.set('perPage', newPerPage.toString());
  params.set('page', '1');
  router.push(`?${params.toString()}`);
}, [router, searchParams]);

const handleAddComponent = useCallback(async (product_id: number | null) => {
  if (!product_id) return;

  try {
    const error = await insertOrCreateSession(componentCategoryEnum, product_id);
    
    if (!error) {
      router.replace('/simulasi');
      toast.success(`Berhasil menambahkan ${kategori} baru ke simulasi`, {
        icon: "✅",
        position: "top-right",
        duration: 4000,
      });
    }
  } catch (error) {
    toast.error("Gagal menambahkan komponen");
  }
}, [componentCategoryEnum, kategori, router]);

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
      {/* {mobileSidebarButton} */}
      
      <div className="flex flex-col tablet:flex-row tablet:gap-8">
        {/* Sidebar */}
        {/* <aside className={`${hideSidebar ? "hidden" : "block"} w-full tablet:max-w-xs desktop:block`}>
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
        </aside> */}
        
        {/* Main Content */}
        <main className={`flex-1 block tablet:block`}>
          <div className="mb-6 flex flex-col tablet:flex-row tablet:items-center tablet:justify-between">
            {desktopSidebarButton}
            <Header 
              category={componentCategoryEnum} 
              itemCount={total.toString()} 
              errorMessage={errorMessage}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              isCompatibilityChecked={isCompatibilityChecked}
              setIsCompatibilityChecked={handleCompatibilityToggle}
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
            <div className="font-medium">{component[key] ?? "N/A"}</div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {keys.map((key) => (
        <td key={key} onClick={onClick} className={`py-4 px-3 ${component[key] ? '' : 'text-slate-500'}`}>
          {component[key] ?? "N/A"}
        </td>
      ))}
    </>
  );
};

const Header = ({
  category,
  itemCount,
  searchQuery,
  errorMessage,
  onSearchChange,
  isCompatibilityChecked = true,
  setIsCompatibilityChecked,
}: {
  category: ComponentCategoryEnum;
  itemCount: string;
  searchQuery: string;
  errorMessage?: string;
  onSearchChange: (query: string) => void;
  isCompatibilityChecked?: boolean;
  setIsCompatibilityChecked: (checked: boolean) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
  <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between w-full">
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
          Pilih {categoryEnumToTitle[category]}
        </h1>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-300 sm:text-lg">
          Tersedia <span className="font-semibold">{itemCount}</span> komponen yang bisa Anda pilih
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Switch
          checked={isCompatibilityChecked}
          onCheckedChange={
            (checked) => {
              setIsCompatibilityChecked(checked)
            }}
          id="compatibility-check-toggle"
        />
        <label htmlFor="compatibility-check-toggle" className="text-base font-medium cursor-pointer select-none">
          Cek Kompatibilitas
        </label>
        <span className="text-xs text-zinc-500 ml-2">
          {isCompatibilityChecked ? "Hanya tampilkan komponen yang kompatibel" : "Tampilkan semua komponen"}
        </span>
      </div>
      { (isCompatibilityChecked && errorMessage) && (
        <div className="text-base text-red-500">
          <span className="font-semibold">Peringatan: </span> 
          <span>{errorMessage}, cek di halaman </span>
          <Link href="/simulasi" className="text-red-500 underline">
              simulasi
          </Link>
        </div>
      )}
    </div>
    {/* Search Input */}
    <div className="mt-4 tablet:mt-0 tablet:ml-4 w-full tablet:w-auto">
      <input
        type="text"
        placeholder="Cari produk..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full tablet:w-64 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-gray-600 dark:text-white bg-navbar dark:focus:ring-sky-500"
      />
    </div>
  </div>
  );
};

export default Header;

type TableType = {
  data: ComponentDetail[] | undefined;
  headers: string[];
  kategori: string;
  isIframe: boolean;
  onAddComponent: (product_id: number| null) => Promise<void>;
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

  return (
    <div className="hidden w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 tablet:block">
      <table className="w-full">
        <thead className="sticky self-start top-0 z-10 bg-gray-50 dark:bg-gray-800">
          <tr>
            {['', 'Nama Komponen', ...headers, 'Harga (Rp)', ''].map((item, index) => {
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
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-navbar">
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
                            <div 
                              className="h-16 w-16 overflow-hidden rounded-md bg-no-repeat bg-center bg-contain bg-white"
                              style={{
                                backgroundImage: `url(${componentImage(component)})`,
                                pointerEvents: 'none'
                              }}
                            />
                          )}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="p-0 border-none shadow-none ml-6">
                        <div 
                        className="relative w-64 h-64 rounded-md overflow-hidden"
                        onContextMenu={(e) => e.preventDefault()}>
                          <div className="absolute inset-0 flex items-center justify-center bg-white">
                            <div
                              className="w-full h-full bg-no-repeat bg-center bg-contain bg-white"
                              style={{
                                backgroundImage: `url(${componentImage(component)})`,
                                pointerEvents: 'none'
                              }}
                            />
                            <div className="absolute inset-0 z-10" style={{ pointerEvents: 'none' }}></div>
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
                      await onAddComponent(component.product_id);
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
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-white">
                  <div 
                    className="w-full h-full bg-no-repeat bg-center bg-contain"
                    style={{
                      backgroundImage: `url(${componentImage(component)})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
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
                    onAddComponent(component.product_id);
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