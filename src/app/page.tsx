"use client";

import { ChevronRight, ChevronLeft, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
import { Button } from "@/components/ui/button";
import Carousel from "@/components/common/carousel";
import CardPc from "@/components/common/card-pc";
import { SearchCommand } from "@/components/common/search-command";
import { useRouter } from "next/navigation";
// import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
// import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="h-full w-full">
      <HeroSection />
      <CarouselSection />
      <PacketPersonalComputerSection />
      {/* <RakitSekarangSection /> */}
      {/* <ProdukKomponenSection /> */}
      {/* <PilihLayananSection /> */}
      <CariKomponenSection />
      {/* <MudahMurahSection /> */}
      <SearchCommand />
    </main>
  );
}

// function RakitSekarangSection() {
//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: 20,
//       }}
//       animate={{
//         opacity: 1,
//         y: [20, -5, 0],
//       }}
//       transition={{
//         duration: 0.5,
//         ease: [0.4, 0.0, 0.2, 1],
//       }}
//       className="flex h-full min-h-screen items-center justify-center bg-slate-200 dark:bg-gray-800"
//     >
//       <HeroHighlight className="z-0 py-8 tablet:py-32">
//         <div className="mx-4 grid max-w-7xl gap-8 tablet:grid-cols-7">
//           <div className="tablet:col-span-4  ">
//             <div className="flex flex-col justify-center gap-6">
//               <Highlight className="m-auto flex w-fit rounded-3xl p-2 px-6 text-xl text-white tablet:m-0">
//                 Rakit PC sesuai kebutuhan budget-mu
//               </Highlight>
//               <h1 className="m-auto max-w-[480px] text-5xl font-bold tablet:max-w-none">
//                 Bangun PC impianmu dengan <br />{" "}
//                 <span className="font-bold text-primary">MUDAH</span> {"dan "}
//                 <span className="font-bold text-primary">MURAH</span>
//               </h1>
//               <p className="text-xl text-gray-600 dark:text-gray-300">
//                 Rekomendasi komponen PC yang berkualitas tinggi <br /> dengan
//                 harga terbaik.
//               </p>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: [20, -5, 0] }}
//                 transition={{
//                   duration: 0.7,
//                   ease: [0.4, 0.0, 0.2, 1],
//                 }}
//               >
//                 <Link
//                   href="/rakit/budget"
//                   
//                   className="m-auto tablet:m-0 tablet:mt-6"
//                 >
//                   <Button className="w-fit gap-4 rounded-xl bg-black p-7 text-lg hover:bg-zinc-900 ">
//                     <Image
//                       src="/images/icon-computer.svg"
//                       alt="icon-computer"
//                       width={24}
//                       height={24}
//                     />
//                     Rakit Sekarang
//                   </Button>
//                 </Link>
//               </motion.div>
//             </div>
//           </div>
//           <div className="-order-1 m-auto tablet:order-none tablet:col-span-3 tablet:m-0 tablet:w-full">
//             <motion.div
//               className="flex tablet:mt-0"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: [-20, 5, 0] }}
//               transition={{
//                 duration: 0.7,
//                 ease: [0.4, 0.0, 0.2, 1],
//               }}
//             >
//               <Image
//                 src="/images/components.svg"
//                 alt="components"
//                 width={400}
//                 height={400}
//               />
//             </motion.div>
//           </div>
//         </div>
//       </HeroHighlight>
//     </motion.div>
//   );
// }

