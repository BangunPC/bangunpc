"use client";

import {
  ComponentCategory,
  ComponentDetail,
  ComponentView,
  casingKeys,
  categoriesFromString,
  categoryHeaders,
  categoryTitlesFromEnum,
  cpuKeys,
  gpuKeys,
  memoryKeys,
  motherboardKeys,
  psuKeys,
  storageKeys,
} from "~/lib/db";

import { SidebarClose, SidebarOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "~/components/ui/button";
import Spinner from "~/components/ui/spinner-loading";
import { getCasing } from "~/lib/component_api/casing";
import { getCpu } from "~/lib/component_api/cpu";
import { getGpu } from "~/lib/component_api/gpu";
import { getMemory } from "~/lib/component_api/memory";
import { getMotherboard } from "~/lib/component_api/motherboard";
import { getPsu } from "~/lib/component_api/psu";
import { getStorage } from "~/lib/component_api/storage";
import {
  ComponentStorage,
  ComponentStorageType,
  SimulationStorage,
} from "~/lib/storage_helper";
import { componentImage } from "~/lib/utils";
import { CatalogueSidebar, SidebarSection } from "./catalogue-sidebar";
import { v4 as uuidv4 } from 'uuid';

const KategoriPage = ({
  params,
}: {
  params: { isCompatibiliyChecked: boolean | null; kategori: string; noTopH: boolean | null; onSuccess?: () => void };
}) => {
  
  const [price, setPrice] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  

  useEffect(() => {
    const refresh = () => {
      const components = ComponentStorage.getComponents();
      setPrice(components.reduce((acc, component) => acc + component.price, 0));
      setTotal(
        components.reduce((acc, component) => acc + component.quantity, 0),
      );
    };
    refresh();
    const interval = setInterval(() => {
      refresh();
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const category = categoriesFromString[params.kategori]!;
  const [hideSidebar, setHideSidebar] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<ComponentDetail[]>();
  const [error, setError] = React.useState<any>();

  // fetch with getMotherboard when starting to load

  useEffect(() => {
    setLoading(true);
    const defaultQuery = {
      query: "",
      min_price: 0,
      max_price: 0,
    };
    
    const motherboard = ComponentStorage.getComponentDetail(ComponentCategory.Motherboard);
    const casing = ComponentStorage.getComponentDetail(ComponentCategory.Casing)
    const cpu = ComponentStorage.getComponentDetail(ComponentCategory.CPU)
    const gpu = ComponentStorage.getComponentDetail(ComponentCategory.GPU);
    const psu = ComponentStorage.getComponentDetail(ComponentCategory.PSU);
    const memories = ComponentStorage.getComponentDetail(ComponentCategory.Memory);
    // const storages = ComponentStorage.getComponentDetail(ComponentCategory.Storage)

    // const storageIds = ComponentStorage.getComponentsByCategory(ComponentCategory.Storage)
    //   ?.map(component => parseInt(component.id, 10))
    //   .filter(id => !isNaN(id));
    
    switch (category) {
      case ComponentCategory.Motherboard:
        // const motherboardCompatibility = params.isCompatibiliyChecked ? { casing, cpu } : {}
        getMotherboard({}, defaultQuery)
          .then((res) => {
            setData(res);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
            setError(err);
          });
        break;
      case ComponentCategory.CPU:
        //TODO: Add memories check
        // const cpuCompatibility = params.isCompatibiliyChecked ? { motherboard, psu, gpu, memories } : {}
        getCpu({}, defaultQuery)
          .then((res) => {
            setData(res);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
            setError(err);
          });
        break;
      case ComponentCategory.GPU:
        getGpu({}, defaultQuery)
          .then((res) => {
            setData(res);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
            setError(err);
          });
        break;
      case ComponentCategory.Memory:
        // const memoryCompatibility = params.isCompatibiliyChecked ? { memories, motherboard } : {}
        getMemory({}, defaultQuery)
          .then((res) => {
            setData(res);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
            setError(err);
          });
        break;
      case ComponentCategory.PSU:
        getPsu({}, defaultQuery)
          .then((res) => {
            setData(res);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
            setError(err);
          });
        break;
      case ComponentCategory.Storage:
        getStorage({}, defaultQuery)
          .then((res) => {
            setData(res);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
            setError(err);
          });
        break;
      case ComponentCategory.Casing:
        getCasing({}, defaultQuery)
          .then((res) => {
            setData(res);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
            setError(err);
          });
        break;
      default:
        break;
    }
  }, []);

  const desktopSidebarButton = (
    <Button
      variant="outline"
      className=" mr-2 mt-[6px] hidden aspect-square h-10 items-center justify-center p-0 tablet:flex desktop:hidden"
      onClick={() => {
        setHideSidebar(!hideSidebar);
      }}
    >
      {hideSidebar ? <SidebarOpen /> : <SidebarClose />}
    </Button>
  );

  const mobileSidebarButton = (
    <div className="px-4">
      <Button
        variant="outline"
        className="block w-full tablet:hidden"
        onClick={() => {
          setHideSidebar(!hideSidebar);
        }}
      >
        {hideSidebar ? "Filter" : "Kembali"}
      </Button>
    </div>
  );

  return (
    <div>
      <div className="py-4">
        {mobileSidebarButton}
        <div className="flex flex-row pt-4 tablet:pt-0">
          <div
            className={`${
              hideSidebar ? "hidden" : "m-auto"
            } tablet:m-0 desktop:block`}
          >
            <CatalogueSidebar
              price={price}
              totalComponents={total}
              isIframe={params.noTopH ?? false}
            >
              <SidebarSection title="Price Range">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">
                    {" "}
                    Min Price
                  </span>
                  <div className="flex flex-row items-center overflow-clip rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 ">
                    <label htmlFor="min-price" className="mx-1">
                      Rp
                    </label>
                    <input
                      id="min-price"
                      className="h-10 w-full"
                      type="number"
                      // value={filters.minPrice}
                      // onInput={(e: React.FormEvent<HTMLInputElement>) => {
                      //   url.searchParams.set("min-price", e.target.value);
                      // }}
                      placeholder="Min Price"
                    />
                  </div>

                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">
                    {" "}
                    Max Price
                  </span>
                  <div className="flex flex-row items-center overflow-clip rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 ">
                    <label htmlFor="max-price" className="mx-1">
                      Rp
                    </label>
                    <input
                      id="min-price"
                      className="h-10 w-full"
                      type="number"
                      // value={filters.maxPrice}
                      // onInput={(e: React.FormEvent<HTMLInputElement>) => {
                      //   const target = e.currentTarget;
                      //   url.searchParams.set("max-price", target.value);
                      // }}
                      placeholder="Max Price"
                    />
                  </div>
                </div>
              </SidebarSection>
              <Button
                variant="default"
                onClick={() => {
                  // updateFilters();
                  // update.value = !update.value;
                  // window.history.pushState({}, "", url);
                  // nav();
                }}
                className="text-white"
              >
                Terapkan Filter
              </Button>
            </CatalogueSidebar>
          </div>
          <div
            className={`w-full flex-1 px-3 desktop:p-0 ${
              hideSidebar ? "" : "hidden"
            } tablet:block`}
          >
            <div className="flex flex-col tablet:flex-row">
              {desktopSidebarButton}
              <Header
                category={category}
                itemCount={(data?.length ?? 0).toString() ?? <Spinner />}
              />
            </div>
            {loading ? (
              <div className="flex h-96 items-center justify-center">
                <Spinner />
              </div>
            ) : error ? (
              <div className="flex h-96 items-center justify-center">
                <span>{JSON.stringify(error)}</span>
              </div>
            ) : (
              <div>
                <MobileTable
                  data={data}
                  headers={categoryHeaders[category]}
                  kategori={params.kategori}
                  isIframe={params.noTopH ?? false}
                  onSuccess={params.onSuccess}
                />
                <DesktopTable
                  // key={`${url.search}`}
                  data={data}
                  headers={categoryHeaders[category]}
                  kategori={params.kategori}
                  isIframe={params.noTopH ?? false}
                  onSuccess={params.onSuccess}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KategoriPage;

const ComponentFallback = ({
  headers,
  kategori,
  component,
  isMobile,
  onClick,
}: {
  headers: string[];
  kategori: ComponentCategory;
  component: any;
  isMobile: boolean;
  onClick?: () => void;
}) => {
  let keys: any[] = [];
  switch (kategori) {
    case ComponentCategory.Motherboard:
      keys = motherboardKeys;
      break;
    case ComponentCategory.CPU:
      keys = cpuKeys;
      break;
    case ComponentCategory.GPU:
      keys = gpuKeys;
      break;
    case ComponentCategory.Memory:
      keys = memoryKeys;
      break;
    // case "cooler":
    case ComponentCategory.PSU:
      keys = psuKeys;
      break;
    // case "cable":
    case ComponentCategory.Storage:
      keys = storageKeys;
      break;
    case ComponentCategory.Casing:
      keys = casingKeys;
      break;
    default:
      break;
  }

  if (isMobile)
    return (
      <>
        {keys.map((key, index) => (
          <div key={key} className="flex flex-col">
            <div className="mb-2 mt-1 text-sm">{headers[index]}</div>
            <div className="font-semibold">{component[key] ?? "-"}</div>
          </div>
        ))}
      </>
    );

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
  category: ComponentCategory;
  itemCount: string;
}) => (
  <div className="flex flex-col">
    <span className="text-5xl font-semibold">
      Pilih {categoryTitlesFromEnum[category]}
    </span>
    <span className="flex items-center gap-2 text-lg font-semibold">
      Tersedia {itemCount} produk siap kamu pilih
    </span>
  </div>
);

type TableType = {
  data: ComponentDetail[]  | undefined;
  headers: string[];
  kategori: string;
  isIframe: boolean;
  onSuccess?: () => void;
};

const DesktopTable = ({
  data,
  headers,
  kategori,
  isIframe,
  onSuccess,
}: TableType) => {
  const header = ["", "Product Name", ...headers, "Price (Rp)", "Action"];

  const router = useRouter();
  
  return (
    <table className="hidden tablet:table">
      <thead
        className={`sticky z-[1] text-xs backdrop-blur top-0`}
      >
        <tr>
          {header.map((item) => (
            <th key={item}>
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
          const handleAddComponent = async () => {
            const componentAdded: ComponentStorageType = {
              storageId: uuidv4(),
              id: component.product_id!.toString(),
              name: component.product_name!,
              price: component.lowest_price!,
              image: componentImage(component),
              category: categoriesFromString[kategori]!,
              quantity: kategori === "memory" ? (component as ComponentView["v_memories"]).amount! : 1,
              slug: component.slug!,
              detail: component
            };
            await ComponentStorage.addComponent(componentAdded);
            const currentSimulation = SimulationStorage.getSimulationData()
            
            // Updating data in the simulation storage
            switch (kategori) {
              case "cpu":
                const cpu = component as ComponentView["v_cpus"]
                SimulationStorage.upsertSimulationData({
                  currentTotalPowerWatt: (currentSimulation?.currentTotalPowerWatt ?? 0) + (cpu.max_power_watt ?? 0)
                })
                break;
              
              case "motherboard":
                const mobo = component as ComponentView["v_motherboards"]
                const maxMemorySizeGb = (currentSimulation?.maxMemorySizeGb ?? 0) < (mobo.max_memory_gb ?? 0)  ? 
                  (mobo.max_memory_gb ?? 0) : (currentSimulation?.maxMemorySizeGb ?? 0)
                SimulationStorage.upsertSimulationData({
                  availableMemorySlot: mobo.memory_slot ?? 0,
                  maxMemorySizeGb: maxMemorySizeGb
                })
                break;

              case "gpu":
                const gpu = component as ComponentView["v_gpus"]
                SimulationStorage.upsertSimulationData({
                  currentTotalPowerWatt: (currentSimulation?.currentTotalPowerWatt ?? 0) + (gpu.tdp_watt ?? 0)
                })
                break;

              case "memory":
                const memory = component as ComponentView["v_memories"]
                const memoryAmount = memory.amount ?? 0
                const capacityGb = memory.capacity_gb ?? 0

                SimulationStorage.upsertSimulationData({
                  selectedMemoryAmount: currentSimulation?.selectedMemoryAmount ?? 0 + memoryAmount,
                  selectedMemorySizeGb:  currentSimulation?.selectedMemorySizeGb ?? 0 + (memoryAmount * capacityGb)
                })
                break;

              case "storage":
                SimulationStorage.upsertSimulationData({
                  selectedNvmeAmount: (currentSimulation?.selectedNvmeAmount ?? 0) + 1
                })
                break;
            
              default:
                break;
            }
            onSuccess?.();
            alert(
              "Komponen " + component.product_name + " berhasil ditambahkan. ",
            );
          };

          const handleRedirect = () =>
            router.push(
              `/katalog/${kategori}/${component.slug}${isIframe ? "?iframe=true" : ""}`,
            );
          return (
            <>
              <tr
                data-href={`/katalog/${kategori}/${component.slug}${isIframe ? "?iframe=true" : ""}`}
                key={component.product_id}
                className="h-[56px] cursor-pointer transition-transform hover:z-10 hover:scale-[1.01]"
              >
                <td className="w-16">
                  <Link
                    href={`/katalog/${kategori}/${component.slug}${isIframe ? "?iframe=true" : ""}`}
                  >
                    {component.image_filenames!.length> 0 && (
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
                  kategori={categoriesFromString[kategori]!}
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
                    onClick={handleAddComponent}
                    className="text-white"
                  >
                    Tambah
                  </Button>
                </td>
              </tr>
              <tr key={component.product_id + "gap"} className="h-2"></tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};

const MobileTable = ({ data, headers, kategori, onSuccess }: TableType) => {
  return (
    <div className="flex flex-col gap-1 transition-all duration-200 tablet:hidden">
      {data?.map((component) => {
        const handleAddComponent = () => {
          const componentAdded: ComponentStorageType = {
            storageId: uuidv4(),
            id: component.product_id!.toString(),
            name: component.product_name!,
            price: component.lowest_price!,
            image: componentImage(component),
            category: categoriesFromString[kategori]!,
            quantity: 1,
            slug: component.slug!,
            detail: component
          };

          ComponentStorage.addComponent(componentAdded);
          const currentSimulation = SimulationStorage.getSimulationData()
          
          // Updating data in the simulation storage
          console.log(kategori);
          
          switch (kategori) {
            case "cpu":
              const cpu = component as ComponentView["v_cpus"]
              SimulationStorage.upsertSimulationData({
                currentTotalPowerWatt: (currentSimulation?.currentTotalPowerWatt ?? 0) + (cpu.max_power_watt ?? 0)
              })
              break;

            case "gpu":
              const gpu = component as ComponentView["v_gpus"]
              SimulationStorage.upsertSimulationData({
                currentTotalPowerWatt: (currentSimulation?.currentTotalPowerWatt ?? 0) + (gpu.tdp_watt ?? 0)
              })
              break;

            case "memory":
              const memory = component as ComponentView["v_memories"]
              const memoryAmount = memory.amount ?? 0
              const capacityGb = memory.capacity_gb ?? 0

              SimulationStorage.upsertSimulationData({
                selectedMemoryAmount: currentSimulation?.selectedMemoryAmount ?? 0 + memoryAmount,
                selectedMemorySizeGb:  currentSimulation?.selectedMemorySizeGb ?? 0 + (memoryAmount * capacityGb)
              })
              break;

            case "storage":
              SimulationStorage.upsertSimulationData({
                selectedNvmeAmount: (currentSimulation?.selectedNvmeAmount ?? 0) + 1
              })
              break;
          
            default:
              break;
          }

          alert(
            "Komponen " + component.product_name + " berhasil ditambahkan. ",
          );
          onSuccess?.();
        };
        return (
          <div
            key={component.product_id}
            className="dark:texthover:bg-zinc-700 rounded-xl border bg-white p-2 shadow-lg transition-all hover:border-zinc-300 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-700"
          >
            <Link
              href={`/katalog/${kategori}/${component.slug}`}
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
                    Rp{" "}
                    {(component.lowest_price as number | null)?.toLocaleString(
                      "id-ID",
                    ) ?? "-"}
                  </span>
                </div>
              </div>
              <div>
                <Button className="text-white" onClick={handleAddComponent}>
                  Tambah
                </Button>
              </div>
            </Link>
            <div className="grid grid-cols-3 gap-1 sm:grid-cols-4">
              <ComponentFallback
                headers={headers}
                kategori={categoriesFromString[kategori]!}
                component={component}
                isMobile={true}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
