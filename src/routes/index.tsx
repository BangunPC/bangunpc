import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Hero from "~/components/homepage/hero/hero";
import Jasa from "~/components/homepage/jasa/jasa";

export default component$(() => {
  return (
    <>
      <Hero />
      <Jasa />
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
