"use client";

import Link from "next/link";
import * as React from "react";

import { User as SupabaseUser } from "@supabase/supabase-js";
import {
  Heart,
  LogOut,
  Menu,
  MonitorSmartphone,
  Search,
  Settings2,
  User,
  X,
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
import { ComponentCategoryEnum, categoryEnumToSlug,  } from "@/lib/db";
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
import { NavbarIcon } from "../icon/navbar-icon";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FloatingNav } from "../ui/floating-navbar";
import FormRegister from "../register/from-register";
import { SearchDialog } from "../blog/search-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Input } from "../ui/input";

export const components = [
  {
    name: "Memory / RAM",
    enum: ComponentCategoryEnum.Memory,
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
    enum: ComponentCategoryEnum.Motherboard,
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
    enum: ComponentCategoryEnum.CPU,
    icon: (
      <Image
        width={120}
        height={120}
        src="/images/produk_cpu.svg"
        alt="produk_cpu"
      />
    ),
  },
  // {
  //   name: "CPU Cooler",
  //   enum: ComponentCategoryEnum.Cooler,
  //   icon: (
  //     <Image
  //       width={120}
  //       height={120}
  //       src="/images/produk_cpu_coolers.svg"
  //       alt="produk_cpu_cooler"
  //     />
  //   ),
  // },
  {
    name: "Video Card / GPU",
    enum: ComponentCategoryEnum.GPU,
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
    enum: ComponentCategoryEnum.PSU,
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
    enum: ComponentCategoryEnum.Storage,
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
    enum: ComponentCategoryEnum.Casing,
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
    enum: ComponentCategoryEnum.Monitor,
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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
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

  const message = 
  `Halo Tim Bangun PC, saya ingin rakit PC dengan spesifikasi:
  - CPU : 
  - GPU : 
  - Motherboard: 
  - CPU Cooler:  
  - Casing: 
  - RAM: 
  - PSU: 
  - Storage: 

  saya berdomisili di: 
  Terima kasih.`;
  
  const encodedMessage = encodeURIComponent(message);
  const rakitPCUrl = `https://wa.me/6282295561944?text=${encodedMessage}`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

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
          
          <Link href="/profile" className="w-full justify-start" >
            <Button variant="ghost" className="w-full justify-start">
              <Settings2 size={18} className="mr-2" /> Pengaturan Akun
            </Button>
          </Link>

          <Link href="/wishlist" className="w-full justify-start" >
            <Button variant="ghost" className="w-full justify-start">
              <Heart size={18} className="mr-2" /> Wishlist
            </Button>
          </Link>
          <Link href="/rakitanku" className="w-full justify-start" >
            <Button variant="ghost" className="w-full justify-start">
              <MonitorSmartphone size={18} className="mr-2" /> Rakitan-ku
            </Button>
          </Link>
          <Divider className="my-1" />
          <Link href="/signout" className="w-full justify-start" >
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
      <DialogTrigger className="w-24 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/80">
          Masuk
        {/* <Button >
        </Button> */}
      </DialogTrigger>
      <DialogContent className="h-fit overflow-auto bg-slate-100 p-4 dark:bg-navbar tablet:max-w-xl tablet:p-8">
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
          <DialogTitle>Menu</DialogTitle>
        </VisuallyHidden>
        <FormRegister onLoginClick={() => {
          router.push(
            "?" + createQueryString(searchParams, "login", "true")
          );
        }} />
      </DialogContent>
    </Dialog>
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <FloatingNav className="gap-4 tablet:gap-16">
      <div className="flex w-full gap-24 items-center justify-between tablet:w-auto">
        <Link href="/" className="h-9 [&>svg]:size-full" >
          <NavbarIcon />
        </Link>
        
        {/* Desktop Navigation */}
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
                      "bg-transparent text-base",
                    )}
                  >
                    Komponen
                  </NavigationMenuLink>
                </DialogTrigger>
                <DialogContent className="h-full overflow-auto p-2 tablet:max-h-[642px] tablet:max-w-fit tablet:p-4">
                  <VisuallyHidden>
                    <DialogTitle>Menu</DialogTitle>
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
                    {/* <div className="hidden flex-col rounded-lg bg-white p-2 shadow-bm dark:bg-black tablet:flex">
                      <span className="bold mb-2 border-b border-b-white">
                        Peripherals
                      </span>
                      {peripherals.map((item) => (
                        <Link key={item.name} href={item.href} >
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
                        <Link key={item.name} href={item.href} >
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            {item.name}
                          </Button>
                        </Link>
                      ))}
                    </div> */}
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
              <NavigationMenuTrigger className={"bg-transparent text-base"}>
                Rakit PC
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[240px] p-2">
                  <NavigationMenuLink
                    href="/simulasi"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "w-full justify-start bg-transparent text-base",
                    )}
                  >
                    Simulasi Rakit PC
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href={rakitPCUrl}
                    target="_blank"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "w-full justify-start bg-transparent text-base",
                    )}
                  >
                    Jasa Rakit PC
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/rakit/budget"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "w-full justify-start bg-transparent text-base",
                    )}
                  >
                    Rekomendasi Rakitan
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink
                href="/blog"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent cursor-pointer text-base",
                  )}
                  >
                  Blog
                </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Right-side buttons */}
        <div className="hidden items-center gap-4 tablet:flex">
          <SearchDialog />
          {user ? (
            <>{ProfileButton}</>
          ) : (
            <>
              {LoginButton}
              {RegisterModal}
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="tablet:hidden ml-16"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      {/* Mobile Menu Content */}
      <div
        className={cn(
          "absolute left-0 top-full z-50 w-full bg-white shadow-lg transition-all duration-300 dark:bg-navbar tablet:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col p-4 gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </form>

          {/* Navigation Links */}
          <Button
            variant="ghost"
            className="w-full justify-start text-left"
            onClick={() => {
              router.push(`?${createQueryString(searchParams, "produk", "true")}`);
              setMobileMenuOpen(false);
            }}
          >
            Produk
          </Button>
          
          <div className="pl-4">
            <Link href="/simulasi" className="block py-2" onClick={() => setMobileMenuOpen(false)}>
              Simulasi Rakit PC
            </Link>
            <Link href={rakitPCUrl} target="_blank" className="block py-2" onClick={() => setMobileMenuOpen(false)}>
              Jasa Rakit PC
            </Link>
            <Link href="/rakit/budget" className="block py-2" onClick={() => setMobileMenuOpen(false)}>
              Rekomendasi Rakitan
            </Link>
          </div>
          
          <Link href="/blog" className="w-full py-2" onClick={() => setMobileMenuOpen(false)}>
            Blog
          </Link>

          {/* Auth Buttons */}
          <div className="mt-4 flex flex-col gap-2">
            {user ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  router.push("/profile");
                  setMobileMenuOpen(false);
                }}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            ) : (
              <>
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => {
                    router.push(`?${createQueryString(searchParams, "login", "true")}`);
                    setMobileMenuOpen(false);
                  }}
                >
                  Masuk
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </FloatingNav>
  );
}