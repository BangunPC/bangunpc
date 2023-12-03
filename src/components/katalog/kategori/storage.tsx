import { component$ } from '@builder.io/qwik';
import type { Storage } from './types';

export const storageHeaders = [
  'Brand Name',
  'Type',
  'Capacity (GB)',
  'Category Name',
  'Form Factor',
  'Interface',
];

export default component$<Storage>((props) => {
  const storage = props.storage;
  return (
    <>
      <td>{storage.brand_name ?? '-'}</td>
      <td>{storage.type ?? '-'}</td>
      <td>{storage.capacity_gb ?? '-'}</td>
      <td>{storage.category_name ?? '-'}</td>
      <td>{storage.form_factor ?? '-'}</td>
      <td>{storage.interface ?? '-'}</td>
    </>
  );
});
