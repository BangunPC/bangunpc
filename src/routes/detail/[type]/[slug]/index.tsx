import type { QwikMouseEvent } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$, useLocation, useNavigate } from '@builder.io/qwik-city';
import FilledButton, { filledButtonClass } from '~/components/common/filled-button';
import TextButton from '~/components/common/text-button';
import Heart from '~/components/starter/icons/heart';
import Moneys from '~/components/starter/icons/moneys';
import Send2 from '~/components/starter/icons/send-2';
import Shop from '~/components/starter/icons/shop';
import { supabase } from '~/lib/db';
import { categories, titlesKategori } from '~/lib/katalog_types';
import ShopeeSvg from "~/components/homepage/affiliate/shopee-svg/shopee-svg";
// import LazadaSvg from "~/components/homepage/affiliate/lazada.svg?jsx";
import TokopediaSvg from "~/components/homepage/affiliate/tokopedia.svg?jsx";
import BlibliSvg from "~/components/homepage/affiliate/blibli-svg/blibli-svg";
import { TbMapPin } from '@qwikest/icons/tablericons';
import { v_spec } from '~/lib/katalog_complete_types';
import Dropdown from '~/components/common/dropdown';
import OutlinedButton from '~/components/common/outlined-button';

export const useComponentDetail = routeLoader$(async (requestEvent) => {
  const supabaseUrl = 'https://onawoodgnwkncueeyusr.supabase.co';
  const storageUrl = '/storage/v1/object/public/product-images/';

  const params = requestEvent.params;
  const type = params.type;
  const slug = params.slug;
  const client = await supabase();
  const { data } = await client
    .schema('product')
    .from(categories[type])
    .select()
    .eq('slug', slug)
    .single();

  let imageUrls = [];

  const { data: imageData } = await client
    .schema('product')
    .from('v_product_images')
    .select('image_filenames')
    .eq('product_id', data['product_id'])
    .single();

  imageUrls =
    imageData?.image_filenames?.map((name: string) => {
      const url = `${supabaseUrl}${storageUrl}${data['product_id']}/${name}`;
      return url;
    }) ?? [];

  const product_details = await client
    .schema('product')
    .from('v_product_details')
    .select()
    .filter('product_id', 'eq', data['product_id']);

  return { data, imageUrls, product_details, review_urls: data['review_urls'], spec_url: data['spec_url'], name: data['product_name'] };
});

export default component$(() => {

  const nav = useNavigate();
  const component = useComponentDetail();

  const { data, imageUrls, product_details, review_urls, spec_url, name } = component.value;

  const { type } = useLocation().params;

  const componentInfo = v_spec[type]?.flatMap((v) => ({ title: v[1], value: data[v[0]] }));

  let lowest_price = undefined;
  if ((product_details.data?.length ?? -1) > 0)
    lowest_price =
      product_details.data?.reduce(
        (a, b) => (a.price ?? 0) < (b.price ?? 0) ? a : b,
      ).price?.toLocaleString('id-ID') ?? undefined;

  return (
    <div class='flex flex-col gap-4 p-6 lg:max-w-6xl max-w-3xl m-auto'>
      <div class="flex flex-col lg:grid lg:grid-cols-2 lg:auto-rows-fr gap-2">
        <div class="pb-0 lg:pb-6 lg:max-w-lg">
          <div class="border border-[#1C1F24] border-opacity-40 rounded-md aspect-square max-w-xl mx-auto items-center overflow-hidden">
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
                  width={600}
                  height={600}
                ></img>
              )}
            </div>
          </div>

          <div class="grid grid-cols-4 lg:grid-cols-3 auto-rows-fr my-4 gap-4 justify-center">
            {imageUrls.map((url: string | undefined) => (
              <img
                onMouseEnter$={() => {
                  const compimg = document.getElementById(
                    'compimg'
                  ) as HTMLImageElement | null;
                  if (compimg && url) {
                    compimg.src = url;
                  }
                }}
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

          <div class="flex flex-row gap-2">
            <TextButton
              class="flex items-center gap-2"
              onClick$={() => alert('Coming Soon')}
            >
              <Heart class="fill-none " width="24" height="24" />
              <span class="text-lg">Favoritkan</span>
            </TextButton>
            <TextButton
              class="flex items-center gap-2"
              onClick$={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard');
              }}
            >
              <Send2 class="fill-none" width="24" height="24" />
              <span class="text-lg">Bagikan</span>
            </TextButton>
          </div>
        </div>
        <div class="flex flex-col gap-2 pt-0 lg:pt-6 lg:max-w-2xl w-full m-auto md:m-0">
          <header>
            <h1 class="lg:font-bold text-4xl">{name}</h1>
          </header>
          <main class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <Shop class="fill-none stroke-black" width="24" height="24" />
              <span class="text-lg">
                {product_details.data!.length} penjual dari Tokopedia, Shopee & lainnya
              </span>
            </div>
            {lowest_price &&
              <div class="flex items-center gap-2">
                <Moneys class="fill-none stroke-black" width="24" height="24" />
                <span class="text-lg">Dari Rp{lowest_price}</span>
              </div>}
            <div class='flex flex-row gap-2'>
              <FilledButton
                class="flex lg:block lg:w-fit font-normal text-sm px-2 py-3 justify-center rounded-lg bg-green-600"
                onClick$={() => nav('#compare', { scroll: true })}
              >
                Beli Sekarang
              </FilledButton>
              <FilledButton
                class="flex lg:block lg:w-fit font-normal text-sm px-2 py-3 justify-center rounded-lg"
                onClick$={() => alert('Coming soon')}
              >
                + Tambahkan ke Simulasi Rakit PC
              </FilledButton>
            </div>
            <Dropdown>
              <span q:slot="header" class='w-full text-3xl font-semibold'>
                Informasi Produk
              </span>
              <span q:slot='main'>
                {data['description'] && <Dropdown>

                  <span q:slot='header'
                    class='text-lg font-semibold'
                  >
                    Tentang Produk
                  </span>
                  <span q:slot='main' class='mt-4 gap-2'>{data['description']}</span>
                </Dropdown>}
              </span>
            </Dropdown>
          </main>
        </div>
      </div >

      <Dropdown>
        <span q:slot='header'
          class='w-full text-3xl font-semibold'
        >
          Spesifikasi

          {spec_url && (
            <a href={spec_url} target="_blank" rel="noreferrer" class="ml-1">
              <OutlinedButton class=" text-sm">
                Buka Spesifikasi Resmi
              </OutlinedButton>
            </a>
          )}
        </span>
        <span q:slot='main' class='flex flex-col gap-2'>
          {componentInfo?.map((info: any, index) => (
            <div key={'componentinfo-' + index} class="flex flex-col gap-1">
              <span class="font-semibold">{info.title}</span>
              <span class="">{info.value ?? '-'}</span>
            </div>
          ))}
        </span>
      </Dropdown>
      <Dropdown>
        <span q:slot='header'>
          <div id='compare' class="text-3xl font-semibold">Bandingkan Produk</div>
        </span>
        <span q:slot='main'>{

          (product_details.data?.length ?? 0) == 0 ?
            <span class='font-semibold text-lg'>Belum ada link produk</span>
            :
            (
              <>
                <div class="flex flex-col w-full md:hidden gap-2">
                  {product_details.data?.map((detail: any) => (
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
                      {detail.marketplace_name === "Tokopedia" && <TokopediaSvg class='h-8 w-fit' />}
                      {detail.marketplace_name === "Shopee" && <ShopeeSvg class='h-8 w-fit' />}
                      {detail.marketplace_name === "Blibli" && <BlibliSvg class='h-8 w-fit' />}
                      <span class='font-semibold text-xl'>
                        Rp{detail.price.toLocaleString('id-ID')}
                      </span>
                      <div class='flex flex-row gap-1'>
                        <TbMapPin />
                        {detail.seller_city}
                      </div>
                      <a
                        href={detail.url}
                        class={[filledButtonClass, 'text-center bg-green-600']}
                        target="_blank" rel="noopener noreferrer"
                      >
                        Beli Sekarang
                      </a>
                    </div>
                  ))}
                </div>
                <table class="w-full hidden md:table">
                  <thead class="drop-shadow-sm">
                    <tr>
                      <td
                        class="bg-white rounded-s-lg p-2"
                      >
                        Merchant
                      </td>
                      <td
                        class=" bg-white p-2"
                      >
                        Harga
                      </td>
                      <td
                        class=" bg-white p-2"
                      >
                        Lokasi Toko
                      </td>
                      <td
                        class="bg-white p-2"
                      >
                        Stok
                      </td>
                      <td
                        class="bg-white p-2"
                      >
                        Details
                      </td>
                      <td
                        class="bg-white rounded-e-lg p-2"
                      >
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class='h-4' />
                    {product_details.data?.map((detail: any) => (
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
                        <tr key={'marketplate-' + detail.id} class="drop-shadow-sm">
                          <td class="bg-white p-2 rounded-s-lg">
                            {detail.marketplace_name === "Tokopedia" && <TokopediaSvg class='h-8 w-fit' />}
                            {detail.marketplace_name === "Shopee" && <ShopeeSvg class='h-8 w-fit' />}
                            {detail.marketplace_name === "Blibli" && <BlibliSvg class='h-8 w-fit' />}
                          </td>
                          <td class="bg-white p-2 font-semibold">
                            Rp{detail.price.toLocaleString('id-ID')}
                          </td>
                          <td class="bg-white p-2">
                            {detail.seller_city}
                          </td>
                          <td class="bg-white p-2">
                            {detail.stock}
                          </td>
                          <td class="bg-white p-2">
                            {detail.product_detail_description ?? '-'}
                          </td>
                          <td class="bg-white p-2 rounded-e-lg">
                            <a
                              href={detail.url}
                              class={[filledButtonClass, 'bg-green-600']}
                              target="_blank" rel="noopener noreferrer"
                            >
                              Beli Sekarang
                            </a>
                          </td>
                        </tr>
                        <tr key={'marketplategap-' + detail.id} class='h-1' />
                      </>
                    ))}
                  </tbody>
                </table>
              </>
            )
        }</span>
      </Dropdown>
      {review_urls?.length > 0 &&
        <Dropdown>
          <span q:slot='header' class='text-3xl font-semibold'>
            Video Review
          </span>
          <span q:slot='main'>
            {
              review_urls?.map((url: any) => (
                <iframe
                  key={url}
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed${new URL(url).pathname}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  class="rounded-xl mb-1"
                  allowFullScreen
                ></iframe>
              ))
            }
          </span>
        </Dropdown>
      }
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
