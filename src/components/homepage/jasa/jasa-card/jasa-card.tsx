import { Slot, component$ } from "@builder.io/qwik";
import style from "./jasa-card.module.css";
import { HiArrowUpSolid } from "@qwikest/icons/heroicons";
import { Link } from "@builder.io/qwik-city";

export type JasaProps = {
    title: string
    description: string
    iconNumber: number
    labelFor?: string | undefined
    href?: string | undefined
}

export default component$<JasaProps>((props) => {
    const borderClass = 'border border-black border-opacity-50';
    const arrow = <footer
        class={`mx-auto rounded-full ${borderClass} w-fit px-6 text-2xl transition-colors bg-white hover:bg-button-hover  hover:border-[#a6afce] hover:text-white cursor-pointer translate-y-[-50%]`}

        onClick$={() => props.labelFor || props.href ? undefined : alert('Coming Soon!')}
    >
        <HiArrowUpSolid class="rotate-45" />
    </footer>
    return (
        <div class='h-full py-8'>
            <div class={`min-w-fit max-w-sm px-4 bg-white rounded-lg shadow-xl shadow-slate-200 h-full ${borderClass}`}>
                <header class={[style['jasa-header'], 'mx-auto translate-y-[-50%]']}>
                    <div class={[style['jasa-icon'], style[`icon${props.iconNumber}`], 'mx-auto rounded-full justify-center items-center aspect-square w-14']}>
                        <Slot name="icon" />
                    </div>
                </header>
                <main class={[style['jasacard-main'], 'flex flex-col justify-between text-center']}>
                    <span class={[style['jasacard-title'], 'mx-auto leading-none mb-4']}>
                        {props.title}
                    </span>
                    <span class='m-auto'>
                        {props.description}
                    </span>
                </main>
            </div>
            {props.labelFor && (
                <label for={props.labelFor}>
                    {arrow}
                </label>
            )}
            {props.href && (
                <Link href={props.href} class='text-black'>
                    {arrow}
                </Link>
            )}
            {!props.labelFor && !props.href && arrow}
        </div>
    )
})