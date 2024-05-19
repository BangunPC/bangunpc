"use client";

import { DialogContent } from "@radix-ui/react-dialog";
import { ArrowLeft, Banknote, Trash, Undo2, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import KategoriCasing from "~/components/ui/icon/kategori-casing";
import KategoriCpu from "~/components/ui/icon/kategori-cpu";
import KategoriGpu from "~/components/ui/icon/kategori-gpu";
import KategoriInternalStorage from "~/components/ui/icon/kategori-internal-storage";
import KategoriMotherboard from "~/components/ui/icon/kategori-motherboard";
import KategoriPsu from "~/components/ui/icon/kategori-psu";
import KategoriRam from "~/components/ui/icon/kategori-ram";
import { categoriesFromEnum, ComponentCategory } from "~/lib/db";
import { ComponentStorage, ComponentStorageType } from "~/lib/storage_helper";
import KategoriPage from "../katalog/[kategori]/page";
import { ScrollArea } from "~/components/ui/scroll-area";

const headers = [
  "Kategori Komponen",
  "Komponen Dipilih",
  "Harga Satuan",
  "Aksi",
];

export default function HomePage() {
  const [cpu, setComponentCpu] = useState([] as ComponentStorageType[]);
  const [cooler, setComponentCooler] = useState([] as ComponentStorageType[]);
  const [motherboard, setComponentMotherboard] = useState(
    [] as ComponentStorageType[],
  );
  const [memory, setComponentMemory] = useState([] as ComponentStorageType[]);
  const [storage, setComponentStorage] = useState([] as ComponentStorageType[]);
  const [gpu, setComponentGpu] = useState([] as ComponentStorageType[]);
  const [psu, setComponentPsu] = useState([] as ComponentStorageType[]);
  const [casing, setComponentCasing] = useState([] as ComponentStorageType[]);
  const [caseFan, setComponentCaseFan] = useState([] as ComponentStorageType[]);
  const [monitor, setComponentMonitor] = useState([] as ComponentStorageType[]);
  const [os, setComponentOs] = useState([] as ComponentStorageType[]);
  const [soundCard, setComponentSoundCard] = useState(
    [] as ComponentStorageType[],
  );
  const [wiredNetwork, setComponentWiredNetwork] = useState(
    [] as ComponentStorageType[],
  );
  const [wirelessNetwork, setComponentWirelessNetwork] = useState(
    [] as ComponentStorageType[],
  );
  const [cable, setComponentCable] = useState([] as ComponentStorageType[]);
  const [externalDrive, setComponentExternalDrive] = useState(
    [] as ComponentStorageType[],
  );
  const [headphone, setComponentHeadphone] = useState(
    [] as ComponentStorageType[],
  );
  const [keyboard, setComponentKeyboard] = useState(
    [] as ComponentStorageType[],
  );
  const [mouse, setComponentMouse] = useState([] as ComponentStorageType[]);
  const [speaker, setComponentSpeaker] = useState([] as ComponentStorageType[]);
  const [webcam, setComponentWebcam] = useState([] as ComponentStorageType[]);
  const [printer, setComponentPrinter] = useState([] as ComponentStorageType[]);

  const [kategori, setKategori] = useState<ComponentCategory | null>(null);

  const components = [
    {
      kategori: ComponentCategory.Motherboard,
      icon: <KategoriMotherboard width="27" height="27" />,
      title: "Motherboard",
      components: motherboard,
      iframe: `/katalog/motherboard`,
    },
    {
      kategori: ComponentCategory.CPU,
      icon: <KategoriCpu width="27" height="27" />,
      title: "CPU",
      components: cpu,
      iframe: `/katalog/cpu`,
    },
    {
      kategori: ComponentCategory.GPU,
      icon: <KategoriGpu width="27" height="27" />,
      title: "GPU",
      components: gpu,
      iframe: `/katalog/gpu`,
    },
    {
      kategori: ComponentCategory.Memory,
      icon: <KategoriRam width="27" height="27" />,
      title: "Memory",
      components: memory,
      iframe: `/katalog/memory`,
    },
    {
      kategori: ComponentCategory.PSU,
      icon: <KategoriPsu width="27" height="27" />,
      title: "Power Supply",
      components: psu,
      iframe: `/katalog/psu`,
    },
    {
      kategori: ComponentCategory.Storage,
      icon: <KategoriInternalStorage width="27" height="27" />,
      title: "Storage",
      components: storage,
      iframe: `/katalog/storage`,
    },
    {
      kategori: ComponentCategory.Casing,
      icon: <KategoriCasing width="27" height="27" />,
      title: "PC Case",
      components: casing,
      iframe: `/katalog/casing`,
    },
  ];

  const refresh = () => {
    setComponentCpu(
      ComponentStorage.getComponentsByCategory(ComponentCategory.CPU),
    );
    setComponentCooler(
      ComponentStorage.getComponentsByCategory(ComponentCategory.Cooler),
    );
    setComponentMotherboard(
      ComponentStorage.getComponentsByCategory(ComponentCategory.Motherboard),
    );
    setComponentMemory(
      ComponentStorage.getComponentsByCategory(ComponentCategory.Memory),
    );
    setComponentStorage(
      ComponentStorage.getComponentsByCategory(ComponentCategory.Storage),
    );
    setComponentGpu(
      ComponentStorage.getComponentsByCategory(ComponentCategory.GPU),
    );
    setComponentPsu(
      ComponentStorage.getComponentsByCategory(ComponentCategory.PSU),
    );
    setComponentCasing(
      ComponentStorage.getComponentsByCategory(ComponentCategory.Casing),
    );
    setComponentCaseFan(
      ComponentStorage.getComponentsByCategory(ComponentCategory.CaseFan),
    );
    setComponentMonitor(
      ComponentStorage.getComponentsByCategory(ComponentCategory.Monitor),
    );
    setComponentOs(
      ComponentStorage.getComponentsByCategory(ComponentCategory.OS),
    );
    setComponentSoundCard(
      ComponentStorage.getComponentsByCategory(ComponentCategory.SoundCard),
    );
    setComponentWiredNetwork(
      ComponentStorage.getComponentsByCategory(ComponentCategory.WiredNetwork),
    );
    setComponentWirelessNetwork(
      ComponentStorage.getComponentsByCategory(
        ComponentCategory.WirelessNetwork,
      ),
    );
    setComponentCable(
      ComponentStorage.getComponentsByCategory(ComponentCategory.Cable),
    );
    setComponentExternalDrive(
      ComponentStorage.getComponentsByCategory(ComponentCategory.ExternalDrive),
    );
    setComponentHeadphone(
      ComponentStorage.getComponentsByCategory(ComponentCategory.Headphone),
    );
    setComponentKeyboard(
      ComponentStorage.getComponentsByCategory(ComponentCategory.Keyboard),
    );
    setComponentMouse(
      ComponentStorage.getComponentsByCategory(ComponentCategory.Mouse),
    );
    setComponentSpeaker(
      ComponentStorage.getComponentsByCategory(ComponentCategory.Speaker),
    );
    setComponentWebcam(
      ComponentStorage.getComponentsByCategory(ComponentCategory.Webcam),
    );
    setComponentPrinter(
      ComponentStorage.getComponentsByCategory(ComponentCategory.Printer),
    );
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(() => {
      refresh();
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   setComponentCpu(storageComponents.filter((c) => c.category === ComponentCategory.CPU));
  //   setComponentCooler(storageComponents.filter((c) => c.category === ComponentCategory.Cooler));
  //   setComponentMotherboard(storageComponents.filter((c) => c.category === ComponentCategory.Motherboard));
  //   setComponentMemory(storageComponents.filter((c) => c.category === ComponentCategory.Memory));
  //   setComponentStorage(storageComponents.filter((c) => c.category === ComponentCategory.Storage));
  //   setComponentGpu(storageComponents.filter((c) => c.category === ComponentCategory.GPU));
  //   setComponentPsu(storageComponents.filter((c) => c.category === ComponentCategory.PSU));
  //   setComponentCasing(storageComponents.filter((c) => c.category === ComponentCategory.Casing));
  //   setComponentCaseFan(storageComponents.filter((c) => c.category === ComponentCategory.CaseFan));
  //   setComponentMonitor(storageComponents.filter((c) => c.category === ComponentCategory.Monitor));
  //   setComponentOs(storageComponents.filter((c) => c.category === ComponentCategory.OS));
  //   setComponentSoundCard(storageComponents.filter((c) => c.category === ComponentCategory.SoundCard));
  //   setComponentWiredNetwork(storageComponents.filter((c) => c.category === ComponentCategory.WiredNetwork));
  //   setComponentWirelessNetwork(storageComponents.filter((c) => c.category === ComponentCategory.WirelessNetwork));
  //   setComponentCable(storageComponents.filter((c) => c.category === ComponentCategory.Cable));
  //   setComponentExternalDrive(storageComponents.filter((c) => c.category === ComponentCategory.ExternalDrive));
  //   setComponentHeadphone(storageComponents.filter((c) => c.category === ComponentCategory.Headphone));
  //   setComponentKeyboard(storageComponents.filter((c) => c.category === ComponentCategory.Keyboard));
  //   setComponentMouse(storageComponents.filter((c) => c.category === ComponentCategory.Mouse));
  //   setComponentSpeaker(storageComponents.filter((c) => c.category === ComponentCategory.Speaker));
  //   setComponentWebcam(storageComponents.filter((c) => c.category === ComponentCategory.Webcam));
  //   setComponentPrinter(storageComponents.filter((c) => c.category === ComponentCategory.Printer));
  // }, [storageComponents]);

  function convertToUrlQuery(object: any) {
    const isObject = (val: any) => val && typeof val === "object";

    const transformObject = (obj: any) =>
      Object.entries(obj)
        .map(([key, value]) => {
          const transformedKey = isObject(key) ? JSON.stringify(key) : key;
          const transformedValue = isObject(value)
            ? JSON.stringify(value)
            : value;
          return `${transformedKey}=${transformedValue as string}`;
        })
        .join("&");

    return transformObject(object);
  }

  type cpuUrlQuery = {
    motherboardId: number | undefined;
    memories: { id: number; amount: number }[] | undefined;
  };

  const handleAddComponent = (item: (typeof components)[0]) => {
    let query = {} as any;
    switch (item.title) {
      case "CPU":
        query = {} as cpuUrlQuery;
        if (motherboard.length > 0) {
          query.motherboardId = parseInt(motherboard[0]!.id);
        }
        if (memory.length > 0) {
          query.memories = memory.map((item) => ({
            id: parseInt(item.id),
            amount: item.quantity,
          }));
        }
        break;
    }

    setKategori(item.kategori);
  };

  return (
    <div className="m-auto mt-1 w-full max-w-screen-desktop p-4">
      <header className="flex text-3xl font-semibold">
        <span className="whitespace-nowrap">Simulasi Rakit PC</span>{" "}
        <span className="ml-2 text-base italic">
          Versi Alpha, kompatibilitas tidak dijamin 100%
        </span>
      </header>
      <main className="m-auto flex w-full max-w-screen-desktop flex-col gap-4 p-4">
        <div className="ml-auto">
          <Button
            disabled={components.every((c) => c.components.length === 0)}
            onClick={() => {
              const confirmed = window.confirm(
                "Apakah Anda yakin ingin mengulang dari awal?\nSemua komponen akan dihapus dan tidak dapat dikembalikan.",
              );
              if (confirmed) {
                ComponentStorage.clear();
              }
            }}
            className="ml-auto bg-rose-500 text-lg text-white hover:bg-rose-400"
          >
            <Undo2 className="mr-2 inline-block" />
            Reset
          </Button>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-bm shadow-black/5 dark:bg-navbar">
          <table className="w-full ">
            <thead className="h-8 border-b border-black text-left dark:border-primary">
              <tr>
                {headers.map((item) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {components.map((item) => {
                const bottomSpace = (item.title == "Memory" ||
                  item.title == "Storage") && <div className="h-[38px]" />;
                return (
                  <tr
                    key={item.title}
                    className="h-12 border-b border-zinc-500"
                  >
                    <td className="flex font-bold text-primary">
                      <div className="mb-auto mt-2 flex flex-row items-center">
                        <span className="rounded-sm p-1 dark:bg-white">
                          {item.icon}
                        </span>
                        <span className="ml-1">{item.title}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-1">
                        {item.components.map((component) => (
                          <Link
                            key={component.id}
                            className="flex h-[38px] cursor-pointer flex-row items-center rounded-md p-1 hover:bg-zinc-200 dark:hover:bg-zinc-600"
                            href={`/detail/${
                              categoriesFromEnum[component.category]
                            }/${component.slug}-${component.id}`}
                            passHref
                          >
                            <img
                              src={component.image}
                              alt={component.name}
                              width={32}
                              height={32}
                            />
                            <span className="ml-1">{component.name}</span>
                          </Link>
                        ))}
                        {item.components.length == 0 ? (
                          <Button
                            className="w-fit text-lg text-white"
                            onClick={() => handleAddComponent(item)}
                          >
                            + Pilih {item.title}
                          </Button>
                        ) : (
                          (item.title == "Memory" ||
                            item.title == "Storage") && (
                            <Button
                              variant="outline"
                              className="w-fit text-lg"
                              onClick={() => handleAddComponent(item)}
                            >
                              + {item.title}
                            </Button>
                          )
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-1">
                        {item.components.map((component) => (
                          <div key={component.id} className="flex h-[38px]">
                            <span className="my-auto whitespace-nowrap text-start">
                              {component.price
                                ? `Rp ${component.price.toLocaleString(
                                    "id-ID",
                                  )}`
                                : "-"}
                            </span>
                          </div>
                        ))}
                        {bottomSpace}
                      </div>
                    </td>
                    {/* <td>
                                        <div className='flex flex-col gap-1 h-full'>
                                            {item.components.map(component => <div key={component.id} className='flex h-[38px]'>
                                                <span className='my-auto text-start'>
                                                    {component.quantity}
                                                </span>
                                            </div>
                                            )}
                                            {bottomSpace}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex flex-col gap-1 h-full'>
                                            {item.components.map(component => <div key={component.id} className='flex h-[38px]'>
                                                <span className='my-auto text-start whitespace-nowrap'>
                                                    {(component.price && component.quantity) ? `Rp ${((component.price) * (component.quantity)).toLocaleString('id-ID')}` : '-'}
                                                </span>
                                            </div>
                                            )}
                                            {bottomSpace}
                                        </div>
                                    </td> */}
                    <td>
                      <div className="flex h-full flex-col gap-1">
                        {item.components.map((component) => (
                          <div
                            key={component.id}
                            className="flex flex-row items-center gap-1"
                          >
                            <Button
                              className="h-[32px] items-center bg-red-600 text-lg text-white hover:bg-red-500"
                              onClick={() => {
                                if (item.components.length > 0) {
                                  if (
                                    window.confirm(
                                      "Apakah Anda yakin ingin menghapus komponen ini?",
                                    )
                                  ) {
                                    ComponentStorage.removeComponentById(
                                      component.id,
                                    );
                                  }
                                }
                              }}
                            >
                              <Trash className="mr-2 inline-block" />
                              Hapus
                            </Button>
                          </div>
                        ))}
                        {bottomSpace}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="ml-auto w-fit">
          <div className="flex items-center rounded-xl bg-white p-4 text-lg shadow-bm shadow-black/5 dark:bg-navbar">
            <Banknote width="24" height="24" className="mr-1 inline-block" />
            Total: Rp{" "}
            {components
              .reduce(
                (a, b) =>
                  a +
                  b.components.reduce((a, b) => a + b.price * b.quantity, 0),
                0,
              )
              .toLocaleString("id-ID")}
          </div>
        </div>
        <Dialog open={kategori !== null} onOpenChange={() => setKategori(null)}>
          <DialogTrigger asChild>
            <div role="dialog" aria-modal="true" className="hidden"></div>
          </DialogTrigger>
          <DialogContent className="fixed inset-0 z-10 mt-navbar-min-h">
            <div className="h-full p-4 text-center">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <div className="flex h-full transform flex-col overflow-hidden rounded-lg bg-background text-left align-bottom shadow-xl transition-all">
                {/* {currentIframePath.startsWith("/detail/") && (
                  <div className="flex justify-start bg-white dark:bg-navbar">
                    <Button
                      onClick={() => window.history.back()}
                      className="fixed ml-4 mr-auto mt-4 aspect-square"
                    >
                      <ArrowLeft />
                    </Button>
                  </div>
                )} */}
                <div className="z-10 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setKategori(null)}
                    className="fixed ml-auto mr-[9px] mt-[9px] aspect-square bg-zinc-800 p-0 text-white"
                  >
                    <X />
                  </Button>
                </div>
                <ScrollArea>
                  {kategori !== null && (
                    <KategoriPage
                      params={{
                        kategori: categoriesFromEnum[kategori!]!,
                        noTopH: true,
                      }}
                    />
                  )}
                </ScrollArea>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
