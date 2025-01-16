import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavbarIcon } from "../icon/navbar-icon";
import { Button } from "../ui/button";

const Footer = () => {
  const socialMedia = [
    {
      logo: "/images/instagram.svg",
      alt: "instagram",
      url: "https://www.instagram.com/bangunpc/",
    },
    {
      logo: "/images/twitter.svg",
      alt: "twitter",
      url: "https://twitter.com/bangunpc/",
    },
    {
      logo: "/images/youtube.svg",
      alt: "youtube",
      url: "https://www.youtube.com/@BangunPC/",
    },
    // {
    //   logo: "/images/linkedin.svg",
    //   alt: "linkedin",
    //   url: "https://www.linkedin.com/company/bangun-pc/",
    // },
  ];

  const services = [
    {
      name: "Beranda",
      url: "/",
    },
    // {
    //   name: "Simulasi Rakit PC",
    //   url: "/simulasi",
    // },
    {
      name: "Jasa Rakit PC",
      url: "/rakit",
    },
    // {
    //   name: "Jasa Servis PC",
    //   url: "/servis",
    // },
    // {
    //   name: "Blog",
    //   url: "/blog",
    // },
  ];

  const about = [
    {
      name: "Tim BangunPC",
      url: "/about",
    },
    // {
    //   name: "Syarat & Ketentuan",
    //   url: "/terms",
    // },
    // {
    //   name: "Privasi",
    //   url: "/privacy",
    // },
    // {
    //   name: "Dukung Kami",
    //   url: "/support",
    // },
  ];

  return (
    <div className="w-full bg-[#020617] pt-5 text-slate-100 dark:bg-navbar">
      <div className="mx-auto grid h-full max-w-screen-desktop gap-5 p-8 tablet:max-w-7xl tablet:grid-cols-3">
        <div className="flex flex-col items-center gap-5 text-center">
          <NavbarIcon alwaysDark />
          <p className="max-w-[360px] text-sm">
            Platform yang membantumu memilih, membeli, dan merawat komponen
            komputermu dan disesuaikan dengan kebutuhan dan budget
          </p>
          <div className="flex flex-row gap-5">
            {socialMedia.map((item) => {
              return (
                <Link
                  key={item.alt}
                  href={item.url}
                  className="flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="dark m-0 rounded-full bg-zinc-700 p-2 hover:border-zinc-400 hover:bg-zinc-600"
                  >
                    <Image
                      src={item.logo}
                      width={16}
                      height={16}
                      alt={item.alt}
                    />
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-5 tablet:items-center">
          <h3 className="text-xl">Layanan Kami</h3>
          <ul className="flex flex-col">
            {services.map((item) => {
              return (
                <Link key={item.name} href={item.url} >
                  <Button variant="ghost" className="m-0 w-full justify-start">
                    <li>{item.name}</li>
                  </Button>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-5 tablet:items-center">
          <h3 className="text-xl tablet:-ml-5">Tentang Kami</h3>
          <ul className="flex flex-col">
            {about.map((item) => {
              return (
                <Link key={item.name} href={item.url} >
                  <Button variant="ghost" className="m-0 w-full justify-start">
                    <li>{item.name}</li>
                  </Button>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <p className="p-6 text-center">
        Copyright © {new Date().getFullYear()} Bangun PC. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
