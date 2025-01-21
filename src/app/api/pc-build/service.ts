import { createSupaServerClient } from '@/lib/supabase/server'
import { PCBuildType } from './types'

async function handleSingleComponent(
  buildId: number,
  componentType: string,
  component: { slug: string; detailId?: number },
  isTemporary: boolean = false
) {
  const { data, error } = await createSupaServerClient()
    .schema('pc_build')
    .from('builds')
    .insert({
      id: buildId,
      component_type: componentType,
      component_slug: component.slug,
      detail_id: component.detailId,
      is_temporary: isTemporary,
      expires_at: isTemporary ? new Date(Date.now() + 24 * 60 * 60 * 1000) : null // 24 hours from now
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// async function handleMultipleComponents(
//   buildId: string,
//   componentType: string,
//   components: { slug: string detailId?: number }[],
//   isTemporary: boolean = false
// ) {
//   const { data, error } = await createSupaServerClient()
//     .schema('pc_build')
//     .from('pc_build_components')
//     .insert(
//       components.map(component => ({
//         build_id: buildId,
//         component_type: componentType,
//         component_slug: component.slug,
//         detail_id: component.detailId,
//         is_temporary: isTemporary,
//         expires_at: isTemporary ? new Date(Date.now() + 24 * 60 * 60 * 1000) : null
//       }))
//     )
//     .select()

//   if (error) throw error
//   return data
// }

/*
  1. Insert to builds
  2. Select generated build_id after insert
  3. 
*/
export class PCBuildService {
  // static async createBuild(data: PCBuildType, isTemporary: boolean = true) {
  //   const { data: buildData, error: buildError } = await createSupaServerClient()
  //     .schema('pc_build')
  //     .from('builds')
  //     .insert({
  //       expires_at: isTemporary ? new Date(Date.now() + 24 * 60 * 60 * 1000) : null
  //     })
  //     .select()
  //     .single()

  //   if (buildError) throw buildError

  //   const buildId = buildData.id
  //   const components: any[] = []

  //   // Handle single components
  //   if (data.cpu) {
  //     components.push()
  //   }
  //   if (data.mobo) {
  //     components.push(await handleSingleComponent(buildId, 'motherboard', data.mobo, isTemporary))
  //   }
  //   if (data.gpu) {
  //     components.push(await handleSingleComponent(buildId, 'gpu', data.gpu, isTemporary))
  //   }
  //   if (data.psu) {
  //     components.push(await handleSingleComponent(buildId, 'power_supply', data.psu, isTemporary))
  //   }
  //   if (data.casing) {
  //     components.push(await handleSingleComponent(buildId, 'case', data.casing, isTemporary))
  //   }

  //   // Handle array components
  //   if (data.storages && data.storages.length > 0) {
  //     components.push(...await handleMultipleComponents(buildId, 'storage', data.storages, isTemporary))
  //   }
  //   if (data.memories && data.memories?.length > 0) {
  //     components.push(...await handleMultipleComponents(buildId, 'memory', data.memories, isTemporary))
  //   }
  //   if (data.monitors && data.monitors?.length > 0) {
  //     components.push(...await handleMultipleComponents(buildId, 'monitor', data.monitors, isTemporary))
  //   }

  //   return { buildId, components }
  // }

  static async getBuild(buildId: number) {
    const { data, error } = await createSupaServerClient()
      .schema('pc_build')
      .from('v_builds')
      .select('*')
      .eq('build_id', buildId)

    if (error) throw error
    return data
  }
}

//   // Cleanup expired temporary builds
//   // static async cleanupExpiredBuilds() {
//   //   const now = new Date().toISOString()
    
//   //   // Delete expired components
//   //   await supabase
//   //     .from('pc_build_components')
//   //     .delete()
//   //     .eq('is_temporary', true)
//   //     .lt('expires_at', now)

//   //   // Delete expired builds
//   //   await supabase
//   //     .from('pc_builds')
//   //     .delete()
//   //     .eq('is_temporary', true)
//   //     .lt('expires_at', now)
//   // }
// }