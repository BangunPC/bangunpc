import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { createServerClient } from "supabase-auth-helpers-qwik";
import { RequestEventBase, server$ } from "@builder.io/qwik-city";
import { noSerialize } from "@builder.io/qwik";
import { Database } from "./schema";

export const supabase = server$(function () {
  const outer_this: RequestEventBase = this
  const supabaseClient: SupabaseClient<Database> = createServerClient(
    this.env.get("SUPABASE_URL")!,
    this.env.get("SUPABASE_ANON_KEY")!,
    outer_this
  );

  return noSerialize(supabaseClient)!;
})

const supabaseUrl = 'https://onawoodgnwkncueeyusr.supabase.co';
const storageUrl = '/storage/v1/object/public/product-images/';

export const componentImage = function (component: any) {
  return `${supabaseUrl}${storageUrl}${component.product_id}/${component.image_filenames[0]}`
}

export const productImage = function (product_id: number, filename: string) {
  return `${supabaseUrl}${storageUrl}${product_id}/${filename}`
}