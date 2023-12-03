import type { Database } from '~/lib/schema';

export type All = { all: Database['product']['Views']['v_all_products']['Row'] }

export type Casing = { casing: Database['product']['Views']['v_casings']['Row'] }
export type Cpu = { cpu: Database['product']['Views']['v_cpus']['Row'] }
export type Gpu = { gpu: Database['product']['Views']['v_gpus']['Row'] }
export type Storage = { storage: Database['product']['Views']['v_internal_storages']['Row'] }
export type Memory = { memory: Database['product']['Views']['v_memories']['Row'] }
export type Motherboard = { motherboard: Database['product']['Views']['v_motherboards']['Row'] }
export type Psu = { psu: Database['product']['Views']['v_power_supplies']['Row'] }

export type Details = { detalis: Database['product']['Views']['v_product_details']['Row'] }

export const productImageUrl = 'https://onawoodgnwkncueeyusr.supabase.co/storage/v1/object/public/product-images/'