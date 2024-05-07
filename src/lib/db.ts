const supabaseUrl = "https://onawoodgnwkncueeyusr.supabase.co";
const storageImageurl = "/storage/v1/object/public/public-images/products/";

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

export const categoriesFromString: Record<string, ComponentCategory> = {
  headphone: ComponentCategory.Headphone,
  keyboard: ComponentCategory.Keyboard,
  mouse: ComponentCategory.Mouse,
  speaker: ComponentCategory.Speaker,
  webcam: ComponentCategory.Webcam,
  printer: ComponentCategory.Printer,
  monitor: ComponentCategory.Monitor,
  os: ComponentCategory.OS,
  soundcard: ComponentCategory.SoundCard,
  wirednetwork: ComponentCategory.WiredNetwork,
  wirelessnetwork: ComponentCategory.WirelessNetwork,
  cable: ComponentCategory.Cable,
  externaldrive: ComponentCategory.ExternalDrive,
  motherboard: ComponentCategory.Motherboard,
  cpu: ComponentCategory.CPU,
  gpu: ComponentCategory.GPU,
  memory: ComponentCategory.Memory,
  cooler: ComponentCategory.Cooler,
  psu: ComponentCategory.PSU,
  storage: ComponentCategory.Storage,
  casing: ComponentCategory.Casing,
  casefan: ComponentCategory.CaseFan,
};

export const categoriesFromEnum: Record<ComponentCategory, string> = {
  [ComponentCategory.Headphone]: "headphone",
  [ComponentCategory.Keyboard]: "keyboard",
  [ComponentCategory.Mouse]: "mouse",
  [ComponentCategory.Speaker]: "speaker",
  [ComponentCategory.Webcam]: "webcam",
  [ComponentCategory.Printer]: "printer",
  [ComponentCategory.Monitor]: "monitor",
  [ComponentCategory.OS]: "os",
  [ComponentCategory.SoundCard]: "soundcard",
  [ComponentCategory.WiredNetwork]: "wirednetwork",
  [ComponentCategory.WirelessNetwork]: "wirelessnetwork",
  [ComponentCategory.Cable]: "cable",
  [ComponentCategory.ExternalDrive]: "externaldrive",
  [ComponentCategory.Motherboard]: "motherboard",
  [ComponentCategory.CPU]: "cpu",
  [ComponentCategory.GPU]: "gpu",
  [ComponentCategory.Memory]: "memory",
  [ComponentCategory.Cooler]: "cooler",
  [ComponentCategory.PSU]: "psu",
  [ComponentCategory.Storage]: "storage",
  [ComponentCategory.Casing]: "casing",
  [ComponentCategory.CaseFan]: "casefan",
};

export const categoryTitlesFromEnum: Record<ComponentCategory, string> = {
  [ComponentCategory.Headphone]: "Headphone",
  [ComponentCategory.Keyboard]: "Keyboard",
  [ComponentCategory.Mouse]: "Mouse",
  [ComponentCategory.Speaker]: "Speaker",
  [ComponentCategory.Webcam]: "Webcam",
  [ComponentCategory.Printer]: "Printer",
  [ComponentCategory.Monitor]: "Monitor",
  [ComponentCategory.OS]: "Operating System",
  [ComponentCategory.SoundCard]: "Sound Card",
  [ComponentCategory.WiredNetwork]: "Wired Network Device",
  [ComponentCategory.WirelessNetwork]: "Wireless Network Device",
  [ComponentCategory.Cable]: "Cable",
  [ComponentCategory.ExternalDrive]: "External Drive",
  [ComponentCategory.Motherboard]: "Motherboard",
  [ComponentCategory.CPU]: "Computer Processor",
  [ComponentCategory.GPU]: "GPU",
  [ComponentCategory.Memory]: "Memory",
  [ComponentCategory.Cooler]: "CPU Cooler",
  [ComponentCategory.PSU]: "Power Supply",
  [ComponentCategory.Storage]: "Internal Storage",
  [ComponentCategory.Casing]: "Internal Storage",
  [ComponentCategory.CaseFan]: "PC Casing",
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
