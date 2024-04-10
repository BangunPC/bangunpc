import { $, component$ } from "@builder.io/qwik";
import FilledButton from "~/components/common/filled-button";
import type { ComponentStorageType } from "~/lib/storage_helper";
import { ComponentStorage } from "~/lib/storage_helper";
import { ComponentFallback } from "../component-fallback";
import styles from './desktop-table.module.css';
import { componentImage } from "~/lib/db";
import { categoriesEnum } from "~/lib/katalog_types";
import { useLocation } from "@builder.io/qwik-city";

export type TableType = {
    headers: string[]
    data: any[] | undefined
    kategori: string
}

const DesktopTable = component$<TableType>(({ headers, data, kategori }) => {

    const header = ['', 'Product Name', ...headers, 'Price (Rp)', 'Action']

    const isIframe = useLocation().url.searchParams.get('iframe') === 'true';
    return (
        <table class='hidden md:table'>
            <thead class={['sticky text-xs backdrop-blur z-10', isIframe ? 'top-0' : 'top-navbar-min-h']}>
                <tr>
                    {header.map((item) => (
                        <th key={item}>
                            <div class='flex items-end h-full'>
                                <span class='text-start'>
                                    {item}
                                </span>
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody class={styles.tableBody}>
                <tr class="h-4"></tr>
                {data?.map((component: any) => {
                    const handleAddComponent = $(() => {
                        const componentAdded: ComponentStorageType = {
                            id: component.product_id,
                            name: component.product_name,
                            price: component.lowest_price,
                            image: componentImage(component),
                            category: categoriesEnum[kategori],
                            quantity: 1,
                            slug: component.slug
                        }
                        ComponentStorage.addComponent(componentAdded)
                        alert('Komponen ' + component.product_name + ' berhasil ditambahkan. ')
                    })

                    const handleRedirect = $(() => (window.location.href = `/detail/${kategori}/${component.slug}${isIframe ? '?iframe=true' : ''}`))

                    return (
                        <>
                            <tr
                                data-href={`/detail/${kategori}/${component.slug}`}
                                key={component.product_id}
                                class={[
                                    styles.tableRow,
                                    'transition-transform hover:scale-[1.01] hover:z-10 cursor-pointer',
                                ]}
                            >
                                <td class='w-16'
                                    onClick$={handleRedirect}
                                >
                                    {component.image_filenames.length > 0 && (<img
                                        src={componentImage(component)}
                                        alt={`Gambar ${component.product_name}`}
                                        width={64}
                                        height={64}
                                        class='aspect-square min-w-[64px]'
                                    />)}
                                </td>
                                <td
                                    onClick$={handleRedirect}
                                >{component.product_name ?? '-'}</td>

                                <ComponentFallback
                                    headers={headers}
                                    kategori={kategori}
                                    component={component}
                                    isMobile={false}
                                    onClick$={handleRedirect}

                                />

                                <td
                                    onClick$={handleRedirect}
                                >
                                    {component.lowest_price?.toLocaleString('id-ID') ??
                                        '-'}
                                </td>
                                <td class='cursor-default'>
                                    <FilledButton onClick$={handleAddComponent}>Tambah</FilledButton>
                                </td>
                            </tr>
                            <tr key={component.product_id + 'gap'} class="h-2"></tr>
                        </>
                    );
                })}
            </tbody>
        </table>
    )
})

export default DesktopTable