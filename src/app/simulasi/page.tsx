"use client";

import { Banknote, Save, Trash, Undo2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import KategoriCasing from "~/components/ui/icon/kategori-casing";
import KategoriCpu from "~/components/ui/icon/kategori-cpu";
import KategoriGpu from "~/components/ui/icon/kategori-gpu";
import KategoriInternalStorage from "~/components/ui/icon/kategori-internal-storage";
import KategoriMotherboard from "~/components/ui/icon/kategori-motherboard";
import KategoriPsu from "~/components/ui/icon/kategori-psu";
import KategoriRam from "~/components/ui/icon/kategori-ram";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  ComponentCategory,
  categoriesFromEnum,
  categoriesFromString,
} from "~/lib/db";
import { ComponentStorage, ComponentStorageType } from "~/lib/storage_helper";
import { createQueryString, removeQueryString } from "~/lib/utils";
import KategoriPage from "../katalog/[kategori]/page";

const headers = [
  "Kategori Komponen",
  "Komponen Dipilih",
  "Harga Satuan",
  "Aksi",
];

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [kategori, setKategori] = useState<string | null>(null);

  useEffect(() => {
    setKategori(searchParams.get("kategori"));
  }, [searchParams]);

  const [cpu, setComponentCpu] = useState([] as ComponentStorageType[]);
  // const [cooler, setComponentCooler] = useState([] as ComponentStorageType[]);
  const [motherboard, setComponentMotherboard] = useState(
    [] as ComponentStorageType[],
  );
  const [memory, setComponentMemory] = useState([] as ComponentStorageType[]);
  const [storage, setComponentStorage] = useState([] as ComponentStorageType[]);
  const [gpu, setComponentGpu] = useState([] as ComponentStorageType[]);
  const [psu, setComponentPsu] = useState([] as ComponentStorageType[]);
  const [casing, setComponentCasing] = useState([] as ComponentStorageType[]);
  // const [caseFan, setComponentCaseFan] = useState([] as ComponentStorageType[]);
  // const [monitor, setComponentMonitor] = useState([] as ComponentStorageType[]);
  // const [os, setComponentOs] = useState([] as ComponentStorageType[]);
  // const [soundCard, setComponentSoundCard] = useState(
  //   [] as ComponentStorageType[],
  // );
  // const [wiredNetwork, setComponentWiredNetwork] = useState(
  //   [] as ComponentStorageType[],
  // );
  // const [wirelessNetwork, setComponentWirelessNetwork] = useState(
  //   [] as ComponentStorageType[],
  // );
  // const [cable, setComponentCable] = useState([] as ComponentStorageType[]);
  // const [externalDrive, setComponentExternalDrive] = useState(
  //   [] as ComponentStorageType[],
  // );
  // const [headphone, setComponentHeadphone] = useState(
  //   [] as ComponentStorageType[],
  // );
  // const [keyboard, setComponentKeyboard] = useState(
  //   [] as ComponentStorageType[],
  // );
  // const [mouse, setComponentMouse] = useState([] as ComponentStorageType[]);
  // const [speaker, setComponentSpeaker] = useState([] as ComponentStorageType[]);
  // const [webcam, setComponentWebcam] = useState([] as ComponentStorageType[]);
  // const [printer, setComponentPrinter] = useState([] as ComponentStorageType[]);

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
    // setComponentCooler(
    //   ComponentStorage.getComponentsByCategory(ComponentCategory.Cooler),
    // );
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
    // setComponentCaseFan(
    //   ComponentStorage.getComponentsByCategory(ComponentCategory.CaseFan),
    // );
    // setComponentMonitor(
    //   ComponentStorage.getComponentsByCategory(ComponentCategory.Monitor),
    // );
    // setComponentOs(
    //   ComponentStorage.getComponentsByCategory(ComponentCategory.OS),
    // );
    // setComponentSoundCard(
    //   ComponentStorage.getComponentsByCategory(ComponentCategory.SoundCard),
    // );
    // setComponentWiredNetwork(
    //   ComponentStorage.getComponentsByCategory(ComponentCategory.WiredNetwork),
    // );
    // setComponentWirelessNetwork(
    //   ComponentStorage.getComponentsByCategory(
    //     ComponentCategory.WirelessNetwork,
    //   ),
    // );
    // setComponentCable(
    //   ComponentStorage.getComponentsByCategory(ComponentCategory.Cable),
    // );
    // setComponentExternalDrive(
    //   ComponentStorage.getComponentsByCategory(ComponentCategory.ExternalDrive),
    // );
    // setComponentHeadphone(
    //   ComponentStorage.getComponentsByCategory(ComponentCategory.Headphone),
    // );
    // setComponentKeyboard(
    //   ComponentStorage.getComponentsByCategory(ComponentCategory.Keyboard),
    // );
    // setComponentMouse(
    //   ComponentStorage.getComponentsByCategory(ComponentCategory.Mouse),
    // );
    // setComponentSpeaker(
    //   ComponentStorage.getComponentsByCategory(ComponentCategory.Speaker),
    // );
    // setComponentWebcam(
    //   ComponentStorage.getComponentsByCategory(ComponentCategory.Webcam),
    // );
    // setComponentPrinter(
    //   ComponentStorage.getComponentsByCategory(ComponentCategory.Printer),
    // );
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(() => {
      refresh();
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  type cpuQuery = {
    motherboardId: number | undefined;
    memories: { id: number; amount: number }[] | undefined;
  };

  const handleAddComponent = (item: (typeof components)[0]) => {
    let query = {} as any;
    switch (item.title) {
      case "CPU":
        query = {} as cpuQuery;
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

    const params = createQueryString(
      searchParams,
      "kategori",
      categoriesFromEnum[item.kategori]!,
    );

    router.push("?" + params);
  };

  // const {data, isLoading, error, mutate} = useSWR(ApiPaths.listRakitan, fetcher);

  const closeIframe = () => {
    router.push("?" + removeQueryString(searchParams, "kategori"));
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
        <div className="flex justify-end gap-2">
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
            className="bg-rose-500 text-lg text-white hover:bg-rose-400"
          >
            <Undo2 className="mr-2 inline-block" />
            Reset Pilihan
          </Button>
          <Button
            disabled={components.every((c) => c.components.length === 0)}
            className="bg-green-600 text-lg text-white hover:bg-green-500"
          >
            <Save className="mr-2 inline-block" />
            Simpan
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
                            <Image
                              src={component.image}
                              width={32}
                              height={32}
                              alt={component.name}
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
        <Dialog
          open={
            kategori !== null && categoriesFromString[kategori] !== undefined
          }
          onOpenChange={() => {
            closeIframe();
          }}
        >
          <DialogTrigger asChild>
            <div role="dialog" aria-modal="true" className="hidden"></div>
          </DialogTrigger>
          <DialogContent className="inset-4 m-auto max-w-fit translate-x-0 translate-y-0 p-4">
            <ScrollArea className="-z-10 w-full">
              {kategori && categoriesFromString[kategori] && (
                <KategoriPage
                  params={{
                    kategori: kategori,
                    noTopH: true,
                    onSuccess: () => {
                      closeIframe();
                    },
                  }}
                />
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
