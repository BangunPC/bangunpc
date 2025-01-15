"use client";

import { components } from "~/components/common/navbar";
import { categoryEnumToSlug } from "~/lib/db";

export default function Page() {
  return <main className="m-auto flex max-w-3xl flex-col gap-4 p-6 tablet:max-w-screen-desktop">
    <h1 className="text-3xl font-semibold mt-4">Produk</h1>
    <ul className="list-outside list-disc mx-4 space-y-1">
      {components.map((component, index) => (
        <li key={index}><a href={`/produk/${categoryEnumToSlug[component.enum]}`}>{component.name}</a></li>
      ))}
    </ul>
  </main>;
}
