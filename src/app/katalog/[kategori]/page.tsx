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
} from "~/lib/db";

import React from "react";
import { Button } from "~/components/ui/button";
import { SidebarClose, SidebarOpen } from "lucide-react";

const KategoriPage = ({ params }: { params: { kategori: string } }) => {
  const category = categoriesFromString[params.kategori]!;
  const itemCount = "...";
  const [hideSidebar, setHideSidebar] = React.useState(false);

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
      <div
        className={`w-full flex-1 px-3 desktop:p-0 ${
          hideSidebar ? "" : "hidden"
        } tablet:block`}
      >
        <div className="flex flex-col tablet:flex-row">
          {desktopSidebarButton}
          <Header category={category} itemCount={itemCount} />
        </div>
        <div>
          {/* <MobileTable
                    key={`${url.search}`}
                    data={data.filteredData}
                    headers={categoryHeaders[kategori]}
                    kategori={kategori}
                  /> */}
          {/* <DesktopTable
                    key={`${url.search}`}
                    data={data.filteredData}
                    headers={categoryHeaders[kategori]}
                    kategori={kategori}
                  /> */}
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
  kategori: string;
  component: any;
  isMobile: boolean;
  onClick?: () => void;
}) => {
  let keys: any[] = [];
  switch (kategori) {
    // case "headphone":
    // case "keyboard":
    // case "mouse":
    // case "speaker":
    // case "webcam":
    // case "printer":
    // case "monitor":
    // case "os":
    // case "soundcard":
    // case "wirednetwork":
    // case "wirelessnetwork":
    // case "casefan":
    // case "externaldrive":
    case "motherboard":
      keys = motherboardKeys;
      break;
    case "cpu":
      keys = cpuKeys;
      break;
    case "gpu":
      keys = gpuKeys;
      break;
    case "memory":
      keys = memoryKeys;
      break;
    // case "cooler":
    case "psu":
      keys = psuKeys;
      break;
    // case "cable":
    case "storage":
      keys = storageKeys;
      break;
    case "casing":
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
    <span className="text-lg font-semibold">
      Tersedia {itemCount} produk siap kamu pilih
    </span>
  </div>
);
