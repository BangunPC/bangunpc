"use client";
import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

export function CatalogueSidebar({
  price,
  totalComponents,
  children,
  isIframe,
}: {
  price: number;
  totalComponents: number;
  children: ReactNode;
  isIframe: boolean;
}) {
  return (
    <aside
      className={`sticky self-start ${isIframe ? "top-0" : "top-navbar-min-h"}`}
    >
      <div className="mx-4 flex w-56 flex-col gap-2">
        <div
          className={`flex h-fit flex-col gap-2 rounded-lg bg-white p-2 font-semibold shadow-br dark:bg-navbar ${isIframe ? "hidden" : ""}`}
        >
          <div className="rounded-lg border border-black/40 p-2 text-xl leading-5 dark:border-white/20">
            Rincian Komponen yang Dipilih
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Jumlah komponen</span>
            <span className="text-xl">{totalComponents}</span>
            <span className="text-sm">Total Harga</span>
            <span className="text-xl">Rp {price.toLocaleString("id-ID")}</span>
          </div>
        </div>
        <span className="text-lg font-semibold">Filter</span>
        {children}
      </div>
    </aside>
  );
}

export function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex flex-col gap-2">
      <div
        className="hover:bg-button-hover/20 flex flex-row rounded-md px-2 py-1"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold">{title}</span>
        <div className="ml-auto">
          <ChevronDown
            className={`inline-block ${open ? "rotate-180" : "rotate-0"} transition-all duration-200`}
          />
        </div>
      </div>
      <div className="px-2">{open && children}</div>
    </div>
  );
}
