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
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn, componentImage } from "@/lib/utils";
import { CatalogueSidebar, SidebarSection } from "./catalogue-sidebar";
import { createBuildSession, getBuildSessionId, insertBuildSessionComponent } from "@/lib/build-session";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useDebounce } from "@/hooks/use-debounce";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function KategoriClient({
  className,
  componentDetails,
  kategori,
  noTopH,
  page = 1,
  perPage = 20,
}: {
  className?: string
  componentDetails: ComponentDetail[]
  kategori: string
  noTopH: boolean
  page?: number
  perPage?: number
}) {
  const componentCategoryEnum = categorySlugToEnum[kategori]!;
  const [hideSidebar, setHideSidebar] = useState(false);
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 300ms delay

  // Filter components based on debounced search query
  const filteredComponents = componentDetails.filter((component) =>
    component.product_name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(page);
  const [rowsPerPage, setRowsPerPage] = useState(perPage);
  const rowsPerPageOptions = [10, 20, 30, 40, 50];

  // Calculate paginated data
  const totalRows = filteredComponents.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedComponents = filteredComponents.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page
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

  // Filter state
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Dynamic filter state
  const filterKeys = categoryEnumToKey[componentCategoryEnum].filter(
    (key) => key !== "product_name" && key !== "lowest_price"
  );
  const filterHeaders = categoryEnumToHeader[componentCategoryEnum].filter(
    (header) => header !== "Nama Produk" && header !== "Harga (Rp)"
  );
  const [filters, setFilters] = useState<{ [key: string]: any }>({});
  const [distinctOptions, setDistinctOptions] = useState<{ [key: string]: any }>({});
  const [showMore, setShowMore] = useState<{ [key: string]: boolean }>({});

  // Fetch distinct values for each filter key
  useEffect(() => {
    async function fetchDistincts() {
      const opts: { [key: string]: any } = {};
      for (const key of filterKeys) {
        // Dynamically import the correct DAL function based on category
        let fn;
        if (componentCategoryEnum === ComponentCategoryEnum.Motherboard) {
          fn = (await import("@/lib/dal/component/motherboard")).getMotherboardDistinctValues;
        } // TODO: Add other categories here
        if (fn) {
          opts[key] = await fn(key);
        }
      }
      setDistinctOptions(opts);
    }
    fetchDistincts();
  }, [componentCategoryEnum]);

  // Checkbox handler for text filters
  const handleCheckboxChange = (key: string, value: string) => {
    setFilters((prev) => {
      const arr = prev[key] || [];
      if (arr.includes(value)) {
        return { ...prev, [key]: arr.filter((v: string) => v !== value) };
      } else {
        return { ...prev, [key]: [...arr, value] };
      }
    });
  };

  // Slider handler for number filters
  const handleSliderChange = (key: string, value: [number, number]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // On apply filter, update URL with all filters
  const handleApplyFilter = () => {
    const params = new URLSearchParams();
    if (minPrice) params.set("min_price", minPrice);
    if (maxPrice) params.set("max_price", maxPrice);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    // Keep pagination and perPage
    params.set("page", currentPage.toString());
    params.set("perPage", rowsPerPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={cn(className, "modal-style container mt-20 mx-auto px-4 py-6 md:py-8")}>
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
                      value={minPrice}
                      onChange={e => setMinPrice(e.target.value)}
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
                      type="text"
                      placeholder="Max Price"
                      value={maxPrice ? new Intl.NumberFormat('id-ID').format(Number(maxPrice.replace(/[^0-9]/g, ''))) : ''}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^0-9]/g, '');
                        setMaxPrice(rawValue === '' ? '' : rawValue);
                      }}
                      onBlur={(e) => {
                        if (maxPrice !== '' && Number(maxPrice) < 0) {
                          setMaxPrice('0');
                        }
                      }}
                      onKeyDown={(e) => {
                        // Prevent invalid characters
                        if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {
                          e.preventDefault();
                        }
                        
                        // Handle Enter key press
                        if (e.key === 'Enter' && maxPrice.trim() !== '') {
                          e.preventDefault();
                          // Process the entered value here
                          const numericValue = Number(maxPrice);
                          
                          // Example action: Validate and submit
                          if (numericValue >= 0) {
                            // Do something with the value (e.g., submit, filter, etc.)
                            // handlePriceSubmit(numericValue);
                            console.log(numericValue);
                            
                          } 
                        }
                      }}
                    />
                  </div>
                </div>

                {/* <div>
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
                      type="text"
                      placeholder="Max Price"
                      value={maxPrice ? new Intl.NumberFormat('id-ID').format(Number(maxPrice)) : ''}
                      onChange={e => {
                        // Remove all non-digit characters
                        const rawValue = e.target.value.replace(/[^0-9]/g, '');
                        setMaxPrice(rawValue);
                      }}
                      onBlur={e => {
                        // Ensure the value is at least 0 when field loses focus
                        if (maxPrice !== '' && parseInt(maxPrice, 10) < 0) {
                          setMaxPrice("0");
                        }
                      }}
                      min="0"
                    />
                  </div>
                </div> */}
              </div>
            </SidebarSection>
            {/* Dynamic filters */}
            <SidebarSection title="Filter Lainnya">
              <div className="flex flex-col space-y-3">
                {filterKeys.map((key, idx) => {
                  const options = distinctOptions[key];
                  // Numeric slider
                  if (options && typeof options === "object" && options.min !== undefined && options.max !== undefined) {
                    const min = options.min;
                    const max = options.max;
                    const value = filters[key] || [min, max];
                    return (
                      <div key={key}>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {filterHeaders[idx]}
                        </label>
                        {/* Replace with your slider component if available */}
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min={min}
                            max={max}
                            value={value[0]}
                            onChange={e => handleSliderChange(key, [Number(e.target.value), value[1]])}
                            className="w-1/2"
                          />
                          <input
                            type="range"
                            min={min}
                            max={max}
                            value={value[1]}
                            onChange={e => handleSliderChange(key, [value[0], Number(e.target.value)])}
                            className="w-1/2"
                          />
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>{value[0]}</span>
                          <span>{value[1]}</span>
                        </div>
                      </div>
                    );
                  }
                  // Checkbox for text
                  if (Array.isArray(options)) {
                    const showAll = showMore[key];
                    const displayOptions = showAll ? options : options.slice(0, 5);
                    return (
                      <div key={key}>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {filterHeaders[idx]}
                        </label>
                        <div className="flex flex-col gap-1">
                          {displayOptions.map((val: string) => (
                            <label key={val} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={filters[key]?.includes(val) || false}
                                onChange={() => handleCheckboxChange(key, val)}
                              />
                              <span>{val}</span>
                            </label>
                          ))}
                          {options.length > 5 && (
                            <button
                              type="button"
                              className="text-xs text-blue-500 mt-1"
                              onClick={() => setShowMore((prev) => ({ ...prev, [key]: !showAll }))}
                            >
                              {showAll ? "Show Less" : "Show More"}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </SidebarSection>
            {/* <Button
              variant="default"
              className="mt-4 w-full text-white"
              onClick={handleApplyFilter}
            >
              Terapkan Filter
            </Button> */}
          </CatalogueSidebar>
        </aside>
        
        {/* Main Content */}
        <main className={`flex-1 ${hideSidebar ? "block" : "hidden"} tablet:block`}>
          <div className="mb-6 flex flex-col tablet:flex-row tablet:items-center tablet:justify-between">
            {desktopSidebarButton}
            <Header 
              category={componentCategoryEnum} 
              itemCount={filteredComponents.length.toString()} 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
          
          <div>
            <MobileTable
              data={paginatedComponents}
              headers={categoryEnumToHeader[componentCategoryEnum]}
              kategori={kategori}
              isIframe={noTopH}
              onAddComponent={handleAddComponent}
            />
            <DesktopTable
              data={paginatedComponents}
              headers={categoryEnumToHeader[componentCategoryEnum]}
              kategori={kategori}
              isIframe={noTopH}
              onAddComponent={handleAddComponent}
            />
            {/* Pagination Controls */}
            <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between mt-4 gap-2">
              <div className="flex items-center gap-2">
                <span>Per page</span>
                <Select value={rowsPerPage.toString()} onValueChange={handleRowsPerPageChange}>
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
                <span>Page {currentPage} of {totalPages}</span>
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
        <thead className="sticky self-start top-0 z-10 bg-gray-50 dark:bg-gray-800">
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
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 py-2">
        <h2 className="text-lg font-bold">Produk</h2>
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