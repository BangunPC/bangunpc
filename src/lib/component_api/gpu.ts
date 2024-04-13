import { server$ } from "@builder.io/qwik-city"
import { getSupabaseServerClient } from "../db"
import { GpuCompatibility, GpuFilter } from "./filter"
import { todo } from "node:test"

export const getGpu = server$(async (
    { casingId, motherboardId, psuId }: GpuCompatibility,
    { query,
        min_price,
        max_price,
    }: GpuFilter,
) => {
    const client = await getSupabaseServerClient()

    if (!client) {
        throw new Error('Supabase client is null')
    }

    // filter start

    const client_query = client
        .schema('product')
        .from('v_gpus')
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

    const { data: gpuData, error, count } = await client_query;

    if (!gpuData) {
        throw new Error('GPU data is null')
    }


    let filteredData = gpuData

    // compatibility start

    if (casingId) {
        const { data: casingData, error } = await client
            .schema('product')
            .from('v_casings')
            .select('max_gpu_length_mm')
            .eq('product_id', casingId)
            .limit(1)
            .single()

        if (!casingData) {
            throw new Error('Casing data is null')
        }

        filteredData = filteredData.filter(gpu => (casingData?.max_gpu_length_mm ?? -1) >= (gpu.length_mm ?? 0))
    }

    if (psuId) {
        const { data: psuData, error } = await client
            .schema('product')
            .from('v_power_supplies')
            .select('wattage')
            .eq('product_id', psuId)
            .limit(1)
            .single()
        
            filteredData = filteredData.filter(gpu => (psuData?.wattage ?? -1) >= (gpu.min_psu_watt ?? 0))
    }

    if (motherboardId) {
        // TODO(damywise): implement filter
    }

    // compatibility end

    if (error) {
        throw error
    }

    return { filteredData, count: filteredData.length }
})

