'use server'
import { SignJWT, jwtVerify } from 'jose'
import { createSupaServerClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { BuildResponseData } from '@/lib/schema'
import { ComponentCategoryEnum, isMultiComponentCategoryEnum, multiComponentCategoryEnumToTable, ComponentPayload, SingleComponentUpdate as SingleComponentPayload } from './db'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
const BUILD_SESSION_COOKIE_NAME = 'b-session'
 
type SessionPayload = {
  sessionId: number
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
  } catch {
    return { error: 'Failed to verify session' }
  }
}

function getSingleComponentBuildPayload(
  componentCategoryEnum: ComponentCategoryEnum,
  componentPayload: ComponentPayload
) {
  // For single component
  let payload: Partial<SingleComponentPayload> = {}

  switch (componentCategoryEnum) {
    case ComponentCategoryEnum.CPU:
      payload = {
        cpu_product_id: componentPayload.product_id,
        cpu_product_detail_id: componentPayload.product_detail_id
      }
      break

    case ComponentCategoryEnum.GPU:
      payload = {
        gpu_product_id: componentPayload.product_id,
        gpu_product_detail_id: componentPayload.product_detail_id
      }
      break
    
    case ComponentCategoryEnum.Motherboard:
      payload = {
        motherboard_product_id: componentPayload.product_id,
        motherboard_product_detail_id: componentPayload.product_detail_id
      }
      break
    
    case ComponentCategoryEnum.PSU:
      payload = {
        power_supply_product_id: componentPayload.product_id,
        power_supply_product_detail_id: componentPayload.product_detail_id
      }
      break
    
    case ComponentCategoryEnum.Casing:
      payload = {
        casing_product_id: componentPayload.product_id,
        casing_product_detail_id: componentPayload.product_detail_id
      }
      break
  }

  return payload
}

export async function getBuildSessionId() {
  const cookieStore = await cookies()
  const encryptSession = cookieStore.get(BUILD_SESSION_COOKIE_NAME)?.value!
  const decryptSession = await decrypt(encryptSession)
  
  return decryptSession.sessionId as number | undefined
}

// To create build session, must be have 1 single or multi component
export async function createBuildSession(
  componentCategoryEnum: ComponentCategoryEnum,
  componentPayload: ComponentPayload
) {
  const supabase = await createSupaServerClient()
  
  // For single component
  const singleComponentPayload = getSingleComponentBuildPayload(componentCategoryEnum, componentPayload)

  // Create new PC build with single component in database + get buildId
  const { data: buildResponse, error } = await supabase
    .schema('pc_build')
    .from('builds')
    .insert(singleComponentPayload)
    .select('id')
    .single()

  if(error)
    return { error: error.message }

  const buildId = buildResponse!.id  

  // Create new PC build with multi component in database
  if(isMultiComponentCategoryEnum(componentCategoryEnum)) {
    const { error } = await supabase
      .schema('pc_build')
      .from(multiComponentCategoryEnumToTable(componentCategoryEnum))
      .insert({
        build_id: buildId,
        ...componentPayload
      })

    if(error)
      return { error: error.message }
  }
  
  // TODO: Get userId from supabase auth session
  const userId = null
  
  // Create a session in database
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
      return { data: null, error:buildError.message }
   
  return { data: buildResponse?.v_builds as BuildResponseData, error: null}
}

