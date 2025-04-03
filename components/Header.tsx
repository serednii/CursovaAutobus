"use client";
import Link from "next/link";
import { Container } from "./ui/Container";
import React from "react";
import { RoleEnum } from "@/enum/shared.enums";
import UserInfo from "./shared/user/UserInfo";
import { FaBusAlt } from "react-icons/fa";
import LinkDriver from "./shared/driver/LinkDriver";
import { MenuDriver } from "@/types/menudriver.types";
import { CircularProgress } from "@mui/material";
import { useGetSessionParams } from "../hooks/useGetSessionParams";
import LanguageChanger from "./LanguageChanger";

const menuDriver = [
  {
    name: "Create route",
    link: "/createroute",
  },
  {
    name: "My routes",
    link: "/myroutes",
  },
  // {
  //   name: "My route",
  //   link: "/myroute",
  // },
];

const menuPassenger = [
  {
    name: "My Bookings",
    link: "/mybookings",
  },
  {
    name: "Seat selection",
    link: "/seatselection",
  },
];

export default function Header() {
  const { sessionUser, status } = useGetSessionParams();

  let menulist: MenuDriver[] = [];

  if (sessionUser?.role === RoleEnum.PASSENGER) {
    menulist = menuPassenger;
  } else if (sessionUser?.role === RoleEnum.DRIVER) {
    menulist = [...menuDriver, ...menuPassenger];
  }

  return (
    <Container className="header-gradient flex justify-between gap-3 relative  flex-wrap z-[100]  rounded-lg py-2 w-full">
      {status === "loading" && (
        <CircularProgress className="absolute top-2 left-1/2 color-[#94f07c] z-10" size={30} />
      )}
      <div className="flex gap-4 items-center">
        <Link href="/" className="flex items-center gap-2 ">
          <FaBusAlt style={{ width: "32px", height: "32px", color: "blue" }} />
          <h1 className="font-bold text-black text-xl hidden md:block">ExpressBus</h1>
        </Link>
        <LinkDriver menuDriver={menulist} />
      </div>
      <LanguageChanger />
      <UserInfo />
    </Container>
  );
}
