"use client";
import { cn } from "@/lib/utils";
import DriverSeat from "./DriverSeat";

import PassengerSeat from "./PassengerSeat";
import Stairs from "./Stairs";

import { BusSeatInfo } from "@/types/layoutbus.types";
import { UserSession } from "@/types/next-auth";
import { RoleEnum } from "@/enum/shared.enums";
// import { memo, useEffect } from "react";
// import useStore from "@/zustand/createStore";
import { observer } from "mobx-react-lite";
import busStore from "@/mobx/busStore";
interface Props {
  className?: string;
  // dataLayoutBus: ILayoutData;
  // handleDataLayoutBus: (value: ILayoutData) => void;
  sessionUser: UserSession | null;
  action: RoleEnum;
  driverId: number;
}

function LayoutBus({ className, sessionUser, action, driverId }: Props) {
  console.log("LayoutBus RENDER");
  if (
    sessionUser === null ||
    driverId === null ||
    busStore.dataLayoutBus === null ||
    busStore.dataLayoutBus?.passenger.length === 0
  ) {
    return null;
  }

  const keysDriverSeat = Object.keys(
    busStore.dataLayoutBus.driverSeat
  ) as (keyof typeof busStore.dataLayoutBus.driverSeat)[];

  const keysStairs_0 = Object.keys(
    busStore.dataLayoutBus.stairs[0]
  ) as (keyof (typeof busStore.dataLayoutBus.stairs)[0])[];

  const keysStairs_1 =
    busStore.dataLayoutBus.stairs.length === 2 &&
    (Object.keys(
      busStore.dataLayoutBus.stairs[1]
    ) as (keyof (typeof busStore.dataLayoutBus.stairs)[1])[]);

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

  const styleDriverSeat = getKeysStyles(keysDriverSeat, busStore.dataLayoutBus.driverSeat);
  const styleStairs_0 = getKeysStyles(keysStairs_0, busStore.dataLayoutBus.stairs[0]);
  const styleStairs_1 =
    (keysStairs_1 && getKeysStyles(keysStairs_1, busStore.dataLayoutBus.stairs[1])) || null;

  const styleBus = {
    width: busStore.dataLayoutBus.busWidth,
    height: busStore.dataLayoutBus.busHeight,
    scale: "0.8",
  };

  return (
    <div className={cn("overflow-auto", className)}>
      <div
        style={styleBus}
        className="relative m-auto  rounded-l-[50px] rounded-r-[25px] bg-[#ccd0d7]  border-2 border-[#000000]"
      >
        <DriverSeat style={styleDriverSeat} className="left-[80px] bottom-[20px]" />
        <Stairs style={styleStairs_0} className="right-[100px] top-[0px]" />
        {styleStairs_1 && <Stairs style={styleStairs_1 || {}} className="left-[50px] top-[0px]" />}
        {busStore.dataLayoutBus?.passenger.map((item: BusSeatInfo, index: number) => {
          return (
            <div key={index}>
              <PassengerSeat
                params={item}
                sessionUser={sessionUser}
                action={action}
                driverId={driverId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default observer(LayoutBus);
