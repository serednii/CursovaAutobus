import { cn } from "@/lib/utils";
import { memo } from "react";

export default memo(function Stairs({
  className,
  style,
  scale,
}: {
  className?: string;
  style?: React.CSSProperties;
  scale: number;
}) {
  console.log("Stairs RENDER");
  const sizeStairs = {
    width: 50 * scale,
    height: 50 * scale,
    border: 4 * scale,
    borderRadius: 4 * scale,
  };

  const sizeStairs_1 = {
    // width: 50 * scale,
    // height: 50 * scale,
    // border: 4 * scale,
    // borderRadius: 4 * scale,
    bottom: 16 * scale,
    width: 47 * scale,
    height: 15 * scale,
  };

  return (
    <div style={style} className={cn("absolute", className)}>
      <div style={sizeStairs} className="relative bg-[gray]   border-[#000000] ">
        <div style={sizeStairs_1} className="absolute  bg-[#6a89b8]"></div>
      </div>
    </div>
  );
});
