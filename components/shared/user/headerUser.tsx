import { FaBusAlt } from "react-icons/fa";

import { cn } from "@/lib/utils";
import UserInfo from "./userinfo";
import { Container } from "../container";

interface Props {
  className?: string;
  title?: string;
  children: any;
}

export default function HeaderUser({ className, children }: Props) {
  return (
    <header className={cn("", className)}>
      <Container className="w-full flex justify-between">
        <div className="flex gap-4 items-center ">
          <FaBusAlt style={{ width: "32px", height: "32px" }} />
          {children}
        </div>
        <UserInfo />
      </Container>
    </header>
  );
}
