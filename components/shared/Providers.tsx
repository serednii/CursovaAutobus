"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import Header from "../Header";
import Footer from "../Footer";
import Main from "../Main";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <div className="w-full flex flex-col min-h-screen">
        <div className="bg-[url(/images/img@2x.jpg)] bg-cover w-full grow ">
          <Header />
          <Main className="grow flex">{children}</Main>
        </div>
        <Footer />
      </div>
    </SessionProvider>
  );
};
