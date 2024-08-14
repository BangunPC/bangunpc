"use client";

import { ChevronRight, ChevronLeft, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
// import Link from "next/link";
import { Button } from "~/components/ui/button";
import Carousel from "~/components/ui/carousel";
import CardPc from "~/components/ui/card-pc";
// import { HeroHighlight, Highlight } from "~/components/ui/hero-highlight";
// import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="h-full w-full">
      <HeroSection />
      <CarouselSection />
      <PacketPersonalComputerSection />
      {/* <RakitSekarangSection /> */}
      {/* <KatalogKomponenSection /> */}
      {/* <PilihLayananSection /> */}
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
//                   passHref
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
  return (
    <>
      <div className="mx-4 flex h-screen w-full flex-col items-center justify-center bg-[#f4f4f4] text-center dark:bg-gray-800 tablet:mx-0">
        <div className="flex flex-row drop-shadow-xl">
          <Image
            src="/images/vector-bintang.svg"
            alt="vector-bintang"
            width={36}
            height={30}
            className="relative -left-6 top-2 hidden tablet:block"
          />
          <Image
            src="/images/vector-bintang.svg"
            alt="vector-bintang"
            width={24}
            height={18}
            className="relative -left-20 top-8 hidden tablet:block"
          />
          <h1 className="via-52% bg-gradient-to-r from-[#1637FD] from-0% via-[#2579F8] to-[#3480F3] to-100% bg-clip-text text-center text-5xl font-bold leading-tight text-transparent tablet:text-6xl">
            One-Stop Solution for <br /> Your PC Build Needs
          </h1>
          <Image
            src="/images/vector-bintang.svg"
            alt="vector-bintang"
            width={36}
            height={30}
            className="relative -right-6 top-8 hidden tablet:block"
          />
        </div>
        <p className="pt-8 text-lg text-gray-500 dark:text-gray-300">
          Merakit PC menjadi mudah, tanpa ribet, dan profesional. <br />
          Sesuaikan dengan kebutuhan dan budget Anda.
        </p>
        <div className="flex flex-row gap-4 pt-8">
          <Link href="/rakit/budget" passHref>
            <Button className=" via-52% h-14 w-60 gap-[5px] bg-gradient-to-r from-[#1637FD] from-0% via-[#2579F8] to-[#3480F3] to-100% text-lg dark:bg-gradient-to-r dark:from-[#1637FD] dark:via-[#2579F8] dark:to-[#3480F3]">
              <Image
                src="/images/icon-computer.svg"
                alt="icon-computer"
                width={24}
                height={24}
                className="mr-2 text-lg"
              />
              Ayo Rakit Sekarang
            </Button>
          </Link>
          <Button
            variant="raw"
            className="h-14 bg-gradient-to-r from-[#1536FC] from-0% to-[#35AEF2] to-100% bg-clip-text text-lg text-transparent"
          >
            Temukan PC Impianmu
            <Image
              src="/images/arrow-down.svg"
              alt="arrow-down"
              width={20}
              height={20}
              className="ml-2"
            />
          </Button>
        </div>
        <p className="pt-16 text-lg text-gray-500 dark:text-gray-300">
          Terafiliasi dengan marketplace favorit kamu
        </p>
        <div className="flex flex-row gap-16 pt-8">
          <Image
            src="/images/logo-blibli.svg"
            alt="logo blibli"
            width={120}
            height={120}
            className="grayscale"
          />
          <Image
            src="/images/logo-shopee.svg"
            alt="logo shopee"
            width={120}
            height={120}
            className="grayscale"
          />
          <Image
            src="/images/logo-tokopedia.svg"
            alt="logo tokopedia"
            width={120}
            height={120}
            className="grayscale"
          />
        </div>
      </div>
    </>
  );
}

function CarouselSection() {
  const carousel = [
    {
      src: "/images/image 173.png",
      alt: "image 173",
      title: "One-Stop Solution for Your PC Build Needs",
      description:
        "Merakit PC menjadi mudah, tanpa ribet, dan praktis. Sesuaikan dengan kebutuhan dan budget Anda.",
    },
    {
      src: "/images/image 173.png",
      alt: "image 173",
      title: "PC Essentials For Back To School",
      description:
        "PC yang sudah terafiliasi dengan marketplace favoritmu. Temukan komponen PC yang sesuai dengan kebutuhanmu.",
    },
    {
      src: "/images/image 173.png",
      alt: "image 173",
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
          className="absolute left-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 drop-shadow-lg "
          onClick={goToPrev}
        />
        <ChevronRight
          className="absolute right-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 drop-shadow-lg"
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
                className="flex w-full flex-shrink-0 items-center justify-center"
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
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "w-7 bg-primary" : "bg-gray-300"
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
      <div className="mx-auto flex max-w-7xl flex-row items-center justify-center gap-10">
        <div className="flex w-2/6 flex-col justify-center gap-8">
          <h3 className="text-5xl font-bold">
            Pilih paketan rakit PC yang cocok buat kamu
          </h3>
          <p className="text-md text-gray-500">
            Kami menyediakan berbagai rekomendasi rakitan PC yang dikategorisasi
            berdasarkan kebutuhan dan rentang budget untuk memudahkan Anda dalam
            merakit PC impian
          </p>
          <Button className="via-52% text-md w-fit gap-2 bg-gradient-to-r from-[#1637FD] from-0% via-[#2579F8] to-[#3480F3] to-100% dark:bg-gradient-to-r dark:from-[#1637FD] dark:via-[#2579F8] dark:to-[#3480F3] ">
            <ShoppingCart className="h-6 w-6 " />
            Lihat paket PC lainnya
          </Button>
        </div>
        <div className="relative flex w-4/6 items-center">
          <button
            onClick={prevSlide}
            className="absolute -left-10 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white p-2 drop-shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-10 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white p-2 drop-shadow-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="flex flex-col items-center">
            <div className="flex flex-row gap-4">
              {cardPc.map((item, index) => (
                <div
                  key={index}
                  className="flex w-fit flex-col rounded-lg bg-white  p-4 drop-shadow-md dark:border-white/20"
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
            <div className="mt-4 flex space-x-2 mb-10">
              {cardPc.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentIndex ? "bg-blue-500 w-7" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
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
//             <Link href="?katalog=true" passHref legacyBehavior replace scroll={false}>
//               <Button className="m-auto mt-0 w-fit gap-2 bg-black p-5 hover:bg-zinc-900 tablet:m-0 tablet:mt-6">
//                 <Image
//                   src="/images/icon-cart.svg"
//                   alt="icon-computer"
//                   width={20}
//                   height={20}
//                 />
//                 Katalog Komponen PC
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
