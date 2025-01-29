export type DataResponse =
  | string
  | number
  | boolean
  | null
  | { [key: string]: DataResponse | undefined }
  | DataResponse[]


export type SingleComponentResponse = {
  product_id: number
  name: string
  slug: string
  image_filename: string
  product_detail_id: number | null
  marketplace_id: number | null
  price: number | null
}

export type MultiComponentResponse = SingleComponentResponse & {
  component_id: number
}
  
export type BuildResponseData = {
  cpu: SingleComponentResponse
  gpu: SingleComponentResponse
  motherboard: SingleComponentResponse
  power_supply: SingleComponentResponse
  casing: SingleComponentResponse
  cpu_cooler: SingleComponentResponse
  internal_storages: MultiComponentResponse[]
  memories: MultiComponentResponse[]
  monitors: MultiComponentResponse[]
  total_price: number
}

export type Database = {
  pc_build: {
    Tables: {
      build_categories: {
        Row: {
          build_id: number
          category_id: number
          id: number
        }
        Insert: {
          build_id: number
          category_id: number
          id?: number
        }
        Update: {
          build_id?: number
          category_id?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "buid_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "build_categories_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "builds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "build_categories_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "v_builds"
            referencedColumns: ["build_id"]
          },
          {
            foreignKeyName: "build_categories_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "v_recommendation"
            referencedColumns: ["build_id"]
          },
        ]
      }
      build_internal_storages: {
        Row: {
          build_id: number
          id: number
          product_detail_id: number | null
          product_id: number
        }
        Insert: {
          build_id: number
          id?: number
          product_detail_id?: number | null
          product_id: number
        }
        Update: {
          build_id?: number
          id?: number
          product_detail_id?: number | null
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "build_internal_storages_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "builds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "build_internal_storages_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "v_builds"
            referencedColumns: ["build_id"]
          },
          {
            foreignKeyName: "build_internal_storages_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "v_recommendation"
            referencedColumns: ["build_id"]
          },
        ]
      }
      build_memories: {
        Row: {
          build_id: number
          id: number
          product_detail_id: number | null
          product_id: number
        }
        Insert: {
          build_id: number
          id?: number
          product_detail_id?: number | null
          product_id: number
        }
        Update: {
          build_id?: number
          id?: number
          product_detail_id?: number | null
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "build_memories_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "builds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "build_memories_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "v_builds"
            referencedColumns: ["build_id"]
          },
          {
            foreignKeyName: "build_memories_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "v_recommendation"
            referencedColumns: ["build_id"]
          },
        ]
      }
      build_monitors: {
        Row: {
          build_id: number
          id: number
          product_detail_id: number | null
          product_id: number
        }
        Insert: {
          build_id: number
          id?: number
          product_detail_id?: number | null
          product_id: number
        }
        Update: {
          build_id?: number
          id?: number
          product_detail_id?: number | null
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "build_monitors_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "builds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "build_monitors_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "v_builds"
            referencedColumns: ["build_id"]
          },
          {
            foreignKeyName: "build_monitors_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "v_recommendation"
            referencedColumns: ["build_id"]
          },
        ]
      }
      builds: {
        Row: {
          casing_product_detail_id: number | null
          casing_product_id: number | null
          cpu_cooler_product_detail_id: number | null
          cpu_cooler_product_id: number | null
          cpu_product_detail_id: number | null
          cpu_product_id: number | null
          created_at: string | null
          gpu_product_detail_id: number | null
          gpu_product_id: number | null
          id: number
          motherboard_product_detail_id: number | null
          motherboard_product_id: number | null
          power_supply_product_detail_id: number | null
          power_supply_product_id: number | null
          updated_at: string | null
        }
        Insert: {
          casing_product_detail_id?: number | null
          casing_product_id?: number | null
          cpu_cooler_product_detail_id?: number | null
          cpu_cooler_product_id?: number | null
          cpu_product_detail_id?: number | null
          cpu_product_id?: number | null
          created_at?: string | null
          gpu_product_detail_id?: number | null
          gpu_product_id?: number | null
          id?: number
          motherboard_product_detail_id?: number | null
          motherboard_product_id?: number | null
          power_supply_product_detail_id?: number | null
          power_supply_product_id?: number | null
          updated_at?: string | null
        }
        Update: {
          casing_product_detail_id?: number | null
          casing_product_id?: number | null
          cpu_cooler_product_detail_id?: number | null
          cpu_cooler_product_id?: number | null
          cpu_product_detail_id?: number | null
          cpu_product_id?: number | null
          created_at?: string | null
          gpu_product_detail_id?: number | null
          gpu_product_id?: number | null
          id?: number
          motherboard_product_detail_id?: number | null
          motherboard_product_id?: number | null
          power_supply_product_detail_id?: number | null
          power_supply_product_id?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          category_name: string | null
          id: number
        }
        Insert: {
          category_name?: string | null
          id?: number
        }
        Update: {
          category_name?: string | null
          id?: number
        }
        Relationships: []
      }
      recommendation_builds: {
        Row: {
          build_id: number | null
          description: string | null
          id: number
          review_urls: string | null
          slug: string
          title: string
        }
        Insert: {
          build_id?: number | null
          description?: string | null
          id?: number
          review_urls?: string | null
          slug: string
          title: string
        }
        Update: {
          build_id?: number | null
          description?: string | null
          id?: number
          review_urls?: string | null
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendation_builds_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "builds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendation_builds_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "v_builds"
            referencedColumns: ["build_id"]
          },
          {
            foreignKeyName: "recommendation_builds_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "v_recommendation"
            referencedColumns: ["build_id"]
          },
        ]
      }
      session_builds: {
        Row: {
          build_id: number
          created_at: string
          expires_at: string
          id: number
          last_accessed_at: string
          user_id: string | null
        }
        Insert: {
          build_id: number
          created_at?: string
          expires_at?: string
          id?: number
          last_accessed_at?: string
          user_id?: string | null
        }
        Update: {
          build_id?: number
          created_at?: string
          expires_at?: string
          id?: number
          last_accessed_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_builds_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: true
            referencedRelation: "builds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_builds_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: true
            referencedRelation: "v_builds"
            referencedColumns: ["build_id"]
          },
          {
            foreignKeyName: "session_builds_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: true
            referencedRelation: "v_recommendation"
            referencedColumns: ["build_id"]
          },
        ]
      }
      user_builds: {
        Row: {
          build_code: string
          build_id: number | null
          built_at: string | null
          description: string | null
          id: number
          is_published: boolean | null
          published_at: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          build_code: string
          build_id?: number | null
          built_at?: string | null
          description?: string | null
          id?: number
          is_published?: boolean | null
          published_at?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          build_code?: string
          build_id?: number | null
          built_at?: string | null
          description?: string | null
          id?: number
          is_published?: boolean | null
          published_at?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_builds_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: true
            referencedRelation: "builds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_builds_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: true
            referencedRelation: "v_builds"
            referencedColumns: ["build_id"]
          },
          {
            foreignKeyName: "user_builds_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: true
            referencedRelation: "v_recommendation"
            referencedColumns: ["build_id"]
          },
        ]
      }
    }
    Views: {
      v_builds: {
        Row: {
          build_id: number | null
          casing: SingleComponentResponse | null
          cpu: SingleComponentResponse | null
          cpu_cooler: SingleComponentResponse | null
          gpu: SingleComponentResponse | null
          internal_storages: MultiComponentResponse[] | null
          memories: MultiComponentResponse[] | null
          monitors: MultiComponentResponse[] | null
          motherboard: SingleComponentResponse | null
          power_supply: SingleComponentResponse | null
          total_price: number | null
        }
        Relationships: []
      }
      v_recommendation: {
        Row: {
          build_id: number | null
          casing: SingleComponentResponse | null
          categories_name: string[] | null
          cpu: SingleComponentResponse | null
          cpu_cooler: SingleComponentResponse | null
          description: string | null
          gpu: SingleComponentResponse | null
          image_filenames: string[] | null
          internal_storages: MultiComponentResponse[] | null
          memories: MultiComponentResponse[] | null
          monitors: MultiComponentResponse[] | null
          motherboard: SingleComponentResponse | null
          power_supply: SingleComponentResponse | null
          recommendation_id: number | null
          review_urls: string | null
          slug: string | null
          title: string | null
          total_price: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      slugify: {
        Args: {
          value: string
        }
        Returns: string
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
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
            referencedRelation: "v_monitors"
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
          drive_bays: DataResponse | null
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
          drive_bays?: DataResponse | null
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
          drive_bays?: DataResponse | null
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
            referencedRelation: "v_monitors"
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
          other_name: string | null
        }
        Insert: {
          id?: number
          name: string
          other_name?: string | null
        }
        Update: {
          id?: number
          name?: string
          other_name?: string | null
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
            referencedRelation: "v_monitors"
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
          memory_type_supports: string[] | null
          pcie_generation: number | null
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
          memory_type_supports?: string[] | null
          pcie_generation?: number | null
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
          memory_type_supports?: string[] | null
          pcie_generation?: number | null
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
            referencedRelation: "v_monitors"
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
          color_variants: string[] | null
          core_count: number | null
          display_output: string | null
          fan_count: number | null
          gpu_chipset_id: number | null
          gpu_memory_type: Database["public"]["Enums"]["gpu_memory_type"] | null
          height_mm: number | null
          id: number
          is_oc: boolean | null
          length_mm: number | null
          memory_bus_bit: number | null
          min_psu_watt: number | null
          power_connector: string | null
          product_id: number
          tdp_watt: number | null
          vram_gb: number | null
          width_mm: number | null
        }
        Insert: {
          base_clock_mhz?: number | null
          boost_clock_mhz?: number | null
          bus_interface?: Database["public"]["Enums"]["bus_interface"] | null
          color_variants?: string[] | null
          core_count?: number | null
          display_output?: string | null
          fan_count?: number | null
          gpu_chipset_id?: number | null
          gpu_memory_type?:
            | Database["public"]["Enums"]["gpu_memory_type"]
            | null
          height_mm?: number | null
          id?: number
          is_oc?: boolean | null
          length_mm?: number | null
          memory_bus_bit?: number | null
          min_psu_watt?: number | null
          power_connector?: string | null
          product_id: number
          tdp_watt?: number | null
          vram_gb?: number | null
          width_mm?: number | null
        }
        Update: {
          base_clock_mhz?: number | null
          boost_clock_mhz?: number | null
          bus_interface?: Database["public"]["Enums"]["bus_interface"] | null
          color_variants?: string[] | null
          core_count?: number | null
          display_output?: string | null
          fan_count?: number | null
          gpu_chipset_id?: number | null
          gpu_memory_type?:
            | Database["public"]["Enums"]["gpu_memory_type"]
            | null
          height_mm?: number | null
          id?: number
          is_oc?: boolean | null
          length_mm?: number | null
          memory_bus_bit?: number | null
          min_psu_watt?: number | null
          power_connector?: string | null
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
            referencedRelation: "v_monitors"
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
          nand_type: Database["public"]["Enums"]["nand_type"] | null
          product_id: number | null
          read_speed_mbs: number | null
          tbw: number | null
          type: Database["public"]["Enums"]["storage_type"]
          write_speed_mbs: number | null
        }
        Insert: {
          capacity_gb?: number
          form_factor?: string | null
          id?: number
          interface?: string | null
          nand_type?: Database["public"]["Enums"]["nand_type"] | null
          product_id?: number | null
          read_speed_mbs?: number | null
          tbw?: number | null
          type: Database["public"]["Enums"]["storage_type"]
          write_speed_mbs?: number | null
        }
        Update: {
          capacity_gb?: number
          form_factor?: string | null
          id?: number
          interface?: string | null
          nand_type?: Database["public"]["Enums"]["nand_type"] | null
          product_id?: number | null
          read_speed_mbs?: number | null
          tbw?: number | null
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
            referencedRelation: "v_monitors"
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
          cas_latency: number | null
          colors: string[] | null
          has_ecc: boolean | null
          has_heatsink: boolean | null
          has_rgb: boolean | null
          id: number
          overclocking_support: boolean | null
          product_id: number
          type_id: number | null
          voltage: number | null
        }
        Insert: {
          amount: number
          capacity_gb?: number | null
          cas_latency?: number | null
          colors?: string[] | null
          has_ecc?: boolean | null
          has_heatsink?: boolean | null
          has_rgb?: boolean | null
          id?: number
          overclocking_support?: boolean | null
          product_id: number
          type_id?: number | null
          voltage?: number | null
        }
        Update: {
          amount?: number
          capacity_gb?: number | null
          cas_latency?: number | null
          colors?: string[] | null
          has_ecc?: boolean | null
          has_heatsink?: boolean | null
          has_rgb?: boolean | null
          id?: number
          overclocking_support?: boolean | null
          product_id?: number
          type_id?: number | null
          voltage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_casings"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_cpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_gpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_internal_storages"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_memories"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_monitors"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_motherboards"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_power_supplies"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "v_product_images"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "memories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
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
      monitors: {
        Row: {
          aspect_ratio: string | null
          brightness_nits: number | null
          has_speaker: boolean | null
          id: number
          inputs: string | null
          panel_type: Database["public"]["Enums"]["panel_type"] | null
          product_id: number
          refresh_rate_hz: number | null
          resolution: string | null
          size_inch: number | null
          spesial_features: string | null
          srgb_percentage: number | null
          vesa_mount_mm: number | null
          warranty_years: number | null
        }
        Insert: {
          aspect_ratio?: string | null
          brightness_nits?: number | null
          has_speaker?: boolean | null
          id?: number
          inputs?: string | null
          panel_type?: Database["public"]["Enums"]["panel_type"] | null
          product_id: number
          refresh_rate_hz?: number | null
          resolution?: string | null
          size_inch?: number | null
          spesial_features?: string | null
          srgb_percentage?: number | null
          vesa_mount_mm?: number | null
          warranty_years?: number | null
        }
        Update: {
          aspect_ratio?: string | null
          brightness_nits?: number | null
          has_speaker?: boolean | null
          id?: number
          inputs?: string | null
          panel_type?: Database["public"]["Enums"]["panel_type"] | null
          product_id?: number
          refresh_rate_hz?: number | null
          resolution?: string | null
          size_inch?: number | null
          spesial_features?: string | null
          srgb_percentage?: number | null
          vesa_mount_mm?: number | null
          warranty_years?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_monitors_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_monitors_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_casings"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_monitors_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_cpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_monitors_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_gpus"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_monitors_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_internal_storages"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_monitors_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_memories"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_monitors_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_monitors"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_monitors_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_motherboards"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_monitors_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_power_supplies"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_monitors_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_images"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_monitors_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_products"
            referencedColumns: ["product_id"]
          },
        ]
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
            referencedRelation: "v_monitors"
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
      power_supplies: {
        Row: {
          "80_plus_verification": string | null
          atx_24_pin_connector: number
          cable_type: string | null
          efficiency_rating_id: number
          "eps_4+4_pin_connector": number | null
          eps_8_pin_connector: number | null
          floppy_connector: number | null
          form_factor_id: number | null
          id: number
          model: string | null
          modularity: Database["public"]["Enums"]["psu_modularity"]
          molex_connector: number | null
          pcie_connector_list: string | null
          product_id: number | null
          protection: string | null
          sata_connector: number | null
          wattage: number | null
        }
        Insert: {
          "80_plus_verification"?: string | null
          atx_24_pin_connector?: number
          cable_type?: string | null
          efficiency_rating_id: number
          "eps_4+4_pin_connector"?: number | null
          eps_8_pin_connector?: number | null
          floppy_connector?: number | null
          form_factor_id?: number | null
          id?: number
          model?: string | null
          modularity: Database["public"]["Enums"]["psu_modularity"]
          molex_connector?: number | null
          pcie_connector_list?: string | null
          product_id?: number | null
          protection?: string | null
          sata_connector?: number | null
          wattage?: number | null
        }
        Update: {
          "80_plus_verification"?: string | null
          atx_24_pin_connector?: number
          cable_type?: string | null
          efficiency_rating_id?: number
          "eps_4+4_pin_connector"?: number | null
          eps_8_pin_connector?: number | null
          floppy_connector?: number | null
          form_factor_id?: number | null
          id?: number
          model?: string | null
          modularity?: Database["public"]["Enums"]["psu_modularity"]
          molex_connector?: number | null
          pcie_connector_list?: string | null
          product_id?: number | null
          protection?: string | null
          sata_connector?: number | null
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
            referencedRelation: "v_monitors"
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
      product_detail_update_logs: {
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
      product_details: {
        Row: {
          created_at: string | null
          id: number
          is_official_store: boolean | null
          marketplace_id: number
          price: number | null
          product_detail_description_id: number | null
          product_id: number | null
          selected_variant_type: string | null
          seller_city: string | null
          seller_name: string | null
          stock: number | null
          updated_at: string | null
          url: string
          variants: DataResponse[] | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_official_store?: boolean | null
          marketplace_id?: number
          price?: number | null
          product_detail_description_id?: number | null
          product_id?: number | null
          selected_variant_type?: string | null
          seller_city?: string | null
          seller_name?: string | null
          stock?: number | null
          updated_at?: string | null
          url?: string
          variants?: DataResponse[] | null
        }
        Update: {
          created_at?: string | null
          id?: number
          is_official_store?: boolean | null
          marketplace_id?: number
          price?: number | null
          product_detail_description_id?: number | null
          product_id?: number | null
          selected_variant_type?: string | null
          seller_city?: string | null
          seller_name?: string | null
          stock?: number | null
          updated_at?: string | null
          url?: string
          variants?: DataResponse[] | null
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
            foreignKeyName: "product_details_marketplace_id_fkey"
            columns: ["marketplace_id"]
            isOneToOne: false
            referencedRelation: "v_product_details"
            referencedColumns: ["marketplace_id"]
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
            referencedRelation: "v_monitors"
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
          created_at: string | null
          description: string
          id: number
          is_published: boolean
          lowest_price: number | null
          name: string
          product_fts: unknown | null
          product_trgms: string | null
          review_urls: string[] | null
          slug: string
          spec_url: string | null
        }
        Insert: {
          brand_id?: number | null
          category_id?: number | null
          created_at?: string | null
          description?: string
          id?: number
          is_published?: boolean
          lowest_price?: number | null
          name: string
          product_fts?: unknown | null
          product_trgms?: string | null
          review_urls?: string[] | null
          slug?: string
          spec_url?: string | null
        }
        Update: {
          brand_id?: number | null
          category_id?: number | null
          created_at?: string | null
          description?: string
          id?: number
          is_published?: boolean
          lowest_price?: number | null
          name?: string
          product_fts?: unknown | null
          product_trgms?: string | null
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
          loading_to_efficiency_percentage: DataResponse | null
          name: string
        }
        Insert: {
          id?: number
          loading_to_efficiency_percentage?: DataResponse | null
          name: string
        }
        Update: {
          id?: number
          loading_to_efficiency_percentage?: DataResponse | null
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
            referencedRelation: "v_monitors"
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
    }
    Views: {
      v_casings: {
        Row: {
          brand_name: string | null
          casing_id: number | null
          casing_type: string | null
          colors: string[] | null
          description: string | null
          drive_bays: DataResponse | null
          dust_cover: string | null
          expansion_slot: number | null
          fan_slots: number | null
          height_mm: number | null
          image_filenames: string[] | null
          io_port: string | null
          is_published: boolean | null
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
          code_name: string | null
          cpu_family_id: number | null
          cpu_id: number | null
          cpu_socket: string | null
          cpu_socket_id: number | null
          description: string | null
          efficiency_core: number | null
          image_filenames: string[] | null
          integrated_gpu: string | null
          integrated_gpu_id: number | null
          is_published: boolean | null
          lowest_price: number | null
          max_clock_ghz: number | null
          max_memory_channel: number | null
          max_memory_gb: number | null
          max_power_watt: number | null
          memory_type_supports: string[] | null
          model_line: string | null
          pcie_generation: number | null
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
          chipset: string | null
          color_variants: string[] | null
          core_count: number | null
          description: string | null
          display_output: string | null
          fan_count: number | null
          gpu_chipset_id: number | null
          gpu_id: number | null
          gpu_memory_type: Database["public"]["Enums"]["gpu_memory_type"] | null
          height_mm: number | null
          image_filenames: string[] | null
          is_oc: boolean | null
          is_published: boolean | null
          length_mm: number | null
          lowest_price: number | null
          memory_bus_bit: number | null
          min_psu_watt: number | null
          power_connector: string | null
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
          description: string | null
          form_factor: string | null
          image_filenames: string[] | null
          interface: string | null
          internal_storage_id: number | null
          is_published: boolean | null
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
          cas_latency: number | null
          colors: string[] | null
          description: string | null
          frequency_mhz: number | null
          has_ecc: boolean | null
          has_heatsink: boolean | null
          has_rgb: boolean | null
          image_filenames: string[] | null
          is_published: boolean | null
          lowest_price: number | null
          memory_id: number | null
          memory_type: Database["public"]["Enums"]["memory_type"] | null
          overclocking_support: boolean | null
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
      v_monitors: {
        Row: {
          aspect_ratio: string | null
          brand_name: string | null
          brightness_nits: number | null
          description: string | null
          has_speaker: boolean | null
          image_filenames: string[] | null
          inputs: string | null
          is_published: boolean | null
          lowest_price: number | null
          monitor_id: number | null
          panel_type: Database["public"]["Enums"]["panel_type"] | null
          product_id: number | null
          product_name: string | null
          refresh_rate_hz: number | null
          resolution: string | null
          review_urls: string[] | null
          size_inch: number | null
          slug: string | null
          spec_url: string | null
          spesial_features: string | null
          srgb_percentage: number | null
          vesa_mount_mm: number | null
          warranty_years: number | null
        }
        Relationships: []
      }
      v_motherboards: {
        Row: {
          back_pannel_ports: string | null
          brand_name: string | null
          chipset: string | null
          chipset_id: number | null
          cpu_socket: string | null
          cpu_socket_id: number | null
          cpu_socket_support: string | null
          description: string | null
          form_factor: string | null
          image_filenames: string[] | null
          is_published: boolean | null
          lowest_price: number | null
          max_memory_gb: number | null
          memory_channel_count: number | null
          memory_frequency_mhz: number | null
          memory_slot: number | null
          memory_type: Database["public"]["Enums"]["memory_type"] | null
          memory_type_id: number | null
          motherboard_id: number | null
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
          "80_plus_verification": string | null
          atx_24_pin_connector: number | null
          brand_name: string | null
          cable_type: string | null
          description: string | null
          efficiency_rating: string | null
          "eps_4+4_pin_connector": number | null
          eps_8_pin_connector: number | null
          floppy_connector: number | null
          form_factor: string | null
          image_filenames: string[] | null
          is_published: boolean | null
          lowest_price: number | null
          model: string | null
          modularity: Database["public"]["Enums"]["psu_modularity"] | null
          molex_connector: number | null
          pcie_connector_list: string | null
          product_id: number | null
          product_name: string | null
          protection: string | null
          psu_id: number | null
          review_urls: string[] | null
          sata_connector: number | null
          slug: string | null
          spec_url: string | null
          wattage: number | null
        }
        Relationships: []
      }
      v_product_details: {
        Row: {
          is_official_store: boolean | null
          marketplace_id: number | null
          marketplace_name: string | null
          price: number | null
          product_detail_description: string | null
          product_detail_id: number | null
          product_id: number | null
          product_slug: string | null
          seller_city: string | null
          seller_name: string | null
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
            referencedRelation: "v_monitors"
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
          image_filenames: string[] | null
          is_published: boolean | null
          lowest_price: number | null
          product_fts: unknown | null
          product_id: number | null
          product_name: string | null
          product_trgms: string | null
          review_urls: string[] | null
          slug: string | null
          spec_url: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      search_products: {
        Args: {
          search_text: string
        }
        Returns: {
          product_id: number
          product_name: string
          category_id: number
          category_name: string
          slug: string
          lowest_price: number
          description: string
          brand_id: number
          brand_name: string
          spec_url: string
          review_urls: string[]
          image_filenames: string[]
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
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
  public: {
    Tables: {
      feedbacks: {
        Row: {
          created_at: string
          description: string
          id: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
        }
        Relationships: []
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
      user_components: {
        Row: {
          category: string | null
          component_id: string | null
          created_at: string
          id: string
          image: string | null
          name: string | null
          price: number | null
          quantity: number | null
          slug: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          component_id?: string | null
          created_at?: string
          id?: string
          image?: string | null
          name?: string | null
          price?: number | null
          quantity?: number | null
          slug?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          component_id?: string | null
          created_at?: string
          id?: string
          image?: string | null
          name?: string | null
          price?: number | null
          quantity?: number | null
          slug?: string | null
          user_id?: string | null
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
        Relationships: []
      }
    }
    Views: Record<string, never>  
    Functions: {
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      manage_expired_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: string[]
      }
    }
    Enums: {
      bus_interface:
        | "PCIe 3.0 ×16"
        | "PCIe 4.0 ×8"
        | "PCIe 4.0 ×16"
        | "PCIe 4.0 x4"
        | "PCIe 3.0 x8"
      gpu_memory_type: "GDDR6" | "GDDR6X" | "GDDR5"
      memory_type: "DDR3" | "DDR4" | "DDR5"
      nand_type: "SLC" | "MLC" | "TLC" | "QLC" | "3D NAND"
      panel_type: "OLED" | "IPS" | "VA" | "TN"
      partner_type: "jasa rakit pc" | "jasa servis pc/laptop" | "rakit keyboard"
      psu_modularity: "full" | "semi" | "no"
      status: "done" | "on-going" | "cancelled"
      storage_type: "SSD" | "HDD"
    }
    CompositeTypes: Record<string, never>    
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
