import { component$ } from "@builder.io/qwik";
import { productImageUrl, type Cpu } from "./types";

export default component$<Cpu>((props) => {
    const cpu = props.cpu;
    return <>
        <td>{cpu.image_paths?.[0] &&
            <>
                <img src={productImageUrl + cpu.image_paths?.[0]} width={80} height={80} />
            </>
        } {cpu.product_name ?? '-'}</td>
        <td>{cpu.core_count ?? '-'}</td>
        <td>{cpu.core_clock_ghz ?? '-'}</td>
        <td>{cpu.boost_clock_ghz ?? '-'}</td>
        <td>{cpu.tdp ?? '-'}</td>
        <td>{cpu.integrated_gpu ?? '-'}</td>
    </>;
})