import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Affiliate from '~/components/homepage/affiliate/affiliate';
import Banding from '~/components/homepage/banding/banding';
import Hero from '~/components/homepage/hero/hero';
import Jasa from '~/components/homepage/jasa/jasa';
import Komponen from '~/components/homepage/komponen/komponen';

export default component$(() => {
  return (
    <>
      <Hero />
      <Komponen />
      <Jasa />
      <Banding />
      <Affiliate />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Rakit PC Impianmu | Bangun PC',
  meta: [
    {
      name: 'description',
      content:
        'Solusi praktis dalam memilih dan merakit komponen-komponen PC sesuai dengan kebutuhan dan budget yang dimiliki yang terafiliasi dengan e-commerce di Indonesia',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://bangunpc.com/',
    },
    {
      property: 'og:title',
      content: 'Rakit PC Impianmu | Bangun PC',
    },
    {
      property: 'og:description',
      content:
        'Solusi praktis dalam memilih dan merakit komponen-komponen PC sesuai dengan kebutuhan dan budget yang dimiliki yang terafiliasi dengan e-commerce di Indonesia',
    },
    {
      property: 'og:image',
      content: 'https://bangunpc.pages.dev/meta.png',
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      property: 'twitter:url',
      content: 'https://bangunpc.com/',
    },
    {
      property: 'twitter:title',
      content: 'Rakit PC Impianmu | Bangun PC',
    },
    {
      property: 'twitter:description',
      content:
        'Solusi praktis dalam memilih dan merakit komponen-komponen PC sesuai dengan kebutuhan dan budget yang dimiliki yang terafiliasi dengan e-commerce di Indonesia',
    },
    {
      property: 'twitter:image',
      content: 'https://bangunpc.com/meta.png',
    },
  ],
};
