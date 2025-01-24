export const runtime = "edge";

import { categorySlugToEnum, categoryEnumToView } from "@/lib/db";
import { v_spec } from "@/lib/produk_types";
import { createSupaServerClient } from "@/lib/supabase/server";
import { productImage } from "@/lib/utils";
import Component from "./client";
// import { redirect } from "next/navigation";

async function getDetails(params: any) {
  const kategori = params.kategori;
  const slug = params.slug;
  // const slug_split = slug_param.split("-");
  // const id = slug_split[slug_split.length - 1]!;
  // const slug = slug_param.replace(`-${id}`, "");

  const category = categorySlugToEnum[kategori]!;
  
  const client = createSupaServerClient();
  const future = await client
  .schema("product")
  .from(categoryEnumToView[category]!)
  .select()
  .eq("slug", slug)
  .single()
  .then(async (dataResult) => {
    const data = dataResult.data;
    
    if (!data) {
      console.log(dataResult.error);
      // redirect("/404");
    }

    const productDetailsResult = await client
      .schema("product")
      .from("v_product_details")
      .select()
      .eq("product_id", data?.product_id!);

    const product_details = productDetailsResult.data;

    return {
      data,
      product_details,
      review_urls: data?.review_urls! ?? [],
      spec_url: data?.spec_url!,
      name: data?.product_name!,
    };
  });

  return { ...future };
}

export default async function Page(
  props: {
    params: Promise<{ slug: string; kategori: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
  }
) {
  const params = await props.params;
  //   const router = useRouter();
  const component = await getDetails(params);

  const { data, product_details, review_urls, spec_url, name } = component;

  // @ts-expect-error
  const imageUrls = data.image_filenames.map((image: string) =>
    productImage(data!.product_id!, image),
  );

  const kategori = params.kategori;
  const category = categorySlugToEnum[kategori]!;

  const componentInfo = v_spec[kategori!]?.flatMap((v) => ({
    title: v[1],
    // @ts-expect-error
    value: data[v[0]],
  }));

  let lowest_price = undefined;
  if ((product_details?.length ?? -1) > 0)
    lowest_price =
      product_details
        ?.reduce((a, b) => ((a.price ?? 0) < (b.price ?? 0) ? a : b))
        .price?.toLocaleString("id-ID") ?? undefined;

  return (
    <>
      <Component
        name={name}
        data={data}
        product_details={product_details}
        imageUrls={imageUrls}
        componentInfo={componentInfo ?? []}
        lowest_price={lowest_price}
        type={kategori}
        category={category}
        spec_url={spec_url}
        review_urls={review_urls}
      />
    </>
  );
}
// export async function generateMetadata() {
//     const params = useSearchParams()!;
//   const type = params.get("type")!;

//   const component = await getDetails(params);

//   const data = component?.data;

//   const category = categoriesFromString[type]!;

//   // @ts-expect-error
//   const name = data?.["product_name"];

//   return (
//     <Head>
//       <title>{`${name} | BangunPC`}</title>
//       <meta
//         name="description"
//         content={`Cari ${categoriesFromEnum[category]} dari Tokopedia, Shopee, dan lainnya. Hanya di Bangun PC`}
//       />
//     </Head>
//   );
// };
