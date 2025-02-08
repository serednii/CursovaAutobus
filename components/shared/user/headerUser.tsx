// "use client";
import { FaBusAlt } from "react-icons/fa";
import { cn } from "@/lib/utils";
import UserInfo from "./userinfo";
import { Container } from "../container";
import LinkDriver from "../driver/linkdriver";
import { MenuDriver } from "@/types/menudriver.types";
import Link from "next/link";

interface Props {
  className?: string;
  title?: string;
  menuDriver: MenuDriver[];
}

export default function HeaderUser({ className, menuDriver }: Props) {
  return (
    <header className={cn("", className)}>
      <Container className="w-full flex justify-between">
        <div className="flex gap-4 items-center ">
          <Link
            // style={{
            //   // backgroundColor: "yellow",
            //   padding: "5px",
            //   borderRadius: "15px",
            // }}
            href="/"
          >
            <FaBusAlt style={{ width: "32px", height: "32px" }} />
          </Link>
          <LinkDriver menuDriver={menuDriver} />
        </div>
        <UserInfo />
      </Container>
    </header>
  );
}
