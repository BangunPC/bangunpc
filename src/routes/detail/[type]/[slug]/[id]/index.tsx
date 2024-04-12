import type { QwikMouseEvent } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import {
  Link,
  routeLoader$,
  useLocation,
  useNavigate,
} from '@builder.io/qwik-city';
import FilledButton, {
  filledButtonClass,
} from '~/components/common/filled-button';
import TextButton from '~/components/common/text-button';
import Heart from '~/components/icons/common/heart';
import Moneys from '~/components/icons/common/moneys';
import Send2 from '~/components/icons/common/send-2';
import Shop from '~/components/icons/common/shop';
import { productImage, supabase } from '~/lib/db';
import {
  categories,
  categoryHeaders,
  titlesKategori,
} from '~/lib/katalog_types';
import ShopeeSvg from '~/components/homepage/affiliate/shopee-svg/shopee-svg';
// import LazadaSvg from "~/components/homepage/affiliate/lazada.svg?jsx";
import TokopediaSvg from '~/components/homepage/affiliate/tokopedia.svg?jsx';
import BlibliSvg from '~/components/homepage/affiliate/blibli-svg/blibli-svg';
import { TbMapPin } from '@qwikest/icons/tablericons';
import { v_spec } from '~/lib/katalog_complete_types';
import Dropdown from '~/components/common/dropdown';
import OutlinedButton from '~/components/common/outlined-button';

export const useComponentDetail = routeLoader$(async (requestEvent) => {
  const params = requestEvent.params;
  const type = params.type;
  const slug = params.slug;
  const id = params.id;
  const client = await supabase();
  const future = await Promise.all([
    client
      .schema('product')
      .from(categories[type])
      .select()
      .eq('slug', slug)
      .single(),

    client
      .schema('product')
      .from('v_product_details')
      .select()
      .eq('product_id', id),
  ]).then(([dataResult, productDetailsResult]) => {
    const data = dataResult.data;
    const product_details = productDetailsResult.data;
    return {
      data,
      product_details,
      review_urls: data['review_urls'],
      spec_url: data['spec_url'],
      name: data['product_name'],
    };
  });
  return { ...future };
});

