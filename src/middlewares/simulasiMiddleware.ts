import { NextRequest, NextResponse } from 'next/server';

export function simulasiMiddleware(req: NextRequest) {
  // Add specific middleware logic here
  const cookie = req.cookies.get('b-session')
  console.log(cookie);
  
  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next()
  return response;
}

export const config = {
  matcher: '/simulasi',
};
