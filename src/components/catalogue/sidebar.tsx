import { component$, Slot, useSignal } from "@builder.io/qwik"
import { useLocation } from "@builder.io/qwik-city";
import { TbChevronDown } from "@qwikest/icons/tablericons"

export const CatalogueSidebar = component$(({ price, totalComponents }: { price: number, totalComponents: number }) => {
    const isIframe = useLocation().url.searchParams.get('iframe') === 'true';

    return (
        <aside class={['self-start sticky', isIframe ? 'top-0' : 'top-navbar-min-h']}>
            <div class={`flex flex-col w-56 mx-4 gap-2 `}>
                <div class={`flex flex-col gap-2 bg-white rounded-lg h-fit shadow-br font-semibold p-2 ${isIframe && 'hidden'}`}>
                    <div class='text-xl leading-5 rounded-lg border border-black/40 p-2'>Rincian Komponen yang Dipilih</div>
                    <div class='flex flex-col'>
                        <span class='text-sm'>Jumlah komponen</span>
                        <span class='text-xl'>{totalComponents}</span>
                        <span class='text-sm'>Total Harga</span>
                        <span class='text-xl'>Rp {price.toLocaleString('id-ID')}</span>
                    </div>
                </div>
                <span class='font-semibold text-lg'>
                    Filter
                </span>
                <Slot />
            </div>
        </aside>
    )
})

export const SidebarSection = component$(({ title }: { title: string }) => {
    const open = useSignal(true)
    return (
        <div class='flex flex-col gap-2'>
            <div
                class='flex flex-row hover:bg-button-hover/20 px-2 py-1 rounded-md'
                onClick$={() => open.value = !open.value}
            >
                <span class='font-semibold'>{title}</span>
                <div class='ml-auto'>
                    <TbChevronDown class={`inline-block ${open.value ? 'rotate-180' : 'rotate-0'} transition-all duration-200`} />
                </div>
            </div>
            <div class='px-2'>
                {open.value &&
                    <Slot />
                }
            </div>
        </div>
    )
})