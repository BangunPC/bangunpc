import { component$ } from "@builder.io/qwik";
import type { Motherboard } from "./types";

export const motherboardHeaders = [
    'Brand Name',
    'Chipset',
    'Color',
    'CPU Socket',
    'Form Factor',
    'Memory Max (GB)',
    'Memory Type',
    'PCIe Slots',
]


export default component$<Motherboard>(({motherboard}) => {
    return (
        <>
            <td>{motherboard.brand_name ?? '-'}</td>
            <td>{motherboard.chipset ?? '-'}</td>
            <td>{motherboard.cpu_socket ?? '-'}</td>
            <td>{motherboard.form_factor ?? '-'}</td>
            <td>{motherboard.memory_max_gb ?? '-'}</td>
            <td>{motherboard.memory_slot ?? '-'}</td>
            <td>{motherboard.memory_type ?? '-'}</td>
            <td>{motherboard.pcie_slots ?? '-'}</td>
        </>
    );
});