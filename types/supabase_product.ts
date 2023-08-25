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
        Relationships: []
      }
      casings: {
        Row: {
          color: string | null
          fan_slots: number | null
          gpu_max_mm: number | null
          id: number
          product_id: number | null
          storage_slots: string | null
          type: string | null
        }
        Insert: {
          color?: string | null
          fan_slots?: number | null
          gpu_max_mm?: number | null
          id?: number
          product_id?: number | null
          storage_slots?: string | null
          type?: string | null
        }
        Update: {
          color?: string | null
          fan_slots?: number | null
          gpu_max_mm?: number | null
          id?: number
          product_id?: number | null
          storage_slots?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "casings_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      cpu_coolers: {
        Row: {
          color: string | null
          cpu_socket_support: string | null
          fan_rpm: number | null
          id: number
          id_components: number | null
          radiator_size_mm: number | null
          type: string | null
        }
        Insert: {
          color?: string | null
          cpu_socket_support?: string | null
          fan_rpm?: number | null
          id?: number
          id_components?: number | null
          radiator_size_mm?: number | null
          type?: string | null
        }
        Update: {
          color?: string | null
          cpu_socket_support?: string | null
          fan_rpm?: number | null
          id?: number
          id_components?: number | null
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
          socket_name: string
        }
        Insert: {
          id?: number
          introduction_year?: string | null
          socket_name: string
        }
        Update: {
          id?: number
          introduction_year?: string | null
          socket_name?: string
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
            referencedRelation: "cpu_sockets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cpus_integrated_gpu_id_fkey"
            columns: ["integrated_gpu_id"]
            referencedRelation: "cpu_integrated_gpus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cpus_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      gpu_chipsets: {
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
            referencedRelation: "products"
            referencedColumns: ["id"]
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
          type: "SSD" | "HDD"
        }
        Insert: {
          form_factor?: string | null
          id?: number
          interface?: string | null
          product_id?: number | null
          size_gb?: number
          type: "SSD" | "HDD"
        }
        Update: {
          form_factor?: string | null
          id?: number
          interface?: string | null
          product_id?: number | null
          size_gb?: number
          type?: "SSD" | "HDD"
        }
        Relationships: [
          {
            foreignKeyName: "internal_storages_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      memories: {
        Row: {
          amount: number
          id: number
          memory_socket_id: number | null
          product_id: number | null
          size_gb: number | null
          speed_mhz: number | null
        }
        Insert: {
          amount: number
          id?: number
          memory_socket_id?: number | null
          product_id?: number | null
          size_gb?: number | null
          speed_mhz?: number | null
        }
        Update: {
          amount?: number
          id?: number
          memory_socket_id?: number | null
          product_id?: number | null
          size_gb?: number | null
          speed_mhz?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "memories_memory_socket_id_fkey"
            columns: ["memory_socket_id"]
            referencedRelation: "memory_sockets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      memory_sockets: {
        Row: {
          description: string | null
          id: number
          socket: string | null
          year_release: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          socket?: string | null
          year_release?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          socket?: string | null
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
            referencedRelation: "motherboard_code_name"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "motherboard_chipsets_cpu_socket_id_fkey"
            columns: ["cpu_socket_id"]
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
          form_factor_id: number
          id: number
          id_cpu_socket: number | null
          input_output_ports: string | null
          memory_max_gb: number | null
          memory_slots: string | null
          memory_socket_id: number | null
          pcie_slots: string | null
          product_id: number | null
          storage_interface: string | null
        }
        Insert: {
          chipset?: string | null
          color?: string | null
          form_factor_id: number
          id?: number
          id_cpu_socket?: number | null
          input_output_ports?: string | null
          memory_max_gb?: number | null
          memory_slots?: string | null
          memory_socket_id?: number | null
          pcie_slots?: string | null
          product_id?: number | null
          storage_interface?: string | null
        }
        Update: {
          chipset?: string | null
          color?: string | null
          form_factor_id?: number
          id?: number
          id_cpu_socket?: number | null
          input_output_ports?: string | null
          memory_max_gb?: number | null
          memory_slots?: string | null
          memory_socket_id?: number | null
          pcie_slots?: string | null
          product_id?: number | null
          storage_interface?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "motherboards_form_factor_id_fkey"
            columns: ["form_factor_id"]
            referencedRelation: "motherboard_form_factors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "motherboards_id_cpu_socket_fkey"
            columns: ["id_cpu_socket"]
            referencedRelation: "cpu_sockets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "motherboards_memory_socket_id_fkey"
            columns: ["memory_socket_id"]
            referencedRelation: "memory_sockets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "motherboards_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
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
            foreignKeyName: "pc_builds_casing_id_fkey"
            columns: ["casing_id"]
            referencedRelation: "casings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_cpu_cooler_id_fkey"
            columns: ["cpu_cooler_id"]
            referencedRelation: "cpu_coolers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_cpu_socket_id_fkey"
            columns: ["cpu_socket_id"]
            referencedRelation: "cpu_sockets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_gpu_id_fkey"
            columns: ["gpu_id"]
            referencedRelation: "gpus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_memory_id_fkey"
            columns: ["memory_id"]
            referencedRelation: "memories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_memory_socket_id_fkey"
            columns: ["memory_socket_id"]
            referencedRelation: "memory_sockets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_psu_id_fkey"
            columns: ["psu_id"]
            referencedRelation: "power_supplies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_storage_id_fkey"
            columns: ["storage_id"]
            referencedRelation: "casings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_thermal_paste_id_fkey"
            columns: ["thermal_paste_id"]
            referencedRelation: "thermal_pastes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pc_builds_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      power_supplies: {
        Row: {
          color: string | null
          efficiency_rating: string | null
          form_factor: string | null
          id: number
          modularity: "full" | "semi" | "no"
          product_id: number | null
          wattage: number | null
        }
        Insert: {
          color?: string | null
          efficiency_rating?: string | null
          form_factor?: string | null
          id?: number
          modularity: "full" | "semi" | "no"
          product_id?: number | null
          wattage?: number | null
        }
        Update: {
          color?: string | null
          efficiency_rating?: string | null
          form_factor?: string | null
          id?: number
          modularity?: "full" | "semi" | "no"
          product_id?: number | null
          wattage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "power_supplies_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      product_details: {
        Row: {
          id: number
          price: number | null
          product_id: number | null
          stock: number | null
          url: string
        }
        Insert: {
          id: number
          price?: number | null
          product_id?: number | null
          stock?: number | null
          url?: string
        }
        Update: {
          id?: number
          price?: number | null
          product_id?: number | null
          stock?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_details_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          brand_id: number | null
          description: string
          id: number
          image: string | null
          name: string
        }
        Insert: {
          brand_id?: number | null
          description?: string
          id?: number
          image?: string | null
          name: string
        }
        Update: {
          brand_id?: number | null
          description?: string
          id?: number
          image?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            referencedRelation: "brands"
            referencedColumns: ["id"]
          }
        ]
      }
      thermal_pastes: {
        Row: {
          conductivity: string | null
          id: number
          id_components: number | null
        }
        Insert: {
          conductivity?: string | null
          id?: number
          id_components?: number | null
        }
        Update: {
          conductivity?: string | null
          id?: number
          id_components?: number | null
        }
        Relationships: []
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
      v_all_product_list: {
        Row: {
          brand_name: string | null
          image: string | null
          price: number | null
          product_detail_id: number | null
          product_name: string | null
          url: string | null
        }
        Relationships: []
      }
      v_detail_psu: {
        Row: {
          form_factor: string | null
          name: string | null
          price: number | null
          product_detail_id: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_detail_psu: {
        Args: {
          productdetailid: number
        }
        Returns: {
          total: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
