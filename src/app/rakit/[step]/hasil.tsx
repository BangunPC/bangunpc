"use client";

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function HasilSection() {
  const hasilList = [
    {
      img: "/images/preview-1.png",
      name: "Paket rakitan PC Spek Gaming dan Spek Editing 3D atau Animasi",
      cpu: "AMD Ryzen 5 3600",
      gpu: "GeForce 1070 RTX",
      tags: ["Gaming", "Editing", "Rendering", "Programming"],
      ram: "8 GB",
      price: "Rp 15.200.000",
      heart: "120",
      comments: "40",
    },
    {
      img: "/images/preview-1.png",
      name: "Paket rakitan PC Spek Gaming dan Spek Editing 3D atau Animasi",
      cpu: "AMD Ryzen 5 3600",
      gpu: "GeForce 1070 RTX",
      tags: ["Gaming", "Programming"],
      ram: "8 GB",
      price: "Rp 15.200.000",
      heart: "120",
      comments: "40",
    },
    {
      img: "/images/preview-1.png",
      name: "Paket rakitan PC Spek Gaming dan Spek Editing 3D atau Animasi",
      cpu: "AMD Ryzen 5 3600",
      gpu: "GeForce 1070 RTX",
      tags: ["Gaming", "Editing", "Rendering", "Programming"],
      ram: "8 GB",
      price: "Rp 15.200.000",
      heart: "120",
      comments: "40",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <span className=" w-full text-center text-lg font-bold">
          <Image
            src="/images/pilih_sesuai_budget.svg"
            alt="pc icon"
            width={31}
            height={40}
            className="mr-2 inline"
          />
          Pilih Paket Rakitan PC
        </span>
        <div className="h-4" />
        <span className="text-center text-gray-500">
          Kami sudah menyusun PC berdasarkan budget dan kebutuhan aktivitasmu.
        </span>
      </div>

      <div className="h-8" />

      <div className="m-auto grid max-w-screen-tablet grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 tablet:grid-cols-3 desktop:grid-cols-4">
        {hasilList.map((item) => (
          <div
            key={item.name}
            className={`m-auto flex h-full max-w-[243px] cursor-pointer flex-col overflow-clip rounded-lg border-2 border-background/50 bg-white shadow-bm hover:border-primary/30
            dark:bg-black`}
          >
            <div className="aspect-square bg-[#EAE7EE] dark:bg-[#201C27]">
              <Image src={item.img} alt="rakitan pc" width={210} height={210} />
            </div>
            <div className="flex flex-col justify-between gap-2 p-2">
              <span className="text-xs text-gray-700 dark:text-gray-300">
                {item.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {item.cpu}
                <br />
                {item.gpu}
              </span>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="w-fit rounded-md border border-primary px-2 py-1 text-xs text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="border-t-divider mt flex flex-row border-t pt-2">
                <span className="text font-semibold">{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-8" />

      <div className="flex items-center justify-center gap-4">
        <Link href="#">
          <Button variant="ghost">
            <ChevronLeft />
          </Button>
        </Link>
        <Link href="#">
          <Button variant="ghost">1</Button>
        </Link>
        <Link href="#">
          <Button
            variant="ghost"
            className="bg-primary text-white hover:bg-primary hover:text-white"
          >
            2
          </Button>
        </Link>
        <Link href="#">
          <Button variant="ghost">3</Button>
        </Link>
        <Link href="#">
          <Button variant="ghost">4</Button>
        </Link>
        <Link href="#">
          <Button variant="ghost">5</Button>
        </Link>
        <Link href="#">
          <Button variant="ghost">
            <ChevronRight />
          </Button>
        </Link>
      </div>

      <div className="h-4" />

      <div className="flex justify-start">
        <Link href="/rakit/rencana" className="" passHref>
          <Button className="justify-center font-semibold">
            <ArrowLeft className="mr-2 inline-block" />
            Kembali
          </Button>
        </Link>
      </div>
    </>
  );
}
