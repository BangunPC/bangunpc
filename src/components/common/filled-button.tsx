import { Slot, component$ } from "@builder.io/qwik";

export type ButtonProps = {
    onClick?: () => {},
    class?: string,
}

export default component$<ButtonProps>((props) => {
    return <button onClick$={props.onClick} class={"rounded-md bg-[#4c5986] text-white font-semibold text-lg px-2 py-1 transition-colors duration-200 hover:bg-[#4c5986]/90 " + props.class}>
        <Slot />
    </button>;
});