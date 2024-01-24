import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import styles from './posts.module.css';
import Image1 from '/src/content/images/1.webp?jsx';
import Image2 from '/src/content/images/2.webp?jsx';
import SearchBox from '~/components/common/search-box';

const images = [
  <Image1 key={1} />,
  <Image2 key={2} />,
];

export const useFrontmatter = routeLoader$(async () => {
  const modules = import.meta.glob('/src/content/blogs/*.mdx', { eager: true });

  const posts: Post[] = [];

  for (const path in modules) {
    // @ts-ignore
    const post: Post = modules[path].frontmatter;

    const slug = path
      .split('/')
      .pop()
      ?.replace(/\.[^/.]+$/, ''); // Remove the file extension using regular expression

    post.slug = slug;
    posts.push(post);
  }

  return posts.sort((a, b) => a.id - b.id);
});

export default component$(() => {
  const metas = useFrontmatter();
  const hovered = useSignal(-1);

  return (
    <div>
      <aside class="w-full max-w-7xl m-auto top-[calc(64px+1rem)] sticky z-10">
        <div class="w-80 ml-auto my-4 mr-4 drop-shadow-sm">
          <SearchBox placeholder='Cari entri blog yang ingin kamu baca' />
        </div>
      </aside>
      <main class="flex flex-col m-auto max-w-[800px] w-fit gap-2 mb-8 px-2">
        {metas.value.map((meta, index) => (
          <Link
            onMouseEnter$={(_: any, element: HTMLAnchorElement) => {
              const image = document.getElementById('imagewrap' + (index));
              if (image !== null) {
                element.style.transform = `scale(1.02)`
                image.style.height = `20rem`;
                element.style.margin = `8px 0px`;
              }
              hovered.value = index;
            }}
            onMouseLeave$={(_: any, element: HTMLAnchorElement) => {
              const image = document.getElementById('imagewrap' + (index));
              if (image !== null) {
                element.style.transform = ``
                image.style.height = `16rem`;
                element.style.margin = ``;
               }
              hovered.value = -1
            }}
            key={meta.slug}
            href={`/blog/${meta.slug}`}
            class="rounded-xl bg-white shadow-2xl shadow-zinc-200 transition-all overflow-hidden z-0"
          >
            <div id={`imagewrap${index}`} class="h-64 transition-all object-contain overflow-hidden">{images[index]}</div>
            <div class='flex flex-col gap-2 p-2'>
              <span class="text-sm text-slate-600">
                {new Date(meta.created_at).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <div class="flex flex-1 flex-col">
                <span class="text-xl leading-[1.1] font-semibold text-black">
                  {meta.title}
                </span>
                <br />
                <span class="text-slate-500">{meta.description}</span>
              </div>
              <div>
                {/* <span>Oleh: {meta.authors.join(", ")}</span> */}
                <div class={styles.tagsWrap}>
                  {meta.categories.map((tag) => (
                    <div key={tag} class={styles.tagWrapper}>
                      <span class={styles.tag}>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <br />
          </Link>
        ))}
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title:
    'Blog | Bangun PC',
  meta: [
    {
      name: 'description',
      content:
        'Jelajahi dunia teknologi PC dengan blog komprehensif kami. Tetap terinformasi tentang tren terkini, baca ulasan perangkat keras secara mendalam, dan temukan tips dan trik berharga. ',
    },
  ],
};
