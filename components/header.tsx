"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Container } from "./ui/Container";
import React from "react";
import { RoleEnum } from "@/enum/shared.enums";
import UserInfo from "./shared/user/Userinfo";
import { FaBusAlt } from "react-icons/fa";
import LinkDriver from "./shared/driver/Linkdriver";
import { MenuDriver } from "@/types/menudriver.types";
import { CircularProgress } from "@mui/material";

const menuDriver = [
  {
    name: "Create route",
    link: "/createroute",
  },
  {
    name: "My routes",
    link: "/myroutes",
  },
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
  const session = useSession();
  let menulist: MenuDriver[] = [];
  const { data } = session;

  if (data?.user?.role === RoleEnum.PASSENGER) {
    menulist = menuPassenger;
  } else if (data?.user?.role === RoleEnum.DRIVER) {
    menulist = [...menuDriver, ...menuPassenger];
  }

  console.log("Header", session);

  return (
    <Container className="header-gradient flex justify-between gap-3 relative  flex-wrap z-[100]  rounded-lg py-2 w-full">
      {session.status === "loading" && <CircularProgress className="absolute top-2 left-1/2 color-[#94f07c] z-10" size={30} />}
      <header className="flex gap-4 items-center">
        <Link href="/" className="flex items-center gap-2 ">
          <FaBusAlt style={{ width: "32px", height: "32px", color: "blue" }} />
          <h1 className="font-bold text-black text-xl hidden md:block">ExpressBus</h1>
        </Link>
        <LinkDriver menuDriver={menulist} />
      </header>
      <UserInfo />
    </Container>
  );
}
