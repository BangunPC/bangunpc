import type { Database } from '~/lib/schema';


export const casingHeaders = [
    'Brand Name',
    'Casing Type',
    // 'Drive Bays',
    'Fan Slots',
    'GPU Max Length (mm)',
]

export const casingKeys = [
    'brand_name',
    'casing_type',
    'fan_slots',
    'max_gpu_length_mm',
]

export const cpuHeaders = [
    'Total Core',
    'Base Clock (GHz)',
    'Max Clock (GHz)',
    'Base Power (Watt)',
    'Integrated GPU',
]

export const cpuKeys = [
    'total_core',
    'base_clock_ghz',
    'max_clock_ghz',
    'base_power_watt',
    'integrated_gpu',
]

export const gpuHeaders = [
    'Boost Clock (MHz)',
    'Brand Name',
    'Core Clock (MHz)',
    'Length (mm)',
    'TDP (Watt)',
    'VRAM (GB)'
]  

export const gpuKeys = [
    'boost_clock_mhz',
    'brand_name',
    'base_clock_mhz',
    'length_mm',
    'tdp_watt',
    'vram_gb',
]

export const memoryHeaders = [
    'Amount',
    'Brand Name',
    'Capacity (GB)',
    'Frequency (MHz)',
    'Memory Type',
]

export const memoryKeys = [
    'amount',
    'brand_name',
    'capacity_gb',
    'frequency_mhz',
    'memory_type',
]

export const motherboardHeaders = [
    'Brand Name',
    'CPU Socket',
    'Form Factor',
    'Memory Max (GB)',
    'Memory Type',
]

export const motherboardKeys = [
    'brand_name',
    'cpu_socket',
    'form_factor',
    'memory_max_gb',
    'memory_type',
]

export const psuHeaders = [
    'Brand Name',
    'Efficiency Rating',
    'Form Factor',
    'Height (mm)',
    'Modularity',
    'Wattage',
]

export const psuKeys = [
    'brand_name',
    'efficiency_rating',
    'form_factor',
    'height_mm',
    'modularity',
    'wattage',
]

export const storageHeaders = [
    'Brand Name',
    'Type',
    'Capacity (GB)',
    'Category Name',
    'Form Factor',
    'Interface',
]

export const storageKeys = [
    'brand_name',
    'type',
    'capacity_gb',
    'category_name',
    'form_factor',
    'interface',
  ];


export const categories: { [key: string]: string } = {
    headphone: '',
    keyboard: '',
    mouse: '',
    speaker: '',
    webcam: '',
    printer: '',
    monitor: '',
    os: '',
    soundcard: '',
    wirednetwork: '',
    wirelessnetwork: '',
    cable: '',
    externaldrive: '',
    motherboard: 'v_motherboards',
    cpu: 'v_cpus',
    gpu: 'v_gpus',
    memory: 'v_memories',
    cooler: '',
    psu: 'v_power_supplies',
    storage: 'v_internal_storages',
    casing: 'v_casings',
    casefan: '',
  };


  export const titlesKategori: { [key: string]: string } = {
    headphone: 'Headphone',
    keyboard: 'Keyboard',
    mouse: 'Mouse',
    speaker: 'Speaker',
    webcam: 'Webcam',
    printer: 'Printer',
    monitor: 'Monitor',
    os: 'Operating System',
    soundcard: 'Sound Card',
    wirednetwork: 'Wired Network Device',
    wirelessnetwork: 'Wireless Network Device',
    casefan: 'Case Fan',
    externaldrive: 'External Drive',
    motherboard: 'Motherboard',
    cpu: 'Computer Processor',
    gpu: 'GPU',
    memory: 'Memory',
    cooler: 'CPU Cooler',
    psu: 'Power Supply',
    cable: 'Cable',
    storage: 'Internal Storage',
    casing: 'PC Casing',
  };
// export type All = { isMobile: boolean, all: Database['product']['Views']['v_all_products']['Row'] }

// export type Casing = { isMobile: boolean, casing: Database['product']['Views']['v_casings']['Row'] }
// export type Cpu = { isMobile: boolean, cpu: Database['product']['Views']['v_cpus']['Row'] }
// export type Gpu = { isMobile: boolean, gpu: Database['product']['Views']['v_gpus']['Row'] }
// export type Storage = { isMobile: boolean, storage: Database['product']['Views']['v_internal_storages']['Row'] }
// export type Memory = { isMobile: boolean, memory: Database['product']['Views']['v_memories']['Row'] }
// export type Motherboard = { isMobile: boolean, motherboard: Database['product']['Views']['v_motherboards']['Row'] }
// export type Psu = { isMobile: boolean, psu: Database['product']['Views']['v_power_supplies']['Row'] }

export type Details = { isMobile: boolean, detalis: Database['product']['Views']['v_product_details']['Row'] }

export const productImageUrl = 'https://onawoodgnwkncueeyusr.supabase.co/storage/v1/object/public/product-images/'