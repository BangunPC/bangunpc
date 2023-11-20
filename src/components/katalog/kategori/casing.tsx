import { component$ } from "@builder.io/qwik";
import type { Casing } from "./types";

export const casingHeaders = [
    'Brand Name',
    'Casing Type',
    'Colors',
    'Depth (mm)',
    'Drive Bays',
    'Fan Slots',
    'GPU Max (mm)',
    'Height (mm)',
    'Lowest Price',
    'Mobo Supports',
    'Slug',
    'Weight (kg)',
    'Width (mm)',
]

export default component$<Casing>(({ casing }) => {
    const drive_bays = casing.drive_bays as { [key: string]: string } | undefined | null
    const drive_bays_keys = Object.keys(drive_bays ?? {})
    const drive_bays_values = Object.values(drive_bays ?? {})
    const drive_bays_string = drive_bays ? drive_bays_keys.map((key, index) => `${key} : ${drive_bays_values[index]}`).join(', ') : null
    return (
        <>
            <td>{casing.brand_name ?? '-'}</td>
            <td>{casing.casing_type ?? '-'}</td>
            <td>{casing.colors ?? '-'}</td>
            <td>{casing.depth_mm ?? '-'}</td>
            <td>{drive_bays_string ?? '-'}</td>
            <td>{casing.fan_slots ?? '-'}</td>
            <td>{casing.gpu_max_mm ?? '-'}</td>
            <td>{casing.height_mm ?? '-'}</td>
            <td>{casing.lowest_price ?? '-'}</td>
            <td>{casing.mobo_supports ?? '-'}</td>
            <td>{casing.weight_kg ?? '-'}</td>
            <td>{casing.width_mm ?? '-'}</td>
        </>
    );
})