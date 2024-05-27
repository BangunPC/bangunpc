import { createClient } from "./supabase/client";

export class ApiPaths {
  static rakitanku = "api/rakitanku";
  static listRakitan = "api/rakitanku/list";
}

export const fetcher = async (url: string) => {
  switch (url) {
    case ApiPaths.rakitanku:
      return getRakitanku();
    case ApiPaths.listRakitan:
      return getListRakitan();
    default:
      return url;
  }
};

async function getRakitanku() {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema("pc_build")
    .from("user_builds")
    .select("*");
  return { data, error };
}

export async function getListRakitan() {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema("pc_build")
    .from("user_builds")
    .select("title, build_id");
  return { data, error };
}
