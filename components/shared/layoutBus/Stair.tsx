import { cn } from "@/lib/utils";
import { memo } from "react";

export default memo(function Stair({ className, style }: { className?: string; style?: React.CSSProperties }) {
  console.log("Stairs RENDER");
  return (
    <div style={style} className={cn("absolute", className)}>
      <div className="relative bg-[gray] size-[50px] border-4 border-[#000000] rounded-[4px]">
        <div className="absolute bottom-[16px]  w-[42px] h-[15px] bg-[#6a89b8]"></div>
      </div>
    </div>
  );
});
