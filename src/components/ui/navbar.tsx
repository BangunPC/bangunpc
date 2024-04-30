"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { NavbarIcon } from "./icon/navbar-icon";
import { ModeToggle } from "./mode-toggle";
import { cn } from "~/lib/utils";
import { ChevronDown } from "lucide-react";
import NavbarMobileToggle from "./icon/navbar-mobile-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const katalog = searchParams.get("katalog") === "true";

  const createQueryString = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    return params.toString();
  };

  const removeQueryString = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    return params.toString();
  };

  const peripherals = [
    { name: "Headphones", href: "/?katalog=true" },
    { name: "Keyboard", href: "/?katalog=true" },
    { name: "Mouse", href: "/?katalog=true" },
    { name: "Speaker", href: "/?katalog=true" },
    { name: "Webcam", href: "/?katalog=true" },
  ];

  const accessories = [
    { name: "Case Fan", href: "/?katalog=true" },
    { name: "External Hard Drive", href: "/?katalog=true" },
    { name: "Thermal Paste", href: "/?katalog=true" },
  ];

  const components = [
    { name: "Memory / RAM", href: "/?katalog=true", icon: <Image width={120} height={120} src="/images/katalog_memory.svg" alt="katalog_ram" /> },
    { name: "Motherboard", href: "/?katalog=true", icon: <Image width={120} height={120} src="/images/katalog_motherboard.svg" alt="katalog_motherboard" /> },
    { name: "CPU", href: "/?katalog=true", icon: <Image width={120} height={120} src="/images/katalog_cpu.svg" alt="katalog_cpu" /> },
    { name: "CPU Cooler", href: "/?katalog=true", icon: <Image width={120} height={120} src="/images/katalog_cpu_coolers.svg" alt="katalog_cpu_cooler" /> },
    { name: "Video Card / GPU", href: "/?katalog=true", icon: <Image width={120} height={120} src="/images/katalog_gpu.svg" alt="katalog_gpu" /> },
    { name: "Power Supply", href: "/?katalog=true", icon: <Image width={120} height={120} src="/images/katalog_psu.svg" alt="katalog_psu" /> },
    { name: "Internal Storage", href: "/?katalog=true", icon: <Image width={120} height={120} src="/images/katalog_storage.svg" alt="katalog_internal_storage" /> },
    { name: "PC Case", href: "/?katalog=true", icon: <Image width={120} height={120} src="/images/katalog_casing.svg" alt="katalog_casing" /> },
    { name: "Monitor", href: "/?katalog=true", icon: <Image width={120} height={120} src="/images/katalog_monitor.svg" alt="katalog_monitor" /> },
  ];

  return (
    <div className="fixed w-full bg-[#f5f5f573] px-4 backdrop-blur-3xl dark:bg-navbar">
      <div className="m-auto flex max-w-screen-desktop items-center">
        <Link href="/">
          <NavbarIcon />
        </Link>
        <NavigationMenu className="m-auto hidden tablet:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Dialog
                open={katalog}
                onOpenChange={(open) => {
                  router.push(
                    "/?" +
                    (open
                      ? createQueryString("katalog", open.toString())
                      : removeQueryString("katalog")),
                  );
                }}
              >
                <DialogTrigger>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent",
                    )}
                  >
                    Katalog
                  </NavigationMenuLink>{" "}
                </DialogTrigger>
                <DialogContent className="p-2 tablet:max-w-fit tablet:p-4">
                  <DialogHeader className="border-b border-b-slate-200 pb-4">
                    <DialogTitle>Pilih Kategori Komponen PC</DialogTitle>
                  </DialogHeader>
                  <Button
                    variant="outline"
                    className="border-primary text-primary tablet:hidden"
                  >
                    Kategori Lain
                  </Button>
                  <div className="flex w-full flex-row gap-2">
                    <div className="hidden flex-col rounded-lg bg-white p-2 shadow-bm dark:bg-black tablet:flex">
                      <span className="bold mb-2 border-b border-b-white">
                        Peripherals
                      </span>
                      {peripherals.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            {item.name}
                          </Button>
                        </Link>
                      ))}
                      <span className="bold mb-2 border-b border-b-white">
                        Accessories / Lainnya
                      </span>
                      {accessories.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            {item.name}
                          </Button>
                        </Link>
                      ))}
                    </div>
                    <div className="w-full rounded-lg bg-white p-4 shadow-bm dark:bg-black tablet:w-[526px] tablet:grid-cols-3 tablet:tablet:grid-rows-3 tablet:p-8">
                      <div className="m-auto grid w-fit grid-cols-2 gap-3 tablet:grid-cols-3 tablet:tablet:grid-rows-3">
                        {components.map((item) => (
                          <Link key={item.name} href={item.href}>
                            <Button
                              variant="outline"
                              className="h-[156px] w-[147px] flex flex-col"
                            >
                              {item.icon}
                              {item.name}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={"bg-transparent"}>
                Jasa
              </NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className="w-[160px] p-4">
                  <Link href="/jasa" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full bg-transparent",
                      )}
                    >
                      Jasa Rakit PC
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/servis" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full bg-transparent",
                      )}
                    >
                      Jasa Servis PC
                    </NavigationMenuLink>
                  </Link>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/simulasi" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
                >
                  Rakit PC
                  <ChevronDown
                    className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
                >
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="tablet:hidden">
              <Button variant="outline" size="icon">
                <NavbarMobileToggle />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="tablet:hidden">
              <Link href={`/?${createQueryString("katalog", "true")}`} passHref>
                <DropdownMenuItem className="cursor-pointer p-4">
                  Katalog
                </DropdownMenuItem>
              </Link>
              <Link href="/jasa" passHref>
                <DropdownMenuItem className="cursor-pointer p-4">
                  Jasa
                </DropdownMenuItem>
              </Link>
              <Link href="/simulasi" passHref>
                <DropdownMenuItem className="cursor-pointer p-4">
                  Rakit PC
                </DropdownMenuItem>
              </Link>
              <Link href="/blog" passHref>
                <DropdownMenuItem className="cursor-pointer p-4">
                  Blog
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
