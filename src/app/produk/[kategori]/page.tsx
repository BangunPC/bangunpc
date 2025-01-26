import { KategoriList } from "./KategoriList";

export default async function KategoriPage(props: {
    params: Promise<{ 
      isCompatibilityChecked: boolean | null; 
      kategori: string; 
      noTopH: boolean | null; 
      onSuccess?: () => void }>
  }
) {
  const params = await props.params
  
  return (
    <KategoriList
      params={params}
    />
  );
};