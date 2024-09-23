import 'server-only'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const key = new TextEncoder().encode(process.env.SESSION_SECRET)

const cookie = {
  name: 'session',
  duration: 24 * 60 * 60 * 1000 * 7, // 7 days
}

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key)
}

export  async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    return null
  }
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + cookie.duration)
  const session = await encrypt({ userId, expires })

  cookies().set(cookie.name, session, { 
    httpOnly: true, 
    secure: true, 
    sameSite: 'lax', 
    path: '/', 
    expires
  })
}

export async function getSession() {
  const currentCookie = cookies().get(cookie.name)?.value!
  const session = await decrypt(currentCookie)

  if(!session?.userId)
    return null

  return { userID: session.userId }
}

export async function deleteSession() {
  cookies().delete(cookie.name)
}