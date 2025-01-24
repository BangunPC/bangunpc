export const runtime = "edge";

import { redirect } from "next/navigation";

export default function RakitPage() {
  redirect("/rakit/budget");
}
