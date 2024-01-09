import type { QwikMouseEvent } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import FilledButton from '~/components/common/filled-button';
import TextButton from '~/components/common/text-button';
import Heart from '~/components/starter/icons/heart';
import Moneys from '~/components/starter/icons/moneys';
import Send2 from '~/components/starter/icons/send-2';
import Shop from '~/components/starter/icons/shop';
import Tag2 from '~/components/starter/icons/tag-2';
import { supabase } from '~/lib/db';
import { categories, titlesKategori } from '~/lib/katalog_types';

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

  return { data, imageUrls };
});

export default component$(() => {
  const component = useComponentDetail();

  const data = component.value.data;

  const imageUrls = component.value.imageUrls;

  const name = data['product_name'];

  return (
    <>
      <div class="flex flex-col lg:flex-row gap-2">
        <div class="p-6 pb-0 lg:pb-6 flex-1 lg:max-w-lg">
          <div class="border border-[#1C1F24] border-opacity-40 rounded-md aspect-square max-w-xl mx-auto items-center overflow-hidden">
            <div>
              {imageUrls[0] && (
                <img
                  onMouseMove$={(
                    event: QwikMouseEvent<HTMLImageElement, MouseEvent>,
                    element: HTMLImageElement
                  ) => {
                    // zoom the image at mouse position
                    console.log(event.x, event.y);
                    const parent = element.parentElement as HTMLDivElement;
                    const rect = parent.getBoundingClientRect();
                    const translate = {
                      x: event.x - rect.x - rect.width / 2,
                      y: event.y - rect.y - rect.height / 2,
                    };
                    element.style.transform = `translate(${-translate.x}px, ${-translate.y}px) scale(2)`;
                  }}
                  onMouseLeave$={(_, element: HTMLImageElement) => {
                    element.style.transform = ``;
                  }}
                  id="compimg"
                  src={imageUrls[0]}
                  class="object-scaledown"
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
                class="border border-[#1C1F24] border-opacity-40 rounded-md aspect-square object-scale-down"
                width={240}
                height={240}
              ></img>
            ))}
          </div>

          <div class="flex flex-row gap-2">
            <TextButton class="flex items-center gap-2">
              <Heart class="fill-none " width="24" height="24" />
              <span class="text-lg">Favoritkan</span>
            </TextButton>
            <TextButton class="flex items-center gap-2">
              <Send2 class="fill-none" width="24" height="24" />
              <span class="text-lg">Bagikan</span>
            </TextButton>
          </div>
        </div>
        <div class="flex flex-col gap-2 p-6 pt-0 lg:pt-6 max-w-4xl">
          <header>
            <div class="lg:font-bold text-4xl">{name}</div>
          </header>
          <main class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <Shop class="fill-none stroke-black" width="24" height="24" />
              <span class="text-lg">
                3709 penjual dari Tokopedia, Shopee & lainnya
              </span>
            </div>
            <div class="flex items-center gap-2">
              <Moneys class="fill-none stroke-black" width="24" height="24" />
              <span class="text-lg">Dari Rp. 720.000 - Rp. 1.200.000</span>
            </div>
            <div class="flex items-center gap-2">
              <Tag2 class="fill-none stroke-black" width="24" height="24" />
              <span class="text-lg">
                Lihat perbandingan harga pada setiap toko
              </span>
            </div>
            <FilledButton class="flex lg:block lg:w-fit font-normal px-4 py-4 justify-center rounded-xl">
              + Tambahkan ke Simulasi Rakit PC
            </FilledButton>
            <header>
              <div class="text-3xl font-semibold">Informasi Komponen</div>
            </header>
            <main>
              {/* TODO: component specs */}
              <header class="text-lg font-semibold">Tentang Produk</header>
              <main class="mt-4">{data['description']}</main>
            </main>
          </main>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  const component = resolveValue(useComponentDetail);

  const data = component.data;

  const name = data['product_name'];
  const type = params.type;

  return {
    title: name + ' - BangunPC',
    meta: [
      {
        name: 'description',
        content:
          'Cari ' +
          titlesKategori[type] +
          ' dari Tokopedia, Shopee, dan lainnya. Hanya di BangunPC',
      },
    ],
  };
};
