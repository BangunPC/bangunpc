import { refreshBuildSessionExpire } from '@/lib/build-session'
import { NextRequest, NextResponse } from 'next/server'

export async function simulasiMiddleware(req: NextRequest) {
  // Add specific middleware logic here
  // const cookie = req.cookies.get('b-session')
  // await createBuildSession({motherboard_product_id: 79, motherboard_product_detail_id: 121})
  // await updateBuildSessionData({ cpu_product_id: 51, cpu_product_detail_id: 60 })
  // await refreshBuildSessionExpire()
  // await deleteSession()
  
  await refreshBuildSessionExpire()
  // const buildData = await getBuildSessionData()
  
  const response = NextResponse.next()
  return response
}

export const config = {
  matcher: '/simulasi',
}
