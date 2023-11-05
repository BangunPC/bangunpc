import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { supabase } from "~/lib/db";

export const useRecords = routeLoader$(async () => {
    return await supabase.schema("product").from("v_all_product_list").select();
  });

export default component$(() => {
    return <div>Halaman Katalog</div>;
})