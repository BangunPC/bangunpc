'use client'
import CatalogueItemCard from "@/components/CatalogueItemCard";
import { For } from "million/react";

export default function Page() {
  return (
    <div className="h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
        <For
          each={Array(8).fill({
            brand_name: "Loading...",
            category: "Loading...",
            image_path: "Loading...",
            price: 0,
            product_detail_id: 0,
            product_name: "Loading...",
            slug: "Loading...",
            stock: 0,
            url: "Loading...",
          })}
        >
          {(item, index) => (
            <CatalogueItemCard key={"item-" + index} {...item} shimmer={true} />
          )}
        </For>
      </div>
    </div>
  );
}
