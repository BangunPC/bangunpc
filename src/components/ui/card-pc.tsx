import Image from "next/image";

interface CardPcProps {
  src: string;
  alt: string;
  title: string;
  cpu: string;
  gpu: string;
  categories: string | string[];
  price: number;
}

const cardPc = ({
  src,
  alt,
  title,
  cpu,
  gpu,
  categories,
  price,
}: CardPcProps) => {
    const rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  return (
    <>
      <div className="flex w-full h-fit flex-col gap-4">
        <Image
          src={src}
          alt={alt}
          width={150}
          height={350}
          className="rounded-lg object-cover"
        />
        <div className="flex flex-col gap-2">
          <h5 className="text-md font-bold">{title}</h5>
          <p className="text-sm">{cpu}</p>
          <p className="text-sm">{gpu}</p>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(categories) ? (
              categories.map((category, index) => (
                <span key={index} className="inline-block px-2 py-1 text-sm border rounded-full text-primary border-primary">
                  {category}
                </span>
              ))
            ) : (
              <span className="inline-block px-2 py-1 text-sm border rounded-full text-primary border-primary">
                {categories}
              </span>
            )}
          </div>
        </div>
        <hr className="h-px p-0 m-0 bg-black border-none"/>
        <div>
          <p>{rupiah}</p>
        </div>
      </div>
    </>
  );
};

export default cardPc;
