import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import styles from './posts.module.css';
import Image1 from '/src/content/images/1.webp?jsx';
import Image2 from '/src/content/images/2.webp?jsx';
import SearchBox from '~/components/common/search-box';

const images = [<Image1 key={1} />, <Image2 key={2} />];

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
  return (
    <div>
      <aside class="w-full max-w-7xl m-auto top-4 sticky z-10">
        <div class="w-80 ml-auto my-4 mr-4 drop-shadow-sm">
          <SearchBox placeholder='Cari entri blog yang ingin kamu baca' />
        </div>
      </aside>
      <main class={styles.wrap}>
        {metas.value.map((meta, index) => (
          <Link key={meta.slug} href={`/blog/${meta.slug}`} class={styles.card}>
            <div class={[styles.cardImage, 'transition-transform hover:scale-105']}>{images[index]}</div>
            <span class="text-sm text-slate-600">
              {new Date(meta.created_at).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <div class="flex flex-1 flex-col hover:text-main-color">
              <span class="text-xl leading-[1.1] font-semibold mb-2">
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
            <br />
          </Link>
        ))}
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title:
    'BangunPC Tech Blog: Stay Updated on the Latest Trends, Reviews, and Tips',
  meta: [
    {
      name: 'description',
      content:
        'Explore the world of PC technology with our comprehensive blog. Stay informed about the latest trends, read in-depth hardware reviews, and discover valuable tips and tricks. Enhance your gaming experience, optimize performance, and troubleshoot issues with expert insights and industry updates. ',
    },
  ],
};
