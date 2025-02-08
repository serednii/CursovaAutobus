"use client";

import React from "react";
// import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
// import NextTopLoader from "nextjs-toploader";
import Header from "../header";
import HeaderUser from "./user/headerUser";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SessionProvider>
        <Header />

        {children}
      </SessionProvider>
      {/* <Toaster /> */}
      {/* {children} */}
      {/* <NextTopLoader /> */}
    </>
  );
};
