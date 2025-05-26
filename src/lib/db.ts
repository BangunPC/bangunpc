import { Database } from "./schema";

export enum ComponentCategoryEnum {
  Headphone,
  Keyboard,
  Mouse,
  Speaker,
  Webcam,
  Printer,
  Monitor,
  OS,
  SoundCard,
  WiredNetwork,
  WirelessNetwork,
  Cable,
  ExternalDrive,
  Motherboard,
  CPU,
  GPU,
  Memory,
  Cooler,
  PSU,
  Storage,
  Casing,
  CaseFan,
}

export type MultiComponentCategoryEnum = ComponentCategoryEnum.Memory | ComponentCategoryEnum.Storage | ComponentCategoryEnum.Monitor;
export type PCBuildTables = keyof Database["pc_build"]["Tables"]
export type SingleComponentUpdate = Database["pc_build"]["Tables"]["builds"]["Update"];
export type ComponentPayload = {
  product_id: number
  product_detail_id?: number | null
}

type DBView = Database["product"]["Views"];
type ViewKeys = keyof DBView;
type ComponentViewKeys = Exclude<ViewKeys, "v_products" | "v_product_details" | "v_product_images">;
export type ComponentView = {
  [K in ComponentViewKeys]: DBView[K]["Row"];
};
export type ComponentDetail = DBView[ComponentViewKeys]["Row"]

export const casingHeaderMapping = {
  brand_name: "Brand Name",
  casing_type: "Casing Type",
  fan_slots: "Fan Slots",
  max_gpu_length_mm: "GPU Max Length (mm)",
};

export const cpuHeaderMapping = {
  cpu_socket: "Socket",
  total_core: "Total Core",
  base_clock_ghz: "Base Clock (GHz)",
  max_clock_ghz: "Max Clock (GHz)",
  l3_cache_mb: "L3 Cache (MB)",
  base_power_watt: "TDP (Watt)",
  integrated_gpu: "Integrated GPU",
};

export const gpuHeaderMapping = {
  brand_name: "Brand Name",
  boost_clock_mhz: "Boost Clock (MHz)",
  base_clock_mhz: "Core Clock (MHz)",
  length_mm: "Length (mm)",
  tdp_watt: "TDP (Watt)",
  vram_gb: "VRAM (GB)",
};

export const memoryHeaderMapping = {
  brand_name: "Brand Name",
  amount: "Amount",
  capacity_gb: "Capacity (GB)",
  frequency_mhz: "Frequency (MHz)",
  memory_type: "Memory Type",
};

export const motherboardHeaderMapping = {
  brand_name: "Brand Name",
  cpu_socket: "CPU Socket",
  form_factor: "Form Factor",
  max_memory_gb: "Max Memory (GB)",
  memory_type: "Memory Type",
};

export const psuHeaderMapping = {
  brand_name: "Brand Name",
  efficiency_rating: "Efficiency Rating",
  form_factor: "Form Factor",
  modularity: "Modularity",
  wattage: "Wattage",
};

export const storageHeaderMapping = {
  brand_name: "Brand Name",
  type: "Type",
  capacity_gb: "Capacity (GB)",
  form_factor: "Form Factor",
  interface: "Interface",
}

export const monitorHeaderMapping = {
  brand_name: "Brand Name",
  panel_type: "Panel Type",
  resolution: "Resolution",
  size_inch: "Size (inch)",
  refresh_rate_hz: "Refresh Rate (Hz)",
}

const categoryData: [ComponentCategoryEnum, string, string, ComponentViewKeys | null, object?][] = [ 
  [ComponentCategoryEnum.Motherboard, "motherboard", "Motherboard", "v_motherboards", motherboardHeaderMapping], 
  [ComponentCategoryEnum.CPU, "cpu", "CPU", "v_cpus", cpuHeaderMapping], 
  [ComponentCategoryEnum.GPU, "gpu", "GPU", "v_gpus", gpuHeaderMapping], 
  [ComponentCategoryEnum.Memory, "memory", "RAM", "v_memories", memoryHeaderMapping], 
  [ComponentCategoryEnum.PSU, "psu", "Power Supply", "v_power_supplies", psuHeaderMapping], 
  [ComponentCategoryEnum.Storage, "storage", "Internal Storage", "v_internal_storages", storageHeaderMapping], 
  [ComponentCategoryEnum.Casing, "casing", "Casing", "v_casings", casingHeaderMapping], 
  [ComponentCategoryEnum.Monitor, "monitor", "Monitor", "v_monitors", monitorHeaderMapping], 
  [ComponentCategoryEnum.CaseFan, "casefan", "Case Fan", null],
  [ComponentCategoryEnum.Cooler, "cooler", "CPU Cooler", null], 
  [ComponentCategoryEnum.Headphone, "headphone", "Headphone", null], 
  [ComponentCategoryEnum.Keyboard, "keyboard", "Keyboard", null], 
  [ComponentCategoryEnum.Mouse, "mouse", "Mouse", null], 
  [ComponentCategoryEnum.Speaker, "speaker", "Speaker", null], 
  [ComponentCategoryEnum.Webcam, "webcam", "Webcam", null], 
  [ComponentCategoryEnum.Printer, "printer", "Printer", null], 
  [ComponentCategoryEnum.OS, "os", "Operating System", null], 
  [ComponentCategoryEnum.SoundCard, "soundcard", "Sound Card", null], 
  [ComponentCategoryEnum.WiredNetwork, "wirednetwork", "Wired Network Device", null], 
  [ComponentCategoryEnum.WirelessNetwork, "wirelessnetwork", "Wireless Network Device", null], 
  [ComponentCategoryEnum.Cable, "cable", "Cable", null], 
  [ComponentCategoryEnum.ExternalDrive, "externaldrive", "External Drive", null]
]

