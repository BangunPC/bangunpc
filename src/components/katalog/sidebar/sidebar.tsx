import styles from './sidebar.module.css';

import { component$ } from "@builder.io/qwik";
import SidebarFilter from "../sidebar-filter/sidebar-filter";
import { TbFilterSearch } from "@qwikest/icons/tablericons";


export default component$(() => {
    const filters = [
        { title: 'Type', items: ['AMD', 'Intel'] },
        { title: 'Nama Toko', items: ['Tokopedia', 'Shopee', 'Blibli', 'Amazon'] },
        { title: 'Lokasi', items: ['Jabodetabek', 'DKI Jakarta', 'Bandung', 'Surabaya'] },
        { title: 'Kondisi', items: ['Baru', 'Bekas'] },
    ]

    return (
        <div class={styles.sidebar}>
            <header class='font-bold header'>
                Filter <TbFilterSearch class='inline' />
            </header>
            <main class={styles.filterList}>
                {
                    filters.map((filter) => (
                        <SidebarFilter key={filter.title} title={filter.title} items={filter.items} />
                    ))
                }
            </main>


        </div>
    )
})