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
export default function Header() {
  const pathname = usePathname();
  const session = useSession();

  if (session.status === "loading") return <p>Loading...</p>;
  if (!session) return <p>No user is logged in</p>;

  const { data } = session;
  if (data && pathname !== "/") return null;

  console.log(session);

  return (
    <Container className="flex gap-3  flex-wrap">
      <ShowIf condition={!data}>
        <React.Fragment>
          <Link
            style={{
              backgroundColor: "yellow",
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
              backgroundColor: "yellow",
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
              backgroundColor: "yellow",
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
              backgroundColor: "yellow",
              padding: "5px",
              borderRadius: "15px",
            }}
            className={pathname === "/auth/passenger" ? "active-link" : ""}
            href="/auth/passenger"
          >
            Auth Passenger
          </Link>
        </React.Fragment>
      </ShowIf>

      <ShowIf condition={!!data}>
        <ShowIf condition={data?.user?.role === RoleEnum.DRIVER}>
          <Link
            style={{
              backgroundColor: "yellow",
              padding: "5px",
              borderRadius: "15px",
            }}
            className={pathname === "/createroute" ? "active-link" : ""}
            href="/createroute/"
          >
            Driver
          </Link>
        </ShowIf>

        <ShowIf condition={data?.user?.role === RoleEnum.PASSENGER}>
          <Link
            style={{
              backgroundColor: "yellow",
              padding: "5px",
              borderRadius: "15px",
            }}
            className={pathname === "/passengerdashboard" ? "active-link" : ""}
            href="/passengerdashboard/"
          >
            Passenger
          </Link>
        </ShowIf>

        <Link
          style={{
            backgroundColor: "yellow",
            padding: "5px",
            borderRadius: "15px",
          }}
          href="#"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign Out
        </Link>
      </ShowIf>
      <ShowIf condition={!data}>
        <Link
          style={{
            backgroundColor: "yellow",
            padding: "5px",
            borderRadius: "15px",
          }}
          href="/auth/signin"
        >
          SignIn
        </Link>
      </ShowIf>

      <UserInfoParams user={data?.user} />
    </Container>
  );
}
