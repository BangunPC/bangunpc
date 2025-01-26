export const runtime = "edge"

import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { createSupaServerClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { Database } from '@/lib/schema'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
const BUILD_SESSION_COOKIE_NAME = 'b-session'
 
type SessionPayload = {
  sessionId: number;
  expiresAt: Date
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(encryptSession: string) {
  try {
    const { payload } = await jwtVerify(encryptSession, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    return { error: 'Failed to verify session' }
  }
}

export async function getBuildSessionId() {
  const cookieStore = await cookies()
  const encryptSession = cookieStore.get(BUILD_SESSION_COOKIE_NAME)?.value!
  const decryptSession = await decrypt(encryptSession)
  
  return decryptSession.sessionId as number | undefined
}

export async function createBuildSession(buildData: Database["pc_build"]["Tables"]["builds"]["Insert"], userId?: string) {
  // TODO: Get userId from supabase auth session
  
  // Create a PC build in database
  const supabase = await createSupaServerClient()
  const { data: buildResponse, error } = await supabase
    .schema('pc_build')
    .from('builds')
    .insert(buildData)
    .select('id')
    .single()
  
  // Create a session in database
  const buildId = buildResponse?.id  

  if(buildId) {
    const { data: sessionResponse } = await supabase
      .schema('pc_build')
      .from('session_builds')
      .insert({ build_id: buildId, user_id: userId })
      .select('id')
      .single()
      
    if(sessionResponse) {
      const sessionId = sessionResponse.id
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
     
      // Encrypt the session ID
      const session = await encrypt({ sessionId, expiresAt })
     
      // Store the session in cookies for optimistic auth checks
      const cookieStore = await cookies()
      cookieStore.set(BUILD_SESSION_COOKIE_NAME, session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
      })
    }
  }
}

export async function refreshBuildSessionExpire() {
  // Call this for each simulasi page is accessed
  const supabase = await createSupaServerClient()
  const sessionId = await getBuildSessionId()
  
  if (!sessionId) 
    return { error: 'Session id is not found' }
 
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const currentTimestamp = new Date().toISOString()

  // Update expires in DB too
  const { error } = await supabase 
    .schema('pc_build') 
    .from('session_builds') 
    .update({ last_accessed_at: currentTimestamp, expires_at: expires.toISOString() }) 
    .eq('id', sessionId)

  if(error)
    return { error: error.message }
  
  const cookieStore = await cookies()
  cookieStore.set(BUILD_SESSION_COOKIE_NAME, cookieStore.get(BUILD_SESSION_COOKIE_NAME)?.value!, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })

  return { error: null }
}

export async function getBuildSessionData() {
  const supabase = await createSupaServerClient()
  const sessionId = await getBuildSessionId()

  if(!sessionId) return null

  const { data: buildResponse, error: buildError } = await supabase
    .schema('pc_build')
    .from('session_builds')
    .select(`
        v_builds(cpu, gpu, motherboard, power_supply, casing, cpu_cooler, internal_storages, memories, monitors, total_price)
      `)
    .eq('id', sessionId)
    .single()
  
  if (buildError)
      return { data: null, error:buildError }
      
  return { data: buildResponse?.v_builds, error: null}
}

async function getBuildIdSession() {
  const supabase = await createSupaServerClient()
  const sessionId = await getBuildSessionId()

  if(!sessionId)
     return null

  const { data, error } = await supabase
    .schema('pc_build')
    .from('session_builds')
    .select('build_id')
    .eq('id', sessionId)
    .single()
  
  if (error)
    return null
      
  return data.build_id
}

export async function updateBuildSessionData(buildData: Database["pc_build"]["Tables"]["builds"]["Update"]) {
  const supabase = await createSupaServerClient()
  const buildId = await getBuildIdSession()

  if(!buildId)
    return { error: 'Build id is not found' }

  const { error: buildError } = await supabase
    .schema('pc_build')
    .from('builds')
    .update(buildData)
    .eq('id', buildId)
  
  if(buildError) 
    return { error: buildError.message }
  
  const { error: refreshError } = await refreshBuildSessionExpire()
  
  if(refreshError) 
    return { error: refreshError }
  else 
    return { error: null }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  const supabase = await createSupaServerClient()
  const sessionId = await getBuildSessionId()

  if (!sessionId) 
    return false

  // Get current buildId Session
  const buildId = await getBuildIdSession()

  if(!buildId)
    return false

  // Remove build data that automatically will cascade delete build data too
  const { error: buildError } = await supabase
    .schema('pc_build')
    .from('builds')
    .delete()
    .eq('id', buildId)

  if(buildError)
    return false

  cookieStore.delete(BUILD_SESSION_COOKIE_NAME)
  return true
}