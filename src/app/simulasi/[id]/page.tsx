"use client";

import { Suspense, use, useMemo } from "react";
import useSWR from "swr";
import { ApiPaths, fetchWithId } from "@/lib/api";
import { ComponentStorageType } from "@/lib/storage_helper";
import { CategoryEnum, ComponentDetail } from "@/lib/db";
import { productImage } from "@/lib/utils";
import { v4 as uuidv4 } from 'uuid';
import SimulasiPage from "../page";

export type CommonRakitanDataType = {
  product_id: number;
  name: string;
  slug: string;
  image_filename: string;
  product_detail_id: number;
  marketplace_id: number;
  price: number;
  datail: ComponentDetail;
};

const RakitanDetailPage = (props: {params: Promise<{ id: number }>}) => {
  const params = use(props.params)
  const { data, isLoading, error } = useSWR(
    [ApiPaths.viewRakitan, params.id],
    ([url, id]) => fetchWithId(url, id),
  );
  console.log(`params: ${JSON.stringify(data)}`);

  const dataParsed = useMemo(() => {
    if (data && typeof data !== "string" && data.data) {
      if (data.data[0]) {
        const rakitan = data.data[0];

        const build_id = rakitan.build_id;
        const total_price = rakitan.total_price;
        // const user_build_id = rakitan.user_build_id;

        const cpu = rakitan.cpu as CommonRakitanDataType;
        const cpu_cooler = rakitan.cpu_cooler as CommonRakitanDataType;
        const gpu = rakitan.gpu as CommonRakitanDataType;
        const internal_storages = rakitan.internal_storages as CommonRakitanDataType[];
        const memories = rakitan.memories as CommonRakitanDataType[];
        const monitors = rakitan.monitors as CommonRakitanDataType;
        const motherboard = rakitan.motherboard as CommonRakitanDataType;
        const power_supply = rakitan.power_supply as CommonRakitanDataType;
        const casing = rakitan.casing as CommonRakitanDataType;

        return {
          build_id,
          total_price,
          // user_build_id,
          cpu,
          cpu_cooler,
          gpu,
          internal_storages,
          memories,
          monitors,
          motherboard,
          power_supply,
          casing,
        };
      }
    }
    return undefined;
  }, [data]);

  function commonDataToComponentStorageType(
    category: CategoryEnum,
    data?: CommonRakitanDataType,
  ): ComponentStorageType | undefined {
    if (!data) return undefined;
    return {
      storageId: uuidv4(),
      id: data.product_id.toString(),
      name: data.name,
      price: data.price,
      image: productImage(data.product_id, data.image_filename),
      category: category,
      quantity: 1,
      slug: data.slug,
      detail: data.datail
    };
  }

  const compParams = {
    params,
    cpu: commonDataToComponentStorageType(
      CategoryEnum.CPU,
      dataParsed?.cpu,
    ),
    cpu_cooler: commonDataToComponentStorageType(
      CategoryEnum.Cooler,
      dataParsed?.cpu_cooler,
    ),
    gpu: commonDataToComponentStorageType(
      CategoryEnum.GPU,
      dataParsed?.gpu,
    ),
    internal_storages: dataParsed?.internal_storages.map(
      (d) => commonDataToComponentStorageType(CategoryEnum.Storage, d)!,
    ),
    memories: dataParsed?.memories.map(
      (d) => commonDataToComponentStorageType(CategoryEnum.Memory, d)!,
    ),
    monitors: commonDataToComponentStorageType(
      CategoryEnum.PSU,
      dataParsed?.monitors,
    ),
    motherboard: commonDataToComponentStorageType(
      CategoryEnum.Motherboard,
      dataParsed?.motherboard,
    ),
    power_supply: commonDataToComponentStorageType(
      CategoryEnum.PSU,
      dataParsed?.power_supply,
    ),
    casing: commonDataToComponentStorageType(
      CategoryEnum.Casing,
      dataParsed?.casing,
    ),
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {dataParsed && (
        <>
          <Suspense>
            <SimulasiPage params={compParams} />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default RakitanDetailPage;
