import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { filledButtonClass } from "../common/filled-button";

export default component$(() => {
    return (
        <Link
            href='https://forms.gle/NXWEQB1HpGmZeBs98'
            target='_blank'
            class={[filledButtonClass, 'z-10 fixed bottom-5 right-5 bg-button rounded-lg text-white font-semibold text-lg px-2 py-1 shadow-md shadow-white/30',]}
        >
            Feedback
        </Link>
    )
})