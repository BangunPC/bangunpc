import { Slot, component$ } from "@builder.io/qwik";
import style from "./jasa-card.module.css";

export type JasaProps = {
    title: string
    description: string
    iconNumber: number
}

export default component$<JasaProps>((props) => {
    return (
        <div class={style['jasa-card']}>
            <header class={style['jasa-header']}>
                <div class={[style['jasa-icon'], style[`icon${props.iconNumber}`]]}>
                    <Slot name="icon" />
                </div>
                <span class={style['jasacard-title']}>

                    {props.title}
                </span>
            </header>
            <main class={style['jasacard-main']}>
                {props.description}
            </main>
        </div>
    )
})