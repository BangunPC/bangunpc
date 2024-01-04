import type { PropFunction} from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik"
import { FaMagnifyingGlassSolid } from "@qwikest/icons/font-awesome";

export type SearchBoxProps = {
    placeholder?: string
    onInput$?: PropFunction<(event: InputEvent, element: HTMLInputElement) => void>
    onChange$?: PropFunction<(event: Event, element: HTMLInputElement) => void>
}

export default component$<SearchBoxProps>((props) => {
    return (
        <div class="items-center bg-white flex gap-2.5 pl-4 pr-2 rounded-xl min-h-[36px] border shadow-inner">
            <FaMagnifyingGlassSolid class="w-5 h-5" />
            <input
                onInput$={props.onInput$}
                onChange$={props.onChange$}
                placeholder={props.placeholder}
                class="w-full outline-none"
            />
        </div>
    );
})