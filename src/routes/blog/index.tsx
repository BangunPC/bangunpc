import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useBlog = routeLoader$(async () => {
  const modules = import.meta.glob('/src/blog/*.mdx', { eager: true })

  const posts: any[] = [];

  for (const path in modules) {
    // @ts-ignore
    const post = modules[path].default().children.type();
    posts.push(post)
  }

  return posts;
})

export const useFrontmatter = routeLoader$(async () => {
  const modules = import.meta.glob('/src/blog/*.mdx', { eager: true })

  const posts: Post[] = [];

  for (const path in modules) {
    // @ts-ignore
    const post = modules[path].frontmatter
    posts.push(post)
  }

  return posts;
})

export default component$(() => {
  const data = useBlog();
  const meta = useFrontmatter();
  return (
    <div class='max-w-[680px] mx-auto '>
      {data.value.map((t, index) => <>
        <h3 class='font-extrabold'>{meta.value[index].title}</h3> <br /> <h4>{meta.value[index].description}</h4> <h5>Oleh : {meta.value[index].authors}</h5> <div class='font-serif'>{t}</div></>)}
    </div>
  )
});