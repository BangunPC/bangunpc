import Image from "next/image";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  const cardLayanan = [
    {
      title: "Simulasi Rakit PC",
      description:
        "Cukup pilih komponen PC yang Anda inginkan di setiap kategori komponennya dan secara otomatis kompatibilitas antar komponennya sudah sesuai.",
      icon: "/images/vector-rakit-pc.svg",
    },
    {
      title: "Katalog",
      description:
        "Temukan komponen PC yang anda inginkan yang sudah terkategorisasi dan terafiliasi dengan marketplace yang ada di Indonesia.",
      icon: "/images/vector-katalog.svg",
    },
    {
      title: "Showcase",
      description:
        "Tempat untuk saling berbagi dan rakitan PC yang sudah pernah jadi ke sesama pengguna. Anda dapat menjadikannya sebagai referensi.",
      icon: "/images/vector-showcase.svg",
    },
    {
      title: "Blog",
      description:
        "Temukan insight menarik seputar teknologi terkini dan dikemas dengan bahasa yang mudah dipahami.",
      icon: "/images/vector-blog.svg",
    },
  ];
  return (
    <main className="h-full w-full">
      <div className="flex items-center justify-center bg-slate-200 py-8 dark:bg-zinc-900 tablet:py-32">
        <div className="mx-4 max-w-7xl grid-cols-7 gap-8 tablet:grid">
          <div className="col-span-4 grid ">
            <div className="flex flex-col justify-center gap-6">
              <div className="flex w-fit rounded-3xl bg-blue-700 p-2 px-6 ">
                <p className="text-xl text-white">
                  Rakit PC sesuai dengan kebutuhan budget-mu.
                </p>
              </div>
              <h1 className="text-5xl font-bold">
                Bangun PC impianmu dengan <br />{" "}
                <span className="font-bold text-primary">MUDAH</span> dan{" "}
                <span className="font-bold text-primary">MURAH.</span>
              </h1>
              <p className="text-lg">
                Rekomendasi komponen PC yang berkualitas tinggi <br /> dengan
                harga terbaik.
              </p>
              <Button className="mt-0 w-fit gap-2 bg-black p-5 hover:bg-zinc-900 tablet:mt-6">
                <Image
                  src="/images/icon-computer.svg"
                  alt="icon-computer"
                  width={20}
                  height={20}
                />
                Rakit Sekarang
              </Button>
            </div>
          </div>
          <div className="col-span-3 grid w-full">
            <div className="mx-auto mt-5 flex tablet:mt-0">
              <Image
                src="/images/components.svg"
                alt="components"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-slate-50 py-8 dark:bg-secondary tablet:py-16">
        <div className="mx-4 max-w-7xl grid-cols-7 gap-8 tablet:grid">
          <div className="col-span-4 grid">
            <div className="hidden tablet:block">
              <Image
                src="/images/mockup_group.svg"
                alt="gambar mockup"
                width={600}
                height={600}
              />
            </div>
          </div>
          <div className="col-span-3 grid">
            <div className="flex flex-col items-start justify-center gap-6">
              <h3 className="text-4xl font-bold">
                Temukan Komponen PC Favoritmu
              </h3>
              <p className="text-lg">
                Kami hadir untuk membuat pengalaman merakit PC menjadi mudah,
                tanpa ribet, dan profesional. Kami siap membantu Anda menemukan
                solusi sesuai dengan kebutuhan dan anggaran Anda, serta
                memberikan panduan dan dukungan yang dibutuhkan. Bersama kami,
                wujudkan impian PC Anda!
              </p>
              <Button className="mt-0 w-fit gap-2 bg-black p-5 hover:bg-zinc-900 tablet:mt-6">
                <Image
                  src="/images/icon-cart.svg"
                  alt="icon-computer"
                  width={20}
                  height={20}
                />
                Katalog Komponen PC
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-slate-50 py-8 dark:bg-secondary tablet:py-16">
        <div className="mx-8 max-w-7xl gap-8 tablet:grid">
          <h3 className="text-center text-4xl font-bold">
            Pilihan Layanan untuk Anda
          </h3>
          <div className="grid grid-cols-1 gap-4 tablet:grid-cols-4 mt-24">
            {cardLayanan.map((item, index) => (
              <div key={index} className="flex flex-col gap-4 p-4 bg-white h-[96] w-[96] border-2 rounded-lg border-zinc-900 mb-8 tablet:mb-0">
                <div className="flex -mt-12 w-fit h-fit bg-primary items-center mx-auto rounded-full gap-2">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="p-3"
                  />
                </div>
                <h3 className="text-xl font-bold text-center">{item.title}</h3>
                <p className="text-lg mx-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
