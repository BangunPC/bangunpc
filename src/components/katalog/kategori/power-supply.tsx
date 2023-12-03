import { component$ } from "@builder.io/qwik";
import type { Psu } from "./types";

export const psuHeaders = [
    'Brand Name',
    'Efficiency Rating',
    'Form Factor',
    'Height (mm)',
    'Modularity',
    'Wattage',
]

export default component$<Psu>((props) => {
    const psu = props.psu
    return (
        <>
            <td>{psu.brand_name ?? '-'}</td>
            <td>{psu.efficiency_rating ?? '-'}</td>
            <td>{psu.form_factor ?? '-'}</td>
            <td>{psu.height_mm ?? '-'}</td>
            <td>{psu.modularity ?? '-'}</td>
            <td>{psu.wattage ?? '-'}</td>
        </>
    );
});