import { routeLoader$ } from "@builder.io/qwik-city";
import styles from "./cpu.module.css";

import { component$ } from "@builder.io/qwik";
import { supabase } from "~/lib/db";
import Sidebar from "~/components/katalog/sidebar/sidebar";

export const useRecords = routeLoader$(async () => {
    return await supabase.schema("product").from("v_detail_cpu").select();
});

export default component$(() => {
    const cpus = useRecords();

    const defaultHeaders = ['', 'Aksi'];

    let headers = ['Nama', 'Core Count', 'Performance Core Clock', 'Performance Boost Clock', 'TDP', 'Integrated Graphics', 'SMT', 'Harga'];

    headers = [defaultHeaders[0], ...headers, defaultHeaders[1]];

    const productAmount = 200;
    return (
        <>
            <div class={styles.main}>
                <aside class={styles.sidebar}>
                    <Sidebar />
                </aside>
                <div class={styles.tableSection}>
                    <header class={styles.tableHeader}>
                        Pilih Processor
                    </header>
                    <main>
                        <header class={styles.tableSubHeader}>
                            <div class={styles.tableSubHeaderTitle}>Tersedia {productAmount} produk yang siap kamu pilih</div>
                            <div>[Search component]</div>
                        </header>
                        <main>
                            <table>
                                <thead class={styles.tableHead}>
                                    <tr>
                                        {headers.map((item) => (
                                            <th key={item}>{item}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody class={styles.tableBody}>
                                    <tr class='h-4'></tr>
                                    {cpus.value.data?.map((cpu) => (
                                        <>
                                            <tr key={cpu.product_id} class={styles.tableRow}>
                                                <td>
                                                    <input type="checkbox" id={cpu.product_id!.toString()} class={[styles.toggle]} />
                                                </td>
                                                <td>{cpu.product_name ?? '-'}</td>
                                                <td>{cpu.core_count ?? '-'}</td>
                                                <td>{cpu.core_clock_ghz ?? '-'}</td>
                                                <td>{cpu.boost_clock_ghz ?? '-'}</td>
                                                <td>{cpu.tdp ?? '-'}</td>
                                                <td>{cpu.integrated_gpu ?? '-'}</td>
                                                <td>???</td>
                                                <td>{cpu.price?.toLocaleString('id-ID') ?? '-'}</td>
                                                <td>Action</td>
                                            </tr>
                                            <tr key={cpu.product_id + 'gap'} class='h-2'></tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </main>
                    </main>
                </div>
            </div>
        </>

    )
})