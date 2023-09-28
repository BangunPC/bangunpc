import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import styles from "./blog.module.css";
import Profile from "~/components/starter/icons/profile";

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

  const metadata: Post = meta.value.get(slug);

  // TODO(damywise): Add image
  const { title, description, date, categories, authors, tags } =
    metadata;
  const formattedDate = new Date(date).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div class="max-w-[680px] mx-4 md:mx-auto mt-8 ">
      <span class={[styles.mdx]}>
        <>
          <h1 class="font-extrabold text-left">{title}</h1>
          <h4>{description}</h4>
          <div class="flex flex-row">
            {/* author profile circle */}
            <Profile
              width="48"
              height="48"
              class="mr-2 p-2 rounded-full border-2"
            />
            <div class={styles.metaout}>
              <di>{authors}</di>
              <div class={styles.metain}>
                {"Published in "}
                <span class="mx-1">
                  {categories.map((category) => (
                    <a
                      key={category}
                      href={`/category/${category}`}
                      class="font-semibold"
                    >
                      {category}
                    </a>
                  ))}
                </span>
                {" · "}
                {formattedDate}
                {" · "}
                <span class="mx-1">
                  {tags.map((tag) => (
                    <a
                      key={tag}
                      href={`/tag/${tag}`}
                      class="pr-1 font-semibold"
                    >
                      #{tag}
                    </a>
                  ))}
                </span>
              </div>
            </div>
          </div>
          <br />
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
