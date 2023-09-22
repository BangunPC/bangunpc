import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { supabase } from "~/lib/db";

export const useRecords = routeLoader$(async () => {
  return await supabase.schema("product").from("v_all_product_list").select();
});

export default component$(() => {
  const resultSignal = useRecords();
  return (
    <div class="text-center">
      Supabase{" "}
      <ul class="horizontal">
        {resultSignal.value.data?.map((item) => (
          <li key={item.slug}>
            <a href={item.slug ?? ""} target="_blank">
              {item.product_name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});
