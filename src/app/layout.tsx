export const runtime = "edge";

import "~/styles/globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import React from "react";
import Footer from "~/components/ui/footer";
import { Navbar } from "~/components/ui/navbar";
import ProgressBarProvider from "~/components/provider/progress-bar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Rakit PC Impianmu | Bangun PC",
  description:
    "Solusi praktis dalam memilih dan merakit komponen-komponen PC sesuai dengan kebutuhan dan budget yang dimiliki yang terafiliasi dengan e-commerce di Indonesia",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-SXXB5CHSKR" />
      <body>
        <ProgressBarProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className={`${inter.variable} bg-background text-foreground`}>
              <Navbar />
              <div className="mt-navbar-min-h">{children}</div>
              <Footer />
            </div>
          </ThemeProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
