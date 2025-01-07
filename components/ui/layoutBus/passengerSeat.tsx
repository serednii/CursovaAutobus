"use client";
import { cn } from "@/lib/utils";
import { use, useEffect, useState } from "react";
import { ILayoutData } from "./interface";
import { params, SeatStatus } from "./type";

interface Props {
  className?: string;
  params: params;
  user: "driver" | "passenger";
  dataLayoutBus: ILayoutData;
  setDataLayoutBus: (value: ILayoutData) => void;
}

export default function PassengerSeat(props: Props) {
  const { className, params, user, dataLayoutBus, setDataLayoutBus } = props;
  const { number, busSeatStatus } = params;
  const [changeStatus, setChangeStatus] = useState<SeatStatus>(
    () => busSeatStatus
  );
  const keys = Object.keys(params) as (keyof typeof params)[];

  const styles: React.CSSProperties = {};

  //add styles top, bottom, left, right
  keys.forEach((key) => {
    if (params[key] && key !== "number" && key !== "busSeatStatus") {
      styles[key] =
        typeof params[key] === "number" ? `${params[key]}px` : params[key];
    }
  });

  useEffect(() => {
    params.busSeatStatus = changeStatus;
    // console.log(params, dataPassenger);
    setDataLayoutBus({ ...dataLayoutBus });
  }, [changeStatus]);

  // Змінюємо колір залежно від статусу місця
  const statusColor = {
    reserved: "bg-red-500",
    available: "bg-green-500",
    selected: "bg-blue-500",
  }[changeStatus];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setChangeStatus((prevStatus: SeatStatus) => {
      if (user === "driver") {
        return prevStatus === "available" ? "reserved" : "available";
      } else {
        return prevStatus === "available" ? "selected" : "available";
      }
    });
  };

  return (
    <button
      disabled={changeStatus === "reserved" && user === "passenger"}
      onClick={handleClick}
      style={styles}
      className={cn("absolute disabled:cursor-not-allowed", className)}
    >
      <div
        className={cn(
          "relative w-[60px] h-[40px] rounded-t-lg rounded-b-md flex justify-center items-center",
          statusColor
        )}
      >
        <p className="text-white text-[1.5rem] translate-x-[-5px]">{number}</p>
        <div className="absolute right-[2px] top-[0px] rounded-t-md rounded-b-xl w-[15px] h-[40px] bg-[#5a8950]"></div>
      </div>
    </button>
  );
}
