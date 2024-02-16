import { Slot, component$ } from "@builder.io/qwik";
import type { ButtonProps } from "./filled-button";

export default component$<ButtonProps>((props) => {
    const componentClass = "bg-transparent stroke-black text-lg p-0 transition-colors duration-200 hover:text-primary hover:stroke-primary " + props.class

    if (props.labelFor) {
        return <label class={componentClass} for={props.labelFor}><Slot /></label>;
    } else {
        return <button class={componentClass} onClick$={props.onClick$}><Slot /></button>;
    }
});