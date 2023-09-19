import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://onawoodgnwkncueeyusr.supabase.co";
const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uYXdvb2RnbndrbmN1ZWV5dXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUzMzcxNTYsImV4cCI6MTk5MDkxMzE1Nn0.dT6SgSvYkFmsA4XZYa2hIDilroAo1Jjsu3ddOvfzP1s";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
    db: {
        schema: "product",
    },
    auth: {
        persistSession: true,
    },
});
