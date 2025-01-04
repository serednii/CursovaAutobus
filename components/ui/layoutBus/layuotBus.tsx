"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import DriverSeat from "./driverSeat";
import { layoutData } from "./layoutData";
import PassengerSeat from "./passengerSeat";
import Stairs from "./stairs";
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
}

export default function LayoutBus({ className }: Props) {
  const [dataPassenger, setDataPassenger] = useState<params[]>([]);
  console.log(dataPassenger);
  useEffect(() => {
    setDataPassenger(layoutData.passenger as params[]);
  }, []);
  const user: "driver" | "passenger" = "driver";

  return (
    <div className={cn("", className)}>
      <div className="relative w-[1000px] h-[230px] rounded-l-[50px] rounded-r-[25px] bg-[#ccd0d7]  border-2 border-[#000000]">
        <DriverSeat className="left-[80px] bottom-[20px]" />
        <Stairs className="right-[100px] top-[0px]" />
        <Stairs className="left-[50px] top-[0px]" />
        {dataPassenger.map((item: params, index: number) => {
          // console.log(item);
          return (
            <div key={index}>
              <PassengerSeat
                params={item}
                user={user}
                dataPassenger={dataPassenger}
                setDataPassenger={setDataPassenger}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
