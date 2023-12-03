import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import styles from './kategori.module.css';

import { component$ } from '@builder.io/qwik';
import { supabase } from '~/lib/db';
import Sidebar from '~/components/katalog/sidebar/sidebar';
import Cpu, { cpuHeaders } from '~/components/katalog/kategori/cpu';
import Gpu, { gpuHeaders } from '~/components/katalog/kategori/gpu';
import { productImageUrl } from '~/components/katalog/kategori/types';
import Motherboard, { motherboardHeaders } from '~/components/katalog/kategori/motherboard';
import Casing, { casingHeaders } from '~/components/katalog/kategori/casing';
import PowerSupply, { psuHeaders } from '~/components/katalog/kategori/power-supply';
import Memory, { memoryHeaders } from '~/components/katalog/kategori/memory';
import Storage, { storageHeaders } from '~/components/katalog/kategori/storage';


const titlesKategori: { [key: string]: string } = {
  headphone: 'Headphone',
  keyboard: 'Keyboard',
  mouse: 'Mouse',
  speaker: 'Speaker',
  webcam: 'Webcam',
  printer: 'Printer',
  monitor: 'Monitor',
  os: 'Operating System',
  soundcard: 'Sound Card',
  wirednetwork: 'Wired Network Device',
  wirelessnetwork: 'Wireless Network Device',
  casefan: 'Case Fan',
  externaldrive: 'External Drive',
  motherboard: 'Motherboard',
  cpu: 'Computer Processor',
  gpu: 'GPU',
  memory: 'Memory',
  cooler: 'CPU Cooler',
  psu: 'Power Supply',
  cable: 'Cable',
  storage: 'Internal Storage',
  casing: 'PC Casing',
}

// export const useRecords = routeLoader$(async () => {
export const useRecords = routeLoader$(async (requestEvent) => {

  const kategori = requestEvent.params.kategori;

  const categories: { [key: string]: string } = {
    'headphone': '',
    'keyboard': '',
    'mouse': '',
    'speaker': '',
    'webcam': '',
    'printer': '',
    'monitor': '',
    'os': '',
    'soundcard': '',
    'wirednetwork': '',
    'wirelessnetwork': '',
    'casefan': '',
    'externaldrive': '',
    'motherboard': 'v_motherboards',
    'cpu': 'v_cpus',
    'gpu': 'v_gpus',
    'memory': 'v_memories',
    'cooler': '',
    'psu': 'v_power_supplies',
    'cable': '',
    'storage': 'v_internal_storages',
    'casing': 'v_casings',
  }

  const category = categories[kategori];
  return await supabase.schema('product').from(category).select();
});

export default component$(() => {

  const kategori = useLocation().params.kategori;

  const categoryData = useRecords() as any;

  const defaultHeadersStart = ['', 'Nama', ''] // The first '' is for the checkbox, the second for the image
  const defaultHeadersEnd = ['Harga Terendah (Rp)', 'Aksi']


  const kategoriHeaders: { [key: string]: string[] } = {
    // 'headphone': headphoneHeaders,
    // 'keyboard': keyboardHeaders,
    // 'mouse': mouseHeaders,
    // 'speaker': speakerHeaders,
    // 'webcam': webcamHeaders,
    // 'printer': printerHeaders,
    // 'monitor': monitorHeaders,
    // 'os': osHeaders,
    // 'soundcard': soundcardHeaders,
    // 'wirednetwork': wirednetworkHeaders,
    // 'wirelessnetwork': wirelessnetworkHeaders,
    // 'casefan': casefanHeaders,
    // 'externaldrive': externaldriveHeaders,
    // 'cable': cableHeaders,
    'motherboard': motherboardHeaders,
    'cpu': cpuHeaders,
    'gpu': gpuHeaders,
    'memory': memoryHeaders,
    // 'cooler': coolerHeaders,
    'psu': psuHeaders,
    'storage': storageHeaders,
    'casing': casingHeaders,
  };

  const headers = [
    ...defaultHeadersStart,
    ...kategoriHeaders[kategori],
    ...defaultHeadersEnd,
  ];

  const title = titlesKategori[kategori];

  const productAmount = 200;
  return (
    <>
      <div class={styles.main}>
        <aside class={styles.sidebar}>
          <Sidebar />
        </aside>
        <div class={styles.tableSection}>
          <header class={styles.tableHeader}>Pilih {title}</header>
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
                  {categoryData.value.data?.map((component: any) => (
                    <>
                      <tr key={component.product_id} class={styles.tableRow}>
                        <td>
                          <input
                            type="checkbox"
                            id={component.product_id!.toString()}
                            class={[styles.toggle]}
                          />
                        </td>
                        <td>
                          {component.image_paths?.[0] &&
                            <>
                              <img src={productImageUrl + component.image_paths?.[0]} width={64} height={64} />
                            </>
                          }
                        </td>
                        <td>{component.product_name ?? '-'}</td>

                        <ComponentFallback
                          kategori={kategori}
                          component={component}
                        />

                        <td>{component.lowest_price?.toLocaleString('id-ID') ?? '-'}</td>
                        <td>Action</td>
                      </tr>
                      <tr key={component.product_id + 'gap'} class="h-2"></tr>
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

type ComponentFallbackType = {
  kategori: string;
  component: any;
}

const ComponentFallback = component$<ComponentFallbackType>(({ kategori, component }) => {
  switch (kategori) {
    // case "headphone":
    //   return (<Headphone headphone={component} />);
    // case "keyboard":
    //   return (<Keyboard keyboard={component} />);
    // case "mouse":
    //   return (<Mouse mouse={component} />);
    // case "speaker":
    //   return (<Speaker speaker={component} />);
    // case "webcam":
    //   return (<Webcam webcam={component} />);
    // case "printer":
    //   return (<Printer printer={component} />);
    // case "monitor":
    //   return (<Monitor monitor={component} />);
    // case "os":
    //   return (<Os os={component} />);
    // case "soundcard":
    //   return (<Soundcard soundcard={component} />);
    // case "wirednetwork":
    //   return (<WiredNetwork wirednetwork={component} />);
    // case "wirelessnetwork":
    //   return (<WirelessNetwork wirelessnetwork={component} />);
    // case "casefan":
    //   return (<CaseFan casefan={component} />);
    // case "externaldrive":
    //   return (<ExternalDrive externaldrive={component} />);
    case "motherboard":
      return (<Motherboard motherboard={component} />);
    case "gpu":
      return (<Gpu gpu={component} />);
    case "memory":
      return (<Memory memory={component} />);
    // case "cooler":
    //   return (<Cooler cooler={component} />);
    case "psu":
      return (<PowerSupply psu={component} />);
    // case "cable":
    //   return (<Cable cable={component} />);
    case "storage":
      return (<Storage storage={component} />);
    case "casing":
      return (<Casing casing={component} />);
    default:
      return (<Cpu cpu={component} />);
  }
});

export const head: DocumentHead = ({ params }) => {
  return {
    title: titlesKategori[params.kategori] + ' - BangunPC',
    meta: [
      {
        name: 'description',
        content: 'Cari ' + titlesKategori[params.kategori] + ' dari Tokopedia, Shopee, dan lainnya. Hanya di BangunPC',
      },
    ],
  };
};
