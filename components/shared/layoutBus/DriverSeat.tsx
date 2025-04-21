import { cn } from "@/lib/utils";
import { memo } from "react";

export default memo(function DriverSeat({
  className,
  style,
  scale,
}: {
  className?: string;
  style?: React.CSSProperties;
  scale: number;
}) {
  console.log("DriverSeat RENDER");
  const sizeDriverSeat_1 = {
    width: 60 * scale,
    height: 40 * scale,
    border: 4 * scale + "px",
    borderRadius: 4 * scale + "px",
  };

  const sizeDriverSeat_2 = {
    width: 15 * scale,
    height: 40 * scale,
  };

  const sizeDriverSeatCircleOut = {
    width: 40 * scale,
    height: 40 * scale,
    border: 4 * scale + "px" + " solid white",

    left: -30 * scale + "px",
  };

  const sizeDriverSeatCircleIn = {
    width: 15 * scale,
    height: 15 * scale,
  };
  return (
    <div style={style} className={cn("absolute", className)}>
      <div style={sizeDriverSeat_1} className="relative bg-[#1da04d]">
        <div
          style={sizeDriverSeat_2}
          className="absolute right-[2px] top-[0px] rounded-t-md rounded-b-xl w-[15px] h-[40px] bg-[#5a8950]"
        ></div>
        <div
          style={sizeDriverSeatCircleOut}
          className="absolute rounded-full border-white flex justify-center items-center"
        >
          <div
            style={sizeDriverSeatCircleIn}
            className=" rounded-full w-[15px] h-[15px] bg-white"
          ></div>
        </div>
      </div>
    </div>
  );
});
