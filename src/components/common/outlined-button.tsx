import { Slot, component$ } from "@builder.io/qwik";

export type ButtonProps = {
    onClick?: () => {},
}

export default component$<ButtonProps>(({ onClick }) => {
    return <button onClick$={onClick} class="rounded-md bg-transparent border border-solid border-[#4c5986] text-[#4c5986] font-semibold text-lg px-2 py-1 transition-colors duration-200 hover:bg-[#4c5986]/90 hover:text-white">
        <Slot />
    </button>;
});