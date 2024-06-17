"use client";

import { useMemo } from "react";
import useSWR from "swr";
import { ApiPaths, fetchWithId } from "~/lib/api";
import SimulasiPage from "../page";
import { ComponentStorageType } from "~/lib/storage_helper";
import { ComponentCategory } from "~/lib/db";
import { productImage } from "~/lib/utils";

export type CommonRakitanDataType = {
  product_id: number;
  name: string;
  slug: string;
  image_filename: string;
  product_detail_id: number;
  marketplace_id: number;
  price: number;
};

const RakitanDetailPage = ({ params }: { params: { id: number } }) => {
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
        const internal_storages =
          rakitan.internal_storages as CommonRakitanDataType;
        const memories = rakitan.memories as CommonRakitanDataType;
        const monitors = rakitan.monitors as CommonRakitanDataType;
        const motherboard = rakitan.motherboard as CommonRakitanDataType;
        const power_supply = rakitan.power_supply as CommonRakitanDataType;

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
        };
      }
    }
    return undefined;
  }, [data]);

  function commonDataToComponentStorageType(
    category: ComponentCategory,
    data?: CommonRakitanDataType,
  ): ComponentStorageType | undefined {
    if (!data) return undefined;
    return {
      id: data.product_id.toString(),
      name: data.name,
      price: data.price,
      image: productImage(data.product_id, data.image_filename),
      category: category,
      quantity: 1,
      slug: data.slug,
    };
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {dataParsed && (
        <>
          <SimulasiPage
            params={params}
            cpu={commonDataToComponentStorageType(
              ComponentCategory.CPU,
              dataParsed.cpu,
            )}
            cpu_cooler={commonDataToComponentStorageType(
              ComponentCategory.Cooler,
              dataParsed.cpu_cooler,
            )}
            gpu={commonDataToComponentStorageType(
              ComponentCategory.GPU,
              dataParsed.gpu,
            )}
            internal_storages={commonDataToComponentStorageType(
              ComponentCategory.Storage,
              dataParsed.internal_storages,
            )}
            memories={commonDataToComponentStorageType(
              ComponentCategory.Memory,
              dataParsed.memories,
            )}
            monitors={commonDataToComponentStorageType(
              ComponentCategory.PSU,
              dataParsed.monitors,
            )}
            motherboard={commonDataToComponentStorageType(
              ComponentCategory.Motherboard,
              dataParsed.motherboard,
            )}
            power_supply={commonDataToComponentStorageType(
              ComponentCategory.PSU,
              dataParsed.power_supply,
            )}
          />
        </>
      )}
    </div>
  );
};

export default RakitanDetailPage;
