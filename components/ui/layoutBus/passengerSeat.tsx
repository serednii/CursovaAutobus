"use client";
import { cn } from "@/lib/utils";
import { use, useEffect, useState } from "react";

type SeatStatus = "reserved" | "available" | "selected";
type params = {
  left?: number;
  bottom?: number;
  top?: number;
  right?: number;
  number: number;
  busSeatStatus: SeatStatus;
};
interface Props {
  className?: string;
  params: params;
  user: "driver" | "passenger";
  dataPassenger: params[];
  setDataPassenger: (value: params[]) => void;
}

export default function PassengerSeat(props: Props) {
  const { className, params, user, dataPassenger, setDataPassenger } = props;
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
    setDataPassenger([...dataPassenger]);
  }, [changeStatus]);

  // Змінюємо колір залежно від статусу місця
  const statusColor = {
    reserved: "bg-red-500",
    available: "bg-green-500",
    selected: "bg-blue-500",
  }[changeStatus];

  const handleClick = () => {
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
