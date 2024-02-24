import { server$ } from "@builder.io/qwik-city";
import { supabase } from "../db";
import { getPagination } from "../pagination";
export const getComponentsPaginated = server$(async (page: number, size: number, query: string) => {
    const client = await supabase();

    const { count } = await client.schema('product').from('v_products').select('*', { count: 'exact', head: true }).ilike('product_name', `%${query}%`);

    const { from, to } = getPagination(page, size, count ?? 0);

    const { data } = await client.schema('product').from('v_products').select("*", { count: 'exact' }).ilike('product_name', `%${query}%`).range(from, to);

    return { data, count };
})
