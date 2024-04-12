import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import type { RequestHandler } from '@builder.io/qwik-city';

import Header from '~/components/starter/header/header';
import Footer from '~/components/starter/footer/footer';

import styles from './styles.css?inline';
import ModalKatalog from '~/components/modal-katalog/modal-katalog';
import { QwikCityNprogress } from '@quasarwork/qwik-city-nprogress';
import Feedback from '~/components/feedback';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);

  const loc = useLocation();

  const isNotIframe = loc.url.searchParams.get('iframe') !== 'true';

  return (
    <>
      {isNotIframe && <Header />}
      <QwikCityNprogress />
      <main class={isNotIframe && 'pt-16'}>
        {isNotIframe && <Feedback />}
        {isNotIframe && <ModalKatalog />}
        <Slot />
      </main>
      {isNotIframe && <Footer />}
    </>
  );
});
