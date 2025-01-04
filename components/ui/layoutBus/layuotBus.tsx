"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import DriverSeat from "./driverSeat";
import { ILayoutData } from "./interface";

import PassengerSeat from "./passengerSeat";
import Stairs from "./stairs";
import { params, paramsSeat } from "./type";

interface Props {
  className?: string;
  layoutData: ILayoutData;
}
const keys = [
  "passenger",
  "busWidth",
  "busHeight",
  "driverSeat",
  "stairs",
] as const;
export default function LayoutBus({ className, layoutData }: Props) {
  const [dataPassenger, setDataPassenger] = useState<params[]>([]);

  console.log(dataPassenger);

  useEffect(() => {
    setDataPassenger(layoutData.passenger as params[]);
  }, [layoutData]);

  const user: "driver" | "passenger" = "driver";

  if (dataPassenger.length === 0) {
    return null;
  }

  const keysDriverSeat = Object.keys(
    layoutData.driverSeat
  ) as (keyof typeof layoutData.driverSeat)[];

  const keysStairs_0 = Object.keys(
    layoutData.stairs[0]
  ) as (keyof (typeof layoutData.stairs)[0])[];

  const keysStairs_1 =
    layoutData.stairs.length === 2 &&
    (Object.keys(
      layoutData.stairs[1]
    ) as (keyof (typeof layoutData.stairs)[1])[]);

  type styleKey = ("left" | "bottom" | "right" | "top")[]; // Виправлений тип

  const getKeysStyles = (
    nameKeys: styleKey,
    data: Record<string, string> // Якщо параметри конкретні, можна вказати точний тип
  ): React.CSSProperties => {
    const styleDriverSeat: React.CSSProperties = {};
    nameKeys.forEach((key) => {
      if (key in data) {
        styleDriverSeat[key] = data[key];
      }
    });
    return styleDriverSeat;
  };

  const styleDriverSeat = getKeysStyles(keysDriverSeat, layoutData.driverSeat);
  const styleStairs_0 = getKeysStyles(keysStairs_0, layoutData.stairs[0]);
  const styleStairs_1 =
    (keysStairs_1 && getKeysStyles(keysStairs_1, layoutData.stairs[1])) || null;

  console.log(styleDriverSeat, styleStairs_0, styleStairs_1);
  const styleBus = {
    width: layoutData.busWidth,
    height: layoutData.busHeight,
  };

  return (
    <div className={cn("", className)}>
      <div
        style={styleBus}
        className="relative  rounded-l-[50px] rounded-r-[25px] bg-[#ccd0d7]  border-2 border-[#000000]"
      >
        <DriverSeat
          style={styleDriverSeat}
          className="left-[80px] bottom-[20px]"
        />
        <Stairs style={styleStairs_0} className="right-[100px] top-[0px]" />
        {styleStairs_1 && (
          <Stairs
            style={styleStairs_1 || {}}
            className="left-[50px] top-[0px]"
          />
        )}
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
