import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";

export default async function SignOutPage() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}
