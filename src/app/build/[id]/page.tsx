import { createClient } from "~/lib/supabase/server";
import { redirect } from "next/navigation";
import Component from "./client";
import { pcImage } from "~/lib/utils";

async function getDetails(id: number) {
  const client = createClient();
  const future = await Promise.all([
    client
      .schema("pc_build")
      .from("v_recommendation")
      .select()
      .eq("recommendation_id", id)
      .single(),
  ]).then(([dataResult]) => {
    const data = dataResult.data;
    if (!data) {
      redirect("/404");
    }
    return {
      data,
    };
  });
  return { ...future };
}

export default async function HasilPage({
  params,
}: {
  params: { id: number };
}) {
  //   const router = useRouter();
  const component = await getDetails(params.id);

  const { data } = component;

  // @ts-expect-error
  const imageUrls = data.image_filenames.map((image: string) =>
    pcImage(data!.build_id!, image),
  );

  return (
    <>
      {/* {JSON.stringify(data)} */}
      <Component
        data={data}
        imageUrls={imageUrls}
        price={data!.total_price!.toLocaleString("id-ID")}
      />
    </>
  );
}
// export async function generateMetadata() {
//     const params = useSearchParams();
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
