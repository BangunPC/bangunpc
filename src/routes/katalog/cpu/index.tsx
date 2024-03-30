import { $, component$, Resource, useComputed$, useResource$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { TbLoader2 } from "@qwikest/icons/tablericons";
import DesktopTable from "~/components/catalogue/desktop-table/desktop-table";
import { CatalogueHeader } from "~/components/catalogue/header";
import MobileTable from "~/components/catalogue/mobile-table/mobile-table";
import { CatalogueSidebar, SidebarSection } from "~/components/catalogue/sidebar";
import FilledButton from "~/components/common/filled-button";
import { getCpu } from "~/lib/component_api/cpu";
import { categoryHeaders } from "~/lib/katalog_types";
import type { ComponentStorageType } from "~/lib/storage_helper";
import { ComponentStorage } from "~/lib/storage_helper";

export default component$(() => {

    const kategori = 'cpu';

    const url = useLocation().url;
    const nav = useNavigate();

    const minPrice = url.searchParams.get('min-price') === '0' ? undefined : url.searchParams.get('min-price');

    const maxPrice = url.searchParams.get('max-price') === '0' ? undefined : url.searchParams.get('max-price');

    const components = getCpu(
        {},
        {
            min_price: minPrice ? parseFloat(minPrice) : undefined,
            max_price: maxPrice ? parseFloat(maxPrice) : undefined
        }
    )

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

    useVisibleTask$(() => {
        refresh();
        setInterval(refresh, 2000);
    })

    return (
        <Resource
            value={components}
            onPending={() => (
                <div class='flex flex-row py-4'>
                    <CatalogueSidebar price={price.value} totalComponents={total.value} />
                    <div class='w-full'>
                        <CatalogueHeader katalog="CPU" itemCount={0} />
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
                                    <input id="min-price" class="w-full h-10" type="number" value={minPrice} onInput$={$(e => {
                                        url.searchParams.set('min-price', e.target.value);
                                    })} placeholder="Min Price" />
                                </div>

                                <span class="text-sm font-semibold text-gray-700"> Max Price</span>
                                <div class='flex flex-row overflow-clip items-center bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'>
                                    <label for="max-price" class='mx-1'>
                                        Rp
                                    </label>
                                    <input id="max-price" class="w-full h-10" type="number" value={maxPrice} onInput$={$(e => {
                                        url.searchParams.set('max-price', e.target.value);
                                    })} placeholder="Max Price" />
                                </div>
                            </div>
                        </SidebarSection>
                        <FilledButton
                            onClick$={() => {
                                window.history.pushState({}, '', url);
                                nav();
                            }}
                        >
                            Apply Filter
                        </FilledButton>
                    </CatalogueSidebar>
                    <div class='flex-1'>
                        <CatalogueHeader katalog="CPU" itemCount={data.count || 0} />
                        <MobileTable key={`${url.search}`} data={data.filteredData} headers={categoryHeaders[kategori]} kategori={kategori} />
                        <DesktopTable key={`${url.search}`} data={data.filteredData} headers={categoryHeaders[kategori]} kategori={kategori} />
                    </div>
                </div>
            )}
        />
    )
})