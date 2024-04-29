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

export function Navbar() {

  return (
    <div className="fixed w-full bg-[#f5f5f573] px-4 backdrop-blur-3xl dark:bg-navbar">
      <div className="m-auto flex max-w-screen-desktop items-center">
        <Link href="/">
          <NavbarIcon />
        </Link>
        <NavigationMenu className="m-auto hidden tablet:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
                >
                  Katalog
                </NavigationMenuLink>
              </Link>
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
              <DropdownMenuItem className="p-4 cursor-pointer" onClick={() => {}}>Katalog</DropdownMenuItem>
              <Link href="/jasa" passHref>
                <DropdownMenuItem className="p-4 cursor-pointer">Jasa</DropdownMenuItem>
              </Link>
              <Link href="/simulasi" passHref>
                <DropdownMenuItem className="p-4 cursor-pointer">Rakit PC</DropdownMenuItem>
              </Link>
              <Link href="/blog" passHref>
                <DropdownMenuItem className="p-4 cursor-pointer">Blog</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
