import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import tokopediaLogo from "/public/tokopedia_icon.png";
import tokopediaText from "/public/tokopedia_text.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Product = {
  product_detail_id: number;
  slug: string;
  product_name: string;
  image_path: string;
  brand_name: string;
  price: number;
  url: string;
  stock: number;
};

export default async function Page({ params }: { params: { slug: string } }) {
  const test = await supabase
    .schema("product")
    .from("v_all_product_list")
    .select("*")
    .eq("slug", params.slug);

  const items = test.data as Product[];

  return (
    <div>
      {items.map((item) => (
        <div key={item.product_detail_id} className="">
          <Image
            alt={item.product_name}
            width={375}
            height={375}
            src={
              "https://onawoodgnwkncueeyusr.supabase.co/storage/v1/object/public/product-images/" +
              item.image_path
            }
          />
          <span className="text-lg font-bold">
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(item.price)}{" "}
          </span>
          <br />
          <span className="text-sm">
            {item.stock == 0 ? "Stok kosong" : `${item.stock} tersisa`}
          </span>
          <br />
          <span>{item.product_name}</span> <br />
          <div className="w-fit text-sm font-semibold rounded-md bg-amber-700 text-input py-1 px-2">
            {item.brand_name}
          </div>
          <div className="h-4" />
          {item.url.startsWith("https://tokopedia") && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Link href={item.url}>
                    <Image
                      alt="tokopedia-link"
                      src={tokopediaLogo}
                      width={32}
                      height={32}
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <Image
                    alt="tokopedia-text"
                    src={tokopediaText}
                    width={(600 * 2) / 10}
                    height={(130 * 2) / 10}
                  />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      ))}
    </div>
  );
}
