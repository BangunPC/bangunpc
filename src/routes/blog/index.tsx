import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import styles from "./posts.module.css";

export const useFrontmatter = routeLoader$(async () => {
  const modules = import.meta.glob("/src/content/blogs/*.mdx", { eager: true });

  const posts: Post[] = [];

  for (const path in modules) {
    // @ts-ignore
    const post: Post = modules[path].frontmatter;

    const slug = path
      .split("/")
      .pop()
      ?.replace(/\.[^/.]+$/, ""); // Remove the file extension using regular expression

    post.slug = slug;
    posts.push(post);
  }

  return posts;
});

export default component$(() => {
  const metas = useFrontmatter();
  return (
    <div class={styles.wrap}>
      {metas.value.map((meta) => (
        <Link key={meta.slug} href={`/blog/${meta.slug}`} class={styles.card}>
          <div>{meta.categories.join(", ")}</div>
          <span class="text-sm text-slate-600">
            {new Date(meta.created_at).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <div class="flex flex-1 flex-col justify-evenly">
            <span class="text-xl leading-[1.1] font-light">{meta.title}</span>
            <span class="font-semibold text-slate-500">{meta.description}</span>
          </div>
          <br />
        </Link>
      ))}
    </div>
  );
});
