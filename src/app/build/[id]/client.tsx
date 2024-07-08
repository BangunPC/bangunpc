"use client";

import { Heart, Send } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Database } from "~/lib/schema";

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

const Component = ({
  data,
  imageUrls,
  price,
}: {
  data: Database["pc_build"]["Views"]["v_recommendation"]["Row"];
  imageUrls: string[];
  price: string | undefined;
}) => {
  const name = data.title;
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
                <span className="">
                  <span className="text-4xl font-bold text-primary">
                    Rp {price}
                  </span>
                </span>
              )}
              <div className="h-2" />
              <div className="flex flex-wrap gap-2">
                {data.categories_name &&
                  data.categories_name?.map((category) => (
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
        {true && (
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-3xl font-semibold">
                Komponen Paket PC
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 ">
                <span>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>

      <div className="sticky bottom-0 z-10 flex h-[80px] items-center justify-between bg-white px-4 shadow-tm dark:bg-navbar">
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
          <span className="font-semibold">{name}</span>
        </div>
        <div className="w-2" />
        <div className="flex gap-2">
          <div className="flex flex-col">
            <span className="text-xs">Total harga:</span>
            <span className="whitespace-nowrap font-bold text-primary">
              Rp {price}
            </span>
          </div>
          <Button
            variant="success"
            className="flex justify-center rounded-lg px-2 py-2 text-sm font-normal text-white tablet:block tablet:w-fit"
            // onClick={() => router.replace("#compare", { scroll: true })}
            // onClick={() => router.replace("#compare", { scroll: true })}
          >
            Beli Sekarang
          </Button>
          <Button
            variant="default"
            className="flex justify-center rounded-lg px-2 py-2 text-sm font-normal text-white tablet:block tablet:w-fit"
            onClick={() => alert("Coming soon")}
          >
            + Customize
          </Button>

          <Button
            variant="ghost"
            className="flex items-center px-2 font-semibold"
            onClick={() => alert("Coming Soon")}
          >
            <Heart className="fill-none " width="24" height="24" />
          </Button>
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
