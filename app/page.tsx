import HomePage from "@/components/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BangunPC — Find Parts, Components, Builds, and More",
  description:
    "Selamat datang di BangunPC, platform untuk penggemar PC! Kami ada untuk membantu Anda menemukan komponen PC dari platform belanja terpercaya. Manfaatkan fitur-fitur kami seperti simulasi rakit PC manual dan katalog komponen lengkap. Kami juga menyediakan panduan mudah untuk pemula agar Anda bisa merakit PC sendiri. Bergabunglah dengan BangunPC dan wujudkan PC impian Anda sekarang!",
  icons: [
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
    { rel: "icon", sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "icon", sizes: "16x16", url: "/favicon-16x16.png" },
    { rel: "manifest", url: "/site.webmanifest" },
  ],
};

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
