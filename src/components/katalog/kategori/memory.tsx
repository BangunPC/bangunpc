import { component$ } from "@builder.io/qwik";
import type { Memory } from "./types";

export const memoryHeaders = [
    'Amount',
    'Brand Name',
    'Capacity (GB)',
    'Frequency (MHz)',
    'Memory Type',
]

export default component$<Memory>(({memory}) => {
    return (
        <>
            <td>{memory.amount ?? '-'}</td>
            <td>{memory.brand_name ?? '-'}</td>
            <td>{memory.capacity_gb ?? '-'}</td>
            <td>{memory.frequency_mhz ?? '-'}</td>
            <td>{memory.memory_type ?? '-'}</td>
        </>
    );
});
