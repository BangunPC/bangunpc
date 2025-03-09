'use server'

import { createSupaServerClient } from "../supabase/server";

export async function submitFeedback(message:string) {
  const supabase = await createSupaServerClient()
  const response = await supabase
    .from('feedbacks')
    .insert( {message: message })
  
  return { error: response.error?.message }
}