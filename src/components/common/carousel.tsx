import { ArrowRight } from "lucide-react";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CarouselProps {
  images: string;
  alt: string;
  title: string;
  description: string;
  className?: string;
}
const carousel = ({
  images,
  alt,
  title,
  description,
  className,
}: CarouselProps) => {
  return (
    <>
      <div
        className={`mx-4 mb-6 grid h-fit max-w-7xl grid-cols-1 items-center justify-center gap-12 rounded-xl bg-white px-12 py-8 shadow-xl tablet:mx-0 tablet:grid-cols-2 dark:bg-slate-700 ${className}`}
      >
        <div className="col-span-1 w-full transition-opacity duration-500">
          <Image
            src={images}
            alt={alt}
            width={700}
            height={500}
            className="rounded-xl object-cover"
          />
        </div>
        <div className="col-span-1 flex w-full flex-col items-center gap-10">
          <h3 className="text-center text-5xl font-semibold text-black">
            {title}
          </h3>
          <p className="text-lg text-gray-500">{description} </p>
          <Button
            className="w-fit rounded-full bg-white text-lg text-primary outline outline-1 outline-primary"
            variant={"outline"}
          >
            Lihat Selengkapnya <ArrowRight className="h-6 w-6 -rotate-45" />{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

export default carousel;
