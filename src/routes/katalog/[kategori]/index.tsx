import type { DocumentHead } from '@builder.io/qwik-city';
import { server$, useLocation, useNavigate } from '@builder.io/qwik-city';
import styles from './kategori.module.css';

import { $, Resource, component$, useResource$, useSignal } from '@builder.io/qwik';
import { supabase } from '~/lib/db';
import type { Filter } from '~/components/katalog/sidebar/sidebar';
import Sidebar from '~/components/katalog/sidebar/sidebar';
import SearchBox from '~/components/common/search-box';
import {
  casingHeaders,
  categories,
  cpuHeaders,
  gpuHeaders,
  memoryHeaders,
  motherboardHeaders,
  psuHeaders,
  storageHeaders,
  titlesKategori,
} from '~/lib/katalog_types';
import FilledButton from '~/components/common/filled-button';
import { TbArrowLeft, TbLoader2 } from '@qwikest/icons/tablericons';
import { useDebounce } from '~/lib/use-debounce';
import MobileTable from '~/components/catalogue/mobile-table/mobile-table';
import DesktopTable from '~/components/catalogue/desktop-table/desktop-table';

const getData = server$(async (search: string, kategori: string) => {

  const category = categories[kategori];
  const client = await supabase();

  let total = 0;
  let data: any[] | undefined;

  total = await client
    .schema('product')
    .from(category)
    .select('*', { count: 'exact', head: true })
    .then((res) => res.count ?? 0);

  if (!search || search === '' || search === ' ') {
    data = (await client.schema('product').from(category).select()).data ?? undefined;
  }

  if (!data) {
    await client
      .schema('product')
      .from(category)
      .select()
      .textSearch('product_name', `'${search}'`, { type: 'websearch', config: 'english' })
      .order('product_name', { ascending: true })
      .then((res) => {
        data = res.data !== null ? res.data : undefined;
      });
  }

  return { data, total }
})

