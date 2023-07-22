import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://onawoodgnwkncueeyusr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uYXdvb2RnbndrbmN1ZWV5dXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUzMzcxNTYsImV4cCI6MTk5MDkxMzE1Nn0.dT6SgSvYkFmsA4XZYa2hIDilroAo1Jjsu3ddOvfzP1s'

export const supabase = createClient(supabaseUrl, supabaseKey)