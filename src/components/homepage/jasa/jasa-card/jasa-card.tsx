import { Slot, component$ } from "@builder.io/qwik";
import style from "./jasa-card.module.css";
import { HiArrowUpSolid } from "@qwikest/icons/heroicons";

export type JasaProps = {
    title: string
    description: string
    iconNumber: number
}

export default component$<JasaProps>((props) => {
    const borderClass = 'border border-black border-opacity-50';
    return (
        <div class={`min-w-fit max-w-sm px-4 bg-white rounded-lg my-8 shadow-xl shadow-slate-200 ${borderClass}`}>
            <header class={[style['jasa-header'], 'mx-auto translate-y-[-50%]']}>
                <div class={[style['jasa-icon'], style[`icon${props.iconNumber}`], 'mx-auto rounded-full justify-center items-center aspect-square w-14']}>
                    <Slot name="icon" />
                </div>
            </header>
            <main class={[style['jasacard-main'], 'flex flex-col justify-center text-center']}>
                <span class={[style['jasacard-title'], 'w-full mx-auto leading-none mb-4']}>
                    {props.title}
                </span>
                {props.description}
            </main>
            <footer
                class={`mx-auto rounded-full ${borderClass} w-fit px-6 text-2xl transition-colors bg-white hover:bg-[#4c5986]  hover:border-[#a6afce] hover:text-white cursor-pointer translate-y-[50%]`}
                
                onClick$={() => alert('Coming Soon!')}
            >
                <HiArrowUpSolid class="rotate-45" />
            </footer>
        </div>
    )
})