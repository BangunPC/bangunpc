export const runtime = "edge";

import { categorySlugToEnum } from "@/lib/db";
import { v_spec } from "@/lib/produk_types";
import { productImage } from "@/lib/utils";
import KategoriSlugClient from "./client";
import { getComponentProductDetail } from "@/lib/dal/product-detail"

export default async function Page(
  props: {
    params: Promise<{ slug: string; kategori: string }>;
    // searchParams: Promise<Record<string, string | string[] | undefined>>;
  }
) {
  const { slug, kategori } = await props.params;
  const categoryEnum = categorySlugToEnum[kategori]!;

  //   const router = useRouter();
  const component = await getComponentProductDetail(slug, categoryEnum);

  const { componentDetail, productDetails } = component

  const imageUrls = componentDetail!.image_filenames!.map((image: string) =>
    productImage(componentDetail!.product_id!, image),
  );

  const componentInfo = v_spec[kategori!]?.flatMap((v) => ({
    title: v[1],
    // @ts-expect-error
    value: componentDetail[v[0]],
  }));

  let lowest_price = undefined;
  if ((productDetails?.length ?? -1) > 0)
    lowest_price =
      productDetails
        ?.reduce((a, b) => ((a.price ?? 0) < (b.price ?? 0) ? a : b))
        .price?.toLocaleString("id-ID") ?? undefined;

  return (
    <KategoriSlugClient
      name={componentDetail?.product_name!}
      data={componentDetail}
      product_details={productDetails}
      imageUrls={imageUrls}
      componentInfo={componentInfo ?? []}
      lowest_price={lowest_price}
      type={kategori}
      category={categoryEnum}
      spec_url={componentDetail?.spec_url!}
      review_urls={componentDetail?.review_urls!}
    />
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
