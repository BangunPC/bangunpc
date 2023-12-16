import { Slot, component$ } from "@builder.io/qwik";

export type ButtonProps = {
    onClick?: () => {},
}

export default component$<ButtonProps>(({ onClick }) => {
    return <button onClick$={onClick} class="rounded-md bg-[#4c5986] text-white font-semibold text-lg px-2 py-1 transition-colors duration-200 hover:bg-[#4c5986]/90">
        <Slot />
    </button>;
});