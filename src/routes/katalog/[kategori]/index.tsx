import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import styles from './kategori.module.css';

import { component$ } from '@builder.io/qwik';
import { supabase } from '~/lib/db';
import Sidebar from '~/components/katalog/sidebar/sidebar';
import SearchBox from '~/components/common/search-box';
import { casingHeaders, casingKeys, cpuHeaders, cpuKeys, gpuHeaders, gpuKeys, memoryHeaders, memoryKeys, motherboardHeaders, motherboardKeys, productImageUrl, psuHeaders, psuKeys, storageHeaders, storageKeys } from '~/lib/katalog_types';
import FilledButton from '~/components/common/filled-button';


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
    'cable': '',
    'externaldrive': '',
    'motherboard': 'v_motherboards',
    'cpu': 'v_cpus',
    'gpu': 'v_gpus',
    'memory': 'v_memories',
    'cooler': '',
    'psu': 'v_power_supplies',
    'storage': 'v_internal_storages',
    'casing': 'v_casings',
    'casefan': '',
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
    // 'casefan': casefanHeaders,
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
        <aside class={[styles.sidebar, "hidden md:block"]}>
          <Sidebar />
        </aside>
        <div class={styles.tableSection}>
          <header class={styles.tableHeader}>Pilih {title}</header>
          <main>
            <header class={styles.tableSubHeader}>
              <div class={styles.tableSubHeaderTitle}>
                Tersedia {productAmount} produk yang siap kamu pilih
              </div>
              <div class="w-64 ml-auto mt-4 md:mr-4">
                <SearchBox
                  placeholder='Temukan komponen di sini'
                />
              </div>
            </header>
            <main>
              {/* TODO(damywise): use cards instead of table on mobile/small screen */}

              <div class="md:hidden flex flex-col gap-1">
                {
                  categoryData.value.data?.map((component: any) => (
                    <div key={component.product_id} class="rounded-xl shadow-lg bg-white p-2">
                      <div class="flex flex-row items-center gap-1">
                        <input type='checkbox' />
                        <div class="justify-evenly flex flex-1 flex-row items-center gap-2">
                          <img src={productImageUrl + component.image_paths?.[0]} width={80} height={80} />
                          <div class="flex flex-col">
                            <span class="text-lg font-bold leading-none">
                              {component.product_name}
                            </span>
                            <span class="font-bold mt-2">
                              Rp {(component.lowest_price as number | null)?.toLocaleString('id-ID') ?? '-'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <FilledButton >
                            Tambah
                          </FilledButton>
                        </div>
                      </div>
                      <div class="grid sm:grid-cols-4 grid-cols-3 gap-1">
                        <ComponentFallback
                          headers={headers}
                          kategori={kategori}
                          component={component}
                          isMobile={true}
                        />
                      </div>
                    </div>
                  ))
                }
              </div>

              <table class={"hidden md:table"}>
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
                          headers={headers}
                          kategori={kategori}
                          component={component}
                          isMobile={false}
                        />

                        <td>{component.lowest_price?.toLocaleString('id-ID') ?? '-'}</td>
                        <td>
                          <FilledButton>Tambah</FilledButton>
                        </td>
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

type ComponentFallbackProps = {
  headers: string[];
  kategori: string;
  component: any;
  isMobile: boolean;
}

const ComponentFallback = component$<ComponentFallbackProps>(({ headers, kategori, component, isMobile }) => {
  let keys: any[] = [];
  switch (kategori) {
    // case "headphone":
    // case "keyboard":
    // case "mouse":
    // case "speaker":
    // case "webcam":
    // case "printer":
    // case "monitor":
    // case "os":
    // case "soundcard":
    // case "wirednetwork":
    // case "wirelessnetwork":
    // case "casefan":
    // case "externaldrive":
    case "motherboard":
      keys = motherboardKeys;
      break;
    case "cpu":
      keys = cpuKeys
      break;
    case "gpu":
      keys = gpuKeys
      break;
    case "memory":
      keys = memoryKeys
      break;
    // case "cooler":
    case "psu":
      keys = psuKeys
      break;
    // case "cable":
    case "storage":
      keys = storageKeys
      break;
    case "casing":
      keys = casingKeys;
      break;
    default:
      break;
  }

  if (isMobile) return (
    <>
      {keys.map((key, index) => (
        <div key={key} class="flex flex-col">
          <div class="text-sm mt-1 mb-2">
            {headers[index + 3]}
          </div>
          <div class="font-semibold">
            {component[key] ?? '-'}
          </div>
        </div>
      ))}
    </>
  )

  return (
    <>
      {keys.map((key) => (
        <td key={key}>
          {component[key] ?? '-'}
        </td>
      ))}
    </>
  );
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
