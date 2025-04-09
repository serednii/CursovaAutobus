"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import Header from "../Header";
import Footer from "../Footer";
import Main from "../Main";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Main className="flex-grow flex">{children}</Main>
        <Footer />
      </div>
    </SessionProvider>
  );
};
