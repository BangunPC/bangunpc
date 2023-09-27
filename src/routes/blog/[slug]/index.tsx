import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$, useLocation } from "@builder.io/qwik-city";
import styles from "./blog.module.css";

export const useBlog = routeLoader$(async () => {
  const modules = import.meta.glob("/src/blog/*.mdx", { eager: true });

  const posts: Map<string, any> = new Map();

  for (const path in modules) {
    // @ts-ignore
    const post = modules[path].default().children.type();

    const slug = path
      .split("/")
      .pop()
      ?.replace(/\.[^/.]+$/, ""); // Remove the file extension using regular expression

    posts.set(slug!, post);
  }

  return posts;
});

export const useFrontmatter = routeLoader$(async () => {
  const modules = import.meta.glob("/src/blog/*.mdx", { eager: true });

  const posts: Map<string, any> = new Map();

  for (const path in modules) {
    // @ts-ignore
    const post = modules[path].frontmatter;

    const slug = path
      .split("/")
      .pop()
      ?.replace(/\.[^/.]+$/, ""); // Remove the file extension using regular expression

    posts.set(slug!, post);
  }

  return posts;
});

export default component$(() => {
  const data = useBlog();
  const meta = useFrontmatter();
  const slug = useLocation().params.slug;

  const title = meta.value.get(slug).title;
  const description = meta.value.get(slug).description;
  const authors = meta.value.get(slug).authors;

  return (
    <div class="max-w-[680px] mx-4 md:mx-auto mt-8 ">
      <span class={[styles.mdx]}>
        <>
          <h1 class="font-extrabold">{title}</h1>
          <h4>{description}</h4> <br />
          <h5>Oleh : {authors}</h5>
          <div class="font-serif">{data.value.get(slug)}</div>
        </>
      </span>
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
        name: "description",
        content: meta.description,
      },
    ],
  };
};
