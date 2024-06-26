"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

export default function BudgetSection() {
  const budgets = [
    {
      name: "Rp 5.000.000",
      key: "budget-1",
    },
    {
      name: "Rp 10.000.000",
      key: "budget-2",
    },
    {
      name: "Rp 15.000.000",
      key: "budget-3",
    },
    {
      name: "Rp 20.000.000",
      key: "budget-4",
    },
    {
      name: "Rp 25.000.000",
      key: "budget-5",
    },
    {
      name: "Rp 30.000.000",
      key: "budget-6",
    },
    {
      name: "Rp 35.000.000",
      key: "budget-7",
    },
    {
      name: "Rp 40.000.000",
      key: "budget-8",
    },
    {
      name: "Rp 45.000.000",
      key: "budget-9",
    },
    {
      name: "Rp 50.000.000",
      key: "budget-10",
    },
  ];
  const [budget, setBudget] = useState(budgets[0]?.key);
  return (
    <>
      <span className=" w-full text-center font-semibold">
        Pilih budget yang sesuai dengan kebutuhan dan anggaran Anda.
      </span>

      <div className="h-8" />

      <RadioGroup
        onValueChange={(value) => {
          setBudget(value);
        }}
        value={budget}
        className="m-auto max-w-screen-tablet grid-cols-2 tablet:grid-cols-3"
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

      <Link href="/rakit/rencana" className="flex justify-end" passHref>
        <Button className="ml-auto mt-4 justify-center font-semibold">
          Lanjutkan
          <ArrowRight className="ml-2 inline-block" />
        </Button>
      </Link>
    </>
  );
}
