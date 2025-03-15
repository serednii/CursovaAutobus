import { cn } from "@/lib/utils";
import { memo } from "react";

export default memo(function DriverSeat({ className, style }: { className?: string; style?: React.CSSProperties }) {
  console.log("DriverSeat RENDER");
  return (
    <div style={style} className={cn("absolute", className)}>
      <div className="relative bg-[#1da04d] w-[60px] h-[40px] rounded-t-lg rounded-b-md">
        <div className="absolute right-[2px] top-[0px] rounded-t-md rounded-b-xl w-[15px] h-[40px] bg-[#5a8950]"></div>
        <div className="absolute left-[-30px] rounded-full w-[40px] h-[40px] border-4 border-white flex justify-center items-center">
          <div className=" rounded-full w-[15px] h-[15px] bg-white"></div>
        </div>
      </div>
    </div>
  );
});
