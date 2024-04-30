import React from "react";
import { NavbarIcon } from "./icon/navbar-icon";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const socialMedia = [
    {
      logo: "/images/instagram.svg",
      alt: "instagram",
      url: "https://www.instagram.com/bangunpc/",
    },
    {
      logo: "/images/facebook.svg",
      alt: "facebook",
      url: "https://www.facebook.com/bangunpc/",
    },
    {
      logo: "/images/twitter.svg",
      alt: "twitter",
      url: "https://twitter.com/bangunpc/",
    },
    {
      logo: "/images/linkedin.svg",
      alt: "linkedin",
      url: "https://www.linkedin.com/company/bangun-pc/",
    },
  ];

  const services = [
    {
      name: "Beranda",
      url: "/",
    },
    {
      name: "Simulasi Rakit PC",
      url: "/simulasi",
    },
    {
      name: "Jasa Rakit PC",
      url: "/jasa",
    },
    {
      name: "Jasa Servis PC",
      url: "/servis",
    },
    {
      name: "Blog",
      url: "/blog",
    },
  ];
  
  const about = [
    {
      name: "Tentang Kami",
      url: "/about",
    },
    {
      name: "Syarat & Ketentuan",
      url: "/terms",
    },
    {
      name: "Privasi",
      url: "/privacy",
    },
    {
      name: "Dukung Kami",
      url: "/support",
    },
  ];

  return (
    <div className="bg-[#020617] text-slate-100 dark:bg-navbar w-full">
      <div className="mx-auto mt-5 grid h-full max-w-screen-desktop gap-5 p-8 tablet:max-w-7xl tablet:grid-cols-3">
        <div className="flex flex-col items-center gap-5 text-center">
          <NavbarIcon />
          <p className="text-sm">
            Platform yang membantumu untuk memilih, membeli, dan merawat
            komponen komputermu yang disesuaikan dengan kebutuhan dan budget
          </p>
          <div className="flex flex-row gap-5">
            {socialMedia.map((item) => {
              return (
                <Link
                  key={item.alt}
                  href={item.url}
                  className="flex items-center justify-center rounded-full bg-navbar p-2"
                  target="_blank"
                >
                  <Image
                    src={item.logo}
                    width={16}
                    height={16}
                    alt={item.alt}
                  />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-5 tablet:items-center">
          <h3 className="text-xl">Layanan Kami</h3>
          <ul className="flex flex-col gap-2">
            {services.map((item) => {
              return (
                <Link key={item.name} href={item.url}>
                  <li>{item.name}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-5 tablet:items-center">
          <h3 className="tablet:-ml-5 text-xl">Tentang Kami</h3>
          <ul className="flex flex-col gap-2">
            {about.map((item) => {
              return (
                <Link key={item.name} href={item.url}>
                  <li>{item.name}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <p className="p-6 text-center">
        Copyright © 2021 Bangun PC. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
