import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$, useLocation, useNavigate } from '@builder.io/qwik-city';
import styles from './kategori.module.css';

import { $, component$, useSignal } from '@builder.io/qwik';
import { supabase } from '~/lib/db';
import type { Filter } from '~/components/katalog/sidebar/sidebar';
import Sidebar from '~/components/katalog/sidebar/sidebar';
import SearchBox from '~/components/common/search-box';
import {
  casingHeaders,
  casingKeys,
  categories,
  cpuHeaders,
  cpuKeys,
  gpuHeaders,
  gpuKeys,
  memoryHeaders,
  memoryKeys,
  motherboardHeaders,
  motherboardKeys,
  productImageUrl,
  psuHeaders,
  psuKeys,
  storageHeaders,
  storageKeys,
  titlesKategori,
} from '~/lib/katalog_types';
import FilledButton from '~/components/common/filled-button';
import { TbArrowLeft, TbArrowRight } from '@qwikest/icons/tablericons';
import { useDebounce } from '~/lib/use-debounce';

// export const useRecords = routeLoader$(async () => {
export const useRecords = routeLoader$(async (requestEvent) => {
  const supabaseUrl = 'https://onawoodgnwkncueeyusr.supabase.co';
  const storageUrl = '/storage/v1/object/public/product-images/';

  console.log('called useRecord')
  const search = requestEvent.url.searchParams.get("value");
  const kategori = requestEvent.params.kategori;

  const category = categories[kategori];
  const client = await supabase();

  let data: any[] | undefined;

  if (!search || search === '' || search === ' ') {
    console.log('searching data')
    data = (await client.schema('product').from(category).select()).data ?? undefined;
  }

  if (!data) {
    console.log('getting data')
    await client
      .schema('product')
      .from(category)
      .select()
      .order('product_name', { ascending: true })
      .ilike('product_name', `%${search}%`)
      .then((res) => {
        data = res.data
      });
  }

  const imageUrls: (string | undefined)[] = []

  if (data) {
    const promises = data.map(async (component: any) => {
      const { data: imageData } = await client.schema('product').from('v_product_images')
        .select("image_filenames")
        .eq('product_id', component['product_id'])
        .single()
    
      if (imageUrls.length == 0) {
        imageUrls.push(undefined)
      }
      else {
        imageUrls.push(imageData?.image_filenames?.map((name: string) => {
          const url = `${supabaseUrl}${storageUrl}${component['product_id']}/${name}`
          return url;
        })[0])
      }
    })
    
    await Promise.all(promises)
  }

  return { data, imageUrls }
});

