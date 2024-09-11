"use client";

import Link from "next/link";
import * as React from "react";

import { User as SupabaseUser } from "@supabase/supabase-js";
import {
  ChevronDown,
  Heart,
  LogOut,
  MonitorSmartphone,
  Search,
  Settings2,
  User,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FormLogin from "~/components/login/form-login";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { ComponentCategory, categoriesFromEnum,  } from "~/lib/db";
import { createClient } from "~/lib/supabase/client";
import { Database } from "~/lib/schema";
import { search } from "~/lib/api";
import { cn, createQueryString, removeQueryString } from "~/lib/utils";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import Divider from "./divider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { NavbarIcon } from "./icon/navbar-icon";
import NavbarMobileToggle from "./icon/navbar-mobile-toggle";
// import { ModeToggle } from "./mode-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ModeToggle } from "./mode-toggle";
import { FloatingNav } from "./floating-navbar";
import FormRegister from "../register/from-register";
import FeedbackModal from "./FeedbackModal";
import { componentImage } from "~/lib/utils";

export function Navbar() {
  const supabase = createClient();

  const [user, setUser] = React.useState<SupabaseUser | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Database['product']['Tables']['products']['Row'][] | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
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

  React.useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length > 2) {
        setIsLoading(true);
        try {
          const { data, error } = await search(searchQuery);
          if (!error) {
            setSearchResults(data.map((product) => ({
              ...product,
              id: product.product_id,
              name: product.product_name,
              is_published: true,
              product_fts: null,
              product_trgms: null,
            })));
          } else {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimer = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const katalog = searchParams.get("katalog") === "true";
  const login = searchParams.get("login") === "true";
  const register = searchParams.get("register") === "true";

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
            <div className="flex flex-col items-start justify-start gap-0">
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
          <Link href="/wishlist" passHref className="w-full justify-start">
            <Button variant="ghost" className="w-full justify-start">
              <Heart size={18} className="mr-2" /> Wishlist
            </Button>
          </Link>
          <Link href="/rakitanku" passHref className="w-full justify-start">
            <Button variant="ghost" className="w-full justify-start">
              <MonitorSmartphone size={18} className="mr-2" /> Rakitan-ku
            </Button>
          </Link>
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
          { scroll: false }
        );
      }}
    >
      <DialogTrigger>
        <Button className="w-24 rounded-xl bg-primary px-4 text-white hover:bg-primary/80">
          Masuk
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full overflow-auto bg-slate-100 p-4 dark:bg-navbar tablet:h-full tablet:max-h-[768px] tablet:max-w-xl tablet:p-8">
        <FormLogin onRegisterClick={() => {
          router.push(
            "?" + createQueryString(searchParams, "register", "true")
          );
        }} />
      </DialogContent>
    </Dialog>
  );
  const registerModal = (
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
        <FormRegister onLoginClick={() => {
          router.push(
            "?" + createQueryString(searchParams, "login", "true")
          );
        }} />
      </DialogContent>
    </Dialog>
  );

  const getCategorySlug = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'power supply':
        return 'psu';
      case 'internal storage':
        return 'storage';
      default:
        return categoryName.toLowerCase().replace(/\s+/g, '-');
    }
  };

  return (
    <FloatingNav>
      <Link href="/" className="scale-[70%]">
        <NavbarIcon />
      </Link>
      {true && (
        <>
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
                <Popover>
                  <PopoverTrigger>
                    <div
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent",
                      )}
                    >
                      Rakit PC{" "}
                      <ChevronDown size={18} className="inline-block" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit p-0">
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
                      <Link href="/rakit/budget" legacyBehavior passHref>
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
                  </PopoverContent>
                </Popover>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
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
            <Dialog>
              <DialogTrigger>
                <Search size={20} className="cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[1000px] max-h-[95vh] overflow-y-auto fit-content">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-25"
                  />
                  {isLoading ? (
                    <div className="text-center">Loading...</div>
                  ) : (
                    <div className="flex justify-center">
                      <div className="w-full max-w-4xl overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {searchResults?.map((result: any) => (
                              <tr key={result.product_id} className="tablet:table-row">
                                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                  <Image src={componentImage(result)} alt={result.product_name} width={64} height={64} className="h-16 w-16 object-contain mr-4" />
                                  {result.product_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{result.category_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">Rp {result.lowest_price.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {/* still error on category params */}
                                <Link href={`/detail/${getCategorySlug(result.category_name)}/${encodeURIComponent(result.product_name.replace(/\s+/g, '-').toLowerCase())}`} passHref>
                                    <Button variant="default" className="text-white">
                                      Buy
                                    </Button>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {user ? profileButton : (
              <>
                {loginButton}
                {registerModal}
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
                  href={`?${createQueryString(searchParams, "katalog", "true")}`}
                  passHref
                >
                  <DropdownMenuItem className="cursor-pointer p-4">
                    Katalog
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="h-[52px] p-4">
                    Rakit PC
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-fit p-0">
                      <ul className="w-[240px] p-4">
                        <Link href="/simulasi" legacyBehavior passHref>
                          <DropdownMenuItem
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "w-full cursor-pointer justify-start bg-transparent",
                            )}
                          >
                            Simulasi Rakit PC
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/rakit/budget" legacyBehavior passHref>
                          <DropdownMenuItem
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "w-full cursor-pointer justify-start bg-transparent",
                            )}
                          >
                            Rekomendasi Rakitan
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/showcase" legacyBehavior passHref>
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

                <Link href="/blog" passHref>
                  <DropdownMenuItem className="cursor-pointer p-4">
                    Blog
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </>

      )}
      <FeedbackModal />
    </FloatingNav>
  );
}