import { Slot, component$ } from "@builder.io/qwik";
import type { ButtonProps } from "./filled-button";

export default component$<ButtonProps>((props) => {
    return <button onClick$={props.onClick} class={"rounded-md bg-transparent border border-solid border-[#4c5986] text-[#4c5986] font-semibold text-lg px-2 py-1 transition-colors duration-200 hover:bg-[#4c5986]/90 hover:border-transparent hover:text-white " + props.class}>
        <Slot />
    </button>;
});