import Image from "next/image";

import { FaRegBell } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

export default function UserInfo() {
  return (
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
  );
}
