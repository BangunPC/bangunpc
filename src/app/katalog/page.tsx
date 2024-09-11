"use client";

import { components } from "~/components/ui/navbar";
import { categoriesFromEnum } from "~/lib/db";

export default function Page() {
  return <main className="m-auto flex max-w-3xl flex-col gap-4 p-6 tablet:max-w-screen-desktop">
    <h1 className="text-3xl font-semibold mt-4">Katalog</h1>
    <ul className="list-outside list-disc mx-4 space-y-1">
      {components.map((component) => (
        <li><a href={`/katalog/${categoriesFromEnum[component.enum]}`}>{component.name}</a></li>
      ))}
    </ul>
  </main>;
}