export default component$(() => {
  const location = useLocation();
  const isIframe = location.url.searchParams.get('iframe') === 'true';
  const nav = useNavigate();

  const inputSig = useSignal('');

  const handleDebounce = $(async (value: string) => {
    if (typeof window !== 'undefined') {
      const url = location.url;
      url.searchParams.set('q', value.replace(/ +/g, ' '));
      window.history.pushState({}, '', url);

      await nav();
    }
  });

  useDebounce(inputSig, 500, handleDebounce);

  const handleSearch = $((event: InputEvent, element: HTMLInputElement) => {
    inputSig.value = element.value;
  });

  const kategori = useLocation().params.kategori;

  const isLoading = useSignal(true);

  const fetchData = useResource$(async ({ track }) => {
    const url = track(() => location.url);
    const kateg = track(() => location.params.kategori);

    isLoading.value = true;
    const { data: categoryData, total: productAmount } = await getData(url.searchParams.get('q') ?? '', kateg);
    isLoading.value = false;
    return { categoryData, productAmount };
  })

  const defaultHeadersStart = ['', 'Nama', '']; // The first '' is for the checkbox, the second for the image
  const defaultHeadersEnd = ['Harga (Rp)', 'Aksi'];

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
    motherboard: motherboardHeaders,
    cpu: cpuHeaders,
    gpu: gpuHeaders,
    memory: memoryHeaders,
    // 'cooler': coolerHeaders,
    psu: psuHeaders,
    storage: storageHeaders,
    casing: casingHeaders,
    // 'casefan': casefanHeaders,
  };

  const headers = [
    ...defaultHeadersStart,
    ...kategoriHeaders[kategori],
    ...defaultHeadersEnd,
  ];

  const title = titlesKategori[kategori];

  const filters: Filter[] = [
    {
      title: 'Harga',
      items: ['Harga Terendah', 'Harga Tertinggi'],
    },
  ]

  return (
    <Resource
      value={fetchData}
      onPending={() => <div class={styles.main}>
        <aside class={[styles.sidebar, 'hidden md:block']}>
          <Sidebar filters={filters} />
        </aside>
        <div class={[styles.tableSection, 'px-2']}>
          <h1 class={styles.tableHeader}>Pilih {title}</h1>
          <main>
            <header class={styles.tableSubHeader}>
              <div class={styles.tableSubHeaderTitle}>
                Tersedia ... produk yang siap kamu pilih
              </div>
              <div class="w-64 ml-auto mt-4 md:mr-4">
                <SearchBox placeholder="Temukan komponen di sini" defaultValue={location.url.searchParams.get('q') || ''} onInput$={handleSearch} />
              </div>
            </header>
            <aside class="block sticky md:hidden top-[calc(70px+1rem)] mb-4 z-10">
              <div class="w-full flex">
                {/* <div class={[styles.showFilterButton, 'w-full flex']}>
                <FilledButton
                  class={'flex w-full text-center'}
                  labelFor="toggleKatalogFilter"
@ -196,155 +206,156 @@ export default component$(() => {
                  </span>
                </FilledButton>
              </div> */}
                <div class={[styles.hideFilterButton, 'w-full hidden']}>
                  <FilledButton
                    class={'flex w-full text-center'}
                    labelFor="toggleKatalogFilter"
                  >
                    <span class="">
                      <TbArrowLeft class="inline" /> Katalog{' '}
                    </span>
                  </FilledButton>
                </div>
              </div>
            </aside>

            <main class="">
              <div class="h-full">
                <div
                  class={[
                    styles.mobileSidebar,
                    'w-full sticky top-[calc(70px+4rem)] mx-auto md:hidden mt-2 gap-1 transition-all duration-200 ',
                  ]}
                >
                  <div class="w-fit mx-auto bg-white rounded-lg shadow-xl p-4">
                    <Sidebar filters={filters} />
                  </div>
                </div>
              </div>

              <table class='hidden md:table'>
                <thead class='top-0 sticky'>
                  <tr>
                    {headers.map((item) => (
                      <th key={item}>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody class={styles.tableBody}>
                  <tr class="h-4"></tr>
                </tbody>
              </table>

              <div class="flex justify-center items-center">
                <div class="inline-block rounded-full m-auto" role="status">
                  <TbLoader2 class="h-8 w-8 animate-spin " />
                </div>
              </div>
            </main>
          </main>
        </div>
      </div>}
      onResolved={({ categoryData, productAmount }) => (
        <>
          <input
            type="checkbox"
            id="toggleKatalogFilter"
            class={styles.toggleKatalogFilter}
            hidden
          />
          <div class={styles.main}>
            <aside class={[styles.sidebar, 'hidden md:block']}>
              <Sidebar filters={filters} />
            </aside>
            <div class={[styles.tableSection, 'px-2']}>
              <h1 class={styles.tableHeader}>Pilih {title}</h1>
              <main>
                <header class={styles.tableSubHeader}>
                  <div class={styles.tableSubHeaderTitle}>
                    Tersedia {productAmount} produk yang siap kamu pilih
                  </div>
                  <div class="w-64 ml-auto mt-4 md:mr-4">
                    <SearchBox placeholder="Temukan komponen di sini" defaultValue={location.url.searchParams.get('q') || ''} onInput$={handleSearch} />
                  </div>
                </header>
                <aside class="block sticky md:hidden top-[calc(70px+1rem)] mb-4 z-10">
                  <div class="w-full flex">
                    {/* <div class={[styles.showFilterButton, 'w-full flex']}>
                      <FilledButton
                        class={'flex w-full text-center'}
                        labelFor="toggleKatalogFilter"
    @ -196,155 +206,156 @@ export default component$(() => {
                        </span>
                      </FilledButton>
                    </div> */}
                    <div class={[styles.hideFilterButton, 'w-full hidden']}>
                      <FilledButton
                        class={'flex w-full text-center'}
                        labelFor="toggleKatalogFilter"
                      >
                        <span class="">
                          <TbArrowLeft class="inline" /> Katalog{' '}
                        </span>
                      </FilledButton>
                    </div>
                  </div>
                </aside>

                <main class="grid grid-cols-2 grid-rows-1 md:block">
                  <div class="h-full">
                    <div
                      class={[
                        styles.mobileSidebar,
                        'w-full sticky top-[calc(70px+4rem)] mx-auto md:hidden mt-2 gap-1 transition-all duration-200 ',
                      ]}
                    >
                      <div class="w-fit mx-auto bg-white rounded-lg shadow-xl p-4">
                        <Sidebar filters={filters} />
                      </div>
                    </div>
                  </div>

                  <MobileTable data={categoryData} headers={headers} kategori={kategori} isIframe={isIframe} />
                  <div class='m-auto'>
                    <DesktopTable data={categoryData} headers={headers} kategori={kategori} isIframe={isIframe} />
                  </div>
                </main>
                {categoryData == null || categoryData.length == 0 && (
                  <div class="flex text-center text-lg font-bold w-full justify-center m-auto">
                    {location.url.searchParams.get('q') ?
                      `${title} "${location.url.searchParams.get('q')}" tidak ditemukan`
                      : `Tidak ada ${title.toLowerCase()} yang ditemukan`
                    }
                  </div>
                )}
              </main>
            </div>
          </div>
        </>
      )}
    />

  );
});

export const head: DocumentHead = ({ params }) => {
  return {
    title: titlesKategori[params.kategori] + ' | BangunPC',
    meta: [
      {
        name: 'description',
        content:
          'Cari ' +
          titlesKategori[params.kategori] +
          ' dari Tokopedia, Shopee, dan lainnya. Hanya di Bangun PC',
      },
    ],
  };
};
