export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type CpuType = Database['product']['Views']['v_cpus']['Row']

export type Database = {
  product: {
    Tables: {
      brands: {
        Row: {
          id: number
          logo_filename: string | null
          name: string
        }
        Insert: {
          id?: number
          logo_filename?: string | null
          name: string
        }
        Update: {
          id?: number
          logo_filename?: string | null
          name?: string
        }
        Relationships: []
      }
      casing_fans: {
        Row: {
          color: string | null
          id: number
          noise_level: string | null
          product_id: number
          size_mm: number | null
          speed_rpm: number | null
        }
        Insert: {
          color?: string | null
          id?: number
          noise_level?: string | null
          product_id: number
          size_mm?: number | null
          speed_rpm?: number | null
        }
        Update: {
          color?: string | null
          id?: number
          noise_level?: string | null
          product_id?: number
          size_mm?: number | null
          speed_rpm?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "casing_fans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "casing_fans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_casings"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casing_fans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casing_fans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_gpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casing_fans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_internal_storages"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casing_fans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_memories"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casing_fans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_motherboards"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casing_fans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_power_supplies"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casing_fans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_images"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casing_fans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      casing_types: {
        Row: {
          id: number
          mobo_supports: string[]
          name: string
        }
        Insert: {
          id?: number
          mobo_supports: string[]
          name: string
        }
        Update: {
          id?: number
          mobo_supports?: string[]
          name?: string
        }
        Relationships: []
      }
      casings: {
        Row: {
          colors: string[] | null
          drive_bays: Json | null
          dust_cover: string | null
          expansion_slot: number | null
          fan_slots: number | null
          height_mm: number | null
          id: number
          io_port: string | null
          length_mm: number | null
          max_cpu_cooler_length_mm: number | null
          max_gpu_length_mm: number | null
          max_psu_length_mm: number | null
          product_id: number | null
          side_panel: string | null
          type_id: number | null
          weight_kg: number | null
          width_mm: number | null
        }
        Insert: {
          colors?: string[] | null
          drive_bays?: Json | null
          dust_cover?: string | null
          expansion_slot?: number | null
          fan_slots?: number | null
          height_mm?: number | null
          id?: number
          io_port?: string | null
          length_mm?: number | null
          max_cpu_cooler_length_mm?: number | null
          max_gpu_length_mm?: number | null
          max_psu_length_mm?: number | null
          product_id?: number | null
          side_panel?: string | null
          type_id?: number | null
          weight_kg?: number | null
          width_mm?: number | null
        }
        Update: {
          colors?: string[] | null
          drive_bays?: Json | null
          dust_cover?: string | null
          expansion_slot?: number | null
          fan_slots?: number | null
          height_mm?: number | null
          id?: number
          io_port?: string | null
          length_mm?: number | null
          max_cpu_cooler_length_mm?: number | null
          max_gpu_length_mm?: number | null
          max_psu_length_mm?: number | null
          product_id?: number | null
          side_panel?: string | null
          type_id?: number | null
          weight_kg?: number | null
          width_mm?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "casings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "casings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_casings"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_gpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_internal_storages"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_memories"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_motherboards"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_power_supplies"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_images"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_products"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "casings_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "casing_types"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      cpu_coolers: {
        Row: {
          color: string | null
          cpu_socket_support: string | null
          fan_rpm: number | null
          id: number
          product_id: number | null
          radiator_size_mm: number | null
          type: string | null
        }
        Insert: {
          color?: string | null
          cpu_socket_support?: string | null
          fan_rpm?: number | null
          id?: number
          product_id?: number | null
          radiator_size_mm?: number | null
          type?: string | null
        }
        Update: {
          color?: string | null
          cpu_socket_support?: string | null
          fan_rpm?: number | null
          id?: number
          product_id?: number | null
          radiator_size_mm?: number | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cpu_coolers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cpu_coolers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_casings"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpu_coolers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpu_coolers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_gpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpu_coolers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_internal_storages"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpu_coolers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_memories"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpu_coolers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_motherboards"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpu_coolers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_power_supplies"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpu_coolers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_images"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpu_coolers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      cpu_families: {
        Row: {
          code_name: string | null
          id: number
          model_line: string | null
          release_date: string | null
        }
        Insert: {
          code_name?: string | null
          id?: number
          model_line?: string | null
          release_date?: string | null
        }
        Update: {
          code_name?: string | null
          id?: number
          model_line?: string | null
          release_date?: string | null
        }
        Relationships: []
      }
      cpu_integrated_gpus: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name?: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      cpu_sockets: {
        Row: {
          id: number
          introduction_year: string | null
          name: string
        }
        Insert: {
          id?: number
          introduction_year?: string | null
          name: string
        }
        Update: {
          id?: number
          introduction_year?: string | null
          name?: string
        }
        Relationships: []
      }
      cpus: {
        Row: {
          base_clock_ghz: number | null
          base_power_watt: number | null
          cpu_family_id: number | null
          cpu_socket_id: number | null
          efficiency_core: number | null
          id: number
          integrated_gpu_id: number | null
          max_clock_ghz: number | null
          max_memory_channel: number | null
          max_memory_gb: number | null
          max_power_watt: number | null
          performance_core: number | null
          product_id: number | null
          total_thread: number | null
        }
        Insert: {
          base_clock_ghz?: number | null
          base_power_watt?: number | null
          cpu_family_id?: number | null
          cpu_socket_id?: number | null
          efficiency_core?: number | null
          id?: number
          integrated_gpu_id?: number | null
          max_clock_ghz?: number | null
          max_memory_channel?: number | null
          max_memory_gb?: number | null
          max_power_watt?: number | null
          performance_core?: number | null
          product_id?: number | null
          total_thread?: number | null
        }
        Update: {
          base_clock_ghz?: number | null
          base_power_watt?: number | null
          cpu_family_id?: number | null
          cpu_socket_id?: number | null
          efficiency_core?: number | null
          id?: number
          integrated_gpu_id?: number | null
          max_clock_ghz?: number | null
          max_memory_channel?: number | null
          max_memory_gb?: number | null
          max_power_watt?: number | null
          performance_core?: number | null
          product_id?: number | null
          total_thread?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cpus_cpu_family_id_fkey"
            columns: ["cpu_family_id"]
            isOneToOne: false
            referencedRelation: "cpu_families"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cpus_cpu_socket_id_fkey"
            columns: ["cpu_socket_id"]
            isOneToOne: false
            referencedRelation: "cpu_sockets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cpus_cpu_socket_id_fkey"
            columns: ["cpu_socket_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["cpu_socket_id"]
          },
          {
            foreignKeyName: "cpus_integrated_gpu_id_fkey"
            columns: ["integrated_gpu_id"]
            isOneToOne: false
            referencedRelation: "cpu_integrated_gpus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_casings"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_cpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_gpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_internal_storages"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_memories"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_motherboards"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_power_supplies"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_product_images"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      gpu_chipsets: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      gpus: {
        Row: {
          base_clock_mhz: number | null
          boost_clock_mhz: number | null
          bus_interface: Database["public"]["Enums"]["bus_interface"] | null
          core_count: number | null
          gpu_chipset_id: number | null
          gpu_memory_type: Database["public"]["Enums"]["gpu_memory_type"] | null
          height_mm: number | null
          id: number
          length_mm: number | null
          memory_bus_bit: number | null
          min_psu_watt: number | null
          product_id: number
          tdp_watt: number | null
          vram_gb: number | null
          width_mm: number | null
        }
        Insert: {
          base_clock_mhz?: number | null
          boost_clock_mhz?: number | null
          bus_interface?: Database["public"]["Enums"]["bus_interface"] | null
          core_count?: number | null
          gpu_chipset_id?: number | null
          gpu_memory_type?:
            | Database["public"]["Enums"]["gpu_memory_type"]
            | null
          height_mm?: number | null
          id?: number
          length_mm?: number | null
          memory_bus_bit?: number | null
          min_psu_watt?: number | null
          product_id: number
          tdp_watt?: number | null
          vram_gb?: number | null
          width_mm?: number | null
        }
        Update: {
          base_clock_mhz?: number | null
          boost_clock_mhz?: number | null
          bus_interface?: Database["public"]["Enums"]["bus_interface"] | null
          core_count?: number | null
          gpu_chipset_id?: number | null
          gpu_memory_type?:
            | Database["public"]["Enums"]["gpu_memory_type"]
            | null
          height_mm?: number | null
          id?: number
          length_mm?: number | null
          memory_bus_bit?: number | null
          min_psu_watt?: number | null
          product_id?: number
          tdp_watt?: number | null
          vram_gb?: number | null
          width_mm?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "gpus_gpu_chipset_id_fkey"
            columns: ["gpu_chipset_id"]
            isOneToOne: false
            referencedRelation: "gpu_chipsets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_casings"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "gpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "gpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_gpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "gpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_internal_storages"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "gpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_memories"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "gpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_motherboards"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "gpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_power_supplies"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "gpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_images"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "gpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      internal_storages: {
        Row: {
          capacity_gb: number
          form_factor: string | null
          id: number
          interface: string | null
          product_id: number | null
          read_speed_mbs: number | null
          type: Database["public"]["Enums"]["storage_type"]
          write_speed_mbs: number | null
        }
        Insert: {
          capacity_gb?: number
          form_factor?: string | null
          id?: number
          interface?: string | null
          product_id?: number | null
          read_speed_mbs?: number | null
          type: Database["public"]["Enums"]["storage_type"]
          write_speed_mbs?: number | null
        }
        Update: {
          capacity_gb?: number
          form_factor?: string | null
          id?: number
          interface?: string | null
          product_id?: number | null
          read_speed_mbs?: number | null
          type?: Database["public"]["Enums"]["storage_type"]
          write_speed_mbs?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "internal_storages_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "internal_storages_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_casings"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "internal_storages_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "internal_storages_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_gpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "internal_storages_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_internal_storages"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "internal_storages_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_memories"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "internal_storages_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_motherboards"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "internal_storages_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_power_supplies"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "internal_storages_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_images"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "internal_storages_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      marketplaces: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      memories: {
        Row: {
          amount: number
          capacity_gb: number | null
          has_ecc: boolean | null
          has_heatsink: boolean | null
          has_rgb: boolean | null
          id: number
          overclocked: boolean | null
          product_id: number | null
          type_id: number | null
          voltage: number | null
        }
        Insert: {
          amount: number
          capacity_gb?: number | null
          has_ecc?: boolean | null
          has_heatsink?: boolean | null
          has_rgb?: boolean | null
          id?: number
          overclocked?: boolean | null
          product_id?: number | null
          type_id?: number | null
          voltage?: number | null
        }
        Update: {
          amount?: number
          capacity_gb?: number | null
          has_ecc?: boolean | null
          has_heatsink?: boolean | null
          has_rgb?: boolean | null
          id?: number
          overclocked?: boolean | null
          product_id?: number | null
          type_id?: number | null
          voltage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_casings"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_gpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_internal_storages"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_memories"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_motherboards"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_power_supplies"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_images"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_products"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "memory_types"
            referencedColumns: ["id"]
          },
        ]
      }
      memory_types: {
        Row: {
          frequency_mhz: number | null
          friendly_name: string | null
          id: number
          industry_name: string | null
          type: Database["public"]["Enums"]["memory_type"]
        }
        Insert: {
          frequency_mhz?: number | null
          friendly_name?: string | null
          id?: number
          industry_name?: string | null
          type: Database["public"]["Enums"]["memory_type"]
        }
        Update: {
          frequency_mhz?: number | null
          friendly_name?: string | null
          id?: number
          industry_name?: string | null
          type?: Database["public"]["Enums"]["memory_type"]
        }
        Relationships: []
      }
      motherboard_chipsets: {
        Row: {
          cpu_socket_id: number | null
          id: number
          name: string
        }
        Insert: {
          cpu_socket_id?: number | null
          id?: number
          name: string
        }
        Update: {
          cpu_socket_id?: number | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "motherboard_chipsets_cpu_socket_id_fkey"
            columns: ["cpu_socket_id"]
            isOneToOne: false
            referencedRelation: "cpu_sockets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "motherboard_chipsets_cpu_socket_id_fkey"
            columns: ["cpu_socket_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["cpu_socket_id"]
          },
        ]
      }
      motherboard_form_factors: {
        Row: {
          description: string
          id: number
          name: string
        }
        Insert: {
          description?: string
          id?: number
          name: string
        }
        Update: {
          description?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      motherboards: {
        Row: {
          back_pannel_ports: string | null
          chipset_id: number | null
          form_factor_id: number
          id: number
          max_memory_gb: number | null
          memory_channel_count: number | null
          memory_slot: number | null
          memory_type_id: number | null
          pcie_m2_slot: number | null
          pcie_slots: string | null
          product_id: number | null
          sata3_slot: number | null
          wifi_network: string | null
        }
        Insert: {
          back_pannel_ports?: string | null
          chipset_id?: number | null
          form_factor_id: number
          id?: number
          max_memory_gb?: number | null
          memory_channel_count?: number | null
          memory_slot?: number | null
          memory_type_id?: number | null
          pcie_m2_slot?: number | null
          pcie_slots?: string | null
          product_id?: number | null
          sata3_slot?: number | null
          wifi_network?: string | null
        }
        Update: {
          back_pannel_ports?: string | null
          chipset_id?: number | null
          form_factor_id?: number
          id?: number
          max_memory_gb?: number | null
          memory_channel_count?: number | null
          memory_slot?: number | null
          memory_type_id?: number | null
          pcie_m2_slot?: number | null
          pcie_slots?: string | null
          product_id?: number | null
          sata3_slot?: number | null
          wifi_network?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "motherboards_chipset_id_fkey"
            columns: ["chipset_id"]
            isOneToOne: false
            referencedRelation: "motherboard_chipsets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "motherboards_form_factor_id_fkey"
            columns: ["form_factor_id"]
            isOneToOne: false
            referencedRelation: "motherboard_form_factors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "motherboards_memory_type_id_fkey"
            columns: ["memory_type_id"]
            isOneToOne: false
            referencedRelation: "memory_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "motherboards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "motherboards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_casings"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "motherboards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "motherboards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_gpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "motherboards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_internal_storages"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "motherboards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_memories"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "motherboards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_motherboards"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "motherboards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_power_supplies"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "motherboards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_images"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "motherboards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      pc_builds: {
        Row: {
          casing_id: number | null
          cpu_cooler_id: number | null
          cpu_id: number | null
          cpu_socket_id: number | null
          gpu_id: number | null
          id: number
          internal_storage_id: number | null
          memory_id: number | null
          memory_socket_id: number | null
          motherboard_id: number | null
          psu_id: number | null
          thermal_paste_id: number | null
          user_id: string | null
        }
        Insert: {
          casing_id?: number | null
          cpu_cooler_id?: number | null
          cpu_id?: number | null
          cpu_socket_id?: number | null
          gpu_id?: number | null
          id?: number
          internal_storage_id?: number | null
          memory_id?: number | null
          memory_socket_id?: number | null
          motherboard_id?: number | null
          psu_id?: number | null
          thermal_paste_id?: number | null
          user_id?: string | null
        }
        Update: {
          casing_id?: number | null
          cpu_cooler_id?: number | null
          cpu_id?: number | null
          cpu_socket_id?: number | null
          gpu_id?: number | null
          id?: number
          internal_storage_id?: number | null
          memory_id?: number | null
          memory_socket_id?: number | null
          motherboard_id?: number | null
          psu_id?: number | null
          thermal_paste_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pc_builds_casing_id_fkey"
            columns: ["casing_id"]
            isOneToOne: false
            referencedRelation: "casings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_cpu_cooler_id_fkey"
            columns: ["cpu_cooler_id"]
            isOneToOne: false
            referencedRelation: "cpu_coolers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_cpu_id_fkey"
            columns: ["cpu_id"]
            isOneToOne: false
            referencedRelation: "cpus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_cpu_socket_id_fkey"
            columns: ["cpu_socket_id"]
            isOneToOne: false
            referencedRelation: "cpu_sockets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_cpu_socket_id_fkey"
            columns: ["cpu_socket_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["cpu_socket_id"]
          },
          {
            foreignKeyName: "pc_builds_gpu_id_fkey"
            columns: ["gpu_id"]
            isOneToOne: false
            referencedRelation: "gpus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_internal_storage_id_fkey"
            columns: ["internal_storage_id"]
            isOneToOne: false
            referencedRelation: "casings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_memory_id_fkey"
            columns: ["memory_id"]
            isOneToOne: false
            referencedRelation: "memories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_memory_socket_id_fkey"
            columns: ["memory_socket_id"]
            isOneToOne: false
            referencedRelation: "memory_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_motherboard_id_fkey"
            columns: ["motherboard_id"]
            isOneToOne: false
            referencedRelation: "motherboards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_psu_id_fkey"
            columns: ["psu_id"]
            isOneToOne: false
            referencedRelation: "power_supplies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_thermal_paste_id_fkey"
            columns: ["thermal_paste_id"]
            isOneToOne: false
            referencedRelation: "thermal_pastes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      power_supplies: {
        Row: {
          cpu_connector: string | null
          efficiency_rating_id: number
          form_factor_id: number | null
          id: number
          modularity: Database["public"]["Enums"]["psu_modularity"]
          peripherals_connector: string | null
          product_id: number | null
          protection: string | null
          rgb_connector: string | null
          vga_connector: string | null
          wattage: number | null
        }
        Insert: {
          cpu_connector?: string | null
          efficiency_rating_id: number
          form_factor_id?: number | null
          id?: number
          modularity: Database["public"]["Enums"]["psu_modularity"]
          peripherals_connector?: string | null
          product_id?: number | null
          protection?: string | null
          rgb_connector?: string | null
          vga_connector?: string | null
          wattage?: number | null
        }
        Update: {
          cpu_connector?: string | null
          efficiency_rating_id?: number
          form_factor_id?: number | null
          id?: number
          modularity?: Database["public"]["Enums"]["psu_modularity"]
          peripherals_connector?: string | null
          product_id?: number | null
          protection?: string | null
          rgb_connector?: string | null
          vga_connector?: string | null
          wattage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "power_supplies_efficiency_rating_id_fkey"
            columns: ["efficiency_rating_id"]
            isOneToOne: false
            referencedRelation: "psu_efficiency_ratings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "power_supplies_form_factor_id_fkey"
            columns: ["form_factor_id"]
            isOneToOne: false
            referencedRelation: "psu_form_factors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "power_supplies_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "power_supplies_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_casings"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "power_supplies_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "power_supplies_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_gpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "power_supplies_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_internal_storages"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "power_supplies_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_memories"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "power_supplies_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_motherboards"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "power_supplies_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_power_supplies"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "power_supplies_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_images"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "power_supplies_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      product_detail_descriptions: {
        Row: {
          description: string
          id: number
        }
        Insert: {
          description: string
          id?: number
        }
        Update: {
          description?: string
          id?: number
        }
        Relationships: []
      }
      product_details: {
        Row: {
          id: number
          marketplace_id: number | null
          price: number | null
          product_detail_description_id: number | null
          product_id: number
          seller_city: string | null
          stock: number | null
          url: string
        }
        Insert: {
          id?: number
          marketplace_id?: number | null
          price?: number | null
          product_detail_description_id?: number | null
          product_id: number
          seller_city?: string | null
          stock?: number | null
          url?: string
        }
        Update: {
          id?: number
          marketplace_id?: number | null
          price?: number | null
          product_detail_description_id?: number | null
          product_id?: number
          seller_city?: string | null
          stock?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_details_marketplace_id_fkey"
            columns: ["marketplace_id"]
            isOneToOne: false
            referencedRelation: "marketplaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_details_product_detail_description_id_fkey"
            columns: ["product_detail_description_id"]
            isOneToOne: false
            referencedRelation: "product_detail_descriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_casings"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_gpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_internal_storages"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_memories"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_motherboards"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_power_supplies"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_images"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      products: {
        Row: {
          brand_id: number | null
          category_id: number | null
          description: string
          id: number
          lowest_price: number | null
          name: string
          review_urls: string[] | null
          slug: string
          spec_url: string | null
        }
        Insert: {
          brand_id?: number | null
          category_id?: number | null
          description?: string
          id?: number
          lowest_price?: number | null
          name: string
          review_urls?: string[] | null
          slug?: string
          spec_url?: string | null
        }
        Update: {
          brand_id?: number | null
          category_id?: number | null
          description?: string
          id?: number
          lowest_price?: number | null
          name?: string
          review_urls?: string[] | null
          slug?: string
          spec_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "v_products"
            referencedColumns: ["brand_id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "v_products"
            referencedColumns: ["category_id"]
          },
        ]
      }
      psu_efficiency_ratings: {
        Row: {
          id: number
          loading_to_efficiency_percentage: Json | null
          name: string
        }
        Insert: {
          id?: number
          loading_to_efficiency_percentage?: Json | null
          name: string
        }
        Update: {
          id?: number
          loading_to_efficiency_percentage?: Json | null
          name?: string
        }
        Relationships: []
      }
      psu_form_factors: {
        Row: {
          depth_mm: number | null
          description: string | null
          height_mm: number | null
          id: number
          name: string | null
          width_mm: number | null
        }
        Insert: {
          depth_mm?: number | null
          description?: string | null
          height_mm?: number | null
          id?: number
          name?: string | null
          width_mm?: number | null
        }
        Update: {
          depth_mm?: number | null
          description?: string | null
          height_mm?: number | null
          id?: number
          name?: string | null
          width_mm?: number | null
        }
        Relationships: []
      }
      thermal_pastes: {
        Row: {
          conductivity: string | null
          id: number
          product_id: number | null
        }
        Insert: {
          conductivity?: string | null
          id?: number
          product_id?: number | null
        }
        Update: {
          conductivity?: string | null
          id?: number
          product_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "thermal_pastes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "thermal_pastes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_casings"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "thermal_pastes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "thermal_pastes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_gpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "thermal_pastes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_internal_storages"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "thermal_pastes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_memories"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "thermal_pastes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_motherboards"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "thermal_pastes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_power_supplies"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "thermal_pastes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_images"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "thermal_pastes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      wireless_network_cards: {
        Row: {
          color: string | null
          id: number
          interface: string | null
          product_id: number | null
          protocol: string | null
        }
        Insert: {
          color?: string | null
          id?: number
          interface?: string | null
          product_id?: number | null
          protocol?: string | null
        }
        Update: {
          color?: string | null
          id?: number
          interface?: string | null
          product_id?: number | null
          protocol?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wireless_network_cards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wireless_network_cards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_casings"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "wireless_network_cards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "wireless_network_cards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_gpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "wireless_network_cards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_internal_storages"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "wireless_network_cards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_memories"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "wireless_network_cards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_motherboards"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "wireless_network_cards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_power_supplies"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "wireless_network_cards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_images"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "wireless_network_cards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_products"
            referencedColumns: ["product_id"]
          },
        ]
      }
    }
    Views: {
      v_casings: {
        Row: {
          brand_name: string | null
          casing_type: string | null
          category_name: string | null
          colors: string[] | null
          description: string | null
          drive_bays: Json | null
          dust_cover: string | null
          expansion_slot: number | null
          fan_slots: number | null
          height_mm: number | null
          image_filenames: string[] | null
          io_port: string | null
          length_mm: number | null
          lowest_price: number | null
          max_cpu_cooler_length_mm: number | null
          max_gpu_length_mm: number | null
          max_psu_length_mm: number | null
          mobo_supports: string[] | null
          product_id: number | null
          product_name: string | null
          review_urls: string[] | null
          side_panel: string | null
          slug: string | null
          spec_url: string | null
          type_id: number | null
          weight_kg: number | null
          width_mm: number | null
        }
        Relationships: [
          {
            foreignKeyName: "casings_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "casing_types"
            referencedColumns: ["id"]
          },
        ]
      }
      v_cpus: {
        Row: {
          base_clock_ghz: number | null
          base_power_watt: number | null
          brand_name: string | null
          category_name: string | null
          code_name: string | null
          cpu_family_id: number | null
          cpu_socket: string | null
          cpu_socket_id: number | null
          description: string | null
          efficiency_core: number | null
          image_filenames: string[] | null
          integrated_gpu: string | null
          integrated_gpu_id: number | null
          lowest_price: number | null
          max_clock_ghz: number | null
          max_memory_channel: number | null
          max_memory_gb: number | null
          max_power_watt: number | null
          model_line: string | null
          performance_core: number | null
          product_id: number | null
          product_name: string | null
          review_urls: string[] | null
          slug: string | null
          spec_url: string | null
          total_core: number | null
          total_thread: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cpus_cpu_family_id_fkey"
            columns: ["cpu_family_id"]
            isOneToOne: false
            referencedRelation: "cpu_families"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cpus_integrated_gpu_id_fkey"
            columns: ["integrated_gpu_id"]
            isOneToOne: false
            referencedRelation: "cpu_integrated_gpus"
            referencedColumns: ["id"]
          },
        ]
      }
      v_gpus: {
        Row: {
          base_clock_mhz: number | null
          boost_clock_mhz: number | null
          brand_name: string | null
          bus_interface: Database["public"]["Enums"]["bus_interface"] | null
          category_name: string | null
          chipset: string | null
          core_count: number | null
          description: string | null
          gpu_chipset_id: number | null
          gpu_memory_type: Database["public"]["Enums"]["gpu_memory_type"] | null
          height_mm: number | null
          image_filenames: string[] | null
          length_mm: number | null
          lowest_price: number | null
          memory_bus_bit: number | null
          min_psu_watt: number | null
          product_id: number | null
          product_name: string | null
          review_urls: string[] | null
          slug: string | null
          spec_url: string | null
          tdp_watt: number | null
          vram_gb: number | null
          width_mm: number | null
        }
        Relationships: [
          {
            foreignKeyName: "gpus_gpu_chipset_id_fkey"
            columns: ["gpu_chipset_id"]
            isOneToOne: false
            referencedRelation: "gpu_chipsets"
            referencedColumns: ["id"]
          },
        ]
      }
      v_internal_storages: {
        Row: {
          brand_name: string | null
          capacity_gb: number | null
          category_name: string | null
          description: string | null
          form_factor: string | null
          image_filenames: string[] | null
          interface: string | null
          lowest_price: number | null
          product_id: number | null
          product_name: string | null
          read_speed_mbs: number | null
          review_urls: string[] | null
          slug: string | null
          spec_url: string | null
          type: Database["public"]["Enums"]["storage_type"] | null
          write_speed_mbs: number | null
        }
        Relationships: []
      }
      v_memories: {
        Row: {
          amount: number | null
          brand_name: string | null
          capacity_gb: number | null
          category_name: string | null
          description: string | null
          frequency_mhz: number | null
          has_ecc: boolean | null
          has_heatsink: boolean | null
          has_rgb: boolean | null
          image_filenames: string[] | null
          lowest_price: number | null
          memory_type: Database["public"]["Enums"]["memory_type"] | null
          overclocked: boolean | null
          product_id: number | null
          product_name: string | null
          review_urls: string[] | null
          slug: string | null
          spec_url: string | null
          type_id: number | null
          voltage: number | null
        }
        Relationships: [
          {
            foreignKeyName: "memories_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "memory_types"
            referencedColumns: ["id"]
          },
        ]
      }
      v_motherboards: {
        Row: {
          back_pannel_ports: string | null
          brand_name: string | null
          category_name: string | null
          chipset: string | null
          chipset_id: number | null
          cpu_socket: string | null
          cpu_socket_id: number | null
          cpu_socket_support: string | null
          description: string | null
          form_factor: string | null
          image_filenames: string[] | null
          lowest_price: number | null
          max_memory_gb: number | null
          memory_channel_count: number | null
          memory_frequency_mhz: number | null
          memory_slot: number | null
          memory_type: Database["public"]["Enums"]["memory_type"] | null
          memory_type_id: number | null
          pcie_m2_slot: number | null
          pcie_slots: string | null
          product_id: number | null
          product_name: string | null
          review_urls: string[] | null
          sata3_slot: number | null
          slug: string | null
          spec_url: string | null
          wifi_network: string | null
        }
        Relationships: [
          {
            foreignKeyName: "motherboard_chipsets_cpu_socket_id_fkey"
            columns: ["cpu_socket_id"]
            isOneToOne: false
            referencedRelation: "cpu_sockets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "motherboard_chipsets_cpu_socket_id_fkey"
            columns: ["cpu_socket_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["cpu_socket_id"]
          },
          {
            foreignKeyName: "motherboards_chipset_id_fkey"
            columns: ["chipset_id"]
            isOneToOne: false
            referencedRelation: "motherboard_chipsets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "motherboards_memory_type_id_fkey"
            columns: ["memory_type_id"]
            isOneToOne: false
            referencedRelation: "memory_types"
            referencedColumns: ["id"]
          },
        ]
      }
      v_power_supplies: {
        Row: {
          brand_name: string | null
          category_name: string | null
          cpu_connector: string | null
          description: string | null
          efficiency_rating: string | null
          form_factor: string | null
          form_factor_id: number | null
          image_filenames: string[] | null
          lowest_price: number | null
          modularity: Database["public"]["Enums"]["psu_modularity"] | null
          peripherals_connector: string | null
          product_id: number | null
          product_name: string | null
          protection: string | null
          review_urls: string[] | null
          rgb_connector: string | null
          slug: string | null
          spec_url: string | null
          vga_connector: string | null
          wattage: number | null
        }
        Relationships: [
          {
            foreignKeyName: "power_supplies_form_factor_id_fkey"
            columns: ["form_factor_id"]
            isOneToOne: false
            referencedRelation: "psu_form_factors"
            referencedColumns: ["id"]
          },
        ]
      }
      v_product_details: {
        Row: {
          marketplace_name: string | null
          price: number | null
          product_detail_description: string | null
          product_detail_id: number | null
          product_id: number | null
          seller_city: string | null
          stock: number | null
          url: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_casings"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_gpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_internal_storages"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_memories"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_motherboards"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_power_supplies"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_images"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      v_product_images: {
        Row: {
          image_filenames: string[] | null
          product_id: number | null
          product_name: string | null
        }
        Relationships: []
      }
      v_products: {
        Row: {
          brand_id: number | null
          brand_name: string | null
          category_id: number | null
          category_name: string | null
          description: string | null
          lowest_price: number | null
          product_id: number | null
          product_name: string | null
          review_urls: string[] | null
          slug: string | null
          spec_url: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_power_supply: {
        Args: {
          slug: string
        }
        Returns: {
          product_id: number
          product_slug: string
          product_name: string
          product_description: string
          image_paths: string[]
          url: string
          price: number
          stock: number
          form_factor: string
          efficiency_rating: string
          wattage: number
          color: string
          modularity: Database["public"]["Enums"]["psu_modularity"]
          width_mm: number
          height_mm: number
          depth_mm: number
        }[]
      }
      get_product_detail: {
        Args: {
          id_product: number
        }
        Returns: {
          product_detail_id: number
          product_id: number
          url: string
          price: number
          stock: number
        }[]
      }
      slugify: {
        Args: {
          value: string
        }
        Returns: string
      }
      unaccent: {
        Args: {
          "": string
        }
        Returns: string
      }
      unaccent_init: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admins: {
        Row: {
          avatar_filename: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          role: string
        }
        Insert: {
          avatar_filename?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          role: string
        }
        Update: {
          avatar_filename?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "admins_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          city: string
          created_at: string | null
          description: string | null
          id: number
          name: string
          type: Database["public"]["Enums"]["partner_type"]
        }
        Insert: {
          city: string
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          type: Database["public"]["Enums"]["partner_type"]
        }
        Update: {
          city?: string
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          type?: Database["public"]["Enums"]["partner_type"]
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string | null
          id: number
          message: string | null
          product_detail_id: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          message?: string | null
          product_detail_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: string | null
          product_detail_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_detail_id_fkey"
            columns: ["product_detail_id"]
            isOneToOne: false
            referencedRelation: "product_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_product_detail_id_fkey"
            columns: ["product_detail_id"]
            isOneToOne: false
            referencedRelation: "v_product_details"
            referencedColumns: ["product_detail_id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      service_orders: {
        Row: {
          created_at: string
          description: string | null
          finished_at: string | null
          id: number
          service_id: number | null
          status: Database["public"]["Enums"]["status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          finished_at?: string | null
          id?: number
          service_id?: number | null
          status?: Database["public"]["Enums"]["status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          finished_at?: string | null
          id?: number
          service_id?: number | null
          status?: Database["public"]["Enums"]["status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_orders_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          description: string | null
          id: number
          name: string | null
          price: number | null
        }
        Insert: {
          description?: string | null
          id?: number
          name?: string | null
          price?: number | null
        }
        Update: {
          description?: string | null
          id?: number
          name?: string | null
          price?: number | null
        }
        Relationships: []
      }
      test: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          id: string
          product_detail_id: number | null
          quantity: number | null
          user_id: string
        }
        Insert: {
          id: string
          product_detail_id?: number | null
          quantity?: number | null
          user_id: string
        }
        Update: {
          id?: string
          product_detail_id?: number | null
          quantity?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_product_detail_id_fkey"
            columns: ["product_detail_id"]
            isOneToOne: false
            referencedRelation: "product_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlists_product_detail_id_fkey"
            columns: ["product_detail_id"]
            isOneToOne: false
            referencedRelation: "v_product_details"
            referencedColumns: ["product_detail_id"]
          },
          {
            foreignKeyName: "wishlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_authorized: {
        Args: {
          user_id: string
          table_name: string
          permission_type: string
        }
        Returns: boolean
      }
      slugify: {
        Args: {
          value: string
        }
        Returns: string
      }
    }
    Enums: {
      bus_interface: "PCIe 3.0 ×16" | "PCIe 4.0 ×8" | "PCIe 4.0 ×16"
      gpu_memory_type: "GDDR6" | "GDDR6X" | "GDDR5"
      memory_type: "DDR3" | "DDR4" | "DDR5"
      partner_type: "jasa rakit pc" | "jasa servis pc/laptop" | "rakit keyboard"
      psu_modularity: "full" | "semi" | "no"
      status: "done" | "on-going" | "cancelled"
      storage_type: "SSD" | "HDD"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
