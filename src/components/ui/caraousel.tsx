import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";

interface CaraouselProps {
  images : string,
  alt: string,
  title : string,
  description : string,
  className?: string
}
const caraousel = ({images, alt, title, description, className} : CaraouselProps) => {
  return (
    <>
        <div className={`mx-4 tablet:mx-0 max-w-7xl h-fit bg-white grid grid-cols-1 tablet:grid-cols-2 rounded-xl gap-12 px-12 py-8 justify-center items-center shadow-xl mb-6 ${className}`} >
            <div className="transition-opacity duration-500 w-full col-span-1">
                <Image src= {images} alt={alt} width={700} height={500} className="object-cover rounded-xl" />
            </div>
            <div className="w-full col-span-1 flex flex-col gap-10 items-center">
                <h3 className="text-5xl font-semibold text-black text-center">{title}</h3>
                <p className="text-gray-500 text-lg">{description} </p>
                <Button className="w-fit text-lg outline bg-white outline-1 outline-primary text-primary rounded-full" variant={"outline"}>Lihat Selengkapnya <ArrowRight className="h-6 w-6 -rotate-45" /> </Button>
            </div>
        </div>
    </>
  )
}

export default caraousel