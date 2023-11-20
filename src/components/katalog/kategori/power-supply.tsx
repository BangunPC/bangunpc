import { component$ } from "@builder.io/qwik";
import { Psu } from "./types";

export const psuHeaders = [
    'Brand Name',
    'Color',
    'Depth (mm)',
    'Efficiency Rating',
    'Form Factor',
    'Height (mm)',
    'Modularity',
    'Slug',
    'Wattage',
    'Width (mm)',
]

export default component$<Psu>((props) => {
    const psu = props.psu
    return (
        <>
            <td>{psu.brand_name ?? '-'}</td>
            <td>{psu.color ?? '-'}</td>
            <td>{psu.depth_mm ?? '-'}</td>
            <td>{psu.efficiency_rating ?? '-'}</td>
            <td>{psu.form_factor ?? '-'}</td>
            <td>{psu.height_mm ?? '-'}</td>
            <td>{psu.modularity ?? '-'}</td>
            <td>{psu.slug ?? '-'}</td>
            <td>{psu.wattage ?? '-'}</td>
            <td>{psu.width_mm ?? '-'}</td>
        </>
    );
});