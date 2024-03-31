import { server$ } from "@builder.io/qwik-city"
import { supabase } from "../db"
import { MemoryCompatibility, MemoryFilter } from "./filter"
import { todo } from "node:test"

export const getMemory = server$(async (
    { memories, motherboardId }: MemoryCompatibility,
    { query,
        min_price,
        max_price,
    }: MemoryFilter,
) => {
    const client = await supabase()

    if (!client) {
        throw new Error('Supabase client is null')
    }

    // filter start

    const client_query = client
        .schema('product')
        .from('v_memories')
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

    const { data: memoryData, error, count } = await client_query;

    if (!memoryData) {
        throw new Error('Memory data is null')
    }


    let filteredData = memoryData

    // compatibility start

    TODO: implement filter

    // compatibility end

    if (error) {
        throw error
    }

    return { filteredData, count }
})

