// import styles from './sidebar.module.css';

import { component$ } from '@builder.io/qwik';
// import SidebarFilter from "../sidebar-filter/sidebar-filter";
// import { TbFilterSearch } from "@qwikest/icons/tablericons";

type SidebarProps = {
  filters: Array<Filter>;
};

export type Filter = {
  title: string;
  items: Array<string>;
};

export default component$<SidebarProps>(() => {
  return <div></div>;
});

// export default component$<SidebarProps>(({filters}) => {

//     return (
//         <div class={styles.sidebar}>
//             <header class='font-bold header'>
//                 Filter <TbFilterSearch class='inline' />
//             </header>
//             <main class={styles.filterList}>
//                 {
//                     filters.map((filter) => (
//                         <SidebarFilter key={filter.title} title={filter.title} items={filter.items} />
//                     ))
//                 }
//             </main>

//         </div>
//     )
// })
