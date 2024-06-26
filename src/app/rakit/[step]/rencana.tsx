"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

export default function RencanaSection() {
  const rencanaList = [
    "Programming",
    "3D Design",
    "Video Editing",
    "Gaming Ringan",
    "Gaming Berat",
  ];
  const [selected, setSelected] = useState(rencanaList[0]);
  return (
    <>
      <span className=" w-full text-center font-semibold">
        Pilih budget yang sesuai dengan kebutuhan dan anggaran Anda.
      </span>

      <div className="h-8" />

      <RadioGroup
        onValueChange={(value) => {
          setSelected(value);
        }}
        value={selected}
        className="m-auto max-w-screen-tablet grid-cols-2 tablet:grid-cols-3"
      >
        {rencanaList.map((item) => (
          <Label
            htmlFor={`${item}`}
            key={item}
            className={
              "flex w-full items-center gap-2 rounded-lg border border-transparent p-2 " +
              (item === selected
                ? "border-primary"
                : "bg-foreground/10 hover:bg-foreground/20")
            }
          >
            <RadioGroupItem value={`${item}`} id={`${item}`} />
            <span>{item}</span>
          </Label>
        ))}
      </RadioGroup>

      <div className="flex justify-between">
        <Link href="/rakit" className="flex justify-start" passHref>
          <Button className="mt-4 justify-center font-semibold">
            <ArrowLeft className="mr-2 inline-block" />
            Kembali
          </Button>
        </Link>

        <Link href="/rakit/hasil" className="flex justify-end" passHref>
          <Button className="mt-4 justify-center font-semibold">
            Lanjutkan
            <ArrowRight className="ml-2 inline-block" />
          </Button>
        </Link>
      </div>
    </>
  );
}
