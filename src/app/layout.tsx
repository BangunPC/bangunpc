export const runtime = "edge";

import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google";
import React, { Suspense } from "react";
import { Navbar } from "@/components/common/navbar";
import ProgressBarProvider from "@/components/provider/progress-bar";
import Footer from "@/components/common/footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Rakit PC Impianmu | Bangun PC",
  description:
    "Solusi praktis dalam memilih dan merakit komponen-komponen PC sesuai dengan kebutuhan dan budget yang dimiliki yang terhubung dengan e-commerce di Indonesia",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics gaId="G-SXXB5CHSKR" />
      <body>
        <ProgressBarProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className={`${inter.variable} bg-background text-foreground flex flex-col min-h-1.2-screen dark:bg-gray-800`}>
              <Suspense>
                <Navbar />
              </Suspense>
              <div className="flex-grow mt-navbar-min-h mb-10">

                {children}
              </div>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
