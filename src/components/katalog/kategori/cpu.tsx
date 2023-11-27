import { component$ } from "@builder.io/qwik";
import { type Cpu } from "./types";

export const cpuHeaders = [
    'Total Core',
    'Base Clock (GHz)',
    'Max Clock (GHz)',
    'Base Power (Watt)',
    'Integrated GPU',
]

export default component$<Cpu>(({cpu}) => {
    return <>
        <td>{cpu.total_core ?? '-'}</td>
        <td>{cpu.base_clock_ghz ?? '-'}</td>
        <td>{cpu.max_clock_ghz ?? '-'}</td>
        <td>{cpu.base_power_watt ?? '-'}</td>
        <td>{cpu.integrated_gpu ?? '-'}</td>
    </>;
})