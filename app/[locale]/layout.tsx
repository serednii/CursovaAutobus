import { Providers } from "@/components/shared/Providers";
import TranslationsProviderI18n from "@/components/TranslationsProvider";
import TranslationsProvider from "@/components/CustomTranslationsProvider";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import initTranslations from "../i18n";

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params; // Використовуємо ?? для надійності
  const { resources } = await initTranslations(locale, [
    "header",
    "auth",
    "form",
    "seatselection",
    "myroutes",
    "myroute",
    "mybookings",
    "home",
    "createroute",
    "footer"
  ]);

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased pt-3`}>
        <TranslationsProviderI18n namespaces={[]} locale={locale} resources={resources}>
          <TranslationsProvider
            namespaces={[
              "header",
              "auth",
              "form",
              "seatselection",
              "myroutes",
              "myroute",
              "mybookings",
              "home",
              "createroute",
            ]}
            locale={locale}
            resources={resources}
          >
            <Providers>
              {children}
              <Toaster position="top-center" />
            </Providers>
          </TranslationsProvider>
        </TranslationsProviderI18n>
      </body>
    </html>
  );
}
