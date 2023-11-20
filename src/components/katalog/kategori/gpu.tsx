import { component$ } from "@builder.io/qwik";
import {type Gpu } from "./types";

export const gpuHeaders = [
    'Boost Clock (MHz)',
    'Brand Name',
    'Chipset',
    'Color',
    'Core Clock (MHz)',
    'Length (mm)',
    'TDP (Watt)',
    'VRAM (GB)'
]    

export default component$<Gpu>(({gpu}) => {
    return <>
        <td>{gpu.boost_clock_mhz ?? '-'}</td>
        <td>{gpu.brand_name ?? '-'}</td>
        <td>{gpu.chipset ?? '-'}</td>
        <td>{gpu.color ?? '-'}</td>
        <td>{gpu.core_clock_mhz ?? '-'}</td>
        <td>{gpu.length_mm ?? '-'}</td>
        <td>{gpu.tdp_watt ?? '-'}</td>
        <td>{gpu.vram_gb ?? '-'}</td>
    </>;
})