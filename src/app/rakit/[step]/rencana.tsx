"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { RencanaListType } from "./page";

export default function RencanaSection({rencanaList}: {rencanaList: RencanaListType}) {
  const {data, error} = rencanaList;

  const [multiSelect, setMultiSelect] = useState<number[]>([]);
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
          PC-mu Mau Dipakai untuk Apa?
        </span>
        <div className="h-4" />
        <span className="text-center text-gray-500">
          Kami akan menyusun PC yang sesuai dengan kebutuhan aktivitasmu.
        </span>
      </div>

      <div className="h-8" />

      <div className="m-auto grid max-w-screen-tablet grid-cols-2 gap-2 tablet:grid-cols-3">
        {data?.map((item, index) => (
          <Label
            htmlFor={item.category_name!}
            key={item.category_name!}
            className={
              "flex w-full items-center gap-2 rounded-lg border border-transparent p-2 hover:bg-foreground/20 " +
              (multiSelect.includes(index)
                ? "border-primary"
                : "")
            }
          >
            <Checkbox
              id={item.category_name!}
              checked={multiSelect.includes(index)}
              onCheckedChange={(checked) =>
                setMultiSelect(
                  checked
                    ? [...multiSelect, index]
                    : multiSelect.filter((i) => i !== index),
                )
              }
            />
            <span>{item.category_name!}</span>
          </Label>
        ))}
      </div>

      <div className="flex justify-between">
        <Link href="/rakit/budget" className="" passHref>
          <Button className="mt-4 justify-center font-semibold">
            <ArrowLeft className="mr-2 inline-block" />
            Kembali
          </Button>
        </Link>

        <Link href="/rakit/hasil" className="" passHref>
          <Button className="mt-4 justify-center font-semibold">
            Selanjutnya
            <ArrowRight className="ml-2 inline-block" />
          </Button>
        </Link>
      </div>
    </>
  );
}
