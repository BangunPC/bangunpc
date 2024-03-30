import { component$ } from "@builder.io/qwik";

export const CatalogueHeader = component$(({ katalog, itemCount }: { katalog: string, itemCount: number }) => {

    return (
        <div class='flex flex-col'>
            <span class='font-semibold text-5xl'>Pilih {katalog}</span>
            <span class='font-semibold text-lg'>Tersedia {itemCount} produk siap kamu pilih</span>
        </div>
    )
})