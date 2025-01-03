import Image from "next/image";
import { Container } from "../container";
import { FaBusAlt, FaRegBell } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function HeaderDriver({ className }: Props) {
  return (
    <header className={cn("", className)}>
      <Container className="w-full">
        <div className="flex justify-between">
          <div className="flex gap-4 items-center ">
            <FaBusAlt style={{ width: "32px", height: "32px" }} />
            <p>Passenger's Dashboard</p>
          </div>
          <div className="flex gap-4 items-center">
            <FaRegBell style={{ width: "32px", height: "32px" }} />
            <Image width={32} height={32} alt="User" src="/users/user.jpeg" />
            <IoMdExit style={{ width: "32px", height: "32px" }} />
          </div>
        </div>
      </Container>
    </header>
  );
}
