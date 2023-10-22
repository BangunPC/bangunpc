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
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://bangunpc.pages.dev/",
    },
    {
      property: "og:title",
      content: "Complete PC/Components - BangunPC",
    },
    {
      property: "og:description",
      content:
        "Tired of searching for components? Worry not! We're here with a complete list of PC build and components from various marketplace.",
    },
    {
      property: "og:image",
      content: "https://bangunpc.pages.dev/meta.png",
    },
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "twitter:url",
      content: "https://bangunpc.pages.dev/",
    },
    {
      property: "twitter:title",
      content: "Complete PC/Components - BangunPC",
    },
    {
      property: "twitter:description",
      content:
        "Tired of searching for components? Worry not! We're here with a complete list of PC build and components from various marketplace.",
    },
    {
      property: "twitter:image",
      content: "https://bangunpc.pages.dev/meta.png",
    },
  ],
};