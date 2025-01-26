import { corsMiddleware } from './middlewares/corsMiddleware'
import { simulasiMiddleware } from './middlewares/simulasiMiddleware'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  // Apply the CORS middleware 
  let response = corsMiddleware(req) 

  // Check if the request is for the specific path 
  if (req.nextUrl.pathname.startsWith('/simulasi')) { 
    // Apply the specific middleware and get the response 
    response = await simulasiMiddleware(req) || response 
  }
  
  return response || NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
