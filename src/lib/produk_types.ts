import { categoryEnumToSlug, ComponentCategoryEnum } from "./db";

const storage_unit = ['TB', 'GB', 'MB', 'KB', 'B'];

export const v_casings = [
  ["brand_name", "Brand Name", ""],
  ["casing_type", "Casing Type", ""],
  ["colors", "Colors", ""],
  ["drive_bays", "Drive Bays", ""],
  ["dust_cover", "Dust Cover", ""],
  ["expansion_slot", "Expansion Slot", ""],
  ["fan_slots", "Fan Slots", ""],
  ["height_mm", "Height", " mm"],
  ["io_port", "IO Port", ""],
  ["length_mm", "Length", " mm"],
  ["max_cpu_cooler_length_mm", "Maximum CPU Cooler Length", " mm"],
  ["max_gpu_length_mm", "Maximum GPU Length", " mm"],
  ["max_psu_length_mm", "Maximum PSU Length", " mm"],
  ["mobo_supports", "Mobo Supports", ""],
  ["side_panel", "Side Panel", ""],
  ["weight_kg", "Weight", " KG"],
  ["width_mm", "Width", " mm"],
];

export const v_cpus = [
  ["brand_name", "Brand Name", ""],
  ["model_line", "Model Line", ""],
  ["code_name", "Code Name", ""],
  ["cpu_socket", "CPU Socket", ""],
  ["release_date", "Release Date", ""],
  ["integrated_gpu", "Integrated GPU", ""],
  ["size_nm", "Size", " nm"],
  ["pcie_generation", "PCI Express® Version", ""],
  ["performance_core", "Performance Core", ""],
  ["efficiency_core", "Efficiency Core", ""],
  ["total_core", "Total Core", ""],
  ["total_thread", "Total Thread", ""],
  ["base_clock_ghz", "Base Clock", " GHz"],
  ["max_clock_ghz", "Maximum Clock", " GHz"],
  ["base_power_watt", "Base Power (TDP)", " watt"],
  ["max_power_watt", "Maximum Power", " watt"],
  ["max_temperature_celcius", "Maximum Operating Temperature", "°C"],
  ["l1_cache_kb", "L1 Cache", ` ${storage_unit[3]}`],
  ["l2_cache_mb", "L2 Cache", ` ${storage_unit[2]}`],
  ["l3_cache_mb", "L3 Cache", ` ${storage_unit[2]}`],
  ["max_memory_channel", "Maximum Memory Channel", ""],
  ["max_memory_gb", "Maximum Memory Size", ` ${storage_unit[1]}`],
  ["memory_type_supports", "Memory Type Supports", ""],
];

export const v_gpus = [
  ["base_clock_mhz", "Base Clock", " MHz"],
  ["boost_clock_mhz", "Boost Clock", " MHz"],
  ["brand_name", "Brand Name", ""],
  ["bus_interface", "Bus Interface", ""],
  ["chipset", "Chipset", ""],
  ["core_count", "Core", ""],
  ["gpu_memory_type", "GPU Memory Type", ""],
  ["width_mm", "Width", " mm"],
  ["height_mm", "Height", " mm"],
  ["length_mm", "Length", " mm"],
  ["memory_bus_bit", "Memory Bus Bit", ""],
  ["min_psu_watt", "Minimal Power Supply Requirement", " watt"],
  ["tdp_watt", "TDP", " watt"],
  ["vram_gb", "VRAM", ` ${storage_unit[1]}`],
];

export const v_memories = [
  ["amount", "Amount", ""],
  ["brand_name", "Brand Name", ""],
  ["capacity_gb", "Capacity", ` ${storage_unit[1]}`],
  ["frequency_mhz", "Frequency", " MHz"],
  ["has_ecc", "Has ECC", ""],
  ["has_heatsink", "Has Heatsink", ""],
  ["has_rgb", "Has RGB", ""],
  ["memory_type", "Memory Type", ""],
  ["overclocked", "Overclocked", ""],
  ["voltage", "Voltage", ""],
];

export const v_motherboards = [
  ["brand_name", "Brand Name", ""],
  ["chipset", "Chipset", ""],
  ["cpu_socket", "CPU Socket", ""],
  ["form_factor", "Form Factor", ""],
  ["back_pannel_ports", "Back Panel Ports", ""],
  ["memory_channel_count", "Memory Channel", ""],
  ["memory_frequency_mhz", "Memory Frequency", " MHz"],
  ["max_memory_gb", "Maximum Memory", ` ${storage_unit[1]}`],
  ["memory_slot", "Memory Slot", ""],
  ["memory_type", "Memory Type", ""],
  ["pcie_m2_slot", "PCIe M.2 NVME Slot", ""],
  ["pcie_slots", "PCIe Slot", ""],
  ["sata3_slot", "SATA3 Slot", ""],
  ["wifi_network", "WiFi Network", ""],
];

