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

// TODO: fix colors

const KategoriSlugClient = ({
  name,
  data,
  product_details,
  imageUrls,
  componentInfo,
  lowest_price,
  type,
  category,
  spec_url,
  review_urls,
}: {
  name: string;
  data: any;
  product_details: any;
  imageUrls: string[];
  componentInfo: any[];
  lowest_price: string | undefined
  type: string;
  category: ComponentCategoryEnum;
  spec_url: string | undefined;
  review_urls: string[] | undefined;
}) => {
  const [urls, setUrls] = useState<string[]>([]);
  useEffect(() => {
    if(review_urls) {
      const processedUrls = review_urls?.map((url) => {
        try {
          return `https://www.youtube.com/embed${new URL(url).pathname}`;
        } catch (error) {
          return '';
        }
      }).filter(Boolean);
      
      setUrls(processedUrls);
    }
  }, [review_urls]);
  return (
    <div className="m-auto mt-24 flex max-w-3xl flex-col gap-4 p-6 tablet:max-w-screen-desktop">
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
            {lowest_price && (
              <span className="">
                <span className="text-4xl font-bold text-primary">
                  Rp {lowest_price}
                </span>
                <span> (Harga Termurah)</span>
              </span>
            )}
            <span>
              Kategori:{" "}
              <Link className="text-primary" href={"/produk/" + type}>
                <span className="text-base hover:underline">
                  {categoryEnumToTitle[category]}
                </span>
              </Link>
            </span>
            <div className="flex flex-row gap-2">
              <Button
                variant="success"
                className="flex justify-center rounded-lg px-2 py-2 text-sm font-normal text-white tablet:block tablet:w-fit"
              >
                Beli Sekarang
              </Button>
              <Button
                variant="default"
                className="flex justify-center rounded-lg px-2 py-2 text-sm font-normal text-white tablet:block tablet:w-fit"
                onClick={() => alert("Coming soon")}
              >
                + Tambahkan ke Simulasi Rakit PC
              </Button>
            </div>
            <div className="flex flex-row gap-6">
              <Button
                variant="ghost"
                className="flex items-center gap-2 font-semibold"
                onClick={() => alert("Coming Soon")}
              >
                <Heart className="fill-none " width="24" height="24" />
                <span className="text-lg">Tambah ke wishlist</span>
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-2 font-semibold"
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
                <span className="text-lg">Bagikan</span>
              </Button>
            </div>
            <Accordion type="single" collapsible defaultValue="product-details">
              <AccordionItem value="product-details">
                <AccordionTrigger className="w-full text-3xl font-semibold">
                  Tentang Produk
                </AccordionTrigger>
                <AccordionContent className="mt-4 gap-2 leading-[120%]">
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
                      <Link href={detail.url} 
                      
                      >
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
                          <Link href={detail.url} target="_blank"
                          >
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
        <div className="relative">
          <AccordionTrigger className="flex w-full justify-start text-3xl font-semibold">
            Spesifikasi
            <span className="mr-auto" />
          </AccordionTrigger>
          
          {spec_url && (
            <Link
              href={spec_url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-[140px] top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md border border-neutral-400
              dark:border-neutral-100 bg-transparent px-3 py-1.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-300 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none dark:text-neutral-50 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 ml-8 mr-auto"
              onClick={(e) => e.stopPropagation()}
            >
              Buka Spesifikasi Resmi
            </Link>
          )}
        </div>

          <AccordionContent>
            <table className="flex flex-col gap-2 rounded-lg border bg-slate-200 drop-shadow-sm dark:bg-slate-800">
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
                    className="border-b last:border-none"
                  >
                    <td className="whitespace-nowrap border-r p-4">
                      {info.title}
                    </td>
                    <td className="w-full p-4 font-semibold">
                      {info.value && typeof info.value === "object"
                        ? JSON.stringify(info.value)
                        : info.value ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {(review_urls?.length ?? -1) > 0 && (
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
