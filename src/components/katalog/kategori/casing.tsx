import { component$ } from "@builder.io/qwik";
import type { Casing } from "./types";

export const casingHeaders = [
    'Brand Name',
    'Casing Type',
    // 'Drive Bays',
    'Fan Slots',
    'GPU Max Length (mm)',
]

export default component$<Casing>(({ casing }) => {
    // const drive_bays = casing.drive_bays as { [key: string]: string } | undefined | null
    // const drive_bays_keys = Object.keys(drive_bays ?? {})
    // const drive_bays_values = Object.values(drive_bays ?? {})
    // const drive_bays_string = drive_bays ? drive_bays_keys.map((key, index) => `${key} : ${drive_bays_values[index]}`).join(', ') : null
    return (
        <>
            <td>{casing.brand_name ?? '-'}</td>
            <td>{casing.casing_type ?? '-'}</td>
            {/* <td>{drive_bays_string ?? '-'}</td> */}
            <td>{casing.fan_slots ?? '-'}</td>
            <td>{casing.max_gpu_length_mm ?? '-'}</td>
            {/* <td>{casing. ?? '-'}</td> */}
        </>
    );
})