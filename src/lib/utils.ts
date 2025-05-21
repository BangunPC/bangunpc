import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
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
const storagePcImageurl = "/storage/v1/object/public/public-images/pc-builds/";

export const componentImage = function (component: any) {
  return `${supabaseUrl}${storageImageurl}${component.product_id}/${component.image_filenames[0]}`;
};

export const productImage = function (product_id: number, filename: string) {
  return `${supabaseUrl}${storageImageurl}${product_id}/${filename}`;
};

export const pcImage = function (pc_id: number, filename: string) {
  return `${supabaseUrl}${storagePcImageurl}${pc_id}/${filename}`;
};

// Secure parameter validation
export const validatePage = (value: string | undefined) => {
  const num = Number(value);
  return Number.isInteger(num) && num >= 1 ? num : 1;
};

export const validatePerPage = (value: string | undefined) => {
  const num = Number(value);
  const options = [10, 20, 30, 40, 50];
  return options.includes(num) ? num : 20;
};

export const validateStringQuery = (value: string | undefined): string => {
  if (value === null || value === undefined) {
    return '';
  }
  
  return String(value).slice(0, 100);
};

export function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}