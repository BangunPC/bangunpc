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
import FormLogin from "~/components/login/form-login";
import { ModeToggle } from "./mode-toggle";
import { cn, createQueryString, removeQueryString } from "~/lib/utils";
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
import { categoriesFromEnum, ComponentCategory } from "~/lib/db";
import NavbarMobileToggle from "./icon/navbar-mobile-toggle";
import { createClient } from "~/lib/supabase/client";
import {
  Heart,
  LogOut,
  MonitorSmartphone,
  Settings2,
  User,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { User as SupabaseUser } from "@supabase/supabase-js";
import Divider from "./divider";

export function Navbar() {
  const supabase = createClient();

  const [user, setUser] = React.useState<SupabaseUser | null>(null);

  React.useEffect(() => {
    supabase.auth
      .getUser()
      .then((user) => {
        setUser(user.data?.user);
      })
      .catch((err) => {
        console.error(err);
      });
    supabase.auth.onAuthStateChange((session) => {
      if (session) {
        supabase.auth
          .getUser()
          .then((user) => {
            setUser(user.data?.user);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        setUser(null);
      }
    });
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();
  const katalog = searchParams.get("katalog") === "true";
  const login = searchParams.get("login") === "true";

  const peripherals = [
    { name: "Headphones", href: "?katalog=false" },
    { name: "Keyboard", href: "?katalog=false" },
    { name: "Mouse", href: "?katalog=false" },
    { name: "Speaker", href: "?katalog=false" },
    { name: "Webcam", href: "?katalog=false" },
  ];

  const accessories = [
    { name: "Case Fan", href: "?katalog=false" },
    { name: "External Hard Drive", href: "?katalog=false" },
    { name: "Thermal Paste", href: "?katalog=false" },
  ];

  const components = [
    {
      name: "Memory / RAM",
      enum: ComponentCategory.Memory,
      icon: (
        <Image
          width={120}
          height={120}
          src="/images/katalog_memory.svg"
          alt="katalog_ram"
        />
      ),
    },
    {
      name: "Motherboard",
      enum: ComponentCategory.Motherboard,
      icon: (
        <Image
          width={120}
          height={120}
          src="/images/katalog_motherboard.svg"
          alt="katalog_motherboard"
        />
      ),
    },
    {
      name: "CPU",
      enum: ComponentCategory.CPU,
      icon: (
        <Image
          width={120}
          height={120}
          src="/images/katalog_cpu.svg"
          alt="katalog_cpu"
        />
      ),
    },
    {
      name: "CPU Cooler",
      enum: ComponentCategory.Cooler,
      icon: (
        <Image
          width={120}
          height={120}
          src="/images/katalog_cpu_coolers.svg"
          alt="katalog_cpu_cooler"
        />
      ),
    },
    {
      name: "Video Card / GPU",
      enum: ComponentCategory.GPU,
      icon: (
        <Image
          width={120}
          height={120}
          src="/images/katalog_gpu.svg"
          alt="katalog_gpu"
        />
      ),
    },
    {
      name: "Power Supply",
      enum: ComponentCategory.PSU,
      icon: (
        <Image
          width={120}
          height={120}
          src="/images/katalog_psu.svg"
          alt="katalog_psu"
        />
      ),
    },
    {
      name: "Internal Storage",
      enum: ComponentCategory.Storage,
      icon: (
        <Image
          width={120}
          height={120}
          src="/images/katalog_storage.svg"
          alt="katalog_internal_storage"
        />
      ),
    },
    {
      name: "PC Case",
      enum: ComponentCategory.Casing,
      icon: (
        <Image
          width={120}
          height={120}
          src="/images/katalog_casing.svg"
          alt="katalog_casing"
        />
      ),
    },
    {
      name: "Monitor",
      enum: ComponentCategory.Monitor,
      icon: (
        <Image
          width={120}
          height={120}
          src="/images/katalog_monitor.svg"
          alt="katalog_monitor"
        />
      ),
    },
  ];

  const profileButton = (
    <Popover>
      <PopoverTrigger>
        <User
          size={40}
          className="cursor-pointer rounded-full bg-primary p-2 text-white hover:bg-primary/80 dark:bg-primary/80"
        />
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <div className="flex flex-col items-start justify-start p-4">
          <div className="mb-2 flex items-center gap-2">
            <User
              size={48}
              className="rounded-full bg-primary p-2 text-white dark:bg-primary/80"
            />
            <div className="flex flex-col gap-0 items-start justify-start">
              <h3 className="text-lg font-bold">
                {user?.email?.split("@")[0] ?? ""}
              </h3>
              <p className="p-0 text-foreground/80">{user?.email ?? ""}</p>
            </div>
          </div>
          <Divider className="my-1" />
          <Link href="/profile" passHref className="w-full justify-start">
            <Button variant="ghost" className="w-full justify-start">
              <Settings2 size={18} className="mr-2" /> Pengaturan Akun
            </Button>
          </Link>
          {/* <Button variant="ghost" className="w-full justify-start">
            <Lamp size={18} className="mr-2" /> Dark Mode
            <span className="ml-2">
              <ModeToggle switch />
            </span>
          </Button> */}
          <Button variant="ghost" className="w-full justify-start">
            <Heart size={18} className="mr-2" /> Wishlist
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <MonitorSmartphone size={18} className="mr-2" /> Rakitan-ku
          </Button>
          <Divider className="my-1" />
          <Link href="/signout" passHref className="w-full justify-start">
            <Button variant="ghost" className="w-full justify-start">
              <LogOut size={18} className="mr-2" /> Keluar
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );

  const loginButton = (
    <Dialog
      open={login}
      onOpenChange={(open) => {
        router.push(
          "?" +
            (open
              ? createQueryString(searchParams, "login", "true")
              : removeQueryString(searchParams, "login")),
        );
      }}
    >
      <DialogTrigger>
        <Button className="bg-primary px-4 text-white hover:bg-primary/80">
          Masuk
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full overflow-auto bg-slate-100 p-4 dark:bg-navbar tablet:h-full tablet:max-h-[768px] tablet:max-w-xl tablet:p-8">
        <FormLogin />
      </DialogContent>
    </Dialog>
  );
  return (
    <div className="fixed top-0 z-10 w-full bg-[#f5f5f573] px-4 backdrop-blur-3xl dark:bg-navbar">
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
                    "?" +
                      (open
                        ? createQueryString(
                            searchParams,
                            "katalog",
                            open.toString(),
                          )
                        : removeQueryString(searchParams, "katalog")),
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
                <DialogContent className="h-full overflow-auto p-2 tablet:max-h-[642px] tablet:max-w-fit tablet:p-4">
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
                          <Link
                            key={item.name}
                            href={`/katalog/${categoriesFromEnum[item.enum]}`}
                          >
                            <Button
                              variant="outline"
                              className="flex h-[156px] w-[147px] flex-col"
                            >
                              <div className="m-auto">{item.icon}</div>
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
            {/* <NavigationMenuItem>
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
            </NavigationMenuItem> */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className={"bg-transparent"}>
                Rakit PC
              </NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className="w-[240px] p-4">
                  <Link href="/simulasi" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start bg-transparent",
                      )}
                    >
                      Simulasi Rakit PC
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/rekomendasi" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start bg-transparent",
                      )}
                    >
                      Rekomendasi Rakitan
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/showcase" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start bg-transparent",
                      )}
                    >
                      Showcase
                    </NavigationMenuLink>
                  </Link>
                </ul>
              </NavigationMenuContent>
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
          {user ? profileButton : loginButton}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="tablet:hidden">
              <Button size="icon">
                <NavbarMobileToggle />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="tablet:hidden">
              <Link
                href={`?${createQueryString(searchParams, "katalog", "true")}`}
                passHref
              >
                <DropdownMenuItem className="cursor-pointer p-4">
                  Katalog
                </DropdownMenuItem>
              </Link>
              <Link href="/jasa" passHref>
                <DropdownMenuItem className="cursor-pointer p-4">
                  Jasa
                </DropdownMenuItem>
              </Link>
              <Link href="/rakit" passHref>
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
