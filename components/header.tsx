// // import Image from "next/image";

"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Container } from "./shared/container";
import React from "react";
import UserInfoParams from "./shared/user/userinfoParams";
import { RoleEnum } from "@/enum/shared.enums";
import ShowIf from "./ShowIf";
import { IoMdLogOut, IoMdLogIn } from "react-icons/io";
import UserInfo from "./shared/user/userinfo";
import HeaderUser from "./shared/user/headerUser";
import { FaBusAlt } from "react-icons/fa";
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

export default function Header() {
  const pathname = usePathname();
  const session = useSession();

  if (session.status === "loading") return <p>Loading...</p>;
  if (!session) return <p>No user is logged in</p>;

  const { data } = session;
  if (data && pathname !== "/") return null;

  console.log(session);

  return (
    <Container className="flex justify-between gap-3 relative  flex-wrap z-[100] bg-gray-300 rounded-lg py-2">
      <div className="flex gap-4 items-center">
        <Link href="/">
          <FaBusAlt style={{ width: "32px", height: "32px" }} />
        </Link>

        {/* <ShowIf condition={!data}>
          <React.Fragment>
            <Link
              style={{
                // backgroundColor: "yellow",
                padding: "5px",
                borderRadius: "15px",
              }}
              className={pathname === "/auth" ? "active-link" : ""}
              href="/auth"
            >
              Auth
            </Link>
            <Link
              style={{
                // backgroundColor: "yellow",
                padding: "5px",
                borderRadius: "15px",
              }}
              className={pathname === "/auth/role" ? "active-link" : ""}
              href="/auth/role"
            >
              Auth Role
            </Link>
            <Link
              style={{
                // backgroundColor: "yellow",
                padding: "5px",
                borderRadius: "15px",
              }}
              className={pathname === "/auth/driver" ? "active-link" : ""}
              href="/auth/driver"
            >
              Auth Driver
            </Link>
            <Link
              style={{
                // backgroundColor: "yellow",
                padding: "5px",
                borderRadius: "15px",
              }}
              className={pathname === "/auth/passenger" ? "active-link" : ""}
              href="/auth/passenger"
            >
              Auth Passenger
            </Link>
          </React.Fragment>
        </ShowIf> */}

        <ShowIf condition={!!data}>
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
      </div>

      <UserInfo />
    </Container>
  );
}
