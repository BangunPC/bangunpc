"use client";

import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import KategoriCasing from "@/components/icon/kategori-casing";
import KategoriCpu from "@/components/icon/kategori-cpu";
import KategoriCpuCooler from "@/components/icon/kategori-cpu-cooler";
import KategoriGpu from "@/components/icon/kategori-gpu";
import KategoriInternalStorage from "@/components/icon/kategori-internal-storage";
import KategoriMonitor from "@/components/icon/kategori-monitor";
import KategoriMotherboard from "@/components/icon/kategori-motherboard";
import KategoriPsu from "@/components/icon/kategori-psu";
import KategoriRam from "@/components/icon/kategori-ram";
import { categoryEnumToSlug, ComponentCategoryEnum } from "@/lib/db";
import { Database } from "@/lib/schema";
import { productImage } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";

// TODO: fix colors

interface ComponentJson {
  product_id: number | null;
  name: string | null;
  slug: string | null;
  image_filename: string | null;
  product_detail_id: number | null;
  marketplace_id: number | null;
  price: number | null;
}

const headers = ["Kategori", "Komponen", "Harga"];

const Component = ({
  data,
  imageUrls,
  price,
}: {
  data: Database["pc_build"]["Views"]["v_recommendation"]["Row"];
  imageUrls: string[];
  price: string | undefined;
}) => {
  const buyLink = `http://wa.me/6282295561944?text=Hai, saya ingin bertanya tentang jasa rakit pc di link berikut ${window.location.href}`;

  const name = data.title;
  const review_urls = JSON.parse(
    data.review_urls!.replaceAll("watch?v=", "embed/"),
  ) as string[];

  const cpu = data.cpu ? (data.cpu as object as ComponentJson) : null;
  const cpu_cooler = data.cpu_cooler
    ? (data.cpu_cooler as object as ComponentJson)
    : null;
  const gpu = data.gpu ? (data.gpu as object as ComponentJson) : null;
  const internal_storages = data.internal_storages
    ? (data.internal_storages as object[] as ComponentJson[])
    : null;
  const memories = data.memories
    ? (data.memories as object[] as ComponentJson[])
    : null;
  const monitors = data.monitors
    ? (data.monitors as object as ComponentJson)
    : null;
  const motherboard = data.motherboard
    ? (data.motherboard as object as ComponentJson)
    : null;
  const power_supply = data.power_supply
    ? (data.power_supply as object as ComponentJson)
    : null;
  const casing = data.casing ? (data.casing as object as ComponentJson) : null;

  const components = [
    {
      title: "CPU",
      icon: <KategoriCpu width="27" height="27" />,
      components: cpu ? [cpu] : [],
      category: ComponentCategoryEnum.CPU,
    },
    {
      title: "Cooler",
      icon: <KategoriCpuCooler width="27" height="27" />,
      components: cpu_cooler ? [cpu_cooler] : [],
      category: ComponentCategoryEnum.Cooler,
    },
    {
      title: "GPU",
      icon: <KategoriGpu width="27" height="27" />,
      components: gpu ? [gpu] : [],
      category: ComponentCategoryEnum.GPU,
    },
    {
      title: "Internal Storage",
      icon: <KategoriInternalStorage width="27" height="27" />,
      components: internal_storages ? [...internal_storages] : [],
      category: ComponentCategoryEnum.Storage,
    },
    {
      title: "Memories",
      icon: <KategoriRam width="27" height="27" />,
      components: memories ? [...memories] : [],
      category: ComponentCategoryEnum.Memory,
    },
    {
      title: "Monitors",
      icon: <KategoriMonitor width="27" height="27" />,
      components: monitors ? [monitors] : [],
      category: ComponentCategoryEnum.Monitor,
    },
    {
      title: "Motherboard",
      icon: <KategoriMotherboard width="27" height="27" />,
      components: motherboard ? [motherboard] : [],
      category: ComponentCategoryEnum.Motherboard,
    },
    {
      title: "Power Supply",
      icon: <KategoriPsu width="27" height="27" />,
      components: power_supply ? [power_supply] : [],
      category: ComponentCategoryEnum.PSU,
    },
    {
      title: "Casing",
      icon: <KategoriCasing width="27" height="27" />,
      components: casing ? [casing] : [],
      category: ComponentCategoryEnum.Casing,
    },
  ];

  const handleAddComponent = (item: any) => {
    // TODO: Implement add component functionality
  };

  const handleRemoveComponent = (component: any, category: ComponentCategoryEnum) => {
    // TODO: Implement remove component functionality
  };

  return (
    <>
      <div className="m-auto flex max-w-3xl flex-col gap-4 p-6 tablet:max-w-screen-desktop">
        <div className="flex flex-col gap-2 tablet:flex-row tablet:gap-8">
          <div className="flex flex-col gap-4 tablet:w-1/2">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl">
              <Image
                src={imageUrls[0] ?? ""}
                alt={data.title ?? ""}
                fill
                className="object-contain bg-white"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-square h-16 w-16 tablet:h-20 tablet:w-20 flex-shrink-0 overflow-hidden rounded-md"
                >
                  <Image
                    src={url ?? ""}
                    alt={`${data.title ?? ""} ${index + 1}`}
                    fill
                    className="object-contain bg-white"
                    sizes="(max-width: 768px) 64px, 80px"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="m-auto flex w-full flex-col gap-2 pt-0 tablet:m-0 tablet:max-w-4xl tablet:pt-6">
            <header>
              <h1 className="text-4xl tablet:font-bold">{name}</h1>
            </header>
            <main className="m-auto flex w-full flex-col gap-6">
              <div className="rounded-xl p-2 tablet:p-4 shadow-bm shadow-black/5 bg-navbar border border-gray-700 overflow-x-auto">
                <table className="w-full min-w-[800px] table-auto border-collapse">
                  <thead className="h-12 border-b border-zinc-300 text-left text-base tablet:text-lg">
                    <tr>
                      {headers.map((item) => (
                        <th key={item} className="px-2 tablet:px-4 py-3 font-semibold">{item}</th>
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
                          className={`h-12 ${!isLastRow ? "border-b border-zinc-700" : ""}`}
                        >
                          <td className="pl-2 tablet:pl-4 py-3 font-bold text-sky-500">
                            <Link 
                              href={'/produk/' + categoryEnumToSlug[item.category]}
                              className="flex flex-row items-center hover:underline"
                            >
                              {item.title}
                            </Link>
                          </td>
                          
                          <td className="px-2 tablet:px-4 py-3">
                            <div className="flex flex-col gap-2">
                              {item.components.map((component, index) => (
                                <Link
                                  key={index}
                                  className="flex h-[72px] cursor-pointer flex-row items-center rounded-md hover:bg-zinc-700 p-2 transition-colors"
                                  href={`/produk/${categoryEnumToSlug[item.category]}/${component.slug}`}
                                >
                                  <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div>
                                          {component.image_filename && component.image_filename.length > 0 && component.product_id && (
                                            <div 
                                              className="h-12 w-12 tablet:h-16 tablet:w-16 overflow-hidden rounded-md bg-no-repeat bg-center bg-contain bg-white"
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
                                          className="relative w-48 h-48 tablet:w-64 tablet:h-64 rounded-md overflow-hidden"
                                          onContextMenu={(e) => e.preventDefault()}
                                        >
                                          <div
                                            className="w-full h-full bg-no-repeat bg-center bg-contain bg-white"
                                            style={{
                                              backgroundImage: `url(${productImage(component.product_id!, component.image_filename!)})`,
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
                                        <span className="ml-2 tablet:ml-4 font-semibold text-sm tablet:text-base line-clamp-2">
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
                                  className="w-fit h-8 tablet:h-10 text-white my-2 hover:bg-blue-500 px-3 tablet:px-4 text-sm tablet:text-base"
                                  onClick={() => handleAddComponent(item)}
                                >
                                  + Pilih {item.title}
                                </Button>
                              ) : (
                                (item.title === "Memory (RAM)" || item.title === "Storage") && (
                                  <Button
                                    variant="outline"
                                    className="w-fit h-8 tablet:h-10 my-2 bg-zinc-800 text-white hover:bg-zinc-700 px-3 tablet:px-4 text-sm tablet:text-base"
                                    onClick={() => handleAddComponent(item)}
                                  >
                                    + Tambah {item.title}
                                  </Button>
                                )
                              )}
                            </div>
                          </td>
                          
                          <td className="px-2 tablet:px-4 py-3">
                            <div className="flex flex-col gap-4">
                              {item.components.map((component, index) => (
                                <div key={index} className="flex h-[48px] items-center">
                                  <span className="whitespace-nowrap font-normal text-sm tablet:text-base">
                                    {component.price
                                      ? `Rp ${component.price.toLocaleString("id-ID")}`
                                      : "-"}
                                  </span>
                                </div>
                              ))}
                              {needsBottomSpace && <div className="h-4" />}
                            </div>
                          </td>
                          
                          <td className="px-2 tablet:px-4 py-3">
                            <div className="flex flex-col gap-4">
                              {item.components.map((component, index) => (
                                <div key={index} className="flex items-center h-[48px]">
                                  <AlertDialog>
                                    <AlertDialogTrigger variant="ghost" className="h-8 tablet:h-10 items-center">
                                      <Trash2 size={16} 
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
                                          onClick={() => handleRemoveComponent(component, item.category)}
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
                <div className="flex items-center rounded-xl p-3 tablet:p-4 text-lg tablet:text-xl font-bold shadow-bm shadow-black/5 bg-navbar border border-gray-700">
                  Total: <span className="ml-2 text-sky-500">Rp {price ? price.toLocaleString() : "0"}</span>
                </div>
              </div>
            </main>
          </div>
        </div>
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="text-3xl font-semibold">
              Video Review
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-4 p-4">
              {review_urls.map((url: string) => (
                <iframe
                  key={url}
                  src={url}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="text-3xl font-semibold">
              Komentar
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1 ">
              <div className="rounded-xl bg-white p-4 shadow-bm shadow-black/5 dark:bg-navbar">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1">
                    {data.comments.map((comment) => (
                      <div key={comment.id} className="flex flex-col gap-1">
                        <span className="text-primary">{comment.name}</span>
                        <span className="text-sm">{comment.comment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="text-2xl font-semibold tablet:text-3xl">
              Produk Pilihan Khusus Untuk Kamu
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1"></AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="sticky bottom-0 z-10 flex min-h-[80px] items-center justify-between overflow-x-auto overflow-y-hidden bg-navbar px-4 py-2 shadow-tm">
        <div className="flex items-center gap-2">
          {imageUrls[0] && (
            <Image
              src={imageUrls[0]}
              alt={`Gambar ${name}`}
              className="aspect-square rounded-md border border-[#3d434e] object-scale-down"
              width={72}
              height={72}
            />
          )}
          <span className="w-[280px] font-semibold">{name}</span>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col">
            <span className="text-xs">Estimasi harga:</span>
            <span className="whitespace-nowrap font-bold text-primary">
              Rp {price}
            </span>
          </div>
          <a href={buyLink} target="_blank" rel="noopener noreferrer">
            <Button
              variant="success"
              className="flex justify-center rounded-lg px-2 py-2 text-sm font-normal text-white tablet:block tablet:w-fit"
            >
              Beli Sekarang
            </Button>
          </a>
          {/* <Link href={`/simulasi/${data.build_id}`}  >
            <Button
              variant="default"
              className="flex justify-center rounded-lg px-2 py-2 text-sm font-normal text-white tablet:block tablet:w-fit"
            >
              + Customize
            </Button>
          </Link> */}

          {/* <Button
            variant="ghost"
            className="flex items-center px-2 font-semibold"
            onClick={() => alert("Coming Soon")}
          >
            <Heart className="fill-none " width="24" height="24" />
          </Button> */}
          <Button
            variant="ghost"
            className="flex items-center px-2 font-semibold"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href).then(
                () => {
                  alert("Link copied to clipboard");
                },
                (err) => {
                  console.error("Failed to copy link:", err);
                },
              );
            }}
          >
            <Send className="fill-none" width="24" height="24" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Component;
