import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createQueryString(
  searchParams: ReadonlyURLSearchParams,
  key: string,
  value: string,
) {
  const params = new URLSearchParams(searchParams);
  params.set(key, value);
  return params.toString();
}

export function removeQueryString(
  searchParams: ReadonlyURLSearchParams,
  key: string,
) {
  const params = new URLSearchParams(searchParams);
  params.delete(key);
  return params.toString();
}

export function batchUpdateQueryString({
  searchParams,
  add,
  remove,
}: {
  searchParams: ReadonlyURLSearchParams;
  add?: Record<string, string>[];
  remove?: string[];
}) {
  const params = new URLSearchParams(searchParams);
  if (add) {
    for (const item of add) {
      for (const key in item) {
        if (item[key] !== undefined) {
          params.set(key, item[key]!);
        }
      }
    }
  }
  if (remove) {
    for (const item of remove) {
      params.delete(item);
    }
  }
  return params.toString();
}

const supabaseUrl = "https://onawoodgnwkncueeyusr.supabase.co";
const storageImageurl = "/storage/v1/object/public/public-images/products/";

export const componentImage = function (component: any) {
  return `${supabaseUrl}${storageImageurl}${component.product_id}/${component.image_filenames[0]}`;
};

export const productImage = function (product_id: number, filename: string) {
  return `${supabaseUrl}${storageImageurl}${product_id}/${filename}`;
};
