import { component$ } from "@builder.io/qwik";
import type { Motherboard } from "./types";

export const motherboardHeaders = [
    'Brand Name',
    'Chipset',
    'Color',
    'CPU Socket',
    'Form Factor',
    'Input/Output Ports',
    'Memory Max (GB)',
    'Memory Slot Amount',
    'Memory Type',
    'PCIe Slots',
    'Storage Interface',
]


export default component$<Motherboard>(({motherboard}) => {
    return (
        <>
            <td>{motherboard.brand_name ?? '-'}</td>
            <td>{motherboard.chipset ?? '-'}</td>
            <td>{motherboard.color ?? '-'}</td>
            <td>{motherboard.cpu_socket ?? '-'}</td>
            <td>{motherboard.form_factor ?? '-'}</td>
            <td>{motherboard.input_output_ports ?? '-'}</td>
            <td>{motherboard.memory_max_gb ?? '-'}</td>
            <td>{motherboard.memory_slot_amount ?? '-'}</td>
            <td>{motherboard.memory_type ?? '-'}</td>
            <td>{motherboard.pcie_slots ?? '-'}</td>
            <td>{motherboard.storage_interface ?? '-'}</td>
        </>
    );
});