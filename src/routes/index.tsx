import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Affiliate from "~/components/homepage/affiliate/affiliate";
import Banding from "~/components/homepage/banding/banding";
import Hero from "~/components/homepage/hero/hero";
import Jasa from "~/components/homepage/jasa/jasa";
import Komponen from "~/components/homepage/komponen/komponen";

export default component$(() => {
  return (
    <>
      <Hero />
      <Komponen />
      <Jasa />
      <Banding />
      <Affiliate />
    </>
  );
});

export const head: DocumentHead = {
  title: "Complete PC/Components - BangunPC",
  meta: [
    {
      name: "description",
      content:
        "Tired of searching for components? Worry not! We're here with a complete list of PC build and components from various marketplace.",
    },
  ],
};
