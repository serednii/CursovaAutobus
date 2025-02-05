"use client";
import { FaBusAlt } from "react-icons/fa";
import { cn } from "@/lib/utils";
import UserInfo from "./userinfo";
import { Container } from "../container";
import LinkDriver from "../driver/linkdriver";
import { MenuDriver } from "@/types/menudriver.types";
import { useSession } from "next-auth/react";
import { SessionData } from "@/types/next-auth";

interface Props {
  className?: string;
  title?: string;
  menuDriver: MenuDriver[];
}

export default function HeaderUser({ className, menuDriver }: Props) {
  const session = useSession();
  // if (session.status === "loading") return <p>Loading...</p>;
  if (!session) return <p>No user is logged in</p>;
  const { data } = session as SessionData;
  console.log(session);
  return (
    <header className={cn("", className)}>
      <Container className="w-full flex justify-between">
        <div className="flex gap-4 items-center ">
          <FaBusAlt style={{ width: "32px", height: "32px" }} />
          <LinkDriver menuDriver={menuDriver} />
        </div>
        {/* <div>
          <h1>Welcome, {session.user.firstName}!</h1>
          <p>Email: {session.user.email}</p>
          <p>Role: {session.user.role}</p>
        </div> */}
        <UserInfo />
      </Container>
    </header>
  );
}
