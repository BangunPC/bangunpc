"use client"

import { Save, Trash2, Undo2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import KategoriCasing from "@/components/icon/kategori-casing";
import KategoriCpu from "@/components/icon/kategori-cpu";
import KategoriGpu from "@/components/icon/kategori-gpu";
import KategoriInternalStorage from "@/components/icon/kategori-internal-storage";
import KategoriMotherboard from "@/components/icon/kategori-motherboard";
import KategoriPsu from "@/components/icon/kategori-psu";
import KategoriRam from "@/components/icon/kategori-ram";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ComponentCategoryEnum,
  categoryEnumToSlug,
  categorySlugToEnum,
  isMultiComponentCategoryEnum,
} from "@/lib/db";
import { createQueryString, productImage } from "@/lib/utils";
import { RadioGroup } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
import Divider from "@/components/ui/divider";
// import { Input } from "@/components/ui/input";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { BuildResponseData, MultiComponentResponse, SingleComponentResponse } from "@/lib/schema";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { deleteBuildSession, deleteBuildSessionComponent } from "@/lib/build-session";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
// import { deleteBuildSession, deleteBuildSessionComponent } from "@/lib/build-session";

const headers = [
  "Kategori",
  "Komponen yang dipilih", 
  "Harga",
  "",
];

interface SimulasiClientProps {
  buildData?: BuildResponseData,
  buildCode?: string,
  children: React.ReactNode
}

export function SimulasiClient({
  buildData,
  buildCode,
  children
}: SimulasiClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams()!;

  const [kategori, setKategori] = useState<string | null>(null);

  useEffect(() => {
    setKategori(searchParams.get("kategori"));
  }, [searchParams]);


  const components = [
    {
      kategori: ComponentCategoryEnum.Motherboard,
      icon: <KategoriMotherboard width="27" height="27" />,
      title: "Motherboard",
      components: buildData?.motherboard ? [buildData.motherboard] : [],
      iframe: `/produk/motherboard`,
    },
    {
      kategori: ComponentCategoryEnum.CPU,
      icon: <KategoriCpu width="27" height="27" />,
      title: "CPU", 
      components: buildData?.cpu ? [buildData.cpu] : [],
      iframe: `/produk/cpu`,
    },
    {
      kategori: ComponentCategoryEnum.GPU,
      icon: <KategoriGpu width="27" height="27" />,
      title: "GPU",
      components: buildData?.gpu ? [buildData.gpu] : [],
      iframe: `/produk/gpu`,
    },
    {
      kategori: ComponentCategoryEnum.Memory,
      icon: <KategoriRam width="27" height="27" />,
      title: "Memory (RAM)",
      components: buildData?.memories ?? [],
      iframe: `/produk/memory`,
    },
    {
      kategori: ComponentCategoryEnum.PSU,
      icon: <KategoriPsu width="27" height="27" />,
      title: "Power Supply",
      components: buildData?.power_supply ? [buildData.power_supply] : [],
      iframe: `/produk/psu`,
    },
    {
      kategori: ComponentCategoryEnum.Storage,
      icon: <KategoriInternalStorage width="27" height="27" />,
      title: "Storage",
      components: buildData?.internal_storages ?? [],
      iframe: `/produk/storage`,
    },
    {
      kategori: ComponentCategoryEnum.Casing,
      icon: <KategoriCasing width="27" height="27" />,
      title: "Casing",
      components: buildData?.casing ? [buildData.casing] : [],
      iframe: `/produk/casing`,
    },
  ];

  const handleAddComponent = (item: (typeof components)[0]) => {
    const params = createQueryString(
      searchParams,
      "kategori",
      categoryEnumToSlug[item.kategori]!,
    );

    router.push("?" + params);
  };

  const closeIframe = () => {
    router.replace('/simulasi');
  };

  // const { trigger } = useSWRMutation(ApiPaths.insertRakitan, insertRakitan);

  const handleClear = async () => {
    if (!buildCode) {
      const success = await deleteBuildSession();
      if (success) {
        router.refresh();
      }
    }
  };

  const handleSaveNew = async (name: string) => {
    // const res = await trigger({
    //   title: name,
    //   cpuId: buildData?.cpu?.id,
    //   motherboardId: buildData?.motherboard?.id,
    //   memoryId: buildData?.memories?.[0]?.id,
    //   storageId: buildData?.internal_storages?.[0]?.id,
    //   gpuId: buildData?.gpu?.id,
    //   psuId: buildData?.power_supply?.id,
    //   casingId: buildData?.casing?.id,
    // });

    return true;
  }

  const handleRemoveComponent = async (component: SingleComponentResponse, categoryEnum: ComponentCategoryEnum) => {
    if (!buildCode) {
      let responseError: string | null = null
      if(isMultiComponentCategoryEnum(categoryEnum)) {
        const { error } = await deleteBuildSessionComponent(
          categoryEnum, 
          (component as MultiComponentResponse).component_id);
        if (!error) 
          responseError = error
      } else {
        const { error } = await deleteBuildSessionComponent(
          categoryEnum);
        if (!error) 
          responseError = error
      }

      if (!responseError)
        router.refresh()
        
    }
  };

  const [isCompatible, setIsCompatible] = useState<boolean>(true)
  return (
    <div className="m-auto mt-24 w-full container p-4">
      <header className="flex flex-col gap-2 mb-6">
        <span className="text-4xl font-bold tracking-tight text-white">
          {buildCode ? "Rakitan PC" : "Simulasi Rakit PC"}
        </span> 
        <div className="flex justify-between mt-2">
          <div className="flex items-center gap-4 w-full mr-6">
            <span className={`text-base font-medium select-none px-3 py-2 rounded-md ${
              components.every((c) => c.components.length === 0)
                ? 'bg-blue-900/30 text-blue-400'
                : isCompatible 
                  ? 'bg-emerald-900/30 text-emerald-400' 
                  : 'bg-rose-900/30 text-rose-400'
            }`}>
              {components.every((c) => c.components.length === 0) ? (
                <>
                  <span className="font-bold">ℹ️ </span>
                  <span>Belum ada komponen yang dipilih</span>
                </>
              ) : isCompatible ? (
                <>
                  <span className="font-bold">✅ </span>
                  <span>Semua komponen kompatibel</span>
                </>
              ) : (
                <>
                  <span className="font-bold">❌ </span>
                  <span>Terdapat masalah kompatibilitas, cek </span>
                  <Link 
                    href="/simulasi/kompatibilitas"
                    className="text-rose-400 font-bold hover:underline"
                  >
                    di sini
                  </Link>
                </>
              )}
            </span>
          </div>
          {!buildCode && (
            <div className="flex justify-end gap-4">
              <AlertDialog>
                <AlertDialogTrigger  
                  disabled={components.every((c) => c.components.length === 0)}
                  variant="destructive" 
                  className="items-center text-white text-base"
                >
                  <Undo2 className="mr-2 inline-block" />
                  Reset Pilihan
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Semua komponen yang telah Anda pilih akan dihapus
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction 
                      variant="destructive"
                      onClick={handleClear}>
                      Yakin
                    </AlertDialogAction>
                    <AlertDialogCancel>Tidak</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <ManageListModal
                onSaveNew={handleSaveNew}
                onSaveReplace={(build_id) => {
                  // TODO: update
                }}
                disabled={components.every((c) => c.components.length === 0)}
                defaultId={buildCode}
              />
            </div>
          )}
        </div>
      </header>
      <main className="m-auto flex w-full flex-col gap-6">
        <div className="rounded-xl bg-white p-4 shadow-bm shadow-black/5 dark:bg-navbar border border-sky-200 dark:border-sky-700">
          <table className="w-full table-auto border-collapse">
            <thead className="h-12 border-b border-zinc-300 dark:border-zinc-300 text-left text-lg">
              <tr>
                {headers.map((item) => (
                  <th key={item} className="px-4 py-3 font-semibold">{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {components.map((item, index) => {
                const isLastRow = index === components.length - 1;
                const needsBottomSpace = (item.title === "Memory (RAM)" || item.title === "Storage");
                
                return (
                  <tr
                    key={index}
                    className={`h-12 ${!isLastRow ? "border-b border-zinc-200 dark:border-zinc-700" : ""}`}
                  >
                    <td className="pl-4 py-3 font-bold text-sky-500">
                      <Link 
                        href={'/produk/' + categoryEnumToSlug[item.kategori]}
                        className="flex flex-row items-center hover:underline"
                      >
                        {item.title}
                      </Link>
                    </td>
                    
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-2">
                        {item.components.map((component, index) => (
                          <Link
                            key={index}
                            className="flex h-[72px] cursor-pointer flex-row items-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 p-2 transition-colors"
                            href={`/produk/${categoryEnumToSlug[item.kategori]}/${component.slug}`}
                          >
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div>
                                    {component.image_filename!.length > 0 && (
                                      <div 
                                        className="h-16 w-16 overflow-hidden rounded-md bg-no-repeat bg-center bg-contain bg-white"
                                        style={{
                                          backgroundImage: `url(${productImage(component.product_id, component.image_filename)})`,
                                          pointerEvents: 'none'
                                        }}
                                      />
                                    )}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="p-0 border-none shadow-none ml-6">
                                  <div 
                                    className="relative w-64 h-64 rounded-md overflow-hidden"
                                    onContextMenu={(e) => e.preventDefault()}
                                  >
                                    <div
                                      className="w-full h-full bg-no-repeat bg-center bg-contain bg-white"
                                      style={{
                                        backgroundImage: `url(${productImage(component.product_id, component.image_filename)})`,
                                        pointerEvents: 'none'
                                      }}
                                    />
                                    <div className="absolute inset-0 z-10" style={{ pointerEvents: 'none' }}></div>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="ml-4 font-semibold text-base line-clamp-2">
                                    {component.name}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs">
                                  <p>{component.name ?? "-"}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Link>
                        ))}
                        
                        {item.components.length === 0 ? (
                          <Button
                            className="w-fit h-10 text-white my-2 hover:bg-blue-500 px-4"
                            onClick={() => handleAddComponent(item)}
                          >
                            + Pilih {item.title}
                          </Button>
                        ) : (
                          (item.title === "Memory (RAM)" || item.title === "Storage") && (
                            <Button
                              variant="outline"
                              className="w-fit h-10 my-2 bg-white dark:bg-zinc-800 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 px-4"
                              onClick={() => handleAddComponent(item)}
                            >
                              + Tambah {item.title}
                            </Button>
                          )
                        )}
                      </div>
                    </td>
                    
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-4">
                        {item.components.map((component, index) => (
                          <div key={index} className="flex h-[48px] items-center">
                            <span className="whitespace-nowrap font-normal text-base">
                              {component.price
                                ? `Rp ${component.price.toLocaleString("id-ID")}`
                                : "-"}
                            </span>
                          </div>
                        ))}
                        {needsBottomSpace && <div className="h-4" />}
                      </div>
                    </td>
                    
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-4">
                        {item.components.map((component, index) => (
                          <div key={index} className="flex items-center h-[48px]">
                            <AlertDialog>
                              <AlertDialogTrigger variant="ghost" className="h-10 items-center">
                                <Trash2 size={18} 
                                color="red" className="inline-block" />
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Komponen {component.name} akan dihapus
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogAction 
                                    variant="destructive"
                                    onClick={() => handleRemoveComponent(component, item.kategori)}
                                  >
                                    Yakin
                                  </AlertDialogAction>
                                  <AlertDialogCancel>Tidak</AlertDialogCancel>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        ))}
                        {needsBottomSpace && <div className="h-4" />}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="sticky bottom-4 right-4 ml-auto w-fit z-20">
          <div className="flex items-center rounded-xl bg-white p-4 text-xl font-bold shadow-bm shadow-black/5 dark:bg-navbar border border-sky-200 dark:border-sky-700">
            {/* <Banknote width="28" height="28" className="mr-2 inline-block text-green-600" /> */}
            Total: <span className="ml-2 text-sky-500">Rp {buildData?.total_price?.toLocaleString("id-ID") ?? "0"}</span>
          </div>
        </div>
        <Dialog
          open={kategori !== null && categorySlugToEnum[kategori] !== undefined}
          onOpenChange={() => {
            closeIframe();
          }}
        >
          <DialogTrigger asChild>
            <div role="dialog" aria-modal="true" className="hidden"></div>
          </DialogTrigger>
          <DialogContent className="inset-4 m-auto max-w-fit translate-x-0 translate-y-0 px-0">
            <VisuallyHidden>
              <DialogTitle>Menu</DialogTitle>
            </VisuallyHidden>
            <ScrollArea className="-z-10 w-full px-4">
              { kategori && categorySlugToEnum[kategori] && (
                React.isValidElement(children)
                  ? React.cloneElement(children as React.ReactElement<any>)
                  : children
              ) }
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

const ManageListModal: FC<MLMProps> = ({
  disabled,
  onSaveNew,
  onSaveReplace,
  defaultId,
}) => {
  // const { data, isLoading, error, mutate } = useSWR(
  //   ApiPaths.listRakitan,
  //   fetcher,
  // );
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
        // mutate().catch((error) => {
        //   console.log(error);
        // });
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
        <VisuallyHidden>
          <DialogTitle>Menu</DialogTitle>
        </VisuallyHidden>
        <span className="text-xl font-semibold">Daftar Simpanan Saya</span>
        <RadioGroup
          onValueChange={(value) => {
            setName(value);
          }}
          value={name}
          className="gap-0"
        >
          {/* {isLoading && <div>Loading...</div>}
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
          )} */}
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