import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import styles from "./blog.module.css";

export const useBlog = routeLoader$(async () => {
  const modules = import.meta.glob("/src/blog/*.mdx", { eager: true });

  const posts: any[] = [];

  for (const path in modules) {
    // @ts-ignore
    const post = modules[path].default().children.type();
    posts.push(post);
  }

  return posts;
});

export const useFrontmatter = routeLoader$(async () => {
  const modules = import.meta.glob("/src/blog/*.mdx", { eager: true });

  const posts: Post[] = [];

  for (const path in modules) {
    // @ts-ignore
    const post = modules[path].frontmatter;
    posts.push(post);
  }

  return posts;
});

export default component$(() => {
  const data = useBlog();
  const meta = useFrontmatter();
  return (
    <div class="max-w-[680px] mx-4 md:mx-auto mt-8 ">
      <span class={[styles.mdx]}>
        {data.value.map((t, index) => (
          <>
            <h1 class="font-extrabold">{meta.value[index].title}</h1>
            <h4>{meta.value[index].description}</h4> <br/>
            <h5>Oleh : {meta.value[index].authors}</h5>
            <div class="font-serif">{t}</div>
          </>
        ))}
      </span>
    </div>
  );
});
