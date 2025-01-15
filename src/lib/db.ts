import { Database } from "./schema";

export enum CategoryEnum {
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

type DBView = Database["product"]["Views"];
type ViewKeys = keyof DBView;
type ComponentViewKeys = Exclude<ViewKeys, "v_products" | "v_product_details" | "v_product_images">;
export type ComponentView = {
  [K in ViewKeys]: DBView[K]["Row"];
};
export type ComponentDetail = DBView[ComponentViewKeys]["Row"]

export const casingHeaderMapping = {
  brand_name: "Brand Name",
  casing_type: "Casing Type",
  fan_slots: "Fan Slots",
  max_gpu_length_mm: "GPU Max Length (mm)",
};

export const cpuHeaderMapping = {
  total_core: "Total Core",
  base_clock_ghz: "Base Clock (GHz)",
  max_clock_ghz: "Max Clock (GHz)",
  base_power_watt: "Base Power (Watt)",
  integrated_gpu: "Integrated GPU",
};

export const gpuHeaderMapping = {
  boost_clock_mhz: "Boost Clock (MHz)",
  brand_name: "Brand Name",
  base_clock_mhz: "Core Clock (MHz)",
  length_mm: "Length (mm)",
  tdp_watt: "TDP (Watt)",
  vram_gb: "VRAM (GB)",
};

export const memoryHeaderMapping = {
  amount: "Amount",
  brand_name: "Brand Name",
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
  height_mm: "Height (mm)",
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

const categoryData: [CategoryEnum, string, string, ViewKeys | null, object?][] = [ 
  [CategoryEnum.Motherboard, "motherboard", "Motherboard", "v_motherboards", motherboardHeaderMapping], 
  [CategoryEnum.CPU, "cpu", "CPU", "v_cpus", cpuHeaderMapping], 
  [CategoryEnum.GPU, "gpu", "GPU", "v_gpus", gpuHeaderMapping], 
  [CategoryEnum.Memory, "memory", "RAM", "v_memories", memoryHeaderMapping], 
  [CategoryEnum.PSU, "psu", "Power Supply", "v_cpus", cpuHeaderMapping], 
  [CategoryEnum.Storage, "storage", "Internal Storage", "v_internal_storages", storageHeaderMapping], 
  [CategoryEnum.Casing, "casing", "Casing", "v_casings", casingHeaderMapping], 
  [CategoryEnum.Monitor, "monitor", "Monitor", "v_monitors", monitorHeaderMapping], 
  [CategoryEnum.CaseFan, "casefan", "Case Fan", null],
  [CategoryEnum.Cooler, "cooler", "CPU Cooler", null], 
  [CategoryEnum.Headphone, "headphone", "Headphone", null], 
  [CategoryEnum.Keyboard, "keyboard", "Keyboard", null], 
  [CategoryEnum.Mouse, "mouse", "Mouse", null], 
  [CategoryEnum.Speaker, "speaker", "Speaker", null], 
  [CategoryEnum.Webcam, "webcam", "Webcam", null], 
  [CategoryEnum.Printer, "printer", "Printer", null], 
  [CategoryEnum.OS, "os", "Operating System", null], 
  [CategoryEnum.SoundCard, "soundcard", "Sound Card", null], 
  [CategoryEnum.WiredNetwork, "wirednetwork", "Wired Network Device", null], 
  [CategoryEnum.WirelessNetwork, "wirelessnetwork", "Wireless Network Device", null], 
  [CategoryEnum.Cable, "cable", "Cable", null], 
  [CategoryEnum.ExternalDrive, "externaldrive", "External Drive", null]
]

export const categorySlugToEnum: Record<string, CategoryEnum> = {}
export const categoryTitleToEnum: Record<string, CategoryEnum> = {}
export const categoryEnumToSlug: Record<CategoryEnum, string> = {} as Record<CategoryEnum, string>
export const categoryTitleToSlug: Record<string, string> = {}
export const categoryEnumToTitle: Record<CategoryEnum, string> = {} as Record<CategoryEnum, string>
export const categoryEnumToView: Record<CategoryEnum, ViewKeys | null> =
{} as Record<CategoryEnum, ViewKeys | null>
export const categoryEnumToHeader: Record<CategoryEnum, string[]> = {} as Record<CategoryEnum, string[]>
export const categoryEnumToKey: Record<CategoryEnum, string[]> = {} as Record<CategoryEnum, string[]>

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
  [CategoryEnum.Motherboard]: ComponentView["v_motherboards"];
  [CategoryEnum.CPU]: ComponentView["v_cpus"];
  [CategoryEnum.GPU]: ComponentView["v_gpus"];
  [CategoryEnum.Memory]: ComponentView["v_memories"][];
  [CategoryEnum.PSU]: ComponentView["v_power_supplies"];
  [CategoryEnum.Storage]: ComponentView["v_internal_storages"][];
  [CategoryEnum.Casing]: ComponentView["v_casings"];
  [CategoryEnum.Headphone]: undefined;
  [CategoryEnum.Keyboard]: undefined;
  [CategoryEnum.Mouse]: undefined
  [CategoryEnum.Speaker]: undefined
  [CategoryEnum.Webcam]: undefined
  [CategoryEnum.Printer]: undefined
  [CategoryEnum.Monitor]: undefined
  [CategoryEnum.OS]: undefined
  [CategoryEnum.SoundCard]: undefined
  [CategoryEnum.WiredNetwork]: undefined
  [CategoryEnum.WirelessNetwork]: undefined
  [CategoryEnum.Cable]: undefined
  [CategoryEnum.ExternalDrive]: undefined
  [CategoryEnum.Cooler]: undefined;
  [CategoryEnum.CaseFan]: undefined;
}