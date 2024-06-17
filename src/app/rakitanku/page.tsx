"use client";
import { Plus, Settings2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import PageTitle from "~/components/ui/page-title";
import useSWR from "swr";
import { ApiPaths, fetcher } from "~/lib/api";
import Link from "next/link";

export default function RakitankuPage() {
  const { data, isLoading, error } = useSWR(ApiPaths.rakitanku, fetcher);

  return (
    <div className="tablet:max-w-scree-tablet mx-auto max-w-screen-desktop">
      <PageTitle title="Rakitanku" />
      <div className="mb-2 flex flex-row gap-2">
        <Button variant="success" className="text-lg">
          <Plus className="mr-2" /> Tambah Rakitan
        </Button>
        <Button variant="default" className="text-lg">
          <Settings2 className="mr-2" /> Kelola Rakitan
        </Button>
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && typeof data !== "string" && data.data && (
        <div className="grid grid-cols-2 gap-2 tablet:grid-cols-4">
          {data.data.map((item) => (
            <Link
              href={`/simulasi/${item.build_id}`}
              key={item.build_id}
              className="flex max-w-72 flex-col gap-2 rounded-lg border bg-gray-50 p-2 shadow-bm hover:border-primary dark:hover:border-gray-300 dark:bg-gray-700"
            >
              <div className="aspect-square rounded-md bg-white dark:bg-gray-800" />
              <div className="text-lg">{item.title}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