async function getSessionBuildId() {
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

export async function updateBuildSessionComponent(
  componentCategoryEnum: ComponentCategoryEnum, // To identify which component will be updated
  componentPayload: ComponentPayload,
  multiComponentId?: number // Only for multi component such monitors, memories, and internal storages
) {
  const supabase = await createSupaServerClient()
  const buildId = await getSessionBuildId()
  
  if(!buildId)
    return { error: 'Build id is not found' }

  // For multi component
  if (isMultiComponentCategoryEnum(componentCategoryEnum) && multiComponentId) {
    const targetTable = multiComponentCategoryEnumToTable(componentCategoryEnum)

    const { error: buildError } = await supabase
      .schema('pc_build')
      .from(targetTable)
      .update(componentPayload)
      .eq('id', multiComponentId)
    
    if (buildError)
      return { error: buildError.message }
  } else {
    // For single component
    const singleComponentPayload = getSingleComponentBuildPayload(componentCategoryEnum, componentPayload)

    const { error: buildError } = await supabase
      .schema('pc_build')
      .from('builds')
      .update(singleComponentPayload)
      .eq('id', buildId)
    
    if(buildError) 
      return { error: buildError.message }
  }
  
  const { error: refreshError } = await refreshBuildSessionExpire()
  
  if(refreshError) 
    return { error: refreshError }
  else 
    return { error: null }
}

export async function insertBuildSessionComponent(
  componentCategoryEnum: ComponentCategoryEnum, // To identify which component will be updated
  componentPayload: ComponentPayload,
) {
  const supabase = await createSupaServerClient()
  const buildId = await getSessionBuildId()
  
  if(!buildId)
    return { error: 'Build id is not found' }

  if (isMultiComponentCategoryEnum(componentCategoryEnum)) {
    // For multi component
    const targetTable = multiComponentCategoryEnumToTable(componentCategoryEnum)
    const newData = { build_id: buildId, ...componentPayload }

    const { error: buildError } = await supabase
      .schema('pc_build')
      .from(targetTable)
      .insert(newData)
    
    if (buildError)
      return { error: buildError.message }
  } else {
    // For single component, the component product id is updated in builds table
    const singleComponentPayload = getSingleComponentBuildPayload(componentCategoryEnum, componentPayload)

    const { error: buildError } = await supabase
      .schema('pc_build')
      .from('builds')
      .update(singleComponentPayload)
      .eq('id', buildId)

    if(buildError) 
      return { error: buildError.message }
  }
  
  const { error: refreshError } = await refreshBuildSessionExpire()
  
  if(refreshError) 
    return { error: refreshError }
  else 
    return { error: null }
}

export async function deleteBuildSessionComponent(
  componentCategoryEnum: ComponentCategoryEnum,
  multiComponentId?: number, // Only for multi component such monitors, memories, and internal storages
  isOnlyProductDetailId: boolean = false, // If just wanna delete productDetailId without delete productId
) {
  const supabase = await createSupaServerClient()
  const buildId = await getSessionBuildId()
  
  if(!buildId)
    return { error: 'Build id is not found' }
  
  if (isMultiComponentCategoryEnum(componentCategoryEnum) && multiComponentId) {
    // Specific for multi component, the data that's been modified in it's own table
    const targetTable = multiComponentCategoryEnumToTable(componentCategoryEnum)
    if(isOnlyProductDetailId) {
      // Update product_detail_id in builds table, set to null
      const { error } = await supabase
        .schema('pc_build')
        .from(targetTable)
        .update({ product_detail_id: null })
        .eq('id', multiComponentId)

      if(error) 
        return { error: error.message }
    } else {
      // Delete row data in target table that related with buildId
      const { error } = await supabase
        .schema('pc_build')
        .from(targetTable)
        .delete()
        .eq('id', multiComponentId)
      
      if(error) 
        return { error: error.message }
    }
  } else {
    const targetColumnDetail: Partial<SingleComponentPayload> = {}

    switch (componentCategoryEnum) {
      case ComponentCategoryEnum.CPU:
        targetColumnDetail.cpu_product_detail_id = null
        if (!isOnlyProductDetailId) 
          targetColumnDetail.cpu_product_id = null
        break

      case ComponentCategoryEnum.GPU:
        targetColumnDetail.gpu_product_detail_id = null
        if (!isOnlyProductDetailId) 
          targetColumnDetail.gpu_product_id = null
        break
      
      case ComponentCategoryEnum.Motherboard:
        targetColumnDetail.motherboard_product_detail_id = null
        if (!isOnlyProductDetailId) 
          targetColumnDetail.motherboard_product_id = null
        break
      
      case ComponentCategoryEnum.PSU:
        targetColumnDetail.power_supply_product_detail_id = null
        if (!isOnlyProductDetailId) 
          targetColumnDetail.power_supply_product_id = null
        break
      
      case ComponentCategoryEnum.Casing:
        targetColumnDetail.casing_product_detail_id = null
        if (!isOnlyProductDetailId) 
          targetColumnDetail.casing_product_id = null
        break

      default:
        return { error: "Invalid componentCategory" }
    }

    // Update component_product_id or component_product_detail_id in builds table, set to null
    const { error: buildError } = await supabase
      .schema('pc_build')
      .from('builds')
      .update(targetColumnDetail)
      .eq('id', buildId)
    
    if(buildError) 
      return { error: buildError.message }
  }
  
  const { error: refreshError } = await refreshBuildSessionExpire()
  
  if(refreshError) 
    return { error: refreshError }
  else 
    return { error: null }
}

export async function deleteBuildSession() {
  const cookieStore = await cookies()
  const supabase = await createSupaServerClient()
  const sessionId = await getBuildSessionId()

  if (!sessionId) 
    return false

  // Get current buildId Session
  const buildId = await getSessionBuildId()

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