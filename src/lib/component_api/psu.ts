import { server$ } from "@builder.io/qwik-city"
import { supabase } from "../db"
import { PsuCompatibility, PsuFilter } from "./filter"
import { todo } from "node:test"

export const getPsu = server$(async (
    { cpuId, gpuId, memories, motherboardId, storages }: PsuCompatibility,
    { query,
        min_price,
        max_price,
    }: PsuFilter,
) => {
    const client = await supabase()

    if (!client) {
        throw new Error('Supabase client is null')
    }

    // filter start

    const client_query = client
        .schema('product')
        .from('v_power_supplies')
        .select('*', { count: 'exact' })

    if (min_price) {
        client_query.gte('lowest_price', min_price)
    }
    if (max_price) {
        client_query.lte('lowest_price', max_price)
    }
    if (query) {
        client_query
            .textSearch('product_name', `'${query}'`, { type: 'websearch', config: 'english' })
    }

    client_query
        .order('product_name', { ascending: true })

    // filter end

    const { data: psuData, error, count } = await client_query;

    if (!psuData) {
        throw new Error('PSU data is null')
    }


    let filteredData = psuData

    // compatibility start

    TODO: implement filter

    // compatibility end

    if (error) {
        throw error
    }

    return { filteredData, count }
})

