import Header from "@/components/Header";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-3`}
      >
        <Providers>
          {children}
          <Toaster
            position="top-center"
            // toastOptions={{
            //   style: {
            //     position: "fixed",
            //     top: "50%",
            //     left: "50%",
            //     transform: "translate(-50%, -50%)",
            //     zIndex: 9999,
            //   },
            // }}
          />
        </Providers>
      </body>
    </html>
  );
}