export default component$(() => {
  const location = useLocation();
  const nav = useNavigate();

  const inputSig = useSignal('');
  useDebounce(inputSig, 300, $(async (value: string) => {
    const url = location.url;
    url.searchParams.set("value", value.replace(/ +/g, ' '));
    window.history.pushState({}, '', url);

    console.log('debounced: ', value);
    await nav();
  }));

  const handleSearch = $((event: InputEvent, element: HTMLInputElement) => {
    inputSig.value = element.value;
  });

  const kategori = useLocation().params.kategori;

  const component = useRecords().value;

  const categoryData = component.data;

  const imageUrls = component.imageUrls;

  const defaultHeadersStart = ['', 'Nama', '']; // The first '' is for the checkbox, the second for the image
  const defaultHeadersEnd = ['Harga Terendah (Rp)', 'Aksi'];

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

  const productAmount = 200;

  const filters: Filter[] = [
    {
      title: 'Harga',
      items: ['Harga Terendah', 'Harga Tertinggi'],
    },
  ]

  return (
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
        <div class={styles.tableSection}>
          <header class={styles.tableHeader}>Pilih {title}</header>
          <main>
            <header class={styles.tableSubHeader}>
              <div class={styles.tableSubHeaderTitle}>
                Tersedia {productAmount} produk yang siap kamu pilih
              </div>
              <div class="w-64 ml-auto mt-4 md:mr-4">
                <SearchBox placeholder="Temukan komponen di sini" onInput$={handleSearch} />
              </div>
            </header>
            <aside class="block sticky md:hidden top-[calc(64px+1rem)] mb-4 z-10">
              <div class="w-full flex">
                <div class={[styles.showFilterButton, 'w-full flex']}>
                  <FilledButton
                    class={'flex w-full text-center'}
                    labelFor="toggleKatalogFilter"
                  >
                    <span class="">
                      Filter <TbArrowRight class="inline" />
                    </span>
                  </FilledButton>
                </div>
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
                    'w-full sticky top-[calc(64px+4rem)] mx-auto md:hidden mt-2 gap-1 transition-all duration-200 ',
                  ]}
                >
                  <div class="w-fit mx-auto bg-white rounded-lg shadow-xl p-4">
                    <Sidebar filters={filters} />
                  </div>
                </div>
              </div>

              <div
                class={[
                  styles.mobileKatalog,
                  'flex flex-col w-[calc(100vw-64px)] md:hidden gap-1 transition-all duration-200 -translate-x-[50%]',
                ]}
              >
                {categoryData?.map((component: any) => (
                  <a
                    href={`/detail/${kategori}/${component.slug}`}
                    key={component.product_id}
                    class="text-black hover:bg-zinc-200 border hover:border-zinc-300 transition-all rounded-xl shadow-lg bg-white p-2"
                  >
                    <div class="flex flex-row items-center gap-1">
                      <input type="checkbox" />
                      <div class="justify-evenly flex flex-1 flex-row items-center gap-2">
                        <img
                          src={productImageUrl + component.image_paths?.[0]}
                          width={80}
                          height={80}
                        />
                        <div class="flex flex-col">
                          <span class="text-lg font-bold leading-none">
                            {component.product_name}
                          </span>
                          <span class="font-bold mt-2">
                            Rp{' '}
                            {(
                              component.lowest_price as number | null
                            )?.toLocaleString('id-ID') ?? '-'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <FilledButton>Tambah</FilledButton>
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
                  </a>
                ))}
              </div>

              <table class={'hidden md:table'}>
                <thead class={styles.tableHead}>
                  <tr>
                    {headers.map((item) => (
                      <th key={item}>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody class={styles.tableBody}>
                  <tr class="h-4"></tr>
                  {categoryData?.map((component: any, index: number) => (
                    <>
                      <tr
                        data-href={`/detail/${kategori}/${component.slug}`}
                        key={component.product_id}
                        class={[
                          styles.tableRow,
                          'transition-transform hover:scale-[1.01] hover:z-10 cursor-pointer',
                        ]}
                        onClick$={() =>
                          (window.location.href = `/detail/${kategori}/${component.slug}`)
                        }
                      >
                        <td>
                          <input
                            type="checkbox"
                            id={component.product_id!.toString()}
                            class={[styles.toggle]}
                          />
                        </td>
                        <td>
                          {imageUrls[index] && (
                            <>
                              <img
                                src={
                                  imageUrls[index].length == 0 ? '' : imageUrls[index][0]
                                }
                                width={64}
                                height={64}
                              />
                            </>
                          )}
                        </td>
                        <td>{component.product_name ?? '-'}</td>

                        <ComponentFallback
                          headers={headers}
                          kategori={kategori}
                          component={component}
                          isMobile={false}
                        />

                        <td>
                          {component.lowest_price?.toLocaleString('id-ID') ??
                            '-'}
                        </td>
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
};

const ComponentFallback = component$<ComponentFallbackProps>(
  ({ headers, kategori, component, isMobile }) => {
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
      case 'motherboard':
        keys = motherboardKeys;
        break;
      case 'cpu':
        keys = cpuKeys;
        break;
      case 'gpu':
        keys = gpuKeys;
        break;
      case 'memory':
        keys = memoryKeys;
        break;
      // case "cooler":
      case 'psu':
        keys = psuKeys;
        break;
      // case "cable":
      case 'storage':
        keys = storageKeys;
        break;
      case 'casing':
        keys = casingKeys;
        break;
      default:
        break;
    }

    if (isMobile)
      return (
        <>
          {keys.map((key, index) => (
            <div key={key} class="flex flex-col">
              <div class="text-sm mt-1 mb-2">{headers[index + 3]}</div>
              <div class="font-semibold">{component[key] ?? '-'}</div>
            </div>
          ))}
        </>
      );

    return (
      <>
        {keys.map((key) => (
          <td key={key}>{component[key] ?? '-'}</td>
        ))}
      </>
    );
  }
);

export const head: DocumentHead = ({ params }) => {
  return {
    title: titlesKategori[params.kategori] + ' - BangunPC',
    meta: [
      {
        name: 'description',
        content:
          'Cari ' +
          titlesKategori[params.kategori] +
          ' dari Tokopedia, Shopee, dan lainnya. Hanya di BangunPC',
      },
    ],
  };
};