function HeroSection() {
  const ref = useRef(null);
  const router = useRouter();

  // Parallax effect setup
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <>
      <section className="relative h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-[url('/images/hero-background.png')] bg-center bg-no-repeat bg-cover"
          style={{
            y: yBg
            // scale: 1
          }}
        />
        
        <div className="flex flex-col justify-center items-center h-full px-4 text-center text-white bg-black/45 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-5xl px-4" // Added max-width and padding
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              RAKIT PC IMPIANMU DENGAN MUDAH DAN MURAH
            </h1>
            <motion.p 
              className="font-light text-sm sm:text-base md:text-lg mb-8 md:mb-12 mx-auto md:max-w-xl sm:max-w-md px-4" // Added responsive text size and horizontal padding
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              merakit PC menjadi mudah, tanpa ribet, dan profesional sesuai dengan kebutuhan dan budget Anda.
            </motion.p>
            <motion.div 
              className="flex gap-3 sm:gap-4 flex-wrap justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <button 
                onClick={() => router.push("/rakit/budget")}
                className="bg-primary hover:bg-blue-700 active:scale-95 px-4 sm:px-4 py-3 rounded text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform text-sm sm:text-base">
                Rakit Sekarang
              </button>
              <button 
              onClick={() => router.push("/simulasi")}
              className="border-white bg-transparent border-2 text-white hover:bg-gray-100 active:scale-95 hover:text-gray-800 px-4 sm:px-4 py-3 rounded font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform text-sm sm:text-base">
                Simulasi Rakit PC
                {/* <span className="text-3xl">→</span> */}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function CarouselSection() {
  const carousel = [
    {
      src: "/images/image-173.png",
      alt: "image-173",
      title: "One-Stop Solution for Your PC Build Needs",
      description:
        "Merakit PC menjadi mudah, tanpa ribet, dan praktis. Sesuaikan dengan kebutuhan dan budget Anda.",
    },
    {
      src: "/images/image-173.png",
      alt: "image-173",
      title: "PC Essentials For Back To School",
      description:
        "PC yang sudah terafiliasi dengan marketplace favoritmu. Temukan komponen PC yang sesuai dengan kebutuhanmu.",
    },
    {
      src: "/images/image-173.png",
      alt: "image-173",
      title: "PC Essentials For Your Gaming Setup",
      description:
        "PC yang keren dan mempunyai fitur terbaik. Temukan komponen PC yang sesuai dengan kebutuhanmu.",
    },
  ];

  // const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % caraousel.length);
  //   }, 3000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // });

  // const goToNext = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % caraousel.length);
  // };
  // const goToPrev = () => {
  //   setCurrentIndex(
  //     (prevIndex) => (prevIndex + caraousel.length - 1) % caraousel.length,
  //   );
  // };
  // const goToIndex = (index: number) => {
  //   setCurrentIndex(index);
  // };
  // return (
  //   <>
  //     <div className="flex h-fit w-full items-center justify-center bg-[#f4f4f4] pb-10 text-center dark:bg-gray-800">
  //       <ChevronLeft className="relative right-8 h-12 w-12 cursor-pointer rounded-full bg-white p-2" onClick={goToPrev}/>
  //       {caraousel.map((item, index) => (
  //         <Caraousel
  //           images={item.src}
  //           alt={item.alt}
  //           title={item.title}
  //           description={item.description}
  //           key={index}
  //           className={ ` ${currentIndex === index ? "block" : "hidden "}` }
  //         />
  //       ))}
  //       <ChevronRight className="relative left-8 h-12 w-12 cursor-pointer rounded-full bg-white p-2" onClick={goToNext}/>
  //       <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2"></div>
  //     </div>
  //   </>
  // );

  const [currentIndex, setCurrentIndex] = useState(0);
  // const [direction, setDirection] = useState<"right" | "left">("right");

  useEffect(() => {
    const timer = setInterval(() => {
      // setDirection("right");
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carousel.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [carousel.length]);

  const goToNext = () => {
    // setDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carousel.length);
  };

  const goToPrev = () => {
    // setDirection("left");
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carousel.length) % carousel.length,
    );
  };

  const goToIndex = (index: number) => {
    // setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[#f4f4f4] pb-10 text-center dark:bg-gray-800">
      <div className="relative w-full">
        <ChevronLeft
          className="absolute left-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 drop-shadow-lg dark:bg-slate-700"
          onClick={goToPrev}
        />
        <ChevronRight
          className="absolute right-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 drop-shadow-lg dark:bg-slate-700"
          onClick={goToNext}
        />
        <div className=" w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {carousel.map((item, index) => (
              <div
                key={index}
                className="dark flex w-full flex-shrink-0 items-center justify-center"
              >
                <Carousel
                  images={item.src}
                  alt={item.alt}
                  title={item.title}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        {carousel.map((_, index) => (
          <Button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "w-7 bg-primary dark:bg-slate-700" : "bg-gray-300"
            }`}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

function PacketPersonalComputerSection() {
  const cardPc = [
    {
      src: "/images/image.png",
      alt: "pc 1",
      title: "Paket rakitan PC Spek Gaming dan Spek Editing 3D atau Animasi",
      cpu: "Intel Core i5-1135G7",
      gpu: "NVIDIA GTX 1650",
      categories: "Editing",
      price: 5000000,
    },
    {
      src: "/images/image.png",
      alt: "pc 2",
      title: "Paket rakitan PC Spek Gaming dan Spek Editing 3D atau Animasi",
      cpu: "Intel Core i9-9900F",
      gpu: "NVIDIA RTX 4090",
      categories: ["Gaming", "Editing 3D", "Animasi"],
      price: 60000000,
    },
    {
      src: "/images/image.png",
      alt: "pc 3",
      title: "Paket rakitan PC Spek Gaming dan Spek Editing 3D atau Animasi",
      cpu: "Intel Core i7-9700K",
      gpu: "NVIDIA RTX 4080",
      categories: ["Gaming", "Editing 3D", "Animasi"],
      price: 48990000,
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cardPc.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cardPc.length - 1 : prevIndex - 1,
    );
  };

  return (
    <>
      <div className="flex w-full dark:bg-gray-800">
        <div className="mx-auto flex max-w-7xl flex-row items-center justify-center gap-10">
          <div className="flex w-2/6 flex-col justify-center gap-8">
            <h3 className="text-5xl font-bold">
              Pilih paketan rakit PC yang cocok buat kamu
            </h3>
            <p className="text-md text-gray-500">
              Kami menyediakan berbagai rekomendasi rakitan PC yang
              dikategorisasi berdasarkan kebutuhan dan rentang budget untuk
              memudahkan Anda dalam merakit PC impian
            </p>
            <Button className="via-52% text-md w-fit gap-2 bg-gradient-to-r from-[#1637FD] from-0% via-[#2579F8] to-[#3480F3] to-100% dark:bg-gradient-to-r dark:from-[#1637FD] dark:via-[#2579F8] dark:to-[#3480F3] ">
              <ShoppingCart className="h-6 w-6 " />
              Lihat paket PC lainnya
            </Button>
          </div>
          <div className="relative flex w-4/6 items-center">
            <Button
              onClick={prevSlide}
              className="absolute -left-10 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white p-2 drop-shadow-lg dark:bg-slate-700"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              onClick={nextSlide}
              className="absolute -right-10 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white p-2 drop-shadow-lg dark:bg-slate-700"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div className="flex flex-col items-center">
              <div className="flex flex-row gap-4">
                {cardPc.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-fit flex-col rounded-lg bg-white  p-4 drop-shadow-md dark:border-white/20 dark:bg-slate-700"
                  >
                    <CardPc
                      src={item.src}
                      alt={item.alt}
                      title={item.title}
                      cpu={item.cpu}
                      gpu={item.gpu}
                      categories={item.categories}
                      price={item.price}
                    />
                  </div>
                ))}
              </div>
              <div className="mb-10 mt-4 flex space-x-2">
                {cardPc.map((_, index) => (
                  <Button
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === currentIndex ? "w-7 bg-blue-500" : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// function ProdukKomponenSection() {
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
//             <Link href="?produk=true"  legacyBehavior replace scroll={false}>
//               <Button className="m-auto mt-0 w-fit gap-2 bg-black p-5 hover:bg-zinc-900 tablet:m-0 tablet:mt-6">
//                 <Image
//                   src="/images/icon-cart.svg"
//                   alt="icon-computer"
//                   width={20}
//                   height={20}
//                 />
//                 Produk Komponen PC
//               </Button>
//             </Link>
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
//       title: "Produk",
//       description:
//         "Temukan komponen PC yang anda inginkan yang sudah terkategorisasi dan terafiliasi dengan marketplace yang ada di Indonesia.",
//       icon: "/images/vector-produk.svg",
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
//         <div className="mt-24 grid grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-12">
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

function CariKomponenSection() {
  const dataKomponen = [
    { title: "Motherboard", img: "/images/image.png", color: "bg-[#549498]" },
    { title: "CPU", img: "/images/image.png", color: "bg-[#39778E]" },
    { title: "Memory", img: "/images/image.png", color: "bg-[#1F6CBE]" },
    { title: "Storage", img: "/images/image.png", color: "bg-[#6683C2]" },
    // { title: "GPU", img: "/images/image.png" },
  ];
  return (
    <>
      <div className="mx-auto my-10 grid max-w-7xl grid-cols-5 gap-4 ">
        <div className="relative flex h-72 flex-col justify-between overflow-hidden rounded-lg bg-[#0356F7] p-6 text-white">
          {/* Persegi panjang diagonal */}
          <div className="absolute bottom-[0%] left-[0%] h-[40%] w-[200%] origin-bottom-left -rotate-45 transform bg-[#1536FC]"></div>

          {/* Konten */}
          <div className="relative z-10">
            <h2 className="mb-2 text-3xl font-bold">Cari</h2>
            <h2 className="text-3xl font-bold">Komponen</h2>
          </div>

          <p className="relative z-10 mt-4 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="col-span-4 flex justify-center gap-4">
          {dataKomponen.map((item, index) => (
            <div key={index} className={`h-72 rounded-md p-2 ${item.color}`}>
              <h5 className="pt-2 text-center text-2xl font-semibold text-white">
                {item.title}
              </h5>
              <p className=" text-center text-sm text-white underline">
                Lihat Selengkapnya
                <ChevronRight className="ml-2 inline-block h-3 w-3" />
              </p>
              <Image src={item.img} alt={item.title} width={200} height={200} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// function MudahMurahSection() {
//   return (
//     <>
//       <div className="mx-4 flex h-screen w-full flex-col items-center justify-center bg-[#f4f4f4] text-center dark:bg-gray-800 tablet:mx-0">
//         <div className="flex h-40 flex-row drop-shadow-xl">
//           <h1 className="via-52% bg-gradient-to-r from-[#1637FD] from-0% via-[#2579F8] to-[#3480F3] to-100% bg-clip-text text-center text-5xl font-bold text-transparent tablet:text-6xl">
//             Ayo Bangun PC Impianmu
//             <div className="h-6" />
//             {"dengan "}
//             <span className="drop-shadow-shine-blue-light dark:drop-shadow-shine-blue-dark font-bold text-primary">
//               MUDAH
//             </span>{" "}
//             {"dan "}
//             <span className="drop-shadow-shine-blue-light dark:drop-shadow-shine-blue-dark font-bold text-primary">
//               MURAH
//             </span>
//           </h1>
//         </div>
//         <div className="flex flex-row gap-4 pt-8">
//           <Link href="/rakit/budget" >
//             <Button className="via-52% h-14 w-60 gap-[5px] rounded-2xl bg-gradient-to-r from-[#1637FD] from-0% via-[#2579F8] to-[#3480F3] to-100% text-lg dark:bg-gradient-to-r dark:from-[#1637FD] dark:via-[#2579F8] dark:to-[#3480F3]">
//               <Image
//                 src="/images/icon-computer.svg"
//                 alt="icon-computer"
//                 width={24}
//                 height={24}
//                 className="mr-2 text-lg"
//               />
//               Ayo Rakit Sekarang
//             </Button>
//           </Link>
//           <Button
//             variant="raw"
//             className="h-14 bg-gradient-to-r from-[#1536FC] from-0% to-[#35AEF2] to-100% bg-clip-text text-lg text-transparent"
//           >
//             Tentang Kami
//             <Image
//               src="/images/arrow-down.svg"
//               alt="arrow-down"
//               width={20}
//               height={20}
//               className="ml-2"
//             />
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// }
