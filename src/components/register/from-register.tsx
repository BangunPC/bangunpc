"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavbarIcon } from "@/components/icon/navbar-icon";
import { createClient } from "@/lib/supabase/client";
import Spinner from "../ui/spinner-loading";
import { Turnstile } from "@marsidev/react-turnstile";

interface FormRegisterProps {
  onLoginClick: () => void;
}


export default function FormRegister({ onLoginClick }: FormRegisterProps) {
  const [captchaToken, setCaptchaToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Added password state
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(""); // Added full name state
  const [confirmPassword, setConfirmPassword] = useState(""); // Added confirm password state

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        console.error("Passwords do not match");
        return; // Prevent registration if passwords do not match
      }
      const { error } = await createClient().auth.signUp({
        email: email.trim(),
        password: password, // Use password for registration
        options: {
          emailRedirectTo: window.location.href,
          captchaToken,
          data: { fullName }, // Wrap fullName in a data object
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await createClient().auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex flex-col items-center mx-auto mb-8 tablet:mb-5 tablet:pt-6 ">
        <NavbarIcon />
        <h1 className="font-medium text-slate-700 ">Daftar Akun Baru</h1> {/* Updated title */}
      </div>
      
      <form className="my-2" onSubmit={handleRegister}> {/* Updated onSubmit handler */}
        <div className="flex flex-col space-y-5">
          {/* Full Name */}
          <label htmlFor="fullName">
            <p className="pb-2 font-medium text-slate-700">Nama Lengkap</p>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Masukkan nama lengkap"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-3 hover:shadow focus:border-slate-500 focus:outline-none"
              onChange={(e) => setFullName(e.target.value)} // Capture full name input
            />
          </label>
          {/* Email */}
          <label htmlFor="email">
            <p className="pb-2 font-medium text-slate-700">Alamat Email</p>
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
              onChange={(e) => setPassword(e.target.value)} // Capture password input
            />
          </label>
          {/* Confirm Password */}
          <label id="confirmPassword">
            <p className="pb-2 font-medium text-slate-700">Konfirmasi Password</p>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="w-full rounded-lg border border-slate-200 px-3 py-3 hover:shadow focus:border-slate-500 focus:outline-none"
              placeholder="Konfirmasi password"
              onChange={(e) => setConfirmPassword(e.target.value)} // Capture confirm password input
            />
          </label>
          {/* Captcha and Submit Button */}
          {captchaToken.length === 0 ? (
            <Turnstile
              siteKey="0x4AAAAAAAcTY5MLJfC_A1SN"
              onSuccess={(token) => {
                setCaptchaToken(token);
              }}
              aria-label="Cloudflare Captcha"
              className="m-auto"
            />
          ) : (
            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                className="inline-flex w-full items-center justify-center space-x-2 rounded-md border border-slate-300 bg-primary py-6 text-sm font-medium text-white hover:bg-primary/80 dark:bg-navbar hover:shadow-md"
              >
                {loading ? <Spinner /> : "Daftar"} {/* Updated button text */}
              </Button>
            </div>
          )}
          {/* Google Sign Up Button */}
          <div>
            <Button
              onClick={(e) => {
                e.preventDefault(); // Prevent form submission
                void handleGoogleSignUp();
              }}
              className="flex w-full items-center justify-center space-x-2 rounded-lg border border-slate-200 py-3 text-center text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="h-6 w-6"
                alt="Google Icon"
              />
              <span className="text-white">Daftar dengan Google</span>
            </Button>
          </div>
        </div>
      </form>
      {/* Navigation to Login */}
      <p className="text-center">
        Sudah punya akun?{" "}
        <a
          href="#"
          onClick={onLoginClick}
          className="inline-flex items-center space-x-1 font-medium text-indigo-600"
        >
          <span>Masuk sekarang</span>
        </a>
      </p>
    </div>
  );
}