export const v_power_supplies = [
  ["brand_name", "Brand Name", ""],
  ["model", "Model", ""],
  ["wattage", "Wattage", " watt"],
  ["warranty", "Warranty", " year/s"],
  ["80_plus_verification", "80 Plus Verification", ""],
  ["efficiency_rating", "80 Plus Efficiency Rating", ""],
  ["cybenetics_verification", "Cybenetics Verification", ""],
  ["cybenetics_efficiency_rating", "Cybenetics Efficiency Rating", ""],
  ["cybenetics_noise_rating", "Cybenetics Noise Rating", ""],
  ["form_factor", "Form Factor", ""],
  ["modularity", "Modularity", ""],
  ["protection", "Protection", ""],
  ["cable_type", "Cable Type", ""],
  ["atx_24_pin_connector", "ATX 24 Pin Connector (Motheboard)", ""],
  ["eps_8_pin_connector", "EPS 8 Pin Connector (CPU)", ""],
  ["eps_4+4_pin_connector", "EPS 4+4 Pin Connector (CPU)", ""],
  ["sata_connector", "SATA Connector (Storage)", ""],
  ["molex_connector", "Molex Connector (Peripheral)", ""],
  ["pcie_connector_list", "PCIe Connector List", ""],
];

export const v_internal_storages = [
  ["brand_name", "Brand Name", ""],
  ["type", "Type", ""],
  ["capacity_gb", "Capacity", ` ${storage_unit[1]}`],
  ["form_factor", "Form Factor", ""],
  ["interface", "Interface", ""],
  ["read_speed_mbs", "Read Speed", " MB/s"],
  ["write_speed_mbs", "Write Speed", " MB/s"],
];
export const v_monitors = [
  ["brand_name", "Brand Name", ""],
  ["panel_type", "Panel Type", ""],
  ["resolution", "Resolution", ""],
  ["aspect_ratio", "Aspect Ratio", ""],
  ["size_inch", "Size", "inch"],
  ["srgb_percentage", "Srgb", "%"],
  ["refresh_rate_hz", "Refresh Rate", " Hz"],
  ["brightness_nits", "Brightness", " nits"],
  ["has_speaker", "Built-in Speaker", ""],
  ["inputs", "Input Port", ""],
  ["vesa_mount_mm", "Vesa Mount", " mm"],
  ["warranty_years", "Warranty", " year/s"],
  ["spesial_features", "Special Feature", ""],
];

export const v_spec: Record<string, string[][] | undefined> = {
  headphone: undefined,
  keyboard: undefined,
  mouse: undefined,
  speaker: undefined,
  webcam: undefined,
  printer: undefined,
  monitor: v_monitors,
  os: undefined,
  soundcard: undefined,
  wirednetwork: undefined,
  wirelessnetwork: undefined,
  cable: undefined,
  externaldrive: undefined,
  motherboard: v_motherboards,
  cpu: v_cpus,
  gpu: v_gpus,
  memory: v_memories,
  cooler: undefined,
  psu: v_power_supplies,
  storage: v_internal_storages,
  casing: v_casings,
  casefan: undefined,
};


export const formatComponentSpec = (categoryEnum: ComponentCategoryEnum, component: any) => {
  return v_spec[categoryEnumToSlug[categoryEnum]]?.flatMap((v) => {
    const specValue = v[0] !== undefined ? component[v[0] as keyof typeof component] : undefined;

    let value;
    
    if (typeof specValue === 'number' && v[2] !== undefined) {
      const currentUnit = v[2].trim();
      const currentIndex = storage_unit.indexOf(currentUnit);
      
      // Check if the number has exactly 3 decimal places
      const decimalPart = specValue.toString().split('.')[1];
      const hasThreeDecimals = decimalPart?.length === 3;
      
      if (currentIndex !== -1 && hasThreeDecimals && currentIndex < storage_unit.length - 1) {
        // Convert to next smaller unit (multiply by 1000)
        const convertedValue = specValue * 1000;
        const nextUnit = storage_unit[currentIndex + 1];
        value = `${convertedValue} ${nextUnit}`;
      } else {
        // Keep original value and unit
        value = `${specValue}${v[2]}`;
      }
    } else {
      value = specValue;
    }

    return {
      title: v[1],
      value
    };
  });
}