import type { ResourceReturn } from "@builder.io/qwik";
import { component$, Resource, Slot, useSignal } from "@builder.io/qwik"
import { CatalogueHeader } from "./header";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand, TbLoader2 } from "@qwikest/icons/tablericons";
import MobileTable from "./mobile-table/mobile-table";
import DesktopTable from "./desktop-table/desktop-table";
import { categoryHeaders } from "~/lib/katalog_types";
import OutlinedButton from "../common/outlined-button";


type CataloguePageProps = {
    components: ResourceReturn<any>
    katalogTitle: string
    url: URL
    kategori: string
}

export const CataloguePage = component$<CataloguePageProps>(({ components, katalogTitle, url, kategori }) => {

    const hideSidebar = useSignal(true)

    const desktopSidebarButton = (
        <OutlinedButton
            class='hidden tablet:block desktop:hidden tablet:w-10 tablet:h-10 tablet:mr-2'
            onClick$={() => { hideSidebar.value = !hideSidebar.value }}
        >
            {hideSidebar.value ?
                <TbLayoutSidebarLeftExpand class='mx-auto' />
                :
                <TbLayoutSidebarLeftCollapse class='mx-auto' />
            }
        </OutlinedButton>
    );

    const mobileSidebarButton = (
        <div class='px-4'>
            <OutlinedButton
                class='block tablet:hidden w-full'
                onClick$={() => { hideSidebar.value = !hideSidebar.value }}
            >
                {hideSidebar.value ?
                    'Filter'
                    :
                    'Kembali'
                }
            </OutlinedButton>
        </div>
    );
    return <Resource
        value={components}
        onRejected={() => <div>Error</div>}
        onPending={() => (
            <div class='py-4'>
                {mobileSidebarButton}
                <div class='flex flex-row pt-4 tablet:pt-0'>
                    <div class={`${hideSidebar.value ? 'hidden' : ''} desktop:block desktop:m-0`}>
                        <Slot />
                    </div>
                    <div class={`flex-1 w-full px-3 desktop:p-0 ${hideSidebar.value ? '' : 'hidden'} tablet:block`}>
                        <div class='flex flex-col tablet:flex-row'>
                            {desktopSidebarButton}
                            <CatalogueHeader katalog={katalogTitle} itemCount={0} />
                        </div>
                        <div class="flex w-full justify-center items-center">
                            <div class="inline-block rounded-full m-auto" role="status">
                                <TbLoader2 class="h-8 w-8 animate-spin " />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        onResolved={(data) => (
            <div class='py-4'>
                {mobileSidebarButton}
                <div class='flex flex-row pt-4 tablet:pt-0'>
                    <div class={`${hideSidebar.value ? 'hidden' : ''} desktop:block desktop:m-0`}>
                        <Slot />
                    </div>
                    <div class={`flex-1 w-full px-3 desktop:p-0 ${hideSidebar.value ? '' : 'hidden'} tablet:block`}>
                        <div class='flex flex-col tablet:flex-row'>
                            {desktopSidebarButton}
                            <CatalogueHeader katalog={katalogTitle} itemCount={data.count || 0} />
                        </div>
                        <div>
                            <MobileTable key={`${url.search}`} data={data.filteredData} headers={categoryHeaders[kategori]} kategori={kategori} />
                            <DesktopTable key={`${url.search}`} data={data.filteredData} headers={categoryHeaders[kategori]} kategori={kategori} />
                        </div>
                    </div>
                </div>
            </div>
        )} />;
})

export default CataloguePage