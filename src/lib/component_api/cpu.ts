import { server$ } from "@builder.io/qwik-city"
import { supabase } from "../db"
import { CpuCompatibility, CpuFilter } from "./filter"

export const getCpu = server$(async (
    { motherboardId, memories }: CpuCompatibility,
    { query,
        base_clock_ghz,
        base_power_watt,
        brand_name,
        code_name,
        cpu_family_id,
        cpu_socket_id,
        efficiency_core,
        integrated_gpu_id,
        min_price,
        max_price,
        max_clock_ghz,
        max_memory_channel,
        max_memory_gb,
        max_power_watt,
        model_line,
        performance_core,
        product_id,
        product_name,
        total_core,
        total_thread,
    }: CpuFilter,
) => {
    const client = await supabase()

    if (!client) {
        throw new Error('Supabase client is null')
    }

    // filter start

    const client_query = client
        .schema('product')
        .from('v_cpus')
        .select('*', { count: 'exact' })

    if (min_price) {
        client_query.gte('lowest_price', min_price)
    }
    if (max_price) {
        client_query.lte('lowest_price', max_price)
    }

    if (base_clock_ghz) {
        client_query.eq('base_clock_ghz', base_clock_ghz)
    }
    if (base_power_watt) {
        client_query.eq('base_power_watt', base_power_watt)
    }
    if (brand_name) {
        client_query.eq('brand_name', brand_name)
    }
    if (code_name) {
        client_query.eq('code_name', code_name)
    }
    if (cpu_family_id) {
        client_query.eq('cpu_family_id', cpu_family_id)
    }
    if (cpu_socket_id) {
        client_query.eq('cpu_socket_id', cpu_socket_id)
    }
    if (efficiency_core) {
        client_query.eq('efficiency_core', efficiency_core)
    }
    if (integrated_gpu_id) {
        client_query.eq('integrated_gpu_id', integrated_gpu_id)
    }
    if (max_clock_ghz) {
        client_query.eq('max_clock_ghz', max_clock_ghz)
    }
    if (max_memory_channel) {
        client_query.eq('max_memory_channel', max_memory_channel)
    }
    if (max_memory_gb) {
        client_query.eq('max_memory_gb', max_memory_gb)
    }
    if (max_power_watt) {
        client_query.eq('max_power_watt', max_power_watt)
    }
    if (model_line) {
        client_query.eq('model_line', model_line)
    }
    if (performance_core) {
        client_query.eq('performance_core', performance_core)
    }
    if (product_id) {
        client_query.eq('product_id', product_id)
    }
    if (product_name) {
        client_query.eq('product_name', product_name)
    }
    if (total_core) {
        client_query.eq('total_core', total_core)
    }
    if (total_thread) {
        client_query.eq('total_thread', total_thread)
    }
    if (query) {
        client_query
            .textSearch('product_name', `'${query}'`, { type: 'websearch', config: 'english' })
    }

    client_query
        .order('product_name', { ascending: true })

    // filter end

    const { data: cpuData, error, count } = await client_query;

    if (!cpuData) {
        throw new Error('CPU data is null')
    }


    let filteredData = cpuData

    // compatibility start

    if (motherboardId) {
        let { data: motherboardData, error } = await client
            .schema('product')
            .from('v_motherboards')
            .select()
            .eq('product_id', motherboardId)
        if (!motherboardData) {
            throw new Error('Motherboard data is null')
        }

        const cpuSocketId = motherboardData[0].cpu_socket_id
        if (cpuSocketId == null) {
            throw new Error('CPU socket ID is null')
        }
        filteredData = filteredData.filter(cpu => cpu.cpu_socket_id == cpuSocketId)
    }
    if (memories) {
        const { data: memoryData, error } = await client
            .schema('product')
            .from('v_memories')
            .select('product_id, memory_type, capacity_gb, amount')
            .in('product_id', memories.map(memory => memory.id))

        if (!memoryData || error || memoryData.length === 0) {
            return { filteredData, count: filteredData.length }
        }

        const memoryType = memoryData[0].memory_type
        if (memoryData.some(memory => memory.memory_type !== memoryType)) {
            console.log('Memory type mismatch')
            filteredData = []
        } else {
            filteredData = filteredData.filter(cpu => {
                const totalMemory = memoryData.reduce((total, memory) => {
                    let inputMemory = memories.find(inputMemory => inputMemory.id === memory.product_id) ?? { amount: 0 }
                    return total + (memory.amount ?? 0) * inputMemory.amount
                }, 0)
                return (cpu.max_memory_gb ?? 0) >= totalMemory
            })
        }
    }
    if (error) {
        throw error
    }

    // compatibility end

    return { filteredData, count: filteredData.length }
})

