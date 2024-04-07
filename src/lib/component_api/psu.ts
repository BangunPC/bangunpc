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

    let currentWatt = 0

    if (cpuId) {
        // Fetching cpu required data
        const { data: cpuData, error } = await client
            .schema('product')
            .from('v_cpus')
            .select('max_power_watt')
            .eq('product_id', cpuId)
            .limit(1)
            .single()
        if (error) {
            throw error
        }

        currentWatt += cpuData.max_power_watt ?? 0
    }

    if (gpuId) {
        // Fetching gpu required data
        const { data: gpuData, error } = await client
            .schema('product')
            .from('v_gpus')
            .select('min_psu_watt')
            .eq('product_id', gpuId)
            .limit(1)
            .single()
        if (error) {
            throw error
        }

        currentWatt += gpuData.min_psu_watt ?? 0
    }

    if (motherboardId) {
        // Fetching mobo required data
        const { data: moboData, error } = await client
            .schema('product')
            .from('v_motherboards')
            .select('form_factor')
            .eq('product_id', motherboardId)
            .limit(1)
            .single()
        if (error) {
            throw error
        }

        switch (moboData.form_factor?.toLowerCase()) {
            case "mini-itx":
                currentWatt += 30
                break;

            case "micro-itx":
                currentWatt += 60
                break;

            case "atx":
                currentWatt += 60
                break;

            default:
                break;
        }
    }

    if (memories) {
        // Fetching memory required data
        const { data: memoryData, error } = await client
            .schema('product')
            .from('v_memories')
            .select('memory_type, amount')
            .in('product_id', memories.map(memory => memory.id))
        if (error) {
            throw error
        }

        const totalMemoryWatt = memoryData.reduce((accumulator, memory) => {
            if (memory.memory_type !== null && memory.amount !== null) {
                if (memory.memory_type.toLowerCase() === 'ddr5')
                    return accumulator + (15 * memory.amount)
                else
                    return accumulator + (10 * memory.amount)
            }
            return accumulator;
        }, 0)

        currentWatt += totalMemoryWatt
    }
    if (storages) {
        // Fetching memory required data
        const { data: storageData, error } = await client
            .schema('product')
            .from('v_internal_storages')
            .select('type, form_factor')
            .in('product_id', storages.map(storage => storage.id))
        if (error) {
            throw error
        }

        const totalStorageWatt = storageData.reduce((accumulator, memory) => {
            if (memory.form_factor !== null && memory.type !== null) {
                if (memory.type.toLowerCase() === 'ssd') {
                    if (memory.form_factor.toLowerCase() === 'm.2 nvme')
                        return accumulator + 10
                    else
                        return accumulator + 3
                } else {
                    return accumulator + 20
                }
            }
            return accumulator;
        }, 0)

        currentWatt += totalStorageWatt
    }

    filteredData = filteredData.filter((item) => item.wattage! > currentWatt)

    // compatibility end

    if (error) {
        throw error
    }

    return { filteredData, count }
})
