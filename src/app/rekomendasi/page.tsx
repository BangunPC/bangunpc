import Image from "next/image";

const RekomendasiPage = () => {
  return (
    <div className="py-4">
      <div className="flex flex-col border-navbar border-b pb-2 mx-2">
        <span className="text-5xl font-semibold">
          Rekomendasi Rakitan PC dari Pengguna BangunPC
        </span>
        <span className="flex items-center gap-2 text-lg font-semibold">
          Cari dan pilih rakitan PC sesuai dengan kebutuhan dan keinginanmu
        </span>
      </div>
    </div>
  );
};

export default RekomendasiPage;

interface CardType {
  title: string;
  price: string;
  image: string;
  description: string;
};


const Card = ({ title, price, image, description, }: CardType) => {
  return (
  <div>
    <Image src={image} alt={title} width={240} height={240} />

  </div>
  )
}
