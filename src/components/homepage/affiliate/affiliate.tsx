import { component$ } from '@builder.io/qwik';
import styles from './affiliate.module.css';
import ShopeeSvg from './shopee-svg/shopee-svg';
import LazadaSvg from './lazada.svg?jsx';
import TokopediaSvg from './tokopedia.svg?jsx';
import BlibliSvg from './blibli-svg/blibli-svg';

export default component$(() => {
  return (
    <div id="affiliate" class={styles['affiliate-section']}>
      <header class={styles['affiliate-header']}>Affiliate Marketplace</header>
      <main class={styles['affiliate-main']}>
        <ShopeeSvg class={styles['shopee-svg']} />
        <LazadaSvg />
        <TokopediaSvg />
        <BlibliSvg />
      </main>
    </div>
  );
});
