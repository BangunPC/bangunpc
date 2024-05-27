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
    <div className="mx-auto max-w-screen-tablet">
      <PageTitle title="Rakitanku" />
      <div className="mb-2 flex flex-row gap-2">
        <Button className="bg-green-500 text-lg hover:bg-green-600">
          <Plus className="mr-2" /> Tambah Rakitan
        </Button>
        <Button className="bg-blue-500 text-lg hover:bg-blue-600">
          <Settings2 className="mr-2" /> Kelola Rakitan
        </Button>
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && typeof data !== "string" && data.data && (
        <div>
          {data.data.map((item) => (
            <Link
              href={`/rakitanku/${item.id}`}
              key={item.id}
              className="flex max-w-72 flex-col gap-2 rounded-lg bg-gray-50 p-2 shadow-bm border hover:border-gray-300 dark:bg-gray-700"
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
