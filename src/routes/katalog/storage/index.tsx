import { $, component$, useComputed$, useResource$, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import CataloguePage from "~/components/catalogue/catalogue-page";
import { CatalogueSidebar, SidebarSection } from "~/components/catalogue/sidebar";
import FilledButton from "~/components/common/filled-button";
import { getStorage } from "~/lib/component_api/storage";
import { ComponentCategory } from "~/lib/katalog_types";
import type { ComponentStorageType } from "~/lib/storage_helper";
import { ComponentStorage } from "~/lib/storage_helper";

export default component$(() => {

    const kategori = 'storage';
    const katalogTitle = 'Internal Storage';

    const url = useLocation().url;
    const nav = useNavigate();

    const filters = useStore({
        minPrice: url.searchParams.get('min-price') === '0' ? undefined : url.searchParams.get('min-price'),
        maxPrice: url.searchParams.get('max-price') === '0' ? undefined : url.searchParams.get('max-price')
    })

    const updateFilters = $(() => {
        filters.minPrice = url.searchParams.get('min-price') === '0' ? undefined : url.searchParams.get('min-price');
        filters.maxPrice = url.searchParams.get('max-price') === '0' ? undefined : url.searchParams.get('max-price');
    })

    const update = useSignal(false);

    const localComponents = useSignal([] as ComponentStorageType[]);

    const price = useComputed$(() =>
        localComponents.value.reduce((prev, curr) => prev + curr.price * curr.quantity, 0)
    )

    const total = useComputed$(() =>
        localComponents.value.reduce((prev, curr) => prev + curr.quantity, 0)
    )

    const refresh = $(
        function refresh() {
            localComponents.value = ComponentStorage.getComponents();
        })

    const init = useSignal(false);
    useVisibleTask$(() => {
        refresh();
        init.value = true;
        setInterval(refresh, 2000);
    },
        { strategy: "document-idle" })

    const components = useResource$(async ({ track }) => {
        track(init);
        track(update);
        if (init.value === false) {
            return [] as any;
        }
        return await getStorage(
            {
                motherboardId: localComponents.value.filter(c => c.category === ComponentCategory.Motherboard).map(c => parseInt(c.id))[0],
                storages: localComponents.value.filter(c => c.category === ComponentCategory.Storage).map(c => ({ id: parseInt(c.id), amount: c.quantity })),
            },
            {
                min_price: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
                max_price: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined
            }
        )
    })

    const sidebarComponent = (
        <CatalogueSidebar price={price.value} totalComponents={total.value}>
            <SidebarSection
                title='Price Range'
            >
                <div class='flex flex-col'>
                    <span class="text-sm font-semibold text-gray-700"> Min Price</span>
                    <div class='flex flex-row overflow-clip items-center bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'>
                        <label for="min-price" class='mx-1'>
                            Rp
                        </label>
                        <input id="min-price" class="w-full h-10" type="number" value={filters.minPrice} onInput$={$((e: InputEvent) => {
                            const target = e.target as HTMLInputElement;
                            url.searchParams.set('min-price', target.value);
                        }) as any} placeholder="Min Price" />
                    </div>

                    <span class="text-sm font-semibold text-gray-700"> Max Price</span>
                    <div class='flex flex-row overflow-clip items-center bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'>
                        <label for="max-price" class='mx-1'>
                            Rp
                        </label>
                        <input id="min-price" class="w-full h-10" type="number" value={filters.maxPrice} onInput$={$((e: InputEvent) => {
                            const target = e.target as HTMLInputElement;
                            url.searchParams.set('max-price', target.value);
                        }) as any} placeholder="Max Price" />
                    </div>
                </div>
            </SidebarSection>
            <FilledButton
                onClick$={() => {
                    updateFilters();
                    update.value = !update.value;
                    window.history.pushState({}, '', url);
                    nav();
                }}
            >
                Terapkan Filter
            </FilledButton>
        </CatalogueSidebar>
    )

    return (
        <CataloguePage
            components={components}
            katalogTitle={katalogTitle}
            url={url}
            kategori={kategori}
        >
            {sidebarComponent}
        </CataloguePage>
    )
})