
"use client";

import { use } from "react";
import { KategoriList } from "./KategoriList";

const KategoriPage = (props: {
    params: Promise<{ 
      isCompatibilityChecked: boolean | null; 
      kategori: string; 
      noTopH: boolean | null; 
      onSuccess?: () => void }>
  }
) => {
  const params = use(props.params)
  return (
    <KategoriList params={params}/>
  );
};

export default KategoriPage;