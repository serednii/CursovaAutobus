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
import { useMediaQuery } from "@/hooks/useMediaQuery";
// import { layoutsData_90deg } from "./LayoutData_90deg";
// import { layoutsData_0deg } from "./LayoutData_0deg";
import { getNewDataLayoutBus } from "@/app/[locale]/(driver)/createroute/[[...slug]]/action";
import { useEffect } from "react";
// import { ZodNumber } from "zod";
interface Props {
  className?: string;
  sessionUser: UserSession | null;
  action: RoleEnum;
  driverId: number;
}

type styleKey = "left" | "bottom" | "right" | "top"; // Виправлений тип

export const converterToPx = (
  changeObject: Record<string, number>,
  busWidth: number,
  busHeight: number
): Record<styleKey, string> => {
  const keys = Object.keys(changeObject) as styleKey[];
  const newObject = {} as Record<styleKey, string>;

  if (keys[0] === "left" || keys[0] === "right") {
    newObject[keys[0]] = `${Math.round(busWidth * changeObject[keys[0]])}px`;
  } else {
    newObject[keys[0]] = `${Math.round(busHeight * changeObject[keys[0]])}px`;
  }

  if (keys[1] === "left" || keys[1] === "right") {
    newObject[keys[1]] = `${Math.round(busWidth * changeObject[keys[1]])}px`;
  } else {
    newObject[keys[1]] = `${Math.round(busHeight * changeObject[keys[1]])}px`;
  }
  return newObject;
};

function LayoutBus({ className, sessionUser, action, driverId }: Props) {
  console.log("LayoutBus RENDER");
  const isTablet = useMediaQuery("(max-width: 1150px)");
  const isMobile = useMediaQuery("(max-width: 900px)");
  const isSmallMobile = useMediaQuery("(max-width: 768px)");
  const isClient = typeof window !== "undefined";

  useEffect(() => {
    if (!isClient || sessionUser === null) return;
    const layout = getNewDataLayoutBus(isSmallMobile);
    busStore.setDataLayoutBus(layout, action); // newDataLayoutBus === busStore.dataLayoutBus
  }, [isSmallMobile, isClient, sessionUser, action]);

  if (
    sessionUser === null ||
    driverId === null ||
    busStore.dataLayoutBus === null ||
    busStore.dataLayoutBus === null ||
    busStore.dataLayoutBus?.passenger.length === 0
  ) {
    return null;
  }

  const scale = isTablet ? (isMobile ? 0.8 : 0.7) : 1;
  const newBusWidth = busStore.dataLayoutBus.busWidth * scale;
  const newBusHeight = busStore.dataLayoutBus.busHeight * scale;

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

  const getKeysStyles = (
    nameKeys: styleKey[],
    data: Record<styleKey, string> // Якщо параметри конкретні, можна вказати точний тип
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
    converterToPx(busStore.dataLayoutBus.driverSeat, newBusWidth, newBusHeight)
  );

  const styleStairs_0 = getKeysStyles(
    keysStairs_0,
    converterToPx(busStore.dataLayoutBus.stairs[0], newBusWidth, newBusHeight)
  );

  const styleStairs_1 =
    (keysStairs_1 &&
      getKeysStyles(
        keysStairs_1,
        converterToPx(busStore.dataLayoutBus.stairs[1], newBusWidth, newBusHeight)
      )) ||
    null;

  const styleBus = {
    width: newBusWidth,
    height: newBusHeight,
    borderTopLeftRadius: 50 * scale + "px",
    borderBottomLeftRadius: (isSmallMobile ? 25 : 50) * scale + "px",
    borderTopRightRadius: (isSmallMobile ? 50 : 25) * scale + "px",
    borderBottomRightRadius: 25 * scale + "px",
  };

  return (
    <div className={cn("overflow-auto", className)}>
      <div style={styleBus} className="relative m-auto  bg-[#ccd0d7]  border-2 border-[#000000]">
        <DriverSeat style={styleDriverSeat} scale={scale} isMobile={isSmallMobile} />
        <Stairs
          style={{ ...styleStairs_0, rotate: `${isSmallMobile ? 90 : 0}deg` }}
          scale={scale}
        />
        {styleStairs_1 && (
          <Stairs
            style={{ ...styleStairs_1, rotate: `${isSmallMobile ? 90 : 0}deg` }}
            scale={scale}
          />
        )}
        {busStore.dataLayoutBus &&
          busStore.dataLayoutBus.passenger.map((item: BusSeatInfo, index: number) => {
            return (
              <div key={index}>
                <PassengerSeat
                  params={item}
                  sessionUser={sessionUser}
                  action={action}
                  driverId={driverId}
                  scale={scale}
                  newBusWidth={newBusWidth}
                  newBusHeight={newBusHeight}
                  isMobile={isSmallMobile}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default observer(LayoutBus);
