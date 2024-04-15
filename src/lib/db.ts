import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { createServerClient } from "supabase-auth-helpers-qwik";
import { RequestEventBase, server$ } from "@builder.io/qwik-city";
import { noSerialize } from "@builder.io/qwik";
import { Database } from "./schema";

export const getSupabaseServerClient = server$(function () {
  const outer_this: RequestEventBase = this
  const supabaseClient: SupabaseClient<Database> = createServerClient(
    this.env.get("PUBLIC_SUPABASE_URL")!,
    this.env.get("PUBLIC_SUPABASE_ANON_KEY")!,
    outer_this
  );

  return noSerialize(supabaseClient)!;
})

export const getSupabaseBrowserClient = () => {
  return createClient<Database>(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  )
}

const supabaseUrl = 'https://onawoodgnwkncueeyusr.supabase.co';
const storageImageurl = '/storage/v1/object/public/public-images/products/';

export const componentImage = function (component: any) {
  return `${supabaseUrl}${storageImageurl}${component.product_id}/${component.image_filenames[0]}`
}

export const productImage = function (product_id: number, filename: string) {
  return `${supabaseUrl}${storageImageurl}${product_id}/${filename}`
}