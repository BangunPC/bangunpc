"use client";

import Link from "next/link";
import * as React from "react";

import { User as SupabaseUser } from "@supabase/supabase-js";
import {
  Heart,
  LogOut,
  MonitorSmartphone,
  Settings2,
  User,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FormLogin from "@/components/login/form-login";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { CategoryEnum, categoryEnumToSlug,  } from "@/lib/db";
import { createClient } from "@/lib/supabase/client"
import { cn, createQueryString, removeQueryString } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Divider from "../ui/divider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { NavbarIcon } from "../icon/navbar-icon";
import NavbarMobileToggle from "../icon/navbar-mobile-toggle";
// import { ModeToggle } from "./mode-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ModeToggle } from "../ui/mode-toggle";
import { FloatingNav } from "../ui/floating-navbar";
import FormRegister from "../register/from-register";
import FeedbackDialog from "./feedback-dialog";
import { componentImage } from "@/lib/utils";
import { SearchDialog } from "./search-dialog";
import { SearchCommand } from "./search-command";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const components = [
  {
    name: "Memory / RAM",
    enum: CategoryEnum.Memory,
    icon: (
      <Image
        width={120}
        height={120}
        src="/images/produk_memory.svg"
        alt="produk_ram"
      />
    ),
  },
  {
    name: "Motherboard",
    enum: CategoryEnum.Motherboard,
    icon: (
      <Image
        width={120}
        height={120}
        src="/images/produk_motherboard.svg"
        alt="produk_motherboard"
      />
    ),
  },
  {
    name: "CPU",
    enum: CategoryEnum.CPU,
    icon: (
      <Image
        width={120}
        height={120}
        src="/images/produk_cpu.svg"
        alt="produk_cpu"
      />
    ),
  },
  {
    name: "CPU Cooler",
    enum: CategoryEnum.Cooler,
    icon: (
      <Image
        width={120}
        height={120}
        src="/images/produk_cpu_coolers.svg"
        alt="produk_cpu_cooler"
      />
    ),
  },
  {
    name: "Video Card / GPU",
    enum: CategoryEnum.GPU,
    icon: (
      <Image
        width={120}
        height={120}
        src="/images/produk_gpu.svg"
        alt="produk_gpu"
      />
    ),
  },
  {
    name: "Power Supply",
    enum: CategoryEnum.PSU,
    icon: (
      <Image
        width={120}
        height={120}
        src="/images/produk_psu.svg"
        alt="produk_psu"
      />
    ),
  },
  {
    name: "Internal Storage",
    enum: CategoryEnum.Storage,
    icon: (
      <Image
        width={120}
        height={120}
        src="/images/produk_storage.svg"
        alt="produk_internal_storage"
      />
    ),
  },
  {
    name: "PC Case",
    enum: CategoryEnum.Casing,
    icon: (
      <Image
        width={120}
        height={120}
        src="/images/produk_casing.svg"
        alt="produk_casing"
      />
    ),
  },
  {
    name: "Monitor",
    enum: CategoryEnum.Monitor,
    icon: (
      <Image
        width={120}
        height={120}
        src="/images/produk_monitor.svg"
        alt="produk_monitor"
      />
    ),
  },
];


export function Navbar() {
  const supabase = createClient();

  const [user, setUser] = React.useState<SupabaseUser | null>(null);
  const path = usePathname();

  function refreshAuth() {
    supabase.auth
      .getUser()
      .then((user) => {
        setUser(user.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  React.useEffect(() => {
    supabase.auth.onAuthStateChange((session) => {
      if (session) {
        refreshAuth();
      } else {
        setUser(null);
      }
    });
  }, []);

  React.useEffect(() => {
    console.log("PATHNAME: ", path);
    refreshAuth();
  }, [path]);

  const router = useRouter();
  const searchParams = useSearchParams()!;
  const produk = searchParams.get("produk") === "true";
  const login = searchParams.get("login") === "true";
  const register = searchParams.get("register") === "true";

  const peripherals = [
    { name: "Headphones", href: "?produk=false" },
    { name: "Keyboard", href: "?produk=false" },
    { name: "Mouse", href: "?produk=false" },
    { name: "Speaker", href: "?produk=false" },
    { name: "Webcam", href: "?produk=false" },
  ];

  const accessories = [
    { name: "Case Fan", href: "?produk=false" },
    { name: "External Hard Drive", href: "?produk=false" },
    { name: "Thermal Paste", href: "?produk=false" },
  ];

  const ProfileButton = (
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
            <div className="flex flex-col items-start justify-start gap-0">
              <h3 className="text-lg font-bold">
                {user?.email?.split("@")[0] ?? ""}
              </h3>
              <p className="p-0 text-foreground/80">{user?.email ?? ""}</p>
            </div>
          </div>
          <Divider className="my-1" />
          
          <Link href="/profile" 
           className="w-full justify-start">
            <Button variant="ghost" className="w-full justify-start">
              <Settings2 size={18} className="mr-2" /> Pengaturan Akun
            </Button>
          </Link>

          <Link href="/wishlist" 
          className="w-full justify-start">
            <Button variant="ghost" className="w-full justify-start">
              <Heart size={18} className="mr-2" /> Wishlist
            </Button>
          </Link>
          <Link href="/rakitanku"  className="w-full justify-start">
            <Button variant="ghost" className="w-full justify-start">
              <MonitorSmartphone size={18} className="mr-2" /> Rakitan-ku
            </Button>
          </Link>
          <Divider className="my-1" />
          <Link href="/signout"  className="w-full justify-start">
            <Button variant="ghost" className="w-full justify-start">
              <LogOut size={18} className="mr-2" /> Keluar
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );

  const LoginButton = (
    <Dialog
      open={login}
      onOpenChange={(open) => {
        router.push(
          "?" +
          (open
            ? createQueryString(searchParams, "login", "true")
            : removeQueryString(searchParams, "login")),
          { scroll: false }
        );
      }}
    >
      <DialogTrigger>
        <div className="w-24 rounded-xl bg-primary px-4 py-2 text-white hover:bg-primary/80">
          Masuk
        </div>
      </DialogTrigger>
      <DialogContent className="h-full overflow-auto bg-slate-100 p-4 dark:bg-navbar tablet:h-full tablet:max-h-[768px] tablet:max-w-xl tablet:p-8">
      <VisuallyHidden>
        <DialogTitle>
          Menu
        </DialogTitle>
      </VisuallyHidden>
        <FormLogin onRegisterClick={() => {
          router.push(
            "?" + createQueryString(searchParams, "register", "true")
          );
        }} />
      </DialogContent>
    </Dialog>
  );
  const RegisterModal = (
    <Dialog
      open={register}
      onOpenChange={(open) => {
        router.push(
          "?" +
          (open
            ? createQueryString(searchParams, "register", "true")
            : removeQueryString(searchParams, "register")),
          { scroll: false }
        );
      }}
    >
      <DialogContent className="h-full overflow-auto bg-slate-100 p-4 dark:bg-navbar tablet:h-full tablet:max-h-[768px] tablet:max-w-xl tablet:p-8">
        <VisuallyHidden>
          <DialogTitle>
            Menu
          </DialogTitle>
        </VisuallyHidden>
        <FormRegister onLoginClick={() => {
          router.push(
            "?" + createQueryString(searchParams, "login", "true")
          );
        }} />
      </DialogContent>
    </Dialog>
  );

  return (
    <FloatingNav>
      <Link href="/" className="scale-[70%]">
        <NavbarIcon />
      </Link>
          <NavigationMenu className="m-auto hidden tablet:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Dialog
                  open={produk}
                  onOpenChange={(open) => {
                    router.push(
                      "?" +
                      (open
                        ? createQueryString(
                          searchParams,
                          "produk",
                          open.toString(),
                        )
                        : removeQueryString(searchParams, "produk")),
                      { scroll: false },
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
                      Produk
                    </NavigationMenuLink>{" "}
                  </DialogTrigger>
                  <DialogContent className="h-full overflow-auto p-2 tablet:max-h-[642px] tablet:max-w-fit tablet:p-4">
                    <VisuallyHidden>
                      <DialogTitle>
                        Menu
                      </DialogTitle>
                    </VisuallyHidden>
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
                              href={`/produk/${categoryEnumToSlug[item.enum]}`}
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
              <NavigationMenuItem>
                <NavigationMenuTrigger className={"bg-transparent"}>
                  Jasa
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[160px] p-4">
                    <Link href="/jasa" legacyBehavior >
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "w-full bg-transparent",
                        )}
                      >
                        Jasa Rakit PC
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/servis" legacyBehavior >
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
                  <NavigationMenuTrigger className={"bg-transparent"}>
                      Rakit PC
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[240px] p-4">
                      <Link href="/simulasi" legacyBehavior >
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "w-full justify-start bg-transparent",
                          )}
                        >
                          Simulasi Rakit PC
                        </NavigationMenuLink>
                      </Link>
                      <Link href="/rakit/budget" legacyBehavior >
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "w-full justify-start bg-transparent",
                          )}
                        >
                          Rekomendasi Rakitan
                        </NavigationMenuLink>
                      </Link>
                      <Link href="/showcase" legacyBehavior >
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
                <Link href="/blog" legacyBehavior 
                
                >
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent",
                    )}
                  >
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex flex-col justify-center items-center gap-4 tablet:flex-row tablet:justify-end">
            <SearchDialog/>
            {/* <SearchCommand/> */}
            <FeedbackDialog />
            {user ? (
              <>{ProfileButton}</>
            ) : (
              <>
                {LoginButton}
                {RegisterModal}
              </>
            )}
            <ModeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild className="tablet:hidden">
                <Button size="icon">
                  <NavbarMobileToggle />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="tablet:hidden">
                <Link
                  href={`?${createQueryString(searchParams, "produk", "true")}`}
                  
                >
                  <DropdownMenuItem className="cursor-pointer p-4">
                    Produk
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="h-[52px] p-4">
                    Rakit PC
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-fit p-0">
                      <ul className="w-[240px] p-4">
                        <Link href="/simulasi" legacyBehavior >
                          <DropdownMenuItem
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "w-full cursor-pointer justify-start bg-transparent",
                            )}
                          >
                            Simulasi Rakit PC
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/rakit/budget" legacyBehavior >
                          <DropdownMenuItem
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "w-full cursor-pointer justify-start bg-transparent",
                            )}
                          >
                            Rekomendasi Rakitan
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/showcase" legacyBehavior >
                          <DropdownMenuItem
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "w-full cursor-pointer justify-start bg-transparent",
                            )}
                          >
                            Showcase
                          </DropdownMenuItem>
                        </Link>
                      </ul>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <Link href="/blog" >
                  <DropdownMenuItem className="cursor-pointer p-4">
                    Blog
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
    </FloatingNav>
  );
}