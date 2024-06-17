"use client";

import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { NavbarIcon } from "~/components/ui/icon/navbar-icon";
import { createClient } from "~/lib/supabase/client";
import Spinner from "../ui/spinner-loading";
import { Turnstile } from "@marsidev/react-turnstile";

const FormLogin = () => {
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
      <div className="mx-auto mb-8 flex tablet:mb-5 tablet:pt-6">
        <NavbarIcon />
      </div>
      <form
        className="flex flex-col gap-4 rounded-md bg-white px-4 py-10 shadow-md dark:bg-secondary"
        onSubmit={handleLogin}
      >
        <h3 className="mb-5 text-xl font-semibold">Masuk Akun</h3>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Masukkan email"
            autoComplete="email"
            required
            className="w-full rounded-md border border-slate-300 bg-transparent bg-white px-3 py-4 text-sm placeholder-gray-500 shadow-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-slate-600 dark:bg-navbar dark:focus:border-secondary
            dark:focus:ring-secondary"
            onChange={(e) => setEmail(e.target.value)}
          />
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
          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              className="mt-3 w-full rounded-md border border-slate-300 bg-primary px-3 py-5 text-sm font-medium text-white hover:bg-primary/80 dark:bg-navbar"
            >
              {loading ? <Spinner /> : "Masuk"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormLogin;
