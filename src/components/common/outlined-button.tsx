import { Slot, component$ } from "@builder.io/qwik";
import type { ButtonProps } from "./filled-button";

export default component$<ButtonProps>((props) => {
    const componentClass = "rounded-md bg-transparent border border-solid border-[#4c5986] text-[#4c5986] font-semibold text-lg px-2 py-1 transition-colors duration-200 hover:bg-[#808cb8] hover:border-transparent hover:text-white " + props.class

    if (props.labelFor) {
        return <label class={componentClass} for={props.labelFor}><Slot /></label>;
    } else {
        return <button class={componentClass} onClick$={props.onClick$}><Slot /></button>;
    }
});