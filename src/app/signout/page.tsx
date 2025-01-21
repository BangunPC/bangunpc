import { redirect } from "next/navigation";
import { createSupaServerClient } from "@/lib/supabase/server";

export default async function SignOutPage() {
  const supabase = createSupaServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
