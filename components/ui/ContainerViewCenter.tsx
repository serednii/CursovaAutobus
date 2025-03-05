import { cn } from "@/lib/utils";
import React from "react";
import * as Icons from "@radix-ui/react-icons";

interface Props {
  className?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContainerViewCenter: React.FC<React.PropsWithChildren<Props>> = ({ setOpen, className, children }) => {
  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={cn("fixed w-full h-full top-0 left-0 right-0 bottom-0 backdrop-blur-sm z-[100]", className)}
      ></div>
      <div className={cn("fixed w-full top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%] bg-green-50 p-10 z-[110]", className)}>
        <button onClick={() => setOpen(false)} className="absolute top-[150px] right-[50%] icon-btn bg-white z-[120]">
          <Icons.Cross2Icon style={{ transform: "scale(1.5)", color: "black" }} />
        </button>
        {children}
      </div>
    </>
  );
};
