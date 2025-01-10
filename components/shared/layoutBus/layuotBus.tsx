"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import DriverSeat from "./driverSeat";

import PassengerSeat from "./passengerSeat";
import Stairs from "./stairs";

import { UserSession } from "../../../types/session.types";
import { ILayoutData, params } from "@/types/layoutbus.types";

interface Props {
  className?: string;
  dataLayoutBus: ILayoutData;
  setDataLayoutBus: (value: ILayoutData) => void;
  sessionUser: UserSession | null;
}

const keys = [
  "passenger",
  "busWidth",
  "busHeight",
  "driverSeat",
  "stairs",
] as const;

export default function LayoutBus({
  className,
  dataLayoutBus,
  setDataLayoutBus,
  sessionUser,
}: Props) {
  const user: "driver" | "passenger" = "driver";

  if (dataLayoutBus?.passenger.length === 0) {
    return null;
  }

  const keysDriverSeat = Object.keys(
    dataLayoutBus.driverSeat
  ) as (keyof typeof dataLayoutBus.driverSeat)[];

  const keysStairs_0 = Object.keys(
    dataLayoutBus.stairs[0]
  ) as (keyof (typeof dataLayoutBus.stairs)[0])[];

  const keysStairs_1 =
    dataLayoutBus.stairs.length === 2 &&
    (Object.keys(
      dataLayoutBus.stairs[1]
    ) as (keyof (typeof dataLayoutBus.stairs)[1])[]);

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

  const styleDriverSeat = getKeysStyles(
    keysDriverSeat,
    dataLayoutBus.driverSeat
  );
  const styleStairs_0 = getKeysStyles(keysStairs_0, dataLayoutBus.stairs[0]);
  const styleStairs_1 =
    (keysStairs_1 && getKeysStyles(keysStairs_1, dataLayoutBus.stairs[1])) ||
    null;

  const styleBus = {
    width: dataLayoutBus.busWidth,
    height: dataLayoutBus.busHeight,
    scale: "0.8",
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
        {dataLayoutBus?.passenger.map((item: params, index: number) => {
          return (
            <div key={index}>
              <PassengerSeat
                params={item}
                user={user}
                dataLayoutBus={dataLayoutBus}
                setDataLayoutBus={setDataLayoutBus}
                sessionUser={sessionUser}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
