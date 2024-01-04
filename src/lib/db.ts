import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { createServerClient } from "supabase-auth-helpers-qwik";
import { RequestEventBase, server$ } from "@builder.io/qwik-city";
import { noSerialize } from "@builder.io/qwik";

export const supabase = server$(function () {
  const outer_this: RequestEventBase = this
  const supabaseClient: SupabaseClient = createServerClient(
    this.env.get("SUPABASE_URL")!,
    this.env.get("SUPABASE_ANON_KEY")!,
    outer_this
  );

  return noSerialize(supabaseClient)!;
})