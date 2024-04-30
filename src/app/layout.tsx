export const runtime = "edge";

import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Navbar } from "~/components/ui/navbar";
import Footer from "~/components/ui/footer";

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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className={`${inter.variable} bg-background text-foreground`}>
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
