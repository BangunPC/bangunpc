"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function HasilSection() {
  const hasilList = [
    {
      img: "/images/preview-1.png",
      name: "AMD Ryzen 3 3200G - Radeon Vega 8 - RAM 8 GB - SSD 120GB SATA",
      price: "Rp 15.200.000",
      marketplace: "Shopee",
      seller: "Pahlawan Gadget",
    },
    {
      img: "/images/preview-2.png",
      name: "AMD Ryzen 3 3200G - Radeon Vega 8 - RAM 8 GB - SSD 120GB SATA",
      price: "Rp 15.200.000",
      marketplace: "Shopee",
      seller: "Pahlawan Gadget",
    },
    {
      img: "/images/preview-2.png",
      name: "AMD Ryzen 3 3200G - Radeon Vega 8 - RAM 8 GB - SSD 120GB SATA",
      price: "Rp 15.200.000",
      marketplace: "Shopee",
      seller: "Pahlawan Gadget",
    },
    {
      img: "/images/preview-1.png",
      name: "AMD Ryzen 3 3200G - Radeon Vega 8 - RAM 8 GB - SSD 120GB SATA",
      price: "Rp 15.200.000",
      marketplace: "Shopee",
      seller: "Pahlawan Gadget",
    },
    {
      img: "/images/preview-2.png",
      name: "AMD Ryzen 3 3200G - Radeon Vega 8 - RAM 8 GB - SSD 120GB SATA",
      price: "Rp 15.200.000",
      marketplace: "Shopee",
      seller: "Pahlawan Gadget",
    },
    {
      img: "/images/preview-2.png",
      name: "AMD Ryzen 3 3200G - Radeon Vega 8 - RAM 8 GB - SSD 120GB SATA",
      price: "Rp 15.200.000",
      marketplace: "Shopee",
      seller: "Pahlawan Gadget",
    },
  ];

  return (
    <>
      <span className=" w-full text-center font-semibold">
        Rekomendasi rakitan sesuai budget [budget] dan kebutuhan [kebutuhan]
        Anda.
      </span>

      <div className="h-8" />

      <div className="m-auto grid max-w-screen-tablet grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 tablet:grid-cols-4 ">
        {hasilList.map((item) => (
          <div
            key={item.name}
            className={`m-auto flex h-[329px] max-w-[210px] cursor-pointer flex-col overflow-clip rounded-lg border-2 border-background/50 bg-white shadow-bm hover:border-primary/30
            dark:bg-black`}
          >
            <div className="aspect-square bg-[#EAE7EE] dark:bg-[#201C27]">
              <Image src={item.img} alt="rakitan pc" width={210} height={210} />
            </div>
            <div className="flex flex-col gap-2 p-2">
              <span className="text-xs text-gray-700 dark:text-gray-300">
                {item.name}
              </span>
              <span className="text font-semibold">{item.price}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {item.seller}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Link href="/rakit/rencana" className="flex justify-start" passHref>
        <Button className="mt-4 justify-center font-semibold">
          <ArrowLeft className="mr-2 inline-block" />
          Kembali
        </Button>
      </Link>
    </>
  );
}
