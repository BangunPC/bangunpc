export const runtime = "edge";

import { redirect } from "next/navigation";
import { createSupaServerClient } from "@/lib/supabase/server";

export default async function SignOutPage() {
  const supabase = await createSupaServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
