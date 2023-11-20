import { component$ } from "@builder.io/qwik";
import type { Memory } from "./types";

export const memoryHeaders = [
    'Amount',
    'Brand Name',
    'Capacity (GB)',
    'Frequency (MHz)',
    'Has ECC',
    'Has RGB',
    'Memory Type',
    'Voltage',
]

export default component$<Memory>(({memory}) => {
    return (
        <>
            <td>{memory.amount ?? '-'}</td>
            <td>{memory.brand_name ?? '-'}</td>
            <td>{memory.capacity_gb ?? '-'}</td>
            <td>{memory.frequency_mhz ?? '-'}</td>
            <td>{memory.has_ecc ?? '-'}</td>
            <td>{memory.has_rgb ?? '-'}</td>
            <td>{memory.memory_type ?? '-'}</td>
            <td>{memory.voltage ?? '-'}</td>
        </>
    );
});
