"use client";

import useSWR from "swr";
import { ApiPaths, fetchWithId } from "~/lib/api";

const RakitankuDetailPage = ({ params }: { params: { id: number } }) => {
  const { data, isLoading, error } = useSWR(
    [ApiPaths.viewRakitan, params.id],
    ([url, id]) => fetchWithId(url, id),
  );
  console.log(`params: ${JSON.stringify(data)}`);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && typeof data !== "string" && data.data && (
        <div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <div className="aspect-square rounded-md bg-white dark:bg-gray-800" />
              <div className="text-lg">{data.data.build_id}</div>
            </div>
            <div className="text-lg">{JSON.stringify(data.data.cpu)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RakitankuDetailPage;
