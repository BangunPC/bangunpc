export const runtime = "edge";

import { categorySlugToEnum } from "@/lib/db";
import { formatComponentSpec, v_spec } from "@/lib/produk_types";
import { productImage } from "@/lib/utils";
import KategoriSlugClient from "./client";
import { getComponentProductDetail } from "@/lib/dal/product-detail"
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string; kategori: string }>
  // searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? []
 
  return {
    // title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default async function Page(
  { params }: Props
) {
  const { slug, kategori } = await params;
  const categoryEnum = categorySlugToEnum[kategori]!;
  const component = await getComponentProductDetail(slug, categoryEnum);
  const { componentDetail, productDetails } = component
  const imageUrls = componentDetail!.image_filenames!.map((image: string) =>
    productImage(componentDetail!.product_id!, image),
  );

  const componentInfo = formatComponentSpec(
    categoryEnum,
    componentDetail)

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
