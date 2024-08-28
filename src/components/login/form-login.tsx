"use client";

import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { NavbarIcon } from "~/components/ui/icon/navbar-icon";
import { createClient } from "~/lib/supabase/client";
import Spinner from "../ui/spinner-loading";
import { Turnstile } from "@marsidev/react-turnstile";

export default function FormLogin() {
  const [captchaToken, setCaptchaToken] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { error } = await createClient().auth.signInWithOtp({
        email: email.trim(),
        options: {
          shouldCreateUser: true,
          emailRedirectTo: window.location.href,
          captchaToken,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex flex-col items-center mx-auto mb-8 tablet:mb-5 tablet:pt-6 ">
        <NavbarIcon />
        <h1 className="font-medium text-slate-700 ">Masukan Akun Bangun PC Anda</h1>
      </div>
      
          
      <form className="my-2" onSubmit={handleLogin}>
        <div className="flex flex-col space-y-5">
          {/* Email */}
          <label htmlFor="email">
            <p className="pb-2 font-medium text-slate-700">Username / Email</p>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Masukkan email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-3 hover:shadow focus:border-slate-500 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {/* Password */}
          <label id="password">
            <p className="pb-2 font-medium text-slate-700">Password</p>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full rounded-lg border border-slate-200 px-3 py-3 hover:shadow focus:border-slate-500 focus:outline-none"
              placeholder="Masukan password"
            />
          </label>
          <div className="flex flex-row justify-between">
            <div>
              <label id="remember" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 border-slate-200"
                />
                <span className="font-medium text-slate-700">Remember me</span>
              </label>
            </div>
            <div>
              <a href="#" className="font-medium text-indigo-600">
                Forgot Password?
              </a>
            </div>
          </div>

          {captchaToken.length == 0 ? (
            <>
              <Turnstile
                siteKey="0x4AAAAAAAcTY5MLJfC_A1SN"
                onSuccess={(token) => {
                  setCaptchaToken(token);
                }}
                aria-label="Cloudlare Captcha"
                className="m-auto"
              />
            </>
          ) : (
            // Button Login (masuk)
            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                className="inline-flex w-full items-center justify-center space-x-2 rounded-md border border-slate-300 bg-primary py-6 text-sm font-medium text-white hover:bg-primary/80 dark:bg-navbar hover:shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                {loading ? <Spinner /> : "Masuk"}
              </Button>
            </div>
          )}
          {/* google account */}
          <div>
            <button className="flex w-full items-center justify-center space-x-2 rounded-lg border border-slate-200 py-3 text-center text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="h-6 w-6"
                alt="Google Icon"
              />
              <span>Masuk dengan Google</span>
            </button>
          </div>
        </div>
      </form>
      {/* Navigation to Register */}
      <p className="text-center">
        Belum punya akun?{" "}
        <a
          href="#"
          className="inline-flex items-center space-x-1 font-medium text-indigo-600"
        >
          <span>Daftar sekarang</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </span>
        </a>
      </p>
    </div>
  );
}
