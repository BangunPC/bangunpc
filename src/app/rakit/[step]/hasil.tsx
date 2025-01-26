"use client";

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { pcImage } from "@/lib/utils";
import { RecommendationHasilType } from "./page";
import { useSearchParams } from "next/navigation";

export default function HasilSection({
  component,
}: {
  component: RecommendationHasilType;
}) {
  const searchParams = useSearchParams()!;
  const budget = searchParams.get("b") ?? 0;
  const multiSelect = searchParams.getAll("r");
  const currentPage = parseInt(searchParams.get("p") ?? "1");

  const getDest = () => {
    let dest = `?b=${budget}`;
    for (const item of multiSelect) {
      dest += `&r=${item}`;
    }

    return dest;
  };

  const { data } = component;

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

      {data && (
        <div className="m-auto grid w-fit grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 tablet:grid-cols-3 desktop:grid-cols-4">
          {data.map((item: any) => (
            <Link
              prefetch={false}
              href={`/build/${item.recommendation_id}`}
              key={item.build_id}
              className={`m-auto flex h-full max-w-[243px] cursor-pointer flex-col overflow-clip rounded-lg border-2 border-background/50 bg-white shadow-bm hover:border-primary/30
            dark:bg-black`}
            >
              <div className="flex aspect-square items-center justify-center bg-[#EAE7EE] dark:bg-[#201C27]">
                <Image
                  src={pcImage(item.build_id!, item.image_filenames![0]!)}
                  alt="rakitan pc"
                  width={210}
                  height={210}
                />
              </div>
              <div className="flex flex-col justify-between gap-2 p-2">
                <span className="bold text-xs text-gray-700 dark:text-gray-300">
                  {item.title}
                </span>
                {/* <span className="text-xs text-gray-500 dark:text-gray-400">
                {item.cpu}
                <br />
                {item.gpu}
              </span> */}
                <div className="flex flex-wrap gap-2">
                  {item.categories_name?.map((category: any) => (
                    <span
                      key={category}
                      className="w-fit rounded-md border border-primary px-2 py-1 text-xs text-primary"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="border-t-divider mt flex flex-row border-t pt-2">
                  <span className="text font-semibold">
                    Rp {item.total_price?.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="h-8" />

      <div className="flex items-center justify-center gap-4">
        <Link prefetch={false} href="#">
          <Button variant="ghost">
            <ChevronLeft />
          </Button>
        </Link>
        {Array.from(
          { length: Math.max(1, Math.ceil(component.count! / 3)) },
          (_, index) => (
            <Link prefetch={false} href="#" key={index}>
              <Button
                variant="ghost"
                className={
                  index + 1 === currentPage
                    ? "bg-primary text-white hover:bg-primary hover:text-white"
                    : ""
                }
              >
                {index + 1}
              </Button>
            </Link>
          ),
        )}
        <Link prefetch={false} href="#">
          <Button variant="ghost">
            <ChevronRight />
          </Button>
        </Link>
      </div>

      <div className="h-4" />

      <div className="flex justify-start">
        <Link prefetch={false} href={`/rakit/rencana${getDest()}`} 
        
        >
          <Button className="justify-center font-semibold">
            <ArrowLeft className="mr-2 inline-block" />
            Kembali
          </Button>
        </Link>
      </div>
    </>
  );
}
