import { component$ } from "@builder.io/qwik";
import type { Cpu } from "./types";

export default component$<Cpu>((props) => {
    const cpu = props.cpu;
    return <>
        <td>{cpu.product_name ?? '-'}</td>
        <td>{cpu.core_count ?? '-'}</td>
        <td>{cpu.core_clock_ghz ?? '-'}</td>
        <td>{cpu.boost_clock_ghz ?? '-'}</td>
        <td>{cpu.tdp ?? '-'}</td>
        <td>{cpu.integrated_gpu ?? '-'}</td>
        <td>???</td>
        <td>{cpu.price?.toLocaleString('id-ID') ?? '-'}</td></>;
})