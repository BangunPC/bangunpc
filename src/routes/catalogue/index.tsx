import { component$ } from "@builder.io/qwik";
import type { DocumentHead} from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import ItemCard from "~/components/catalogue/item-card/item-card";
import { supabase } from "~/lib/db";
import styles from "./catalogue.module.css";

export const useRecords = routeLoader$(async () => {
  return await supabase.schema("product").from("v_all_product_list").select();
});

export default component$(() => {
  const resultSignal = useRecords();
  return (
    <div
      class={styles["wrap"]}
      // class='flex flex-wrap w-full justify-center'
    >
      {resultSignal.value.data?.map((item) => (
        <ItemCard key={item.product_detail_id} {...item} shimmer={false} />
      ))}
    </div>
  );
});

export const head: DocumentHead = {
  title: "BangunPC | Catalogue",
  meta: [
    {
      name: "description",
      content:
        "Find the perfect hardware for your PC build, including CPUs, GPUs, RAM, storage, and more. Shop now for top brands and unleash the full potential of your gaming or workstation setup.",
    },
  ],
};
