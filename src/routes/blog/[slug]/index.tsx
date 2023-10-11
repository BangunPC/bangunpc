import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import styles from './blog.module.css';
import Profile from '~/components/starter/icons/profile';
import BigImage1 from '/src/content/images/1.webp?jsx';
import BigImage2 from '/src/content/images/2.webp?jsx';

const images = [<BigImage1 key={1} />, <BigImage2 key={2} />];

export const useBlog = routeLoader$(async () => {
  const modules = import.meta.glob('/src/content/blogs/*.mdx', { eager: true });

  const posts: Map<string, any> = new Map();

  for (const path in modules) {
    // @ts-ignore
    const post = modules[path].default().children.type();

    const slug = path
      .split('/')
      .pop()
      ?.replace(/\.[^/.]+$/, ''); // Remove the file extension using regular expression

    posts.set(slug!, post);
  }

  return posts;
});

export const useFrontmatter = routeLoader$(async () => {
  const modules = import.meta.glob('/src/content/blogs/*.mdx', { eager: true });

  const posts: Map<string, any> = new Map();

  for (const path in modules) {
    // @ts-ignore
    const post = modules[path].frontmatter;

    const slug = path
      .split('/')
      .pop()
      ?.replace(/\.[^/.]+$/, ''); // Remove the file extension using regular expression

    posts.set(slug!, post);
  }

  return posts;
});

export default component$(() => {
  const data = useBlog();
  const meta = useFrontmatter();
  const slug = useLocation().params.slug;

  const metadata: Post = meta.value.get(slug);
  const image = images[metadata.id - 1];

  // TODO(damywise): Add image
  const { title, description, created_at, categories, authors } = metadata;
  const formattedDate = new Date(created_at).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div class="max-w-[680px] mx-4 md:mx-auto mt-8 ">
      <article class={['prose md:prose-xl xl:prose-xl text-left', styles.mdx]}>
        <div>
          <h1 class="font-extrabold text-left">{title}</h1>
          <h4>{description}</h4>
          <div class="flex flex-row">
            {/* author profile circle */}
            <Profile
              width="48"
              height="48"
              class="w-12 h-12 mr-2 p-2 rounded-full border-2 my-auto"
            />
            <div class={styles.metaout}>
              <span>{authors}</span>
              <div
                class={[
                  styles.metain,
                  'flex-col sm:flex-row md:gap-1 leading-tight',
                ]}
              >
                <div class={styles.metacol}>
                  Published in
                  <span class="mx-1">
                    {categories.map((category, index) => (
                      <>
                        <a
                          key={category}
                          href={`/category/${category}`}
                          class="font-semibold"
                        >
                          {category}
                        </a>
                        {index !== categories.length - 1 ? ', ' : ''}
                      </>
                    ))}
                  </span>
                </div>
                <div>{formattedDate + ' '}</div>
              </div>
            </div>
          </div>
          <br />
          {image}
          <div class="font-serif">{data.value.get(slug)}</div>
          <div />
        </div>
      </article>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  const slug = params.slug;
  const metas = resolveValue(useFrontmatter);
  const meta: Post = metas.get(slug);
  return {
    title: meta.title,
    meta: [
      {
        name: 'description',
        content: meta.description,
      },
    ],
  };
};
