"use client";

import { useMemo } from "react";
import useSWR from "swr";
import { ApiPaths, fetchWithId } from "~/lib/api";

type CommonDataType = {
  product_id: number;
  name: string;
  slug: string;
  image_filename: string;
  product_detail_id: number;
  marketplace_id: number;
  price: number;
};

const RakitankuDetailPage = ({ params }: { params: { id: number } }) => {
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

        const cpu = rakitan.cpu as CommonDataType;
        const cpu_cooler = rakitan.cpu_cooler as CommonDataType;
        const gpu = rakitan.gpu as CommonDataType;
        const internal_storages = rakitan.internal_storages as CommonDataType;
        const memories = rakitan.memories as CommonDataType;
        const monitors = rakitan.monitors as CommonDataType;
        const motherboard = rakitan.motherboard as CommonDataType;
        const power_supply = rakitan.power_supply as CommonDataType;

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

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {dataParsed && (
        <div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <div className="aspect-square rounded-md bg-white dark:bg-gray-800" />
              <div className="text-lg">{dataParsed.build_id}</div>
            </div>
            <div className="text-lg">{JSON.stringify(dataParsed)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RakitankuDetailPage;
