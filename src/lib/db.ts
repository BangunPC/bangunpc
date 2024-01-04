import { createClient } from "@supabase/supabase-js";
import { Database } from "./schema";

export const supabase = createClient<Database>(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON_KEY
  );

