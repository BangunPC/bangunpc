"use client";
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { block } from "million/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { AspectRatio } from "./ui/aspect-ratio";
import Link from "next/link";
import Image from "next/image";

type Props = {
  shimmer: boolean;

  product_detail_id: number;
  slug: string;
  product_name: string;
  image_path: string;
  brand_name: string;
  price: number;
  url: string;
  stock: number;
  category: string;
};

const CatalogueItemCard: React.FC<Props> = block((props) => {
  const {
    shimmer,

    product_detail_id,
    slug,
    product_name,
    image_path,
    brand_name,
    price,
    url,
    stock,
    category,
  } = props;

  console.log(shimmer);

  return (
    <Link aria-disabled href={shimmer ? "" : "/detail/" + slug + "/"}>
      <Card className={"shadow-lg "}>
        {shimmer ? (
          <div className="m-2 text-xs font-semibold w-fit rounded-md bg-gray-200 text-transparent text-start">
            kategori_mothbd
          </div>
        ) : (
          <div className="m-2 text-xs font-semibold w-fit text-start">
            {category}
          </div>
        )}
        <CardHeader>
          {shimmer ? (
            <AspectRatio ratio={1 / 1}>
              <div className="w-full h-full bg-gray-200 rounded-md"></div>
            </AspectRatio>
          ) : (
            <AspectRatio ratio={1 / 1}>
              <Image
                width={400}
                height={400}
                src={
                  "https://onawoodgnwkncueeyusr.supabase.co/storage/v1/object/public/product-images/" +
                  image_path
                }
                alt={product_name}
              />
            </AspectRatio>
          )}
        </CardHeader>
        <CardContent className="p-2 flex flex-col">
          <div className="flex flex-row justify-between">
            {shimmer ? (
              <div className="w-fit text-xs font-semibold rounded-md bg-gray-200 text-transparent py-1 px-2">
                TST
              </div>
            ) : (
              <div className="w-fit text-xs font-semibold rounded-md bg-amber-700 text-input py-1 px-2">
                {brand_name}
              </div>
            )}
          </div>
          <div>
            {shimmer ? (
              <>
                <div className="mt-1 w-40 h-4 text-sm line-clamp-2 text-start text-ellipsis rounded-md bg-gray-200 text-transparent "></div>
                <div className="mt-1 w-1/2 h-4 text-sm line-clamp-2 text-start text-ellipsis rounded-md bg-gray-200 text-transparent "></div>
              </>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-sm line-clamp-2 text-start text-ellipsis">
                      {product_name}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>{product_name}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="h-12 flex flex-col my-2 w-full">
            {shimmer ? (
              <div className="w-24 text-sm font-bold rounded-md bg-gray-200 text-transparent">
                Rp
              </div>
            ) : (
              <span className="w-full text-sm font-bold">
                Rp{price.toLocaleString("id-ID")}
              </span>
            )}
            <div className="w-full flex justify-between">
              <AspectRatio ratio={1} className="w-10 h-10 ml-auto">
                <button
                  aria-label="add to cart"
                  className="w-10 h-10 hover:bg-orange-500 hover:scale-110 hover:text-white active:text-white active:scale-90 active:bg-orange-500 hover:border-none transition-all justify-center border rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="m-auto"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 5l0 14"></path>
                    <path d="M5 12l14 0"></path>
                  </svg>
                </button>
              </AspectRatio>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
});

export default CatalogueItemCard;
