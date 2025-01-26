export const runtime = "edge";

import { serialize } from "cookie"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { createSupaServerClient } from "@/lib/supabase/server"
import { z } from "zod"
import { PCBuildSchema, PCBuildType } from "../types"

const MAX_AGE_SESSION = 60 * 60 * 24 * 7 // 7 days

// Check cookie session to get current build
export async function GET(_req: Request) {
  const supabase = await createSupaServerClient()
  const cookieStore = await cookies()
  const buildSessionKey = cookieStore.get('b-session')?.value
  let response = new Response(
    JSON.stringify({
      message: 'Build session is not found',
      data: null
    }), {
    status: 404,
  })
 
  if(buildSessionKey) {
    // Check whether session_key is valid
    const { data: pcBuild, error } = await supabase
      .schema("pc_build")
      .from("session_builds")
      .select("v_builds(motherboard, cpu, gpu, memories, power_supply, internal_storages, casing)")
      .eq('session_key', buildSessionKey)
      .single()

    if(!error) {      
      // update last accessed timestamp
      const currentTimestamp = new Date().toISOString()
      await supabase 
        .schema('pc_build') 
        .from('session_builds') 
        .update({ last_accessed_at: currentTimestamp }) 
        .eq('session_key', buildSessionKey)

      response = new Response(
        JSON.stringify({
          message: 'Success',
          data: pcBuild.v_builds
        }), {
        status: 200,
      })
    }
    else {
      console.log('error')
      response = new Response(
        JSON.stringify({
          message: error.message,
          data: null
        }), {
        status: 404,
      })
    }
  }  
  return response
}

// Create new session build (Call only at first)
export async function POST(req: Request) {
  try {
    const bodyRequest: PCBuildType = await req.json() 
    // Validate the request body against the schema
    const validatedData = PCBuildSchema.parse(bodyRequest);
    
    // If validation passes, proceed with your logic
    // For example, save to database, process the build, etc.
    
    console.log(validatedData)

    //? Get userId (only for authenticated user, but nullable for unauthenticated user)

    // Generate new build session key
    const sessionKey = Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b => b.toString(16).padStart(2, '0')).join('')

    const sessionCookie = serialize('b-session', sessionKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: MAX_AGE_SESSION,
      path: '/'
    })

    // Add a new build in DB if exists in client but empty in DB
    // const { data, error } = await createSupaServerClient()
    //   .schema("pc_build")
    //   .from("builds")
    //   .insert()
    //   .order("id")

    const response = NextResponse.json(
      { message: 'Build session has been created' }, 
      { status: 201 }
    )
    response.headers.set('Set-Cookie', sessionCookie)
    return response

  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        message: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({
      message: "JSON request body is required"
    }, { status: 400 });
  }

}