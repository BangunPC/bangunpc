"use client"

import { Banknote, Save, Trash, Undo2 } from "lucide-react";
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
import { createQueryString, productImage, removeQueryString } from "@/lib/utils";
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
// import { deleteBuildSession, deleteBuildSessionComponent } from "@/lib/build-session";

const headers = [
  "Kategori",
  "Komponen Dipilih", 
  "Harga",
  "Aksi",
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
      title: "Memory",
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
      else
        console.log(responseError);
        
    }
  };

  return (
    <div className="m-auto mt-24 w-full max-w-screen-desktop p-4">
      <header className="flex text-3xl font-semibold mt-4">
        <span className="whitespace-nowrap">
          {buildCode ? "Rakitan PC" : "Simulasi Rakit PC"}
        </span>
      </header>
      <main className="m-auto flex w-full max-w-screen-desktop flex-col gap-4">
        <div className="flex justify-end gap-2">
          {!buildCode && (
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
                  <AlertDialogCancel>Tidak</AlertDialogCancel>
                  <AlertDialogAction 
                    variant="destructive"
                    onClick={handleClear}>
                    Yakin
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
            
          )}
          <ManageListModal
            onSaveNew={handleSaveNew}
            onSaveReplace={(build_id) => {
              // TODO: update
              console.log(`build_id: ${build_id}`);
            }}
            disabled={components.every((c) => c.components.length === 0)}
            defaultId={buildCode}
          />
        </div>
        <div className="rounded-xl bg-white p-4 shadow-bm shadow-black/5 dark:bg-navbar">
          <table className="w-full">
            <thead className="h-8 border-b border-black text-left dark:border-primary">
              <tr>
                {headers.map((item) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {components.map((item, index) => {
                const bottomSpace = (item.title === "Memory" ||
                  item.title === "Storage") && <div className="h-[38px]" />;
                return (
                  <tr
                    key={index}
                    className="h-12 border-b border-zinc-500"
                  >
                    <td className="flex font-bold text-primary">
                      <div className="my-4 flex flex-row items-center">
                        <span className="rounded-sm p-1 dark:bg-white">
                          {item.icon}
                        </span>
                        <span className="ml-2">{item.title}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-2">
                        {item.components.map((component, index) => (
                          <Link
                            key={index}
                            className="flex h-[72px] cursor-pointer flex-row items-center rounded-md p-1 hover:bg-zinc-200 dark:hover:bg-zinc-600 py-4"
                            href={`/produk/${categoryEnumToSlug[item.kategori]}/${component.slug}`}
                          >
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Image
                                    className="rounded-sm bg-white p-1"
                                    src={productImage(component.product_id, component.image_filename)}
                                    width={64}
                                    height={64}
                                    alt={component.name}
                                  />
                                </TooltipTrigger>
                                <TooltipContent side="right" className="p-0 border-none shadow-none ml-6">
                                  <div className="relative w-64 h-64 rounded-md overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center bg-white">
                                      <Image
                                        src={productImage(component.product_id, component.image_filename)}
                                        alt={component.name}
                                        width={256}
                                        height={256}
                                        className="object-contain p-2"
                                      />
                                    </div>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="ml-4">{component.name}</span>
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
                            className="w-fit text-base h-9 text-white my-2"
                            onClick={() => handleAddComponent(item)}
                          >
                            + Pilih {item.title}
                          </Button>
                        ) : (
                          <>
                            {(item.title === "Memory" || item.title === "Storage") && (
                              <Button
                                variant="outline"
                                className="w-fit text-base my-2"
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
                      <div className="flex flex-col gap-6">
                        {item.components.map((component,index) => (
                          <div key={index} className="flex h-[48px] flex-row items-center">
                            <span className="whitespace-nowrap">
                              {component.price
                                ? `Rp ${component.price.toLocaleString("id-ID")}`
                                : "-"}
                            </span>
                          </div>
                        ))}
                        {bottomSpace}
                      </div>
                    </td>
                    <td>
                      <div className="flex h-full flex-col gap-6">
                        {item.components.map((component, index) => (
                          <div
                            key={index}
                            className="flex flex-row items-center gap-1 my-2"
                          >
                            <AlertDialog>
                              <AlertDialogTrigger variant="destructive" className="h-8 items-center text-white">
                                <Trash size={16} className="mr-2 inline-block" />
                                Hapus
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Komponen {component.name} akan dihapus
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Tidak</AlertDialogCancel>
                                  <AlertDialogAction 
                                    variant="destructive"
                                    onClick={() => handleRemoveComponent(component, item.kategori)}>
                                    Yakin
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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
            {buildData?.total_price?.toLocaleString("id-ID") ?? "0"}
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
                children
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