import type { ClassList, Signal } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";

export type ButtonProps = {
    onClick$?: VoidFunction | undefined,
    labelFor?: string,
    class?: ClassList | Signal<ClassList> | undefined,
}

export const filledButtonClass = "rounded-md bg-primary text-white font-semibold text-lg px-2 py-1 transition-colors duration-200 hover:bg-primary-hover "

export default component$<ButtonProps>((props) => {
    const componentClass: any = [filledButtonClass, props.class];

    if (props.labelFor) {
        return <label class={componentClass + " cursor-pointer"} for={props.labelFor}><Slot /></label>;
    } else {
        return <button class={componentClass} onClick$={props.onClick$}><Slot /></button>;
    }
});