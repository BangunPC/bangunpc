import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="h-full w-full">
      <RakitSekarangSection />
      {/* <KatalogKomponenSection /> */}
      {/* <PilihLayananSection /> */}
    </main>
  );
}

function RakitSekarangSection() {
  return (
    <div className="flex items-center justify-center bg-slate-200 py-8 dark:bg-gray-800 tablet:py-32">
      <div className="mx-4 grid max-w-7xl gap-8 tablet:grid-cols-7">
        <div className="tablet:col-span-4  ">
          <div className="flex flex-col justify-center gap-6">
            <div className="m-auto flex w-fit rounded-3xl bg-blue-700 p-2 px-6 tablet:m-0">
              <p className="text-xl text-white">
                Rakit PC sesuai kebutuhan budget-mu
              </p>
            </div>
            <h1 className="m-auto max-w-[480px] text-5xl font-bold tablet:max-w-none">
              Bangun PC impianmu dengan <br />{" "}
              <span className="font-bold text-primary">MUDAH</span> {"dan "}
              <span className="font-bold text-primary">MURAH</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Rekomendasi komponen PC yang berkualitas tinggi <br /> dengan
              harga terbaik.
            </p>
            <Link
              href="/rakit"
              passHref
              className="m-auto tablet:m-0 tablet:mt-6"
            >
              <Button className="w-fit gap-2 bg-black p-5 hover:bg-zinc-900 ">
                <Image
                  src="/images/icon-computer.svg"
                  alt="icon-computer"
                  width={20}
                  height={20}
                />
                Rakit Sekarang
              </Button>
            </Link>
          </div>
        </div>
        <div className="-order-1 m-auto tablet:order-none tablet:col-span-3 tablet:m-0 tablet:w-full">
          <div className="flex tablet:mt-0">
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
  );
}

// function KatalogKomponenSection() {
//   return (
//     <div className="flex justify-center py-8 tablet:py-16">
//       <div className="mx-4 max-w-7xl grid-cols-7 gap-8 tablet:grid">
//         <div className="col-span-4 grid">
//           <div className="hidden tablet:block">
//             <Image
//               src="/images/mockup_group.svg"
//               alt="gambar mockup"
//               width={600}
//               height={600}
//             />
//           </div>
//         </div>
//         <div className="col-span-3 grid">
//           <div className="flex flex-col items-start justify-center gap-6">
//             <h3 className="text-4xl font-bold">
//               Temukan Komponen PC Favoritmu
//             </h3>
//             <p className="text-lg">
//               Kami hadir untuk membuat pengalaman merakit PC menjadi mudah,
//               tanpa ribet, dan profesional. Kami siap membantu Anda menemukan
//               solusi sesuai dengan kebutuhan dan anggaran Anda, serta memberikan
//               panduan dan dukungan yang dibutuhkan. Bersama kami, wujudkan
//               impian PC Anda!
//             </p>
//             <Button className="m-auto mt-0 w-fit gap-2 bg-black p-5 hover:bg-zinc-900 tablet:m-0 tablet:mt-6">
//               <Image
//                 src="/images/icon-cart.svg"
//                 alt="icon-computer"
//                 width={20}
//                 height={20}
//               />
//               Katalog Komponen PC
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PilihLayananSection() {
//   const cardLayanan = [
//     {
//       title: "Simulasi Rakit PC",
//       description:
//         "Cukup pilih komponen PC yang Anda inginkan di setiap kategori komponennya dan secara otomatis kompatibilitas antar komponennya sudah sesuai.",
//       icon: "/images/vector-rakit-pc.svg",
//     },
//     {
//       title: "Katalog",
//       description:
//         "Temukan komponen PC yang anda inginkan yang sudah terkategorisasi dan terafiliasi dengan marketplace yang ada di Indonesia.",
//       icon: "/images/vector-katalog.svg",
//     },
//     {
//       title: "Showcase",
//       description:
//         "Tempat untuk saling berbagi dan rakitan PC yang sudah pernah jadi ke sesama pengguna. Anda dapat menjadikannya sebagai referensi.",
//       icon: "/images/vector-showcase.svg",
//     },
//     {
//       title: "Blog",
//       description:
//         "Temukan insight menarik seputar teknologi terkini dan dikemas dengan bahasa yang mudah dipahami.",
//       icon: "/images/vector-blog.svg",
//     },
//   ];
//   return (
//     <div className="flex justify-center py-8 tablet:py-16">
//       <div className="mx-8 max-w-7xl gap-8 tablet:grid">
//         <h3 className="text-center text-4xl font-bold">
//           Pilihan Layanan untuk Anda
//         </h3>
//         <div className="mt-24 grid grid-cols-1 gap-4 tablet:grid-cols-4">
//           {cardLayanan.map((item, index) => (
//             <div key={index} className="mb-8 flex flex-col tablet:mb-0">
//               <div className="flex h-full flex-col gap-4 rounded-lg border border-zinc-900 bg-background p-4 dark:border-zinc-300 ">
//                 <div className="mx-auto -mt-12 flex h-fit w-fit items-center gap-2 rounded-full bg-primary">
//                   <Image
//                     src={item.icon}
//                     alt={item.title}
//                     width={60}
//                     height={60}
//                     className="p-3"
//                   />
//                 </div>
//                 <h3 className="text-center text-xl font-bold">{item.title}</h3>
//                 <p className="mx-2 text-lg">{item.description}</p>
//               </div>
//               <Button
//                 variant="outline"
//                 className="m-auto w-[72px] -translate-y-4 rounded-full border border-zinc-900 p-0 hover:bg-zinc-500 hover:text-white dark:border-zinc-300"
//               >
//                 <ArrowUpRight className="h-6 w-6" />
//               </Button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
