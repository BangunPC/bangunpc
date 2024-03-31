export enum SidebarItemType {
    range,
    select,
    checkbox,
}

// Motherboard

export type MotherboardCompatibility = {
    casingId?: number | undefined
    cpuSocketId?: number | undefined
    memories?: { id: number, amount: number }[] | undefined
}

export type MotherboardFilter = {
    query?: string
    min_price?: number | null
    max_price?: number | null
}

// ^------[Motherboard]------^

// CPU

export type CpuCompatibility = {
    motherboardId?: number | undefined
    memories?: { id: number, amount: number }[] | undefined
}

export type CpuFilter = {
    query?: string | null
    min_price?: number | null
    max_price?: number | null
    //
    base_clock_ghz?: number | null
    base_power_watt?: number | null
    brand_name?: string | null
    code_name?: string | null
    cpu_family_id?: number | null
    cpu_socket_id?: number | null
    efficiency_core?: number | null
    integrated_gpu_id?: number | null
    max_clock_ghz?: number | null
    max_memory_channel?: number | null
    max_memory_gb?: number | null
    max_power_watt?: number | null
    model_line?: string | null
    performance_core?: number | null
    product_id?: number | null
    product_name?: string | null
    total_core?: number | null
    total_thread?: number | null
}

export const cpuSidebarItems = [
    {
        key: "base_clock_ghz",
        type: SidebarItemType.range,
        name: "Base Clock (GHz)",
    },
    {
        key: "base_power_watt",
        type: SidebarItemType.range,
        name: "Base Power (Watt)",
    },
    {
        key: "brand_name",
        type: SidebarItemType.select,
        name: "Brand Name",
    },
    {
        key: "cpu_family_id",
        type: SidebarItemType.select,
        name: "CPU Family",
    },
    {
        key: "cpu_socket_id",
        type: SidebarItemType.select,
        name: "CPU Socket",
    },
    {
        key: "efficiency_core",
        type: SidebarItemType.range,
        name: "Efficiency Core",
    },
    {
        key: "integrated_gpu_id",
        type: SidebarItemType.select,
        name: "Integrated GPU",
    },
    {
        key: "max_clock_ghz",
        type: SidebarItemType.range,
        name: "Max Clock (GHz)",
    },
    {
        key: "max_memory_channel",
        type: SidebarItemType.range,
        name: "Max Memory Channel",
    },
    {
        key: "max_memory_gb",
        type: SidebarItemType.range,
        name: "Max Memory (GB)",
    },
    {
        key: "max_power_watt",
        type: SidebarItemType.range,
        name: "Max Power (Watt)",
    },
    {
        key: "model_line",
        type: SidebarItemType.select,
        name: "Model Line",
    },
    {
        key: "performance_core",
        type: SidebarItemType.range,
        name: "Performance Core",
    },
    {
        key: "total_core",
        type: SidebarItemType.range,
        name: "Total Core",
    },
    {
        key: "total_thread",
        type: SidebarItemType.range,
        name: "Total Thread",
    },
]

// ^------[CPU]------^


// GPU

export type GpuCompatibility = {
    casingId?: number | undefined
    psuId?: number | undefined
    motherboardId?: number | undefined
}

export type GpuFilter = {
    query?: string | null
    min_price?: number | null
    max_price?: number | null
}

// ^------[GPU]------^

// Memory

export type MemoryCompatibility = {
    motherboardId?: number | undefined
    memories?: { id: number, amount: number }[] | undefined
}

export type MemoryFilter = {
    query?: string | null
    min_price?: number | null
    max_price?: number | null
}

// ^------[Memory]------^

// PSU

export type PsuCompatibility = {
    cpuId?: number | undefined
    gpuId?: number | undefined
    motherboardId?: number | undefined
    memories?: { id: number, amount: number }[] | undefined
    storages?: { id: number, amount: number }[] | undefined
}

export type PsuFilter = {
    query?: string | null
    min_price?: number | null
    max_price?: number | null
}

// ^------[PSU]------^

// Storage

export type StorageCompatibility = {
    motherboardId?: number | undefined
    storages?: { id: number, amount: number }[] | undefined
}

export type StorageFilter = {
    query?: string | null
    min_price?: number | null
    max_price?: number | null
}

// ^------[Storage]------^

// Casing

export type CasingCompatibility = {
    motherboardId?: number | undefined
    gpus?: { id: number, amount: number }[] | undefined   
}

export type CasingFilter = {
    query?: string | null
    min_price?: number | null
    max_price?: number | null
}

// ^------[Casing]------^
