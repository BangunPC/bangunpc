import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";

export const useFrontmatter = routeLoader$(async () => {
  const modules = import.meta.glob("/src/blog/*.mdx", { eager: true });

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
    <div class="max-w-[680px] mx-4 md:mx-auto mt-8 ">
      {metas.value.map((meta) => (
        <Link key={meta.slug} href={`/blog/${meta.slug}`}>
          <div class="card">
            <div>
              <span class="font-extrabold">{meta.title}</span>
              <br />
              <span>{meta.description}</span>
            </div>
            <br />
            <div>
              <span>Oleh: {meta.authors.join(", ")}</span>
              <div class="font-serif">{meta.slug}</div>
              <div>Categories: {meta.categories.join(", ")}</div>
              <div>Tags: {meta.tags.join(", ")}</div>
              <div>Date: {new Date(meta.date).toDateString()}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
});
