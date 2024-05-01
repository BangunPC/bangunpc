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
