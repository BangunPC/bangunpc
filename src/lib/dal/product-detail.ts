import { redirect } from "next/navigation";
import { categoryEnumToView, ComponentCategoryEnum } from "../db"
import { createSupaServerClient } from "../supabase/server"

export async function getComponentProductDetail(slug: string, categoryEnum: ComponentCategoryEnum) {
    const supabase = await createSupaServerClient();
    const componentDetailResponse = await supabase
      .schema("product")
      .from(categoryEnumToView[categoryEnum]!)
      .select()
      .eq("slug", slug)
      .single()
      .then(async (dataResult) => {
        const componentDetail = dataResult.data
        
        if (!componentDetail) {
          // console.log(dataResult.error)
          redirect("/404")
        }

      const productDetailResponse = await supabase
        .schema("product")
        .from("v_product_details")
        .select()
        .eq("product_id", componentDetail?.product_id!)

      const productDetails = productDetailResponse.data

      return {
        componentDetail,
        productDetails
      }
    })

    return { ...componentDetailResponse }
  }