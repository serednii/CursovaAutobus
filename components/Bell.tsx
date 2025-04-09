import React from "react";
import { FaRegBell } from "react-icons/fa";

export default function Bell() {
  return (
    <div className="relative ">
      <FaRegBell style={{ width: "32px", height: "32px" }} />
      <div className="absolute top-[-2px] left-4  bg-[#EF4444] color-white w-5 h-5 rounded-[50%] flex justify-center items-center text-white">
        3
      </div>
    </div>
  );
}
