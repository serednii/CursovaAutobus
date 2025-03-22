"use client";
import { cn } from "@/lib/utils";
import DriverSeat from "./DriverSeat";

import PassengerSeat from "./PassengerSeat";
// import Stairs from "./Stair";

import { BusSeatInfo } from "@/types/layoutbus.types";
import { UserSession } from "@/types/next-auth";
import { RoleEnum } from "@/enum/shared.enums";
import { memo } from "react";
import useStore from "@/zustand/createStore";

type styleKey = ("left" | "bottom" | "right" | "top")[]; // Виправлений тип

export const getKeysStyles = (
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

interface Props {
  className?: string;
  sessionUser: UserSession | null;
  action: RoleEnum;
  driverId: number | undefined | null;
  userIdSession: number;
}

export default function LayoutBus({ className, sessionUser, action, driverId, userIdSession }: Props) {
  const user = sessionUser?.role;
  console.log("LayoutBus RENDER");

  const dataLayoutBusMap = useStore((state) => state.dataLayoutBusMap);
  // console.log("dataLayoutBusMap LayoutBus", dataLayoutBusMap);

  if (dataLayoutBusMap === null || dataLayoutBusMap === undefined) {
    return null;
  }

  const styleBus = {
    width: dataLayoutBusMap.busWidth,
    height: dataLayoutBusMap.busHeight,
    scale: "0.8",
  };

  return (
    <>
      {dataLayoutBusMap && (
        <div className={cn("overflow-auto", className)}>
          <div style={styleBus} className="relative m-auto  rounded-l-[50px] rounded-r-[25px] bg-[#ccd0d7]  border-2 border-[#000000]">
            <DriverSeat className="left-[80px] bottom-[20px]" />
            {dataLayoutBusMap?.passenger.map((seat: BusSeatInfo, index: number) => {
              return (
                <div key={index}>
                  <PassengerSeat
                    seat={seat}
                    user={user || ""}
                    sessionUser={sessionUser}
                    action={action}
                    driverId={driverId}
                    userIdSession={userIdSession}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
