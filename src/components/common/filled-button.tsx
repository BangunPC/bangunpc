import { ClassList, Signal, Slot, component$ } from "@builder.io/qwik";

export type ButtonProps = {
    onClick?: () => {},
    labelFor?: string,
    class?: ClassList | Signal<ClassList> | undefined,
}

export default component$<ButtonProps>((props) => {
    const componentClass: any = ["rounded-md bg-[#4c5986] text-white font-semibold text-lg px-2 py-1 transition-colors duration-200 hover:bg-[#4c5986]/90 ", props.class];

    if (props.labelFor) {
        return <label class={componentClass + " cursor-pointer"} for={props.labelFor}><Slot /></label>;
    } else {
        return <button class={componentClass} onClick$={props.onClick}><Slot /></button>;
    }
});