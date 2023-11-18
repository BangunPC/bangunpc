export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
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
            referencedRelation: "v_all_products"
            referencedColumns: ["product_id"]
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
          }
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
          depth_mm: number | null
          drive_bays: Json | null
          fan_slots: number | null
          gpu_max_mm: number | null
          height_mm: number | null
          id: number
          product_id: number | null
          type_id: number | null
          weight_kg: number | null
          width_mm: number | null
        }
        Insert: {
          colors?: string[] | null
          depth_mm?: number | null
          drive_bays?: Json | null
          fan_slots?: number | null
          gpu_max_mm?: number | null
          height_mm?: number | null
          id?: number
          product_id?: number | null
          type_id?: number | null
          weight_kg?: number | null
          width_mm?: number | null
        }
        Update: {
          colors?: string[] | null
          depth_mm?: number | null
          drive_bays?: Json | null
          fan_slots?: number | null
          gpu_max_mm?: number | null
          height_mm?: number | null
          id?: number
          product_id?: number | null
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
            referencedRelation: "v_all_products"
            referencedColumns: ["product_id"]
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
            foreignKeyName: "casings_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "casing_types"
            referencedColumns: ["id"]
          }
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
          boost_clock_ghz: number | null
          core_clock_ghz: number | null
          core_count: number | null
          cpu_socket_id: number | null
          id: number
          integrated_gpu_id: number | null
          product_id: number | null
          tdp: number
        }
        Insert: {
          boost_clock_ghz?: number | null
          core_clock_ghz?: number | null
          core_count?: number | null
          cpu_socket_id?: number | null
          id?: number
          integrated_gpu_id?: number | null
          product_id?: number | null
          tdp: number
        }
        Update: {
          boost_clock_ghz?: number | null
          core_clock_ghz?: number | null
          core_count?: number | null
          cpu_socket_id?: number | null
          id?: number
          integrated_gpu_id?: number | null
          product_id?: number | null
          tdp?: number
        }
        Relationships: [
          {
            foreignKeyName: "cpus_cpu_socket_id_fkey"
            columns: ["cpu_socket_id"]
            isOneToOne: false
            referencedRelation: "cpu_sockets"
            referencedColumns: ["id"]
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
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_all_products"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_casings"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_gpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_internal_storages"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_memories"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_motherboards"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_power_supplies"
            referencedColumns: ["product_id"]
          }
        ]
      }
      gpus: {
        Row: {
          boost_clock_mhz: number | null
          chipset: string | null
          color: string | null
          core_clock_mhz: number | null
          id: number
          length_mm: number | null
          product_id: number
          tdp_watt: number | null
          vram_gb: number | null
        }
        Insert: {
          boost_clock_mhz?: number | null
          chipset?: string | null
          color?: string | null
          core_clock_mhz?: number | null
          id?: number
          length_mm?: number | null
          product_id: number
          tdp_watt?: number | null
          vram_gb?: number | null
        }
        Update: {
          boost_clock_mhz?: number | null
          chipset?: string | null
          color?: string | null
          core_clock_mhz?: number | null
          id?: number
          length_mm?: number | null
          product_id?: number
          tdp_watt?: number | null
          vram_gb?: number | null
        }
        Relationships: [
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
            referencedRelation: "v_all_products"
            referencedColumns: ["product_id"]
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
          }
        ]
      }
      internal_storages: {
        Row: {
          form_factor: string | null
          id: number
          interface: string | null
          product_id: number | null
          size_gb: number
          type: Database["public"]["Enums"]["storage_type"]
        }
        Insert: {
          form_factor?: string | null
          id?: number
          interface?: string | null
          product_id?: number | null
          size_gb?: number
          type: Database["public"]["Enums"]["storage_type"]
        }
        Update: {
          form_factor?: string | null
          id?: number
          interface?: string | null
          product_id?: number | null
          size_gb?: number
          type?: Database["public"]["Enums"]["storage_type"]
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
            referencedRelation: "v_all_products"
            referencedColumns: ["product_id"]
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
          }
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
          frequency_mhz: number | null
          has_ecc: boolean | null
          has_rgb: boolean | null
          id: number
          product_id: number | null
          type_id: number | null
          voltage: number | null
        }
        Insert: {
          amount: number
          capacity_gb?: number | null
          frequency_mhz?: number | null
          has_ecc?: boolean | null
          has_rgb?: boolean | null
          id?: number
          product_id?: number | null
          type_id?: number | null
          voltage?: number | null
        }
        Update: {
          amount?: number
          capacity_gb?: number | null
          frequency_mhz?: number | null
          has_ecc?: boolean | null
          has_rgb?: boolean | null
          id?: number
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
            referencedRelation: "v_all_products"
            referencedColumns: ["product_id"]
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
            foreignKeyName: "memories_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "memory_types"
            referencedColumns: ["id"]
          }
        ]
      }
      memory_types: {
        Row: {
          description: string | null
          id: number
          name: string | null
          year_release: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          name?: string | null
          year_release?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          name?: string | null
          year_release?: string | null
        }
        Relationships: []
      }
      motherboard_chipsets: {
        Row: {
          code_name_id: number | null
          cpu_socket_id: number | null
          id: number
          name: string
        }
        Insert: {
          code_name_id?: number | null
          cpu_socket_id?: number | null
          id?: number
          name?: string
        }
        Update: {
          code_name_id?: number | null
          cpu_socket_id?: number | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "motherboard_chipsets_code_name_id_fkey"
            columns: ["code_name_id"]
            isOneToOne: false
            referencedRelation: "motherboard_code_name"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "motherboard_chipsets_cpu_socket_id_fkey"
            columns: ["cpu_socket_id"]
            isOneToOne: false
            referencedRelation: "cpu_sockets"
            referencedColumns: ["id"]
          }
        ]
      }
      motherboard_code_name: {
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
          chipset: string | null
          color: string | null
          cpu_socket_id: number | null
          form_factor_id: number
          id: number
          input_output_ports: string | null
          memory_max_gb: number | null
          memory_slot_amount: number | null
          memory_type_id: number | null
          pcie_slots: string | null
          product_id: number | null
          storage_interface: string | null
        }
        Insert: {
          chipset?: string | null
          color?: string | null
          cpu_socket_id?: number | null
          form_factor_id: number
          id?: number
          input_output_ports?: string | null
          memory_max_gb?: number | null
          memory_slot_amount?: number | null
          memory_type_id?: number | null
          pcie_slots?: string | null
          product_id?: number | null
          storage_interface?: string | null
        }
        Update: {
          chipset?: string | null
          color?: string | null
          cpu_socket_id?: number | null
          form_factor_id?: number
          id?: number
          input_output_ports?: string | null
          memory_max_gb?: number | null
          memory_slot_amount?: number | null
          memory_type_id?: number | null
          pcie_slots?: string | null
          product_id?: number | null
          storage_interface?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "motherboards_cpu_socket_id_fkey"
            columns: ["cpu_socket_id"]
            isOneToOne: false
            referencedRelation: "cpu_sockets"
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
            referencedRelation: "v_all_products"
            referencedColumns: ["product_id"]
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
          }
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
          memory_id: number | null
          memory_socket_id: number | null
          motherboard_id: number | null
          psu_id: number | null
          storage_id: number | null
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
          memory_id?: number | null
          memory_socket_id?: number | null
          motherboard_id?: number | null
          psu_id?: number | null
          storage_id?: number | null
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
          memory_id?: number | null
          memory_socket_id?: number | null
          motherboard_id?: number | null
          psu_id?: number | null
          storage_id?: number | null
          thermal_paste_id?: number | null
          user_id?: string | null
        }
        Relationships: [
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
            foreignKeyName: "pc_builds_gpu_id_fkey"
            columns: ["gpu_id"]
            isOneToOne: false
            referencedRelation: "gpus"
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
            foreignKeyName: "pc_builds_storage_id_fkey"
            columns: ["storage_id"]
            isOneToOne: false
            referencedRelation: "casings"
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
          }
        ]
      }
      power_supplies: {
        Row: {
          color: string | null
          depth_mm: number | null
          efficiency_rating_id: number
          form_factor_id: number | null
          height_mm: number | null
          id: number
          modularity: Database["public"]["Enums"]["psu_modularity"]
          product_id: number | null
          wattage: number | null
          width_mm: number | null
        }
        Insert: {
          color?: string | null
          depth_mm?: number | null
          efficiency_rating_id: number
          form_factor_id?: number | null
          height_mm?: number | null
          id?: number
          modularity: Database["public"]["Enums"]["psu_modularity"]
          product_id?: number | null
          wattage?: number | null
          width_mm?: number | null
        }
        Update: {
          color?: string | null
          depth_mm?: number | null
          efficiency_rating_id?: number
          form_factor_id?: number | null
          height_mm?: number | null
          id?: number
          modularity?: Database["public"]["Enums"]["psu_modularity"]
          product_id?: number | null
          wattage?: number | null
          width_mm?: number | null
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
            referencedRelation: "v_all_products"
            referencedColumns: ["product_id"]
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
          }
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
            referencedRelation: "v_all_products"
            referencedColumns: ["product_id"]
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
          }
        ]
      }
      products: {
        Row: {
          brand_id: number | null
          category_id: number | null
          description: string
          id: number
          image_paths: string[] | null
          lowest_price: number | null
          name: string
          slug: string
        }
        Insert: {
          brand_id?: number | null
          category_id?: number | null
          description?: string
          id?: number
          image_paths?: string[] | null
          lowest_price?: number | null
          name: string
          slug?: string
        }
        Update: {
          brand_id?: number | null
          category_id?: number | null
          description?: string
          id?: number
          image_paths?: string[] | null
          lowest_price?: number | null
          name?: string
          slug?: string
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
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "v_all_products"
            referencedColumns: ["product_id"]
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
          }
        ]
      }
      wireless_network_cards: {
        Row: {
          color: string | null
          id: number
          id_components: number | null
          interface: string | null
          protocol: string | null
        }
        Insert: {
          color?: string | null
          id?: number
          id_components?: number | null
          interface?: string | null
          protocol?: string | null
        }
        Update: {
          color?: string | null
          id?: number
          id_components?: number | null
          interface?: string | null
          protocol?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      v_all_products: {
        Row: {
          brand_name: string | null
          category_name: string | null
          description: string | null
          image_paths: string[] | null
          lowest_price: number | null
          product_id: number | null
          product_name: string | null
          slug: string | null
        }
        Relationships: []
      }
      v_casings: {
        Row: {
          brand_name: string | null
          casing_type: string | null
          colors: string[] | null
          depth_mm: number | null
          description: string | null
          drive_bays: Json | null
          fan_slots: number | null
          gpu_max_mm: number | null
          height_mm: number | null
          image_paths: string[] | null
          lowest_price: number | null
          mobo_supports: string[] | null
          product_id: number | null
          product_name: string | null
          slug: string | null
          weight_kg: number | null
          width_mm: number | null
        }
        Relationships: []
      }
      v_cpus: {
        Row: {
          boost_clock_ghz: number | null
          brand_name: string | null
          core_clock_ghz: number | null
          core_count: number | null
          cpu_socket: string | null
          description: string | null
          image_paths: string[] | null
          integrated_gpu: string | null
          lowest_price: number | null
          product_id: number | null
          product_name: string | null
          slug: string | null
          tdp: number | null
        }
        Relationships: []
      }
      v_gpus: {
        Row: {
          boost_clock_mhz: number | null
          brand_name: string | null
          chipset: string | null
          color: string | null
          core_clock_mhz: number | null
          description: string | null
          image_paths: string[] | null
          length_mm: number | null
          lowest_price: number | null
          product_id: number | null
          product_name: string | null
          slug: string | null
          tdp_watt: number | null
          vram_gb: number | null
        }
        Relationships: []
      }
      v_internal_storages: {
        Row: {
          brand_name: string | null
          description: string | null
          form_factor: string | null
          image_paths: string[] | null
          interface: string | null
          lowest_price: number | null
          product_id: number | null
          product_name: string | null
          size_gb: number | null
          slug: string | null
          type: Database["public"]["Enums"]["storage_type"] | null
        }
        Relationships: []
      }
      v_memories: {
        Row: {
          amount: number | null
          brand_name: string | null
          capacity_gb: number | null
          description: string | null
          frequency_mhz: number | null
          has_ecc: boolean | null
          has_rgb: boolean | null
          image_paths: string[] | null
          lowest_price: number | null
          memory_type: string | null
          product_id: number | null
          product_name: string | null
          slug: string | null
          voltage: number | null
        }
        Relationships: []
      }
      v_motherboards: {
        Row: {
          brand_name: string | null
          chipset: string | null
          color: string | null
          cpu_socket: string | null
          description: string | null
          form_factor: string | null
          image_paths: string[] | null
          input_output_ports: string | null
          lowest_price: number | null
          memory_max_gb: number | null
          memory_slot_amount: number | null
          memory_type: string | null
          pcie_slots: string | null
          product_id: number | null
          product_name: string | null
          slug: string | null
          storage_interface: string | null
        }
        Relationships: []
      }
      v_power_supplies: {
        Row: {
          brand_name: string | null
          color: string | null
          depth_mm: number | null
          description: string | null
          efficiency_rating: string | null
          form_factor: string | null
          height_mm: number | null
          image_paths: string[] | null
          lowest_price: number | null
          modularity: Database["public"]["Enums"]["psu_modularity"] | null
          product_id: number | null
          product_name: string | null
          slug: string | null
          wattage: number | null
          width_mm: number | null
        }
        Relationships: []
      }
      v_product_details: {
        Row: {
          marketplace_name: string | null
          price: number | null
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
            referencedRelation: "v_all_products"
            referencedColumns: ["product_id"]
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
          }
        ]
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
      copy_v_all_product_list: {
        Row: {
          brand_name: string | null
          category: string | null
          image_path: string | null
          price: number | null
          product_detail_id: number | null
          product_name: string | null
          slug: string | null
          stock: number | null
          url: string | null
        }
        Insert: {
          brand_name?: string | null
          category?: string | null
          image_path?: string | null
          price?: number | null
          product_detail_id?: number | null
          product_name?: string | null
          slug?: string | null
          stock?: number | null
          url?: string | null
        }
        Update: {
          brand_name?: string | null
          category?: string | null
          image_path?: string | null
          price?: number | null
          product_detail_id?: number | null
          product_name?: string | null
          slug?: string | null
          stock?: number | null
          url?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          city: string
          description: string | null
          id: number
          name: string
          type: Database["public"]["Enums"]["partner_type"]
        }
        Insert: {
          city: string
          description?: string | null
          id?: number
          name: string
          type: Database["public"]["Enums"]["partner_type"]
        }
        Update: {
          city?: string
          description?: string | null
          id?: number
          name?: string
          type?: Database["public"]["Enums"]["partner_type"]
        }
        Relationships: []
      }
      permission_types: {
        Row: {
          id: number
          permission_type: string
        }
        Insert: {
          id?: number
          permission_type?: string
        }
        Update: {
          id?: number
          permission_type?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          permission_type_id: number | null
          role_id: number
          table_name: string
        }
        Insert: {
          permission_type_id?: number | null
          role_id: number
          table_name: string
        }
        Update: {
          permission_type_id?: number | null
          role_id?: number
          table_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "permissions_permission_type_id_fkey"
            columns: ["permission_type_id"]
            isOneToOne: false
            referencedRelation: "permission_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          }
        ]
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
          }
        ]
      }
      roles: {
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
          }
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
      user_roles: {
        Row: {
          id: number
          role_id: number | null
          user_id: string | null
        }
        Insert: {
          id?: number
          role_id?: number | null
          user_id?: string | null
        }
        Update: {
          id?: number
          role_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string
          email: string
          fullname: string
          id: number
          phone_number: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          email: string
          fullname: string
          id?: number
          phone_number?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          email?: string
          fullname?: string
          id?: number
          phone_number?: string | null
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
          }
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
