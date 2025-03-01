import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

export const ContainerCenter: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <div className={cn("m-auto max-w-[1280px] px-4 h-[100%]", className)}>
      <div className="flex justify-center items-center h-[100%]">{children}</div>
    </div>
  );
};
