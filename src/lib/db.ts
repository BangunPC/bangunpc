import { Database } from "./schema";

export enum ComponentCategory {
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

const categoryData: [ComponentCategory, string, string][] = [ 
  [ComponentCategory.Headphone, "headphone", "Headphone"], 
  [ComponentCategory.Keyboard, "keyboard", "Keyboard"], 
  [ComponentCategory.Mouse, "mouse", "Mouse"], 
  [ComponentCategory.Speaker, "speaker", "Speaker"], 
  [ComponentCategory.Webcam, "webcam", "Webcam"], 
  [ComponentCategory.Printer, "printer", "Printer"], 
  [ComponentCategory.Monitor, "monitor", "Monitor"], 
  [ComponentCategory.OS, "os", "Operating System"], 
  [ComponentCategory.SoundCard, "soundcard", "Sound Card"], 
  [ComponentCategory.WiredNetwork, "wirednetwork", "Wired Network Device"], 
  [ComponentCategory.WirelessNetwork, "wirelessnetwork", "Wireless Network Device"], 
  [ComponentCategory.Cable, "cable", "Cable"], 
  [ComponentCategory.ExternalDrive, "externaldrive", "External Drive"], 
  [ComponentCategory.Motherboard, "motherboard", "Motherboard"], 
  [ComponentCategory.CPU, "cpu", "CPU"], 
  [ComponentCategory.GPU, "gpu", "GPU"], 
  [ComponentCategory.Memory, "memory", "RAM"], 
  [ComponentCategory.Cooler, "cooler", "CPU Cooler"], 
  [ComponentCategory.PSU, "psu", "Power Supply"], 
  [ComponentCategory.Storage, "storage", "Internal Storage"], 
  [ComponentCategory.Casing, "casing", "Casing"], 
  [ComponentCategory.CaseFan, "casefan", "Case Fan"]
]

export const categorySlugToEnum: Record<string, ComponentCategory> = {}
export const categoryTitleToEnum: Record<string, ComponentCategory> = {}
export const categoryEnumToString: Record<ComponentCategory, string> = {} as Record<ComponentCategory, string>
export const categoryTitleToSlug: Record<string, string> = {}
export const categoryEnumToTitle: Record<ComponentCategory, string> = {} as Record<ComponentCategory, string>

categoryData.forEach(([enumValue, slug, title]) => { 
  categorySlugToEnum[slug] = enumValue
  categoryTitleToEnum[title] = enumValue
  categoryEnumToString[enumValue] = slug
  categoryTitleToSlug[title] = slug
  categoryEnumToTitle[enumValue] = title
})

type DBView = Database["product"]["Views"];
type ViewKeys = keyof DBView;
type ComponentViewKeys = Exclude<ViewKeys, "v_products" | "v_product_details" | "v_product_images">;
export type ComponentView = {
  [K in ViewKeys]: DBView[K]["Row"];
};
export type ComponentDetail = DBView[ComponentViewKeys]["Row"];

export const categoryViewsFromEnum: Record<ComponentCategory, ViewKeys | null> =
{
  [ComponentCategory.Headphone]: null,
  [ComponentCategory.Keyboard]: null,
  [ComponentCategory.Mouse]: null,
  [ComponentCategory.Speaker]: null,
  [ComponentCategory.Webcam]: null,
  [ComponentCategory.Printer]: null,
  [ComponentCategory.Monitor]: null,
  [ComponentCategory.OS]: null,
  [ComponentCategory.SoundCard]: null,
  [ComponentCategory.WiredNetwork]: null,
  [ComponentCategory.WirelessNetwork]: null,
  [ComponentCategory.Cable]: null,
  [ComponentCategory.ExternalDrive]: null,
  [ComponentCategory.Motherboard]: "v_motherboards",
  [ComponentCategory.CPU]: "v_cpus",
  [ComponentCategory.GPU]: "v_gpus",
  [ComponentCategory.Memory]: "v_memories",
  [ComponentCategory.Cooler]: null,
  [ComponentCategory.PSU]: "v_power_supplies",
  [ComponentCategory.Storage]: "v_internal_storages",
  [ComponentCategory.Casing]: "v_casings",
  [ComponentCategory.CaseFan]: null,
};

export type ComponentDetailMap = {
  [ComponentCategory.Motherboard]: ComponentView["v_motherboards"];
  [ComponentCategory.CPU]: ComponentView["v_cpus"];
  [ComponentCategory.GPU]: ComponentView["v_gpus"];
  [ComponentCategory.Memory]: ComponentView["v_memories"][];
  [ComponentCategory.PSU]: ComponentView["v_power_supplies"];
  [ComponentCategory.Storage]: ComponentView["v_internal_storages"][];
  [ComponentCategory.Casing]: ComponentView["v_casings"];
  [ComponentCategory.Headphone]: undefined;
  [ComponentCategory.Keyboard]: undefined;
  [ComponentCategory.Mouse]: undefined
  [ComponentCategory.Speaker]: undefined
  [ComponentCategory.Webcam]: undefined
  [ComponentCategory.Printer]: undefined
  [ComponentCategory.Monitor]: undefined
  [ComponentCategory.OS]: undefined
  [ComponentCategory.SoundCard]: undefined
  [ComponentCategory.WiredNetwork]: undefined
  [ComponentCategory.WirelessNetwork]: undefined
  [ComponentCategory.Cable]: undefined
  [ComponentCategory.ExternalDrive]: undefined
  [ComponentCategory.Cooler]: undefined;
  [ComponentCategory.CaseFan]: undefined;
};

export const casingHeaders = [
  "Brand Name",
  "Casing Type",
  // 'Drive Bays',
  "Fan Slots",
  "GPU Max Length (mm)",
];

export const casingKeys = [
  "brand_name",
  "casing_type",
  "fan_slots",
  "max_gpu_length_mm",
];

export const cpuHeaders = [
  "Total Core",
  "Base Clock (GHz)",
  "Max Clock (GHz)",
  "Base Power (Watt)",
  "Integrated GPU",
];

export const cpuKeys = [
  "total_core",
  "base_clock_ghz",
  "max_clock_ghz",
  "base_power_watt",
  "integrated_gpu",
];

export const gpuHeaders = [
  "Boost Clock (MHz)",
  "Brand Name",
  "Core Clock (MHz)",
  "Length (mm)",
  "TDP (Watt)",
  "VRAM (GB)",
];

export const gpuKeys = [
  "boost_clock_mhz",
  "brand_name",
  "base_clock_mhz",
  "length_mm",
  "tdp_watt",
  "vram_gb",
];

export const memoryHeaders = [
  "Amount",
  "Brand Name",
  "Capacity (GB)",
  "Frequency (MHz)",
  "Memory Type",
];

export const memoryKeys = [
  "amount",
  "brand_name",
  "capacity_gb",
  "frequency_mhz",
  "memory_type",
];

export const motherboardHeaders = [
  "Brand Name",
  "CPU Socket",
  "Form Factor",
  "Max Memory (GB)",
  "Memory Type",
];

export const motherboardKeys = [
  "brand_name",
  "cpu_socket",
  "form_factor",
  "max_memory_gb",
  "memory_type",
];

export const psuHeaders = [
  "Brand Name",
  "Efficiency Rating",
  "Form Factor",
  "Height (mm)",
  "Modularity",
  "Wattage",
];

export const psuKeys = [
  "brand_name",
  "efficiency_rating",
  "form_factor",
  "height_mm",
  "modularity",
  "wattage",
];

export const storageHeaders = [
  "Brand Name",
  "Type",
  "Capacity (GB)",
  "Form Factor",
  "Interface",
];

export const storageKeys = [
  "brand_name",
  "type",
  "capacity_gb",
  "form_factor",
  "interface",
];

export const categoryHeaders: Record<ComponentCategory, string[]> = {
  [ComponentCategory.Headphone]: [],
  [ComponentCategory.Keyboard]: [],
  [ComponentCategory.Mouse]: [],
  [ComponentCategory.Speaker]: [],
  [ComponentCategory.Webcam]: [],
  [ComponentCategory.Printer]: [],
  [ComponentCategory.Monitor]: [],
  [ComponentCategory.OS]: [],
  [ComponentCategory.SoundCard]: [],
  [ComponentCategory.WiredNetwork]: [],
  [ComponentCategory.WirelessNetwork]: [],
  [ComponentCategory.Cable]: [],
  [ComponentCategory.ExternalDrive]: [],
  [ComponentCategory.Motherboard]: motherboardHeaders,
  [ComponentCategory.CPU]: cpuHeaders,
  [ComponentCategory.GPU]: gpuHeaders,
  [ComponentCategory.Memory]: memoryHeaders,
  [ComponentCategory.Cooler]: [],
  [ComponentCategory.PSU]: psuHeaders,
  [ComponentCategory.Storage]: storageHeaders,
  [ComponentCategory.Casing]: casingHeaders,
  [ComponentCategory.CaseFan]: [],
};
