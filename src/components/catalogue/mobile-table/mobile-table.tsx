import { $, component$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import FilledButton from '~/components/common/filled-button';
import { componentImage } from '~/lib/db';
import type { ComponentStorageType } from '~/lib/storage_helper';
import { ComponentStorage } from '~/lib/storage_helper';
import { ComponentFallback } from '../component-fallback';
import type { TableType } from '../desktop-table/desktop-table';
import styles from './mobile-table.module.css';
import { categoriesEnum } from '~/lib/katalog_types';

export default component$<TableType>(
  ({ headers, data: categoryData, kategori }) => {
    const isIframe = useLocation().url.searchParams.get('iframe') === 'true';

    return (
      <div
        class={[
          styles.mobileKatalog,
          'flex flex-col tablet:hidden gap-1 transition-all duration-200',
        ]}
      >
        {categoryData?.map((component: any) => {
          const handleAddComponent = $(() => {
            const componentAdded: ComponentStorageType = {
              id: component.product_id,
              name: component.product_name,
              price: component.lowest_price,
              image: componentImage(component),
              category: categoriesEnum[kategori],
              quantity: 1,
              slug: component.slug,
            };
            ComponentStorage.addComponent(componentAdded);
            alert(
              'Komponen ' + component.product_name + ' berhasil ditambahkan. '
            );
            if (isIframe) {
              window.history.back();
            }
          });
          return (
            <div
              key={component.product_id}
              class="text-black hover:bg-zinc-200 border hover:border-zinc-300 transition-all rounded-xl shadow-lg bg-white p-2"
            >
              <Link
                href={`/detail/${kategori}/${component.slug}/${component.product_id}`}
                class="flex flex-row items-center gap-1 text-black"
              >
                <div class="flex flex-1 flex-row items-center gap-2">
                  {component.image_filenames.length > 0 && (
                    <img
                      src={componentImage(component)}
                      alt={`Gambar ${component.product_name}`}
                      width={80}
                      height={80}
                    />
                  )}
                  <div class="flex flex-1 flex-col">
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
                  <FilledButton onClick$={handleAddComponent}>
                    Tambah
                  </FilledButton>
                </div>
              </Link>
              <div class="grid sm:grid-cols-4 grid-cols-3 gap-1">
                <ComponentFallback
                  headers={headers}
                  kategori={kategori}
                  component={component}
                  isMobile={true}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