export default component$(() => {
  const nav = useNavigate();
  const component = useComponentDetail();

  const { data, product_details, review_urls, spec_url, name } =
    component.value;

  const imageUrls = data.image_filenames.map((image: string) =>
    productImage(data['product_id'], image)
  );

  const { type } = useLocation().params;

  const componentInfo = v_spec[type]?.flatMap((v) => ({
    title: v[1],
    value: data[v[0]],
  }));

  let lowest_price = undefined;
  if ((product_details?.length ?? -1) > 0)
    lowest_price =
      product_details
        ?.reduce((a, b) => ((a.price ?? 0) < (b.price ?? 0) ? a : b))
        .price?.toLocaleString('id-ID') ?? undefined;

  return (
    <div class="flex flex-col gap-4 p-6 tablet:max-w-screen-desktop max-w-3xl m-auto">
      <div class="flex flex-col tablet:flex-row gap-2 tablet:gap-8">
        <div class="pb-0 tablet:pb-6 tablet:max-w-sm">
          <div class="border border-[#1C1F24] border-opacity-40 rounded-md aspect-square max-w-sm mx-auto items-center overflow-hidden">
            <div
              class="flex items-center justify-center w-full h-full"
              onMouseMove$={(
                event: QwikMouseEvent<HTMLDivElement, MouseEvent>,
                element: HTMLDivElement
              ) => {
                // zoom the image at mouse position
                const rect = element.getBoundingClientRect();
                const translate = {
                  x: event.x - rect.x - rect.width / 2,
                  y: event.y - rect.y - rect.height / 2,
                };
                const child = element.firstChild as HTMLImageElement;
                child.style.transform = `translate(${-translate.x}px, ${-translate.y}px) scale(2)`;
              }}
              onMouseLeave$={(_, element: HTMLDivElement) => {
                const child = element.firstChild as HTMLImageElement;
                child.style.transform = ``;
              }}
            >
              {imageUrls[0] && (
                <img
                  id="compimg"
                  src={imageUrls[0]}
                  alt={`Gambar ${name}`}
                  class="object-fill"
                  width={360}
                  height={360}
                ></img>
              )}
            </div>
          </div>

          <div class="grid grid-cols-4 tablet:grid-cols-5 auto-rows-fr my-4 gap-1 justify-center">
            {imageUrls.map((url: string | undefined) => (
              <img
                // onMouseEnter$={() => {
                //   const compimg = document.getElementById(
                //     'compimg'
                //   ) as HTMLImageElement | null;
                //   if (compimg && url) {
                //     compimg.src = url;
                //   }
                // }}
                onClick$={() => {
                  const compimg = document.getElementById(
                    'compimg'
                  ) as HTMLImageElement | null;
                  if (compimg && url) {
                    compimg.src = url;
                  }
                }}
                key={url}
                src={url}
                alt={`Gambar ${name}`}
                class="border border-[#1C1F24] border-opacity-40 rounded-md aspect-square object-scale-down hover:cursor-pointer hover:bg-zinc-200"
                width={240}
                height={240}
              ></img>
            ))}
          </div>
        </div>
        <div class="flex flex-col gap-2 pt-0 tablet:pt-6 tablet:max-w-4xl w-full m-auto tablet:m-0">
          <header>
            <h1 class="tablet:font-bold text-4xl">{name}</h1>
          </header>
          <main class="flex flex-col gap-2">
            {/* <div class="flex items-center gap-2">
              <Shop class="fill-none stroke-black" width="24" height="24" />
              <span class="text-lg">
                {product_details!.length} penjual dari Tokopedia, Shopee &
                lainnya
              </span>
            </div> */}
            {lowest_price && (
              <span class="">
                <span class="text-4xl text-primary font-bold">
                  Rp {lowest_price}
                </span>
                <span> (Harga Termurah)</span>
              </span>
            )}
            <span>
              Kategori:{' '}
              <Link class="text-primary" href={'/katalog/' + type}>
                {titlesKategori[type]}
              </Link>
            </span>
            <div class="flex flex-row gap-2">
              <FilledButton
                class="flex tablet:block tablet:w-fit font-normal text-sm px-2 py-2 justify-center rounded-lg bg-green-600"
                onClick$={() => nav('#compare', { scroll: true })}
              >
                Beli Sekarang
              </FilledButton>
              <FilledButton
                class="flex tablet:block tablet:w-fit font-normal text-sm px-2 py-2 justify-center rounded-lg"
                onClick$={() => alert('Coming soon')}
              >
                + Tambahkan ke Simulasi Rakit PC
              </FilledButton>
            </div>
            <div class="flex flex-row gap-6">
              <TextButton
                class="flex items-center gap-2 font-semibold"
                onClick$={() => alert('Coming Soon')}
              >
                <Heart class="fill-none " width="24" height="24" />
                <span class="text-lg">Tambah ke wishlist</span>
              </TextButton>
              <TextButton
                class="flex items-center gap-2 font-semibold"
                onClick$={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard');
                }}
              >
                <Send2 class="fill-none" width="24" height="24" />
                <span class="text-lg">Bagikan</span>
              </TextButton>
            </div>
            <Dropdown>
              <span q:slot="header" class="w-full text-3xl font-semibold">
                Tentang Produk
              </span>
              <span q:slot="main" class="mt-4 gap-2 leading-[120%]">
                {data['description']}
              </span>
            </Dropdown>
          </main>
        </div>
      </div>

      <Dropdown>
        <span q:slot="header">
          <div id="compare" class="text-3xl font-semibold">
            Bandingkan Produk
          </div>
        </span>
        <span q:slot="main">
          {(product_details?.length ?? 0) == 0 ? (
            <span class="font-semibold text-lg">Belum ada link produk</span>
          ) : (
            <>
              <div class="flex flex-col w-full tablet:hidden gap-2">
                {product_details?.map((detail: any) => (
                  <div
                    key={'marketplacemobile-' + detail.id}
                    class="
                      flex
                      flex-col
                      gap-2
                      text-black
                      border
                      transition-all
                      rounded-xl
                      shadow-lg
                      bg-white
                      p-2
                      "
                  >
                    {detail.marketplace_name === 'Tokopedia' && (
                      <TokopediaSvg class="h-8 w-fit" />
                    )}
                    {detail.marketplace_name === 'Shopee' && (
                      <ShopeeSvg class="h-8 w-fit" />
                    )}
                    {detail.marketplace_name === 'Blibli' && (
                      <BlibliSvg class="h-8 w-fit" />
                    )}
                    <span class="font-semibold text-xl">
                      Rp{detail.price.toLocaleString('id-ID')}
                    </span>
                    <div class="flex flex-row gap-1">
                      <TbMapPin />
                      {detail.seller_city}
                    </div>
                    <a
                      href={detail.url}
                      class={[filledButtonClass, 'text-center bg-green-600']}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Beli Sekarang
                    </a>
                  </div>
                ))}
              </div>
              <table class="w-full hidden tablet:table">
                <thead class="drop-shadow-sm text-white font-bold">
                  <tr>
                    <td class="bg-primary rounded-s-lg p-2 pl-8">Merchant</td>
                    <td class="bg-primary p-2">Nama Toko</td>
                    <td class="bg-primary p-2">Lokasi Toko</td>
                    <td class="bg-primary p-2">Harga</td>
                    <td class="bg-primary p-2">Stok</td>
                    <td class="bg-primary p-2">Details</td>
                    <td class="bg-primary rounded-e-lg p-2 pr-8"></td>
                  </tr>
                </thead>
                <tbody>
                  <tr class="h-4" />
                  {product_details?.map((detail: any) => (
                    // [detail.id,
                    // detail.marketplace_id,
                    // detail.price,
                    // detail.product_detail_description_id,
                    // detail.product_id,
                    // detail.seller_city,
                    // detail.stock,
                    // detail.url].map((detail: any) => (
                    //   <div>
                    //     <div class="text-lg font-semibold">{detail}</div>
                    //   </div>
                    // ))
                    <>
                      <tr
                        key={'marketplate-' + detail.id}
                        class="drop-shadow-sm"
                      >
                        <td class="bg-white p-2 rounded-s-lg pl-8">
                          {detail.marketplace_name === 'Tokopedia' && (
                            <TokopediaSvg class="h-8 w-fit" />
                          )}
                          {detail.marketplace_name === 'Shopee' && (
                            <ShopeeSvg class="h-8 w-fit" />
                          )}
                          {detail.marketplace_name === 'Blibli' && (
                            <BlibliSvg class="h-8 w-fit" />
                          )}
                        </td>
                        <td class="bg-white p-2">{detail.seller_name}</td>
                        <td class="bg-white p-2">{detail.seller_city}</td>
                        <td class="bg-white p-2 font-semibold">
                          Rp {detail.price.toLocaleString('id-ID')}
                        </td>
                        <td class="bg-white p-2">{detail.stock}</td>
                        <td class="bg-white p-2">
                          {detail.product_detail_description ?? '-'}
                        </td>
                        <td class="bg-white p-2 rounded-e-lg pr-8 flex justify-end">
                          <a
                            href={detail.url}
                            class={[filledButtonClass, 'bg-green-600 px-4']}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Beli
                          </a>
                        </td>
                      </tr>
                      <tr key={'marketplategap-' + detail.id} class="h-1" />
                    </>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </span>
      </Dropdown>

      <Dropdown>
        <span q:slot="header" class="w-full text-3xl font-semibold">
          Spesifikasi
          {spec_url && (
            <a href={spec_url} target="_blank" rel="noreferrer" class="ml-1">
              <OutlinedButton class=" text-sm">
                Buka Spesifikasi Resmi
              </OutlinedButton>
            </a>
          )}
        </span>
        <table
          q:slot="main"
          class="flex flex-col gap-2 bg-white border rounded-lg drop-shadow-sm"
        >
          <thead class="hidden">
            <tr>
              <td />
              <td />
            </tr>
          </thead>
          <tbody>
            {componentInfo?.map((info: any, index) => (
              <tr
                key={'componentinfo-' + index}
                class="last:border-none border-b"
              >
                <td class="whitespace-nowrap border-r p-4">{info.title}</td>
                <td class="p-4 font-semibold w-full">{info.value ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Dropdown>
      {review_urls?.length > 0 && (
        <Dropdown>
          <span q:slot="header" class="text-3xl font-semibold">
            Video Review
          </span>
          <span
            q:slot="main"
            class="flex flex-col tablet:grid tablet:grid-cols-3 gap-1"
          >
            {review_urls?.map((url: any) => (
              <iframe
                key={url}
                src={`https://www.youtube.com/embed${new URL(url).pathname}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                class="w-full rounded-xl mb-1 aspect-video"
                allowFullscreen
              ></iframe>
            ))}
          </span>
        </Dropdown>
      )}
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  const component = resolveValue(useComponentDetail);

  const data = component.data;

  const name = data['product_name'];
  const type = params.type;

  return {
    title: name + ' | BangunPC',
    meta: [
      {
        name: 'description',
        content:
          'Cari ' +
          titlesKategori[type] +
          ' dari Tokopedia, Shopee, dan lainnya. Hanya di Bangun PC',
      },
    ],
  };
};
