"use client";

import { Heart, MapPin, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { categoryEnumToTitle, ComponentCategoryEnum } from "@/lib/db";
import { isUrl } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { toast } from "sonner";
import { insertOrCreateSession } from "@/lib/build-session";
import { useRouter } from "next/navigation";

// TODO: fix colors
export type ComponentInfo = {
    title: string | undefined;
    value: string | number | boolean | string[] | null | undefined;
}[] | undefined

const KategoriSlugClient = ({
  name,
  data,
  product_details,
  imageUrls,
  componentInfo,
  lowest_price,
  type,
  category,
}: {
  name: string;
  data: any;
  product_details: any;
  imageUrls: string[];
  componentInfo: ComponentInfo;
  lowest_price: string | undefined
  type: string;
  category: ComponentCategoryEnum;
}) => {
  const router = useRouter();

  const [urls, setUrls] = useState<string[]>([]);
  useEffect(() => {
    if(data.review_urls) {
      const processedUrls = data.review_urls?.map((url: string) => {
        try {
          return `https://www.youtube.com/embed${new URL(url).pathname}`;
        } catch {
          return '';
        }
      }).filter(Boolean);
      
      setUrls(processedUrls);
    }
  }, [data.review_urls]);

  const handleAddComponent = async (product_id: number | null) => {
      if (!product_id) {
        return;
      } 
    
      try {
        const error = await insertOrCreateSession(category, product_id);
    
        if (!error) {
          router.replace('/simulasi')

          toast.success(`Berhasil menambahkan ${categoryEnumToTitle[category]} baru ke simulasi`, {
            icon: "✅",
            position: "top-right",
            duration: 4000,
          });
        } else {
          console.error("Error occurred:", error);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };
  return (
    <div className="m-auto mt-24 flex max-w-4xl flex-col gap-4 p-6 tablet:max-w-screen-desktop">
      <div className="flex flex-col md:flex-row">
          {/* Image Section - Left Side - Now Sticky */}
          <div className="w-full md:w-1/2 lg:w-2/5 md:sticky md:top-4 md:self-start">
            <div className="aspect-square max-w-sm overflow-hidden rounded-md border border-[#1C1F24] border-opacity-40 dark:border-[#3d434e]">
              <div
                className="flex h-full w-full items-center justify-center"
                onMouseMove={(event: React.MouseEvent<HTMLDivElement>) => {
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
                    className="object-fill bg-white"
                    width={360}
                    height={360}
                  ></img>
                )}
              </div>
            </div>
            <Carousel className="w-full max-w-sm my-4">
              <CarouselContent className="-ml-1">
                {imageUrls.map((url: string | undefined) => (
                  <CarouselItem key={url} className="pl-1 md:basis-1/5 lg:basis-1/5">
                    <img
                      onClick={() => {
                        const compimg = document.getElementById(
                          "compimg",
                        ) as HTMLImageElement | null;
                        if (compimg && url) {
                          compimg.src = url;
                        }
                      }}
                      src={url}
                      alt={`Gambar ${name}`}
                      className="aspect-square object-fill bg-white rounded-md border border-[#1C1F24] border-opacity-40 hover:cursor-pointer hover:bg-slate-200 dark:border-[#3d434e]"
                      width={240}
                      height={240}
                    ></img>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious variant='secondary'/>
              <CarouselNext variant='secondary'/>
            </Carousel>
          </div>


        {/* Product Info Section - Right Side */}
        <div className="w-full md:w-1/2 lg:w-3/5">
          <header>
            <h1 className="text-4xl font-bold">{name}</h1>
          </header>
          <main className="flex flex-col gap-4 mt-4">
            {lowest_price && (
              <span className="flex items-center gap-2 text-lg font-semibold">
                <span className="text-4xl font-bold text-primary">
                  Rp {lowest_price}
                </span>
                <span> (Harga Termurah)</span>
              </span>
            )}
            <span>
              Kategori:{" "}
              <Link className="text-primary" href={"/produk/" + type}>
                <span className="text-lg font-semibold">
                  {categoryEnumToTitle[category]}
                </span>
              </Link>
            </span>
            <div className="flex flex-row gap-2">
              <Button
                variant="default"
                className="flex items-center justify-center rounded-lg p-2 px-4 text-base font-normal text-white hover:bg-primary/80"
                onClick={() => handleAddComponent(data.product_id)}
              >
                + Tambah ke simulasi
              </Button>
            </div>
            <div className="flex flex-row gap-6 mt-4">
              <div
                className="flex gap-2 font-semibold hover:cursor-pointer"
                onClick={() => alert("Coming Soon")}
              >
                <Heart className="fill-none" width="24" height="24" />
                <span className="text-lg">Wishlist</span>
              </div>
              <div
                className="flex items-center gap-2 font-semibold hover:cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href).then(
                    () => {
                      toast("Link berhasil disalin", {
                        icon: "📋",
                        position: "top-center",
                        description: "Anda dapat membagikan link ini ke teman Anda.",
                        duration: 4000,
                      })
                    },
                    (err) => {
                      toast.error("Gagal menyalin link", {
                        icon: "❌",
                        position: "top-center",
                        description: "Terjadi kesalahan saat menyalin link.",
                        duration: 4000,
                      })
                    },
                  );
                }}
              >
                <Send className="fill-none" width="24" height="24" />
                <span className="text-lg">Bagikan</span>
              </div>
            </div>
            <Accordion type="single" collapsible defaultValue="product-details">
              <AccordionItem value="product-details">
                <AccordionTrigger className="w-full text-3xl font-semibold">
                  Tentang Produk
                </AccordionTrigger>
                <AccordionContent className="mt-4 gap-2 leading-[120%] text-base">
                  {/* @ts-expect-error */}
                  {data.description.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </main>
        </div>
      </div>
      <Accordion type="single" collapsible defaultValue="product-details">
        <AccordionItem value="product-details">
          <AccordionTrigger>
            <div id="compare" className="text-3xl font-semibold">
              Bandingkan Produk
            </div>
          </AccordionTrigger>
          <AccordionContent className="mt-4 gap-2 leading-[120%]">
            {(product_details?.length ?? 0) == 0 ? (
              <span className="text-lg font-semibold">
                Belum ada link produk
              </span>
            ) : (
              <>
                <div className="flex w-full flex-col gap-2 tablet:hidden">
                  {product_details?.map((detail: any) => (
                    <div
                      key={detail.product_detail_id}
                      className="
                      flex
                      flex-col
                      gap-2
                      rounded-xl
                      border
                      bg-slate-200 p-2
                      text-black
                      shadow-lg
                      transition-all
                      dark:bg-slate-800
                      "
                    >
                      <span className="text-xl font-semibold">
                        Rp{detail.price.toLocaleString("id-ID")}
                      </span>
                      <div className="flex flex-row gap-1">
                        <MapPin />
                        {detail.seller_city}
                      </div>
                      <Link href={detail.url} >
                        <Button className="bg-green-600 text-center">
                          Beli Sekarang
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
                <table className="hidden w-full tablet:table">
                  <thead className="font-bold text-white drop-shadow-sm">
                    <tr>
                      <td className="rounded-s-lg bg-primary p-2 pl-8">
                        Merchant
                      </td>
                      <td className="bg-primary p-2">Nama Toko</td>
                      <td className="bg-primary p-2">Lokasi Toko</td>
                      <td className="bg-primary p-2">Harga</td>
                      <td className="bg-primary p-2">Stok</td>
                      <td className="bg-primary p-2">Details</td>
                      <td className="rounded-e-lg bg-primary p-2 pr-8"></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="h-4" />
                    {product_details?.map((detail: any) => (
                      <tr key={detail.product_detail_id} className="drop-shadow-sm">
                        <td className="rounded-s-lg bg-slate-200 p-2 pl-8 dark:bg-slate-800">
                            {detail.marketplace_name === "Tokopedia" && (
                              <Image
                                src="/images/logo-tokopedia.svg"
                                height={32}
                                width={96}
                                alt="Tokopedia Logo"
                              />
                            )}
                            {detail.marketplace_name === "Shopee" && (
                              <Image
                                src="/images/logo-shopee.svg"
                                height={32}
                                width={96}
                                alt="Shopee Logo"
                              />
                            )}
                            {detail.marketplace_name === "Blibli" && (
                              <Image
                                src="/images/logo-blibli.svg"
                                height={32}
                                width={96}
                                alt="Blibli Logo"
                              />
                            )}
                          </td>
                        <td className="bg-slate-200 p-2 dark:bg-slate-800">
                          {detail.seller_name}
                        </td>
                        <td className="bg-slate-200 p-2 dark:bg-slate-800">
                          {detail.seller_city}
                        </td>
                        <td className="bg-slate-200 p-2 font-semibold dark:bg-slate-800">
                          Rp {detail.price.toLocaleString("id-ID")}
                        </td>
                        <td className="bg-slate-200 p-2 dark:bg-slate-800">
                          {detail.stock}
                        </td>
                        <td className="bg-slate-200 p-2 dark:bg-slate-800">
                          {detail.product_detail_description ?? "-"}
                        </td>
                        <td className="flex justify-end rounded-e-lg bg-slate-200 p-2 pr-8 dark:bg-slate-800">
                          <Link href={detail.url} target="_blank" >
                            <Button variant="success" className="text-center text-white">
                              Beli
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible defaultValue="spec-details">
        <AccordionItem value="spec-details">
        <div className="relative mb-4">
          <AccordionTrigger className="flex w-full justify-start text-3xl font-semibold">
            Spesifikasi
            <span className="mr-auto" />
          </AccordionTrigger>
          
          {data.spec_url && (
            <Link
              href={data.spec_url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-[140px] top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md border border-neutral-400
              dark:border-white bg-transparent px-3 py-1.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-300 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none dark:text-neutral-50 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 ml-8 mr-auto"
              onClick={(e) => e.stopPropagation()}
            >
              Buka Spesifikasi Resmi
            </Link>
          )}
        </div>

          <AccordionContent>
            <table className="flex flex-col rounded-lg border bg-slate-200 drop-shadow-sm dark:bg-slate-800">
              <thead className="hidden">
                <tr>
                  <td />
                  <td />
                </tr>
              </thead>
              <tbody>
                {componentInfo?.map((info: any, index) => (
                  <tr
                    key={"componentinfo-" + index}
                    className="border-b last:border-none border-slate-700 hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="whitespace-nowrap border-r border-slate-700 p-4 text-slate-300">
                      {info.title}
                    </td>
                    <td className="w-full p-4 text-slate-100">
                      {(() => {
                        if (!info.value && info.value !== 0 && info.value !== false) return <span className="text-slate-500">N/A</span>;
                        
                        // Handle array case
                        if (Array.isArray(info.value)) {
                          return info.value.map((item: any, i: number) => (
                            <div key={i} className="mb-1 last:mb-0">
                              {typeof item === 'string' && isUrl(item) 
                                ? <Link 
                                  target="_blank"
                                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2" 
                                  href={item}>{item}</Link> 
                                : item}
                            </div>
                          ));
                        }
                        
                        // Handle object case
                        if (typeof info.value === 'object') {
                          return <pre className="text-sm bg-slate-800/50 p-2 rounded overflow-x-auto">{JSON.stringify(info.value, null, 2)}</pre>;
                        }
                        
                        // Handle string case
                        if (typeof info.value === 'string') {
                          // Check for URL
                          if (isUrl(info.value)) {
                            return <Link 
                              target="_blank"
                              className="text-blue-400 hover:text-blue-300 underline underline-offset-2" 
                              href={info.value}>{info.value}</Link>;
                          }
                          
                          // Check for newlines in string
                          if (info.value.includes('\n')) {
                            return (
                              <div className="whitespace-pre-line bg-slate-800/50 rounded">
                                {info.value.split('\n').map((line: string, i: number) => (
                                  <div key={i}>{line || <br />}</div>
                                ))}
                              </div>
                            );
                          }
                        }
                        
                        // Default case (numbers, booleans, etc)
                        return <span>{info.value.toString()}</span>;
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {(data.review_urls?.length ?? -1) > 0 && (
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-3xl font-semibold">
              Video Review
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1 tablet:grid tablet:grid-cols-3">
              {urls.map((url: any) => (
                <iframe
                  key={url}
                  src={url}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="mb-1 aspect-video w-full rounded-xl"
                  allowFullScreen
                ></iframe>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default KategoriSlugClient;

