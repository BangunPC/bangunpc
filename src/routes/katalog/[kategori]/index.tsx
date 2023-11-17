import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import styles from './kategori.module.css';

import { component$ } from '@builder.io/qwik';
import { supabase } from '~/lib/db';
import Sidebar from '~/components/katalog/sidebar/sidebar';
import Cpu from '~/components/katalog/kategori/cpu';

export const useRecords = routeLoader$(async () => {
  // export const useRecords = routeLoader$(async (requestEvent) => {

  // const kategori = requestEvent.params.kategori;

  // const categories = {
  //     'headphone': '',
  //     'keyboard': '',
  //     'mouse': '',
  //     'speaker': '',
  //     'webcam': '',
  //     'printer': '',
  //     'monitor': '',
  //     'os': '',
  //     'soundcard': '',
  //     'wirednetwork': '',
  //     'wirelessnetwork': '',
  //     'casefan': '',
  //     'externaldrive': '',
  //     'motherboard': '',
  //     'cpu': '',
  //     'gpu': '',
  //     'memory': '',
  //     'cooler': '',
  //     'psu': '',
  //     'cable': '',
  //     'storage': '',
  //     'casing': '',
  // }

  // const category = categories[kategori];
  return await supabase.schema('product').from('v_cpus').select();
});

export default component$(() => {
  const cpus = useRecords();

  const defaultHeaders = ['', 'Aksi'];

  const kategoriHeaders: { [key: string]: string[] } = {
    headphone: [],
    keyboard: [],
    mouse: [],
    speaker: [],
    webcam: [],
    printer: [],
    monitor: [],
    os: [],
    soundcard: [],
    wirednetwork: [],
    wirelessnetwork: [],
    casefan: [],
    externaldrive: [],
    motherboard: [],
    cpu: [
      'Nama',
      'Core Count',
      'Performance Core Clock',
      'Performance Boost Clock',
      'TDP',
      'Integrated Graphics',
      'SMT',
      'Harga',
    ],
    gpu: [],
    memory: [],
    cooler: [],
    psu: [],
    cable: [],
    storage: [],
    casing: [],
  };

  const kategori = useLocation().params.kategori;

  const headers = [
    defaultHeaders[0],
    ...kategoriHeaders[kategori],
    defaultHeaders[1],
  ];

  const productAmount = 200;
  return (
    <>
      <div class={styles.main}>
        <aside class={styles.sidebar}>
          <Sidebar />
        </aside>
        <div class={styles.tableSection}>
          <header class={styles.tableHeader}>Pilih Processor</header>
          <main>
            <header class={styles.tableSubHeader}>
              <div class={styles.tableSubHeaderTitle}>
                Tersedia {productAmount} produk yang siap kamu pilih
              </div>
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
                  <tr class="h-4"></tr>
                  {cpus.value.data?.map((cpu) => (
                    <>
                      <tr key={cpu.product_id} class={styles.tableRow}>
                        <td>
                          <input
                            type="checkbox"
                            id={cpu.product_id!.toString()}
                            class={[styles.toggle]}
                          />
                        </td>
                        <Cpu cpu={cpu} />
                        <td>Action</td>
                      </tr>
                      <tr key={cpu.product_id + 'gap'} class="h-2"></tr>
                    </>
                  ))}
                </tbody>
              </table>
            </main>
          </main>
        </div>
      </div>
    </>
  );
});
