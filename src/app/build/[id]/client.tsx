"use client";

import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from 'react-hot-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import KategoriCasing from "~/components/ui/icon/kategori-casing";
import KategoriCpu from "~/components/ui/icon/kategori-cpu";
import KategoriCpuCooler from "~/components/ui/icon/kategori-cpu-cooler";
import KategoriGpu from "~/components/ui/icon/kategori-gpu";
import KategoriInternalStorage from "~/components/ui/icon/kategori-internal-storage";
import KategoriMonitor from "~/components/ui/icon/kategori-monitor";
import KategoriMotherboard from "~/components/ui/icon/kategori-motherboard";
import KategoriPsu from "~/components/ui/icon/kategori-psu";
import KategoriRam from "~/components/ui/icon/kategori-ram";
import { categoriesFromEnum, ComponentCategory } from "~/lib/db";
import { Database } from "~/lib/schema";
import { productImage } from "~/lib/utils";

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

  const cpu = data.cpu ? (data.cpu as Object as ComponentJson) : null;
  const cpu_cooler = data.cpu_cooler
    ? (data.cpu_cooler as Object as ComponentJson)
    : null;
  const gpu = data.gpu ? (data.gpu as Object as ComponentJson) : null;
  const internal_storages = data.internal_storages
    ? (data.internal_storages as Object[] as ComponentJson[])
    : null;
  const memories = data.memories
    ? (data.memories as Object[] as ComponentJson[])
    : null;
  const monitors = data.monitors
    ? (data.monitors as Object as ComponentJson)
    : null;
  const motherboard = data.motherboard
    ? (data.motherboard as Object as ComponentJson)
    : null;
  const power_supply = data.power_supply
    ? (data.power_supply as Object as ComponentJson)
    : null;
  const casing = data.casing ? (data.casing as Object as ComponentJson) : null;

  const components = [
    {
      title: "CPU",
      icon: <KategoriCpu width="27" height="27" />,
      components: cpu ? [cpu] : [],
      category: ComponentCategory.CPU,
    },
    {
      title: "Cooler",
      icon: <KategoriCpuCooler width="27" height="27" />,
      components: cpu_cooler ? [cpu_cooler] : [],
      category: ComponentCategory.Cooler,
    },
    {
      title: "GPU",
      icon: <KategoriGpu width="27" height="27" />,
      components: gpu ? [gpu] : [],
      category: ComponentCategory.GPU,
    },
    {
      title: "Internal Storage",
      icon: <KategoriInternalStorage width="27" height="27" />,
      components: internal_storages ? [...internal_storages] : [],
      category: ComponentCategory.Storage,
    },
    {
      title: "Memories",
      icon: <KategoriRam width="27" height="27" />,
      components: memories ? [...memories] : [],
      category: ComponentCategory.Memory,
    },
    {
      title: "Monitors",
      icon: <KategoriMonitor width="27" height="27" />,
      components: monitors ? [monitors] : [],
      category: ComponentCategory.Monitor,
    },
    {
      title: "Motherboard",
      icon: <KategoriMotherboard width="27" height="27" />,
      components: motherboard ? [motherboard] : [],
      category: ComponentCategory.Motherboard,
    },
    {
      title: "Power Supply",
      icon: <KategoriPsu width="27" height="27" />,
      components: power_supply ? [power_supply] : [],
      category: ComponentCategory.PSU,
    },
    {
      title: "Casing",
      icon: <KategoriCasing width="27" height="27" />,
      components: casing ? [casing] : [],
      category: ComponentCategory.Casing,
    },
  ];
  return (
    <>
      <div className="m-auto flex max-w-3xl flex-col gap-4 p-6 tablet:max-w-screen-desktop">
        <div className="flex flex-col gap-2 tablet:flex-row tablet:gap-8">
          <div className="pb-0 tablet:max-w-sm tablet:pb-6">
            <div className="mx-auto aspect-square max-w-sm items-center overflow-hidden rounded-md border border-[#1C1F24] border-opacity-40 dark:border-[#3d434e]">
              <div
                className="flex h-full w-full items-center justify-center"
                onMouseMove={(event: React.MouseEvent<HTMLDivElement>) => {
                  // zoom the image at mouse position
                  const rect = event.currentTarget.getBoundingClientRect();
                  const translate = {
                    x: event.clientX - rect.x - rect.width / 2,
                    y: event.clientY - rect.y - rect.height / 2,
                  };
                  const child = event.currentTarget
                    .firstChild as HTMLImageElement;
                  child.style.transform = `translate(${-translate.x}px, ${-translate.y}px) scale(2)`;
                }}
                onMouseLeave={(event: React.MouseEvent<HTMLDivElement>) => {
                  const child = event.currentTarget
                    .firstChild as HTMLImageElement;
                  child.style.transform = ``;
                }}
              >
                {imageUrls[0] && (
                  <img
                    id="compimg"
                    src={imageUrls[0]}
                    alt={`Gambar ${name}`}
                    className="object-fill"
                    width={360}
                    height={360}
                  ></img>
                )}
              </div>
            </div>

            <div className="my-4 grid auto-rows-fr grid-cols-4 justify-center gap-1 tablet:grid-cols-5">
              {imageUrls.map((url: string | undefined) => (
                <img
                  // onMouseEnter={() => {
                  //   const compimg = document.getElementById(
                  //     'compimg'
                  //   ) as HTMLImageElement | null;
                  //   if (compimg && url) {
                  //     compimg.src = url;
                  //   }
                  // }}
                  onClick={() => {
                    const compimg = document.getElementById(
                      "compimg",
                    ) as HTMLImageElement | null;
                    if (compimg && url) {
                      compimg.src = url;
                    }
                  }}
                  key={url}
                  src={url}
                  alt={`Gambar ${name}`}
                  className="aspect-square rounded-md border border-[#1C1F24] border-opacity-40 object-scale-down hover:cursor-pointer hover:bg-zinc-200 dark:border-[#3d434e] dark:hover:bg-zinc-800"
                  width={240}
                  height={240}
                ></img>
              ))}
            </div>
          </div>
          <div className="m-auto flex w-full flex-col gap-2 pt-0 tablet:m-0 tablet:max-w-4xl tablet:pt-6">
            <header>
              <h1 className="text-4xl tablet:font-bold">{name}</h1>
            </header>
            <main className="flex flex-col gap-2">
              {/* <div className="flex items-center gap-2">
              <Shop className="fill-none stroke-black" width="24" height="24" />
              <span className="text-lg">
                {product_details!.length} penjual dari Tokopedia, Shopee &
                lainnya
              </span>
            </div> */}
              {price && (
                <span className="flex items-start">
                  <span className="text-4xl font-bold text-primary">
                    Rp {price}
                  </span>
                  <span className="mb-auto text-xs">*estimasi</span>
                </span>
              )}
              <div className="h-2" />
              <div className="flex flex-wrap gap-2">
                {data.categories_name?.map((category) => (
                  <span
                    key={category}
                    className="w-fit rounded-md border border-primary px-2 py-1 text-xs text-primary"
                  >
                    {category}
                  </span>
                ))}
              </div>
              {data.description && (
                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="text-3xl font-semibold">
                      Description
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-1">
                      {data.description.split("\n").map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
              {/* <span>
              Kategori:{" "}
              <Link className="text-primary" href={"/katalog/" + type} passHref>
                <Button variant="link" className="p-0 text-base">
                  {categoryTitlesFromEnum[category]}
                </Button>
              </Link>
            </span> */}
            </main>
          </div>
        </div>
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="text-3xl font-semibold">
              Komponen Paket PC
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <div className="overflow-x-scroll rounded-xl bg-white p-4 shadow-bm shadow-black/5 dark:bg-navbar">
                <table className="w-full min-w-max">
                  <thead className="h-8 border-b border-black text-left dark:border-primary">
                    <tr>
                      {headers.map((item) => (
                        <th key={item}>{item}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {components
                      .filter((item) => item.components.length > 0)
                      .map((item) => (
                        <tr
                          key={item.title}
                          className="h-12 border-b border-zinc-500"
                        >
                          <td className="font-bold text-primary">
                            <div className="mb-auto mt-2 flex flex-row items-center">
                              <span className="rounded-sm p-1 dark:bg-white">
                                {item.icon}
                              </span>
                              <span className="ml-1">{item.title}</span>
                            </div>
                          </td>
                          <td>
                            <div className="flex w-full flex-col gap-1">
                              {item.components.map((component) => (
                                <Link
                                  key={component.product_id}
                                  className="flex h-[38px] cursor-pointer flex-row items-center rounded-md p-1 hover:bg-zinc-200 dark:hover:bg-zinc-600"
                                  href={`/detail/${
                                    categoriesFromEnum[item.category]
                                  }/${component.slug}-${component.product_id}`}
                                  passHref
                                >
                                  <Image
                                    src={productImage(
                                      component.product_id!,
                                      component.image_filename!,
                                    )}
                                    width={32}
                                    height={32}
                                    alt={component.name!}
                                  />
                                  <span className="ml-1 text-nowrap">
                                    {component.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </td>
                          <td>
                            <div className="flex flex-col gap-1">
                              {item.components.map((component) => (
                                <div
                                  key={component.product_id}
                                  className="flex h-[38px]"
                                >
                                  <span className="my-auto whitespace-nowrap text-start">
                                    {component.price
                                      ? `Rp ${component.price.toLocaleString(
                                          "id-ID",
                                        )}`
                                      : "-"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {/* <span>
                  {data.cpu && (
                    <>
                      cpu {(data.cpu as Object as ComponentJson).name}
                      <br />
                    </>
                  )}
                  {data.gpu && (
                    <>
                      gpu {(data.gpu as Object as ComponentJson).name}
                      <br />
                    </>
                  )}
                  {data.memories && (
                    <>
                      memories{" "}
                      {(data.memories as Object[] as ComponentJson[]).map(
                        (item) => item.name,
                      )}
                      <br />
                    </>
                  )}
                  {data.internal_storages && (
                    <>
                      internal_storages{" "}
                      {(
                        data.internal_storages as Object[] as ComponentJson[]
                      ).map((storage: ComponentJson) => storage.product_id)}
                    </>
                  )}
                  {data.monitors && (
                    <>
                      monitors {(data.monitors as Object as ComponentJson).name}
                      <br />
                    </>
                  )}
                  {data.motherboard && (
                    <>
                      motherboard{" "}
                      {(data.motherboard as Object as ComponentJson).name}
                      <br />
                    </>
                  )}
                  {data.power_supply && (
                    <>
                      power_supply{" "}
                      {(data.power_supply as Object as ComponentJson).name}
                      <br />
                    </>
                  )}
                  {data.cpu_cooler && (
                    <>
                      cpu_cooler{" "}
                      {(data.cpu_cooler as Object as ComponentJson).name}
                      <br />
                    </>
                  )}
                  {data.casing && (
                    <>
                      casing {(data.casing as Object as ComponentJson).name}
                      <br />
                    </>
                  )} 
                  </span>
                   */}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="text-3xl font-semibold">
              Produk Pilihan Khusus Untuk Kamu
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1 "></AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="sticky bottom-0 z-10 flex min-h-[80px] items-center justify-between overflow-x-auto overflow-y-hidden bg-white px-4 py-2 shadow-tm dark:bg-navbar">
        <div className="flex items-center gap-2">
          {imageUrls[0] && (
            <Image
              src={imageUrls[0]}
              alt={`Gambar ${name}`}
              className=" aspect-square rounded-md border border-[#1C1F24] border-opacity-40 object-scale-down dark:border-[#3d434e]"
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
          <Button
            variant="ghost"
            className="flex items-center px-2 font-semibold"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href).then(
                () => {
                  toast.success('Link copied to clipboard');
                },
                (err) => {
                  console.error("Failed to copy link:", err);
                  toast.error('Failed to copy link');
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
