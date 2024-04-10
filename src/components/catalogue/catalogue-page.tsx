import type { ResourceReturn } from "@builder.io/qwik";
import { component$, Resource, Slot } from "@builder.io/qwik"
import { CatalogueHeader } from "./header";
import { TbLoader2 } from "@qwikest/icons/tablericons";
import MobileTable from "./mobile-table/mobile-table";
import DesktopTable from "./desktop-table/desktop-table";
import { categoryHeaders } from "~/lib/katalog_types";


type CataloguePageProps = {
    components: ResourceReturn<any>
    katalogTitle: string
    url: URL
    kategori: string
}

export const CataloguePage = component$<CataloguePageProps>(({ components, katalogTitle, url, kategori }) => {
    return <Resource
        value={components}
        onPending={() => (
            <div class='flex flex-row py-4'>
                <Slot />
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
                <Slot />
                <div class='flex-1'>
                    <CatalogueHeader katalog={katalogTitle} itemCount={data.count || 0} />
                    <MobileTable key={`${url.search}`} data={data.filteredData} headers={categoryHeaders[kategori]} kategori={kategori} />
                    <DesktopTable key={`${url.search}`} data={data.filteredData} headers={categoryHeaders[kategori]} kategori={kategori} />
                </div>
            </div>
        )} />;
})

export default CataloguePage