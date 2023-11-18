import { component$ } from "@builder.io/qwik";
import { productImageUrl, type Gpu } from "./types";

export default component$<Gpu>((props) => {
    const gpu = props.gpu;
    return <>
        <td>{gpu.image_paths?.[0] &&
            <>
                <img src={productImageUrl + gpu.image_paths?.[0]} width={80} height={80} />
            </>
        } {gpu.product_name ?? '-'}</td>

        <td>{gpu.boost_clock_mhz ?? '-'}</td>
        <td>{gpu.brand_name ?? '-'}</td>
        <td>{gpu.chipset ?? '-'}</td>
        <td>{gpu.color ?? '-'}</td>
        <td>{gpu.core_clock_mhz ?? '-'}</td>
        <td>{gpu.length_mm ?? '-'}</td>
        <td>{gpu.tdp_watt ?? '-'}</td>
        <td>{gpu.vram_gb ?? '-'}</td>
        <td>{gpu.description ?? '-'}</td>
    </>;
})