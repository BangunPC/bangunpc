import type { Database } from "~/lib/schema";

export type All = Database['product']['Views']['v_all_product_list']['Row']
export type Casing = Database['product']['Views']['v_detail_casing']['Row']
export type Cpu = { cpu: Database['product']['Views']['v_detail_cpu']['Row'] };
export type Gpu = Database['product']['Views']['v_detail_gpu']['Row']
export type Storage = Database['product']['Views']['v_detail_internal_storage']['Row']
export type Memory = Database['product']['Views']['v_detail_memory']['Row']
export type Motherboard = Database['product']['Views']['v_detail_motherboard']['Row']
export type Psu = Database['product']['Views']['v_detail_psu']['Row']