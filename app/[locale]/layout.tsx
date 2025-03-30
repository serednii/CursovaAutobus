import { Providers } from "@/components/shared/Providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  // console.log("params in RootLayout", params);
  // 🔥 Чекаємо params.locale перед його використанням
  const { locale } = await params; // Використовуємо ?? для надійності
  // const { resources } = await initTranslations(locale, ["common"]);

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased pt-3`}>
        {/* <TranslationsProvider namespaces={["common"]} locale={locale} resources={resources}> */}
        <Providers>
          {children}
          <Toaster position="top-center" />
        </Providers>
        {/* </TranslationsProvider> */}
      </body>
    </html>
  );
}
