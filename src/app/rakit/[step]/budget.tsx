"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { withMask } from "use-mask-input";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { useState } from "react";

export default function BudgetSection() {
  const budgets = [
    {
      name: "Rp 5.000.000",
      key: "budget-1",
    },
    {
      name: "Rp 7.000.000",
      key: "budget-2",
    },
    {
      name: "Rp 10.000.000",
      key: "budget-3",
    },
    {
      name: "Rp 15.000.000",
      key: "budget-4",
    },
    {
      name: "Rp 18.000.000",
      key: "budget-5",
    },
    {
      name: "Rp 20.000.000",
      key: "budget-6",
    },
    {
      name: "Rp 25.000.000",
      key: "budget-7",
    },
    {
      name: "Rp 30.000.000",
      key: "budget-8",
    },
    {
      name: "Rp 40.000.000",
      key: "budget-9",
    },
    {
      name: "Rp 50.000.000",
      key: "budget-10",
    },
  ];
  const [budget, setBudget] = useState(budgets[0]?.key);
  const minBudget = 5000000;
  const maxBudget = 50000000;

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
        value={budget}
        className="m-auto max-w-screen-tablet grid-cols-3 tablet:grid-cols-4"
      >
        {budgets.map((item) => (
          <Label
            htmlFor={`${item.key}`}
            key={item.name}
            className={
              "flex w-full items-center gap-2 rounded-lg border border-transparent p-2 " +
              (item.key === budget
                ? "border-primary"
                : "bg-foreground/10 hover:bg-foreground/20")
            }
          >
            <RadioGroupItem value={`${item.key}`} id={`${item.key}`} />
            <span>{item.name}</span>
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
          min: minBudget,
          max: maxBudget,
          groupSeparator: ".",
          prefix: "Rp. ",
          digits: 0,
        })}
        autoFocus
        className="m-auto w-32 pr-3"
      />

      <div className="flex justify-end">
        <Link href="/rakit/rencana" className="" passHref>
          <Button className="mt-4 justify-center font-semibold">
            Selanjutnya
            <ArrowRight className="ml-2 inline-block" />
          </Button>
        </Link>
      </div>
    </>
  );
}
