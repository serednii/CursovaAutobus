import Image from "next/image";
import { Container } from "../container";
import { FaBusAlt, FaRegBell } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { Props } from "next/script";
import { cn } from "@/lib/utils";
export default function HeaderDriver({ className }: Props) {
  return (
    <header className={cn("", className)}>
      <Container className="w-full">
        <div className="flex justify-between">
          <div className="flex gap-4 items-center ">
            <FaBusAlt style={{ width: "32px", height: "32px" }} />
            <p>Driver's Dashboard</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative ">
              <FaRegBell style={{ width: "32px", height: "32px" }} />
              <div className="absolute top-[-2px] left-4  bg-[#EF4444] color-white w-5 h-5 rounded-[50%] flex justify-center items-center text-white">
                3
              </div>
            </div>
            <Image width={32} height={32} alt="User" src="/users/user.jpeg" />
            <IoMdExit style={{ width: "32px", height: "32px" }} />
          </div>
        </div>
      </Container>
    </header>
  );
}
