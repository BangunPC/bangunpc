"use client";

import { Banknote, Save, Trash, Undo2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  ComponentView,
  categoriesFromEnum,
  categoriesFromString,
} from "~/lib/db";
import { ComponentStorage, ComponentStorageType, SimulationStorage } from "~/lib/storage_helper";
import { createQueryString, removeQueryString } from "~/lib/utils";
import KategoriPage from "../katalog/[kategori]/page";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { ApiPaths, fetcher, insertRakitan } from "~/lib/api";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import Divider from "~/components/ui/divider";
import { Input } from "~/components/ui/input";

const headers = [
  "Kategori Komponen",
  "Komponen Dipilih",
  "Harga Satuan",
  "Aksi",
];

export default function SimulasiPage({
  params,
}: {
  params: {
    params?: { id: number } | undefined;
    cpu?: ComponentStorageType | undefined;
    cpu_cooler?: ComponentStorageType | undefined;
    gpu?: ComponentStorageType | undefined;
    internal_storages?: ComponentStorageType[] | undefined;
    memories?: ComponentStorageType[] | undefined;
    monitors?: ComponentStorageType | undefined;
    motherboard?: ComponentStorageType | undefined;
    power_supply?: ComponentStorageType | undefined;
    casing?: ComponentStorageType | undefined;
  };
}) {
  const isComponent = params?.params?.id ?? null;
  const router = useRouter();
  const searchParams = useSearchParams()!;

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

  const refresh = async () => {
    if (isComponent) {
      setComponentCpu(params?.cpu ? [params?.cpu] : []);
      // setComponentCpuCooler(params?.cpu_cooler ? [params?.cpu_cooler] : []);
      setComponentGpu(params?.gpu ? [params?.gpu] : []);
      setComponentStorage(
        params.internal_storages ? params?.internal_storages : [],
      );
      setComponentMemory(params?.memories ? params?.memories : []);
      // setComponentMonitors(params?.monitors ? [params?.monitors] : []);
      setComponentMotherboard(params?.motherboard ? [params?.motherboard] : []);
      setComponentPsu(params?.power_supply ? [params?.power_supply] : []);
      setComponentCasing(params?.casing ? [params?.casing] : []);
      return;
    }
    setComponentCpu(
      await ComponentStorage.getComponentsByCategory(ComponentCategory.CPU),
    );
    // setComponentCooler(
    //   ComponentStorage.getComponentsByCategory(ComponentCategory.Cooler),
    // );
    setComponentMotherboard(
      await ComponentStorage.getComponentsByCategory(ComponentCategory.Motherboard),
    );
    setComponentMemory(
      await ComponentStorage.getComponentsByCategory(ComponentCategory.Memory),
    );
    setComponentStorage(
      await ComponentStorage.getComponentsByCategory(ComponentCategory.Storage),
    );
    setComponentGpu(
      await ComponentStorage.getComponentsByCategory(ComponentCategory.GPU),
    );
    setComponentPsu(
      await ComponentStorage.getComponentsByCategory(ComponentCategory.PSU),
    );
    setComponentCasing(
      await ComponentStorage.getComponentsByCategory(ComponentCategory.Casing),
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
    SimulationStorage.initializeData()
  };

  useEffect(() => {
    refresh();
    if (isComponent) return;
    const interval = setInterval(() => {
      refresh();
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // type cpuQuery = {
  //   motherboardId: number | undefined;
  //   memories: { id: number; amount: number }[] | undefined;
  // };

  const handleAddComponent = (item: (typeof components)[0]) => {
    // switch (item.title) {
    //   case "CPU":
    //     let query = {} as cpuQuery;
    //     if (motherboard.length > 0) {
    //       query.motherboardId = parseInt(motherboard[0]!.id);
    //     }
    //     if (memory.length > 0) {
    //       query.memories = memory.map((item) => ({
    //         id: parseInt(item.id),
    //         amount: item.quantity,
    //       }));
    //     }
    //     break;
    // }

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

  const { trigger } = useSWRMutation(ApiPaths.insertRakitan, insertRakitan);

  const handleClear = () => {
    if (!isComponent) {
      ComponentStorage.clear();
      SimulationStorage.clear();
    }
  };

  const handleRemoveComponent = (component: ComponentStorageType) => {
    if (!isComponent) {
      ComponentStorage.removeComponentById(component.storageId);
      const currentSimulation = SimulationStorage.getSimulationData()

      // Updating data in the simulation storage
      switch (component.category) {
        case ComponentCategory.CPU:
          const cpu = component.detail as ComponentView["v_cpus"]
          SimulationStorage.upsertSimulationData({
            currentTotalPowerWatt: (currentSimulation?.currentTotalPowerWatt ?? 0) - (cpu.max_power_watt ?? 0)
          })
          break;

        case ComponentCategory.GPU:
          const gpu = component.detail as ComponentView["v_gpus"]
          SimulationStorage.upsertSimulationData({
            currentTotalPowerWatt: (currentSimulation?.currentTotalPowerWatt ?? 0) - (gpu.tdp_watt ?? 0)
          })
          break;

        case ComponentCategory.Memory:
          const memory = component.detail as ComponentView["v_memories"]
          const memoryAmount = memory.amount ?? 0
          const capacityGb = memory.capacity_gb ?? 0

          SimulationStorage.upsertSimulationData({
            selectedMemoryAmount: (currentSimulation?.selectedMemoryAmount ?? 0) - memoryAmount,
            selectedMemorySizeGb:  (currentSimulation?.selectedMemorySizeGb ?? 0) - (capacityGb + memoryAmount)
          })
          break;

        case ComponentCategory.Storage:
          SimulationStorage.upsertSimulationData({
            selectedNvmeAmount: (currentSimulation?.selectedNvmeAmount ?? 0) - 1
          })
          break;
      
        default:
          break;
      }
    }
  };

  return (
    <div className="m-auto mt-1 w-full max-w-screen-desktop p-4">
      <header className="flex text-3xl font-semibold mt-4">
        <span className="whitespace-nowrap">
          {isComponent ? "TODO: Nama Rakitan" : "Simulasi Rakit PC"}
        </span>
        {/* {!isComponent && (
          <span className="ml-2 text-base italic">
            Versi Alpha, kompatibilitas tidak dijamin 100%
          </span>
        )} */}
      </header>
      <main className="m-auto flex w-full max-w-screen-desktop flex-col gap-4">
        <div className="flex justify-end gap-2">
          {!isComponent && (
            <Button
              variant="destructive"
              disabled={components.every((c) => c.components.length === 0)}
              onClick={() => {
                const confirmed = window.confirm(
                  "Apakah Anda yakin ingin mengulang dari awal?\nSemua komponen akan dihapus dan tidak dapat dikembalikan.",
                );
                if (confirmed) {
                  handleClear();
                }
              }}
              className="text-base"
            >
              <Undo2 className="mr-2 inline-block" />
              Reset Pilihan
            </Button>
          )}
          <ManageListModal
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSaveNew={async (name) => {
              const res = await trigger({
                title: name,
                cpuId: cpu[0]?.id,
                motherboardId: motherboard[0]?.id,
                memoryId: memory[0]?.id,
                storageId: storage[0]?.id,
                gpuId: gpu[0]?.id,
                psuId: psu[0]?.id,
                casingId: casing[0]?.id,
                // caseFanId: caseFan[0]?.id,
              });

              return res;
            }}
            onSaveReplace={(build_id) => {
              // TODO: update
              console.log(`build_id: ${build_id}`);
            }}
            disabled={components.every((c) => c.components.length === 0)}
            defaultId={isComponent ? isComponent.toString() : undefined}
          />
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
                        <span className="ml-2">{item.title}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-2">
                        {item.components.map((component) => (
                          <Link
                            key={component.storageId}
                            className="flex h-[38px] cursor-pointer flex-row items-center rounded-md p-1 hover:bg-zinc-200 dark:hover:bg-zinc-600"
                            href={`/katalog/${
                              categoriesFromEnum[component.category]
                            }/${component.slug}`}
                            passHref
                          >
                            <Image
                              src={component.image}
                              width={32}
                              height={32}
                              alt={component.name}
                            />
                            <span className="ml-2">{component.name}</span>
                          </Link>
                        ))}
                        {item.components.length === 0 ? (
                          <Button
                            className="w-fit text-base h-9 text-white my-2"
                            onClick={() => handleAddComponent(item)}
                          >
                            + Pilih {item.title}
                          </Button>
                        ) : (
                          <>
                            {item.title === "Memory" && (
                              <Button
                                variant="outline"
                                className="w-fit text-base my-2"
                                disabled={
                                  item.components.reduce((total, item) => 
                                    total + item.quantity, 0) >= (SimulationStorage.getSimulationData()?.selectedMemoryAmount ?? 2)}
                                onClick={() => handleAddComponent(item)}
                              >
                                + {item.title}
                              </Button>
                            )}
                            {item.title === "Storage" && (
                              <Button
                                variant="outline"
                                className="w-fit text-base my-2"
                                disabled={item.kategori === ComponentCategory.Storage}
                                onClick={() => handleAddComponent(item)}
                              >
                                + {item.title}
                              </Button>
                            )}
                          </>
                        )}

                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-1">
                        {item.components.map((component) => (
                          <div key={component.storageId} className="flex h-[48px] flex-row items-center">
                            <span className="whitespace-nowrap">
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
                            key={component.storageId}
                            className="flex flex-row items-center gap-1 my-2"
                          >
                            <Button
                              variant="destructive"
                              className="h-8 items-center text-white "
                              onClick={() => {
                                if (item.components.length > 0) {
                                  if (
                                    window.confirm(
                                      "Apakah Anda yakin ingin menghapus komponen ini?",
                                    )
                                  ) {
                                    handleRemoveComponent(component);
                                  }
                                }
                              }}
                            >
                              <Trash size={16} className="mr-2 inline-block" />
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
          <DialogContent className="inset-4 m-auto max-w-fit translate-x-0 translate-y-0 px-0 py-4">
            <ScrollArea className="-z-10 w-full px-4">
              {kategori && categoriesFromString[kategori] && (
                <KategoriPage
                  params={{
                    isCompatibiliyChecked: true,
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

type MLMProps = {
  disabled: boolean;
  onSaveNew: (arg: string) => Promise<boolean>;
  onSaveReplace: (arg: string) => void;
  defaultId?: string;
};

const ManageListModal: React.FC<MLMProps> = ({
  disabled,
  onSaveNew,
  onSaveReplace,
  defaultId,
}) => {
  const { data, isLoading, error, mutate } = useSWR(
    ApiPaths.listRakitan,
    fetcher,
  );
  const [name, setName] = useState(defaultId ?? "option-new");
  const [newName, setNewName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async () => {
    if (name === "option-new") {
      const res = await onSaveNew(newName);
      if (res) {
        setIsOpen(false);
        // TODO: redirect to rakitan detail page
      } else {
        // TODO: show error
      }
    } else {
      onSaveReplace(name);
    }
  };
  return (
    <Dialog
      onOpenChange={(e) => {
        if (e) setName(defaultId ?? "option-new");
        setIsOpen(e);
        mutate().catch((error) => {
          console.log(error);
        });
      }}
      open={isOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="success"
          disabled={disabled}
          className="text-base text-white"
        >
          <Save className="mr-2 inline-block" />
          Simpan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <span className="text-xl font-semibold">Daftar Simpanan Saya</span>
        <RadioGroup
          onValueChange={(value) => {
            setName(value);
          }}
          value={name}
          className="gap-0"
        >
          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {data && typeof data !== "string" && data.data && (
            <>
              {data.data.map((item) => (
                <Label
                  htmlFor={`${item.build_id}`}
                  key={item.build_id}
                  className={
                    "flex w-full items-center gap-2 rounded-lg border border-transparent p-2 " +
                    (item.build_id?.toString() === name
                      ? "border-primary"
                      : "hover:bg-gray-500/20")
                  }
                >
                  <RadioGroupItem
                    value={`${item.build_id}`}
                    id={`${item.build_id}`}
                  />
                  <span>{item.title}</span>
                </Label>
              ))}
              <Label
                htmlFor="option-new"
                key="option-new"
                className={
                  "flex gap-2 rounded-lg border border-transparent p-2 " +
                  ("option-new" === name
                    ? "border-primary"
                    : "hover:bg-gray-500/20")
                }
              >
                <RadioGroupItem value="option-new" id="option-new" />
                <span className="flex w-full flex-col gap-3">
                  Buat Simpanan Baru
                  <Input
                    placeholder="Masukkan nama simpanan baru disini"
                    onFocus={() => {
                      setName("option-new");
                    }}
                    onChange={(e) => {
                      setNewName(e.target.value);
                    }}
                  />
                </span>
              </Label>
            </>
          )}
        </RadioGroup>
        <Divider />
        <Button
          className="text-lg"
          onClick={handleSave}
          disabled={name === "option-new" && !newName}
        >
          Simpan
        </Button>
      </DialogContent>
    </Dialog>
  );
};
