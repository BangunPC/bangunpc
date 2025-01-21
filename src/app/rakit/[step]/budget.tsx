"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { withMask } from "use-mask-input";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function BudgetSection() {
  const budgets = [
    5000000, 7000000, 10000000, 15000000, 18000000, 20000000, 25000000,
    30000000, 40000000, 50000000, 80000000,
  ];

  const searchParams = useSearchParams()!;
  const [budget, setBudget] = React.useState(searchParams.get("b") ?? 0);
  const multiSelect = searchParams.getAll("r");

  const getDest = (newBudget: string) => {
    let dest = `?b=${newBudget}`;
    for (const item of multiSelect) {
      dest += `&r=${item}`;
    }

    return dest;
  };

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
          Pilih Budget untuk PC-mu
        </span>
        <div className="h-4" />
        <span className="text-center text-gray-500">
          Kami akan sesuaikan konfigurasi PC yang pas dengan budgetmu
        </span>
      </div>

      <div className="h-8" />

      <RadioGroup
        onValueChange={(value) => {
          setBudget(value);
        }}
        value={budget.toString()}
        className="m-auto max-w-screen-tablet grid-cols-3 tablet:grid-cols-4"
      >
        {budgets.map((item) => (
          <Label
            htmlFor={`${item.toString()}`}
            key={item.toString()}
            className={
              "flex w-full items-center gap-2 rounded-lg border border-transparent p-2 " +
              (item.toString() === budget
                ? "border-primary"
                : "bg-foreground/10 hover:bg-foreground/20")
            }
          >
            <RadioGroupItem value={`${item}`} id={`${item}`} />
            <span>Rp {item.toLocaleString("id-ID")}</span>
          </Label>
        ))}
      </RadioGroup>
      <div className="my-8 flex justify-center">
        <span className="text-center text-sm text-gray-500">
          Atau bisa atur sesuai budget kamu
        </span>
      </div>
      <Input
        ref={withMask("currency", {
          allowMinus: false,
          groupSeparator: ".",
          prefix: "Rp. ",
          digits: 0,
          unmaskAsNumber: true,
          onUnMask(maskedValue, unmaskedValue) {
            setBudget(unmaskedValue);
            return unmaskedValue;
          },
        })}
        onChange={(e) => setBudget(e.target.value)}
        value={budget}
        autoFocus
        className="m-auto w-32 pr-3"
      />

      <div className="flex justify-end">
        <Link
          prefetch={true}
          href={`/rakit/rencana${getDest(budget.toString())}`}
          
        >
          <Button
            className="mt-4 justify-center font-semibold"
            disabled={!budget}
          >
            Selanjutnya
            <ArrowRight className="ml-2 inline-block" />
          </Button>
        </Link>
      </div>
    </>
  );
}
