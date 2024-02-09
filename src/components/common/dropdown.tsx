import { Slot, component$, useSignal } from "@builder.io/qwik"
import { FaChevronDownSolid, FaChevronUpSolid } from "@qwikest/icons/font-awesome"

export type DropdownProps = {
    headerClass?: string
    mainClass?: string
}

export default component$(({ headerClass, mainClass }: DropdownProps = {}) => {
    const dropdownClass = 'flex flex-row hover:cursor-pointer hover:bg-black/10 px-2 py-1 -translate-x-2 rounded-lg items-center'
    const show = useSignal(true)
    return (
        <>
            <header
                class={`${headerClass} ${dropdownClass}`}
                onClick$={() => show.value = !show.value}
            >
                <span class="w-full">
                    <Slot name="header" />
                </span>
                {show.value ? <FaChevronUpSolid /> : <FaChevronDownSolid />}
            </header>
            <main class={`${mainClass} ${show.value ? '' : 'hidden'}`}>
                {show.value &&
                    <Slot name="main" />
                }
            </main>
        </>
    )
})