import React from 'react'

import { Button } from "~/components/ui/button";
import { NavbarIcon } from "~/components/ui/icon/navbar-icon";
import Image from 'next/image';
import Link from 'next/link';

const FormLogin = () => {
  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="mx-auto mb-8 flex tablet:mb-5 tablet:pt-6">
        <NavbarIcon />
      </div>
      <form className="flex flex-col gap-4 rounded-md bg-white px-4 py-10 shadow-md dark:bg-secondary">
        <h3 className="mb-5 text-xl font-semibold">Masuk Akun</h3>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Masukkan email"
            autoComplete="email"
            required
            className="w-full rounded-md border border-slate-300  bg-transparent bg-white px-3 py-4 text-sm placeholder-gray-500 shadow-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 tablet:py-2
            dark:focus:border-secondary dark:focus:ring-secondary"
          />
        </div>
        <div className="flex flex-col gap-4">
          
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Masukkan password"
            required
            className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-4 text-sm bg-white placeholder-gray-500 shadow-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 tablet:py-2
            dark:focus:border-secondary dark:focus:ring-secondary"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="mt-3 w-full rounded-md border border-slate-300 bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/80 dark:bg-navbar"
          >
            Masuk
          </Button>
        </div>
        <p className="mt-4 text-center tablet:mt-0">
          Belum punya akun?{" "}
          <Link href={"?register=true"} className="font-semibold">
            Daftar sekarang 
          </Link>
        </p>
      </form>
      <p className="py-4 text-center tablet:py-0">
        --------------------------------- atau
        --------------------------------
      </p>
      <Button
        variant="outline"
        className="w-full gap-2 rounded-md border border-slate-300 bg-white px-3 py-6 text-sm font-medium text-black dark:bg-navbar dark:text-white"
      >
        <Image
          src="/images/gmail.svg"
          width={21}
          height={22}
          alt="logo gmail"
        />
        Masuk dengan Gmail
      </Button>
      <Button
        variant="outline"
        className="w-full gap-2 rounded-md border border-slate-300 bg-white px-3 py-6 text-sm font-medium text-black dark:bg-navbar dark:text-white"
      >
        <Image
          src="/images/facebook-2.svg"
          width={21}
          height={22}
          alt="logo gmail"
        />
        Masuk dengan Facebook
      </Button>
    </div>
  )
}


export default FormLogin