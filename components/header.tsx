// // import Image from "next/image";

"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Container } from "./shared/Container";
import React from "react";
import { RoleEnum } from "@/enum/shared.enums";
import ShowIf from "./ShowIf";
import UserInfo from "./shared/user/Userinfo";
import { FaBusAlt } from "react-icons/fa";
import LinkDriver from "./shared/driver/Linkdriver";
import { MenuDriver } from "@/types/menudriver.types";

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
    name: "Passenger`s Dashboard",
    link: "/passengerdashboard",
  },
  {
    name: "Seat selection",
    link: "/seatselection",
  },
  {
    name: "My Bookings",
    link: "/mybookings",
  },
  {
    name: "My profile",
    link: "/myprofile",
  },
];

export default function Header() {
  const pathname = usePathname();
  const session = useSession();
  let menulist: MenuDriver[] = [];

  if (pathname === "/createroute" || pathname === "/myroutes") {
    menulist = menuDriver;
  } else if (
    pathname === "/passengerdashboard" ||
    pathname.includes("/seatselection") ||
    pathname === "/mybookings" ||
    pathname === "/myprofile"
  ) {
    menulist = menuPassenger;
  }

  if (session.status === "loading") return <p>Loading...</p>;
  if (!session) return <p>No user is logged in</p>;

  const { data } = session;
  // if (data && pathname !== "/") return null;

  console.log(session);

  return (
    <Container className="flex justify-between gap-3 relative  flex-wrap z-[100] bg-gray-300 rounded-lg py-2 w-full">
      <div className="flex gap-4 items-center">
        <Link href="/">
          <FaBusAlt style={{ width: "32px", height: "32px" }} />
        </Link>
        <ShowIf condition={!!data && pathname === "/"}>
          <ShowIf
            condition={
              data?.user?.role === RoleEnum.DRIVER ||
              data?.user?.role === RoleEnum.ADMIN
            }
          >
            <Link
              style={{
                // backgroundColor: "yellow",
                padding: "5px",
                borderRadius: "15px",
              }}
              className={pathname === "/createroute" ? "active-link" : ""}
              href="/createroute/"
            >
              Driver
            </Link>
          </ShowIf>

          <ShowIf
            condition={
              data?.user?.role === RoleEnum.PASSENGER ||
              data?.user?.role === RoleEnum.ADMIN ||
              data?.user?.role === RoleEnum.DRIVER
            }
          >
            <Link
              style={{
                // backgroundColor: "yellow",
                padding: "5px",
                borderRadius: "15px",
              }}
              className={
                pathname === "/passengerdashboard" ? "active-link" : ""
              }
              href="/passengerdashboard/"
            >
              Passenger
            </Link>
          </ShowIf>
        </ShowIf>

        <ShowIf condition={!!data && pathname !== "/"}>
          <LinkDriver menuDriver={menulist} />
        </ShowIf>
      </div>

      <UserInfo />
    </Container>
  );
}
