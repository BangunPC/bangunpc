import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const params = useLocation().params;
  const slug = params.slug;
  const type = params.type;
  return <>
    <div>{slug} - {type}</div>
  </>;
});
