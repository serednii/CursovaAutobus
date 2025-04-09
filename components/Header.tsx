"use client";
import { Container } from "./ui/Container";
import React from "react";
import { RoleEnum } from "@/enum/shared.enums";
import UserInfo from "./shared/user/UserInfo";

import NavbarMenu from "./shared/driver/navbarMenu/NavbarMenu";
import { MenuDriver } from "@/types/menudriver.types";
import { CircularProgress } from "@mui/material";
import { useGetSessionParams } from "../hooks/useGetSessionParams";
// import { useAppTranslation } from "./TranslationsProvider";
// import { useTranslation } from "react-i18next";
import { useAppTranslation } from "./CustomTranslationsProvider";
import LogoComponent from "./LogoComponent";
// import { Breadcrumbs } from "@material-tailwind/react";
export default function Header() {
  const { t } = useAppTranslation("header");

  const menuDriver: MenuDriver[] = [
    {
      name: t("create_route"),
      link: "/createroute",
    },
    {
      name: t("my_routes"),
      link: "/myroutes",
    },
    // {
    //   name: t("my_route"),
    //   link: "/myroute",
    // },
  ];

  const menuPassenger: MenuDriver[] = [
    {
      name: t("my_bookings"),
      link: "/mybookings",
    },
    {
      name: t("seat_selection"),
      link: "/seatselection",
    },
  ];

  const { sessionUser, status } = useGetSessionParams();

  let menulist: MenuDriver[] = [];

  if (sessionUser?.role === RoleEnum.PASSENGER) {
    menulist = menuPassenger;
  } else if (sessionUser?.role === RoleEnum.DRIVER) {
    menulist = [...menuDriver, ...menuPassenger];
  }

  return (
    <header>
      <Container className="header-gradient  gap-1 sm:gap-3 relative  flex-wrap z-[100]  rounded-lg py-2 pe-2  w-full">
        <div className="flex justify-between items-center w-full">
          {status === "loading" && (
            <CircularProgress className="absolute top-2 left-1/2 color-[#94f07c] z-10" size={30} />
          )}
          <div className="flex gap-4 items-center relative">
            <LogoComponent className="hidden md:flex" />

            <NavbarMenu menuDriver={menulist} />
          </div>
          <LogoComponent className="flex md:hidden" />

          <UserInfo />
        </div>
        {/* <Breadcrumbs>
          <a href="#" className="opacity-60">
            Docs
          </a>
          <a href="#" className="opacity-60">
            Components
          </a>
          <a href="#">Breadcrumbs</a>
        </Breadcrumbs> */}
      </Container>
    </header>
  );
}
