import { server$ } from "@builder.io/qwik-city"
import { supabase } from "../db"
import { StorageCompatibility, StorageFilter } from "./filter"
import { todo } from "node:test"

export const getStorage = server$(async (
    { motherboardId, storages }: StorageCompatibility,
    { query,
        min_price,
        max_price,
    }: StorageFilter,
) => {
    const client = await supabase()

    if (!client) {
        throw new Error('Supabase client is null')
    }

    // filter start

    const client_query = client
        .schema('product')
        .from('v_internal_storages')
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
        throw new Error('Internal Storage data is null')
    }


    let filteredData = psuData

    // compatibility start

    todo()

    // compatibility end

    if (error) {
        throw error
    }

    return { filteredData, count }
})

