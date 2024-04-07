import { $, component$, Resource, useComputed$, useResource$, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { TbLoader2 } from "@qwikest/icons/tablericons";
import DesktopTable from "~/components/catalogue/desktop-table/desktop-table";
import { CatalogueHeader } from "~/components/catalogue/header";
import MobileTable from "~/components/catalogue/mobile-table/mobile-table";
import { CatalogueSidebar, SidebarSection } from "~/components/catalogue/sidebar";
import FilledButton from "~/components/common/filled-button";
import { getGpu } from "~/lib/component_api/gpu";
import { categoryHeaders, ComponentCategory } from "~/lib/katalog_types";
import type { ComponentStorageType } from "~/lib/storage_helper";
import { ComponentStorage } from "~/lib/storage_helper";

export default component$(() => {

    const kategori = 'gpu';
    const katalogTitle = 'GPU';

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
        setTimeout(() => {
            init.value = true;
        }, 100);
        setInterval(refresh, 2000);
    })

    const components = useResource$(async ({ track }) => {
        track(init);
        track(update);
        if (init.value === false) {
            return [] as any;
        }
        return await getGpu(
            {
                casingId: localComponents.value.filter(c => c.category === ComponentCategory.Casing).map(c => parseInt(c.id))[0],
                motherboardId: localComponents.value.filter(c => c.category === ComponentCategory.Motherboard).map(c => parseInt(c.id))[0],
                psuId: localComponents.value.filter(c => c.category === ComponentCategory.PSU).map(c => parseInt(c.id))[0],
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
        <Resource
            value={components}
            onPending={() => (
                <div class='flex flex-row py-4'>
                    {sidebarComponent}
                    <div class='w-full'>
                        <CatalogueHeader katalog={katalogTitle} itemCount={0} />
                        <div class="flex w-full justify-center items-center">
                            <div class="inline-block rounded-full m-auto" role="status">
                                <TbLoader2 class="h-8 w-8 animate-spin " />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            onResolved={(data) => (
                <div class='flex flex-row py-4'>
                    {sidebarComponent}
                    <div class='flex-1'>
                        <CatalogueHeader katalog={katalogTitle} itemCount={data.count || 0} />
                        <MobileTable key={`${url.search}`} data={data.filteredData} headers={categoryHeaders[kategori]} kategori={kategori} />
                        <DesktopTable key={`${url.search}`} data={data.filteredData} headers={categoryHeaders[kategori]} kategori={kategori} />
                    </div>
                </div>
            )}
        />
    )
})