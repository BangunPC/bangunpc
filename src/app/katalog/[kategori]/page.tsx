"use client";

import {
  categoriesFromString,
  categoryTitlesFromEnum,
  motherboardKeys,
  cpuKeys,
  casingKeys,
  gpuKeys,
  memoryKeys,
  psuKeys,
  storageKeys,
  ComponentCategory,
  categoryHeaders,
} from "~/lib/db";

import React, { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { SidebarClose, SidebarOpen } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { componentImage } from "~/lib/utils";
import Link from "next/link";
import { getMotherboard } from "~/lib/component_api/motherboard";
import Spinner from "~/components/ui/spinner-loading";
import { getCpu } from "~/lib/component_api/cpu";
import { getGpu } from "~/lib/component_api/gpu";
import { getMemory } from "~/lib/component_api/memory";
import { getPsu } from "~/lib/component_api/psu";
import { getStorage } from "~/lib/component_api/storage";
import { getCasing } from "~/lib/component_api/casing";

const KategoriPage = ({ params }: { params: { kategori: string } }) => {
  const category = categoriesFromString[params.kategori]!;
  const [hideSidebar, setHideSidebar] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any>();
  const [error, setError] = React.useState<any>();

  // fetch with getMotherboard when starting to load

  useEffect(() => {
    setLoading(true);
    const defaultQuery = {
      query: "",
      min_price: 0,
      max_price: 0,
    };
    switch (category) {
      case ComponentCategory.Motherboard:
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
              hideSidebar ? "hidden" : ""
            } desktop:m-0 desktop:block`}
          >
            {/* <Slot /> */}
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
                itemCount={data?.count ?? <Spinner />}
              />
            </div>
            {loading ? (
              <div className="flex h-96 items-center justify-center">
                <Spinner />
              </div>
            ) : error ? (
              <div className="flex h-96 items-center justify-center">
                <span>{error}</span>
              </div>
            ) : (
              <div>
                {/* <MobileTable
                key={`${url.search}`}
                data={data.filteredData}
                headers={categoryHeaders[kategori]}
                kategori={kategori}
              /> */}
                <DesktopTable
                  // key={`${url.search}`}
                  data={data.filteredData}
                  headers={categoryHeaders[category]}
                  kategori={params.kategori}
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
  data: any[] | undefined;
  headers: string[];
  kategori: string;
};

const DesktopTable = ({ data, headers, kategori }: TableType) => {
  const header = ["", "Product Name", ...headers, "Price (Rp)", "Action"];

  const router = useRouter();

  const isIframe = useSearchParams().get("isIframe") === "true";
  return (
    <table className="hidden tablet:table">
      <thead
        className={`sticky z-[1] text-xs backdrop-blur 
          ${isIframe ? "top-0" : "top-navbar-min-h"}
        `}
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
        {data?.map((component: any) => {
          const handleAddComponent = () => {
            // const componentAdded: ComponentStorageType = {
            //   id: component.product_id,
            //   name: component.product_name,
            //   price: component.lowest_price,
            //   image: componentImage(component),
            //   category: categoriesFromString[kategori],
            //   quantity: 1,
            //   slug: component.slug,
            // };
            // ComponentStorage.addComponent(componentAdded);
            // alert(
            //   "Komponen " + component.product_name + " berhasil ditambahkan. ",
            // );
            // // back
            // if (isIframe) {
            //   window.history.back();
            // }
          };

          const handleRedirect = () =>
            router.push(
              `/detail/${kategori}/${component.slug}/${component.product_id}${
                isIframe ? "?iframe=true" : ""
              }`,
            );
          return (
            <>
              <tr
                data-href={`/detail/${kategori}/${component.slug}`}
                key={component.product_id}
                className="h-[56px] cursor-pointer transition-transform hover:z-10 hover:scale-[1.01]"
              >
                <td className="w-16">
                  <Link
                    href={`/detail/${kategori}/${component.slug}/${
                      component.product_id
                    }${isIframe ? "?iframe=true" : ""}`}
                  >
                    {component.image_filenames.length > 0 && (
                      <img
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
                    className="text-foreground"
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