export const categorySlugToEnum: Record<string, ComponentCategoryEnum> = {}
export const categoryTitleToEnum: Record<string, ComponentCategoryEnum> = {}
export const categoryEnumToSlug: Record<ComponentCategoryEnum, string> = {} as Record<ComponentCategoryEnum, string>
export const categoryTitleToSlug: Record<string, string> = {}
export const categoryEnumToTitle: Record<ComponentCategoryEnum, string> = {} as Record<ComponentCategoryEnum, string>
export const categoryEnumToView: Record<ComponentCategoryEnum, ComponentViewKeys | null> =
{} as Record<ComponentCategoryEnum, ComponentViewKeys | null>
export const categoryEnumToHeader: Record<ComponentCategoryEnum, string[]> = {} as Record<ComponentCategoryEnum, string[]>
export const categoryEnumToKey: Record<ComponentCategoryEnum, string[]> = {} as Record<ComponentCategoryEnum, string[]>

categoryData.forEach(([enumValue, slug, title, view, headerMapping]) => { 
  categorySlugToEnum[slug] = enumValue
  categoryTitleToEnum[title] = enumValue
  categoryEnumToSlug[enumValue] = slug
  categoryTitleToSlug[title] = slug
  categoryEnumToTitle[enumValue] = title
  categoryEnumToView[enumValue] = view
  categoryEnumToHeader[enumValue] = headerMapping ? Object.values(headerMapping) : []
  categoryEnumToKey[enumValue] = headerMapping ? Object.keys(headerMapping) : []
})

export type ComponentDetailMap = {
  [ComponentCategoryEnum.Motherboard]: ComponentView["v_motherboards"];
  [ComponentCategoryEnum.CPU]: ComponentView["v_cpus"];
  [ComponentCategoryEnum.GPU]: ComponentView["v_gpus"];
  [ComponentCategoryEnum.Memory]: ComponentView["v_memories"][];
  [ComponentCategoryEnum.PSU]: ComponentView["v_power_supplies"];
  [ComponentCategoryEnum.Storage]: ComponentView["v_internal_storages"][];
  [ComponentCategoryEnum.Casing]: ComponentView["v_casings"];
  [ComponentCategoryEnum.Headphone]: undefined;
  [ComponentCategoryEnum.Keyboard]: undefined;
  [ComponentCategoryEnum.Mouse]: undefined
  [ComponentCategoryEnum.Speaker]: undefined
  [ComponentCategoryEnum.Webcam]: undefined
  [ComponentCategoryEnum.Printer]: undefined
  [ComponentCategoryEnum.Monitor]: undefined
  [ComponentCategoryEnum.OS]: undefined
  [ComponentCategoryEnum.SoundCard]: undefined
  [ComponentCategoryEnum.WiredNetwork]: undefined
  [ComponentCategoryEnum.WirelessNetwork]: undefined
  [ComponentCategoryEnum.Cable]: undefined
  [ComponentCategoryEnum.ExternalDrive]: undefined
  [ComponentCategoryEnum.Cooler]: undefined;
  [ComponentCategoryEnum.CaseFan]: undefined;
}



// Functions
export function isMultiComponentCategoryEnum(componentCategoryEnum: ComponentCategoryEnum | undefined): componentCategoryEnum is MultiComponentCategoryEnum {
  return (
    componentCategoryEnum === ComponentCategoryEnum.Memory || 
    componentCategoryEnum === ComponentCategoryEnum.Storage || 
    componentCategoryEnum === ComponentCategoryEnum.Monitor
  );
}

export function multiComponentCategoryEnumToTable(componentCategoryEnum: MultiComponentCategoryEnum) {
  let targetTable: PCBuildTables

    switch (componentCategoryEnum) {
      case ComponentCategoryEnum.Memory:
        targetTable = 'build_memories'
        break;

      case ComponentCategoryEnum.Storage:
        targetTable = 'build_internal_storages'
        break;

      case ComponentCategoryEnum.Monitor:
       targetTable = 'build_monitors'
       break;
    }
  return targetTable
}

export function isValidComponentSortType(sort: string, categoryEnum: ComponentCategoryEnum): boolean {
  const headerColumns = ['product_name', ...categoryEnumToKey[categoryEnum], 'lowest_price'];

  return headerColumns.includes(sort)
}