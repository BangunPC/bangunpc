export const runtime = "edge"

import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { createSupaServerClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
const supabase = createSupaServerClient()
 
type SessionPayload = {
  sessionId: string;
  expiresAt: Date
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

// export async function createSession(id: string = '') {
//   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 
//   // 1. Create a session in the database
//   if(buildSessionKey) {
//     // Check whether session_key is valid
//     const { data: pcBuild, error } = await supabase
//       .schema("pc_build")
//       .from("session_builds")
//       .select("v_builds(motherboard, cpu, gpu, memories, power_supply, internal_storages, casing)")
//       .eq('session_key', buildSessionKey)
//       .single()

//     if(!error) {      
//       // update last accessed timestamp
//       const currentTimestamp = new Date().toISOString()
//       await supabase 
//         .schema('pc_build') 
//         .from('session_builds') 
//         .update({ last_accessed_at: currentTimestamp }) 
//         .eq('session_key', buildSessionKey)

//       response = new Response(
//         JSON.stringify({
//           message: 'Success',
//           data: pcBuild.v_builds
//         }), {
//         status: 200,
//       })
//     }
//     else {
//       console.log('error')
//     }
//   }
 
//   const sessionId = data[0].id
 
//   // 2. Encrypt the session ID
//   const session = await encrypt({ sessionId, expiresAt })
 
//   // 3. Store the session in cookies for optimistic auth checks
//   const cookieStore = await cookies()
//   cookieStore.set('b-session', session, {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: 'lax',
//     path: '/',
//   })
// }

// export async function updateSession() {
//   const session = (await cookies()).get('b-session')?.value
//   const payload = await decrypt(session)
 
//   if (!session || !payload) {
//     return null
//   }
 
//   const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//   const currentTimestamp = new Date().toISOString()

//   // Update expires in DB too
//   await supabase 
//     .schema('pc_build') 
//     .from('session_builds') 
//     .update({ last_accessed_at: currentTimestamp, expires_at: expires.toDateString() }) 
//     .eq('session_key', buildSessionKey)
 
//   const cookieStore = await cookies()
//   cookieStore.set('session', session, {
//     httpOnly: true,
//     secure: true,
//     expires: expires,
//     sameSite: 'lax',
//     path: '/',
//   })
// }