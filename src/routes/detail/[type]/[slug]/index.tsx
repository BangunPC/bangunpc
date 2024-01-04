import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import FilledButton from '~/components/common/filled-button';
import TextButton from '~/components/common/text-button';
import Heart from '~/components/starter/icons/heart';
import Moneys from '~/components/starter/icons/moneys';
import Send2 from '~/components/starter/icons/send-2';
import Shop from '~/components/starter/icons/shop';
import Tag2 from '~/components/starter/icons/tag-2';
import { supabase } from '~/lib/db';
import { categories } from '~/lib/katalog_types';

export const useComponentDetail = routeLoader$(async (requestEvent) => {
  const params = requestEvent.params;
  const type = params.type;
  const slug = params.slug;
  const client = await supabase();
  return client
    .schema('product')
    .from(categories[type])
    .select()
    .eq('slug', slug)
    .single();
});

export default component$(() => {
  const component = useComponentDetail();

  const data = component.value.data;

  const name = data['product_name'];

  return (
    <>
      <div class="flex flex-col lg:flex-row gap-2">
        <div class="p-6 pb-0 lg:pb-6 flex-1 lg:max-w-lg">
          <div class="border border-[#1C1F24] rounded-md aspect-square max-w-xl mx-auto">
            
          </div>

          <div class="grid grid-cols-4 my-4 gap-4 justify-center">
            <div class="border border-[#1C1F24] rounded-md aspect-square max-w-xl ">
              
            </div> 
            <div class="border border-[#1C1F24] rounded-md aspect-square max-w-xl ">
              
            </div>
            <div class="border border-[#1C1F24] rounded-md aspect-square max-w-xl ">
              
            </div>
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
