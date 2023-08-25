'use client'
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

type Props = {
    name: string;
    price: number;
}

const CatalogueItemCard: React.FC<Props> = (props) => {
    const { name, price } = props

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <AspectRatio ratio={1 / 1}></AspectRatio>
            </CardHeader>
            <CardContent className="p-2 flex flex-col">
                <div>
                    <span className="text-sm">
                        {name}
                    </span>
                </div>
                <div className="h-12 flex flex-col my-2 w-full">
                    <span className="w-full text-sm font-bold">Rp{price.toLocaleString("id-ID")}</span>
                    <div className="w-full grid justify-end">

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
    );
};

export default CatalogueItemCard;
