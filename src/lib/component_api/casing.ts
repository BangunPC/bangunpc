import { server$ } from "@builder.io/qwik-city"
import { supabase } from "../db"
import { CasingCompatibility, CasingFilter } from "./filter"
import { todo } from "node:test"

export const getCasing = server$(async (
    { gpus, motherboardId }: CasingCompatibility,
    { query,
        min_price,
        max_price,
    }: CasingFilter,
) => {
    const client = await supabase()

    if (!client) {
        throw new Error('Supabase client is null')
    }

    // filter start

    const client_query = client
        .schema('product')
        .from('v_casings')
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
        throw new Error('Casing data is null')
    }


    let filteredData = memoryData

    // compatibility start

    if (motherboardId) {
        const { data: motherboardData, error } = await client
        .schema('product')
        .from('v_motherboards')
        .select('form_factor')
        .eq('product_id', motherboardId)
        .limit(1)
        .single()
        if (error) {
            throw error
        }
        filteredData = filteredData.filter((item) => item.mobo_supports?.includes(motherboardData.form_factor!))
    }

    if (gpus) {
        const { data: gpuData, error } = await client
        .schema('product')
        .from('v_gpus')
        .select('length_mm')
        .in('product_id', gpus.map(gpu => gpu.id))
        .limit(1)
        .single()
        if (error) {
            throw error
        }
        filteredData = filteredData.filter((item) => item.max_gpu_length_mm! >=  gpuData.length_mm!)
    }

    // compatibility end

    if (error) {
        throw error
    }

    return { filteredData, count }
})

