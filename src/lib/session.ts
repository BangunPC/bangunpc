// import 'server-only';
// import { JWTPayload, SignJWT, jwtVerify } from 'jose';
// import { createCookie } from '@/app/actions';

// const key = new TextEncoder().encode(process.env.SESSION_SECRET);

// const cookie = {
//   name: 'session',
//   duration: 24 * 60 * 60 * 1000 * 7, // 7 days
// };

// export async function encrypt(payload: JWTPayload) {
//   const enc = new TextEncoder();
//   const sessionKey = Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2, '0')).join(''); // Generates a 32-character hexadecimal string
//   const jwt = await new SignJWT({ ...payload, sessionKey })
//     .setProtectedHeader({ alg: 'HS256' })
//     .setIssuedAt()
//     .setExpirationTime('1week')
//     .sign(key);

//   return { sessionKey, jwt };
// }

// export async function decrypt(session: string) {
//   try {
//     const { payload } = await jwtVerify(session, key, {
//       algorithms: ['HS256'],
//     });
//     return payload;
//   } catch (error) {
//     return null;
//   }
// }

// export async function createBuildSession(userId: string = 'anonymous') {
//   const expires = new Date(Date.now() + cookie.duration);
//   const { sessionKey } = await encrypt({ userId, expires });

//   // Store or use the JWT if needed

//   await createCookie({
//     name: cookie.name,
//     value: sessionKey,
//     httpOnly: true,
//     sameSite: 'lax',
//     expires
//   })
// }
