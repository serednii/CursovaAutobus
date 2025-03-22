"use client";
import { cn } from "@/lib/utils";
import DriverSeat from "./DriverSeat";

import PassengerSeat from "./PassengerSeat";
import Stairs from "./Stairs";

import { ILayoutData, BusSeatInfo } from "@/types/layoutbus.types";
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

export default memo(function LayoutBus({ className, sessionUser, action, driverId }: Props) {
  const user = sessionUser?.role;
  const userIdSession = sessionUser?.id;
  console.log("LayoutBus RENDER");
  const dataLayoutBus = useStore((state) => state.dataLayoutBus);
  if (dataLayoutBus === null || dataLayoutBus === undefined || dataLayoutBus?.passenger.length === 0) {
    return null;
  }

  const keysDriverSeat = Object.keys(dataLayoutBus.driverSeat) as (keyof typeof dataLayoutBus.driverSeat)[];

  const keysStairs_0 = Object.keys(dataLayoutBus.stairs[0]) as (keyof (typeof dataLayoutBus.stairs)[0])[];

  const keysStairs_1 = dataLayoutBus.stairs.length === 2 && (Object.keys(dataLayoutBus.stairs[1]) as (keyof (typeof dataLayoutBus.stairs)[1])[]);

  const styleDriverSeat = getKeysStyles(keysDriverSeat, dataLayoutBus.driverSeat);
  const styleStairs_0 = getKeysStyles(keysStairs_0, dataLayoutBus.stairs[0]);
  const styleStairs_1 = (keysStairs_1 && getKeysStyles(keysStairs_1, dataLayoutBus.stairs[1])) || null;

  const styleBus = {
    width: dataLayoutBus.busWidth,
    height: dataLayoutBus.busHeight,
    scale: "0.8",
  };

  return (
    <div className={cn("overflow-auto", className)}>
      <div style={styleBus} className="relative m-auto  rounded-l-[50px] rounded-r-[25px] bg-[#ccd0d7]  border-2 border-[#000000]">
        <DriverSeat className="left-[80px] bottom-[20px]" />
        <Stairs style={styleStairs_0} className="right-[100px] top-[0px]" />
        {styleStairs_1 && <Stairs style={styleStairs_1 || {}} className="left-[50px] top-[0px]" />}
        {dataLayoutBus?.passenger.map((seat: BusSeatInfo, index: number) => {
          return (
            <div key={index}>
              <PassengerSeat
                seat={seat}
                user={user || ""}
                sessionUser={sessionUser}
                action={action}
                driverId={driverId}
                userIdSession={Number(userIdSession)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});

// "use client";
// import { cn } from "@/lib/utils";
// import DriverSeat from "./DriverSeat";

// import PassengerSeat from "./PassengerSeat";
// // import Stairs from "./Stair";

// import { BusSeatInfo } from "@/types/layoutbus.types";
// import { UserSession } from "@/types/next-auth";
// import { RoleEnum } from "@/enum/shared.enums";
// import { memo } from "react";
// import useStore from "@/zustand/createStore";
// import Stairs from "./Stairs";

// type styleKey = ("left" | "bottom" | "right" | "top")[]; // Виправлений тип

// export const getKeysStyles = (
//   nameKeys: styleKey,
//   data: Record<string, string> // Якщо параметри конкретні, можна вказати точний тип
// ): React.CSSProperties => {
//   const styleDriverSeat: React.CSSProperties = {};
//   nameKeys.forEach((key) => {
//     if (key in data) {
//       styleDriverSeat[key] = data[key];
//     }
//   });
//   return styleDriverSeat;
// };

// interface Props {
//   className?: string;
//   sessionUser: UserSession | null;
//   action: RoleEnum;
//   driverId: number | undefined | null;
//   userIdSession: number;
// }

// export default function LayoutBus({ className, sessionUser, action, driverId, userIdSession }: Props) {
//   const user = sessionUser?.role;
//   console.log("LayoutBus RENDER");

//   const dataLayoutBusMap = useStore((state) => state.dataLayoutBusMap);
//   // console.log("dataLayoutBusMap LayoutBus", dataLayoutBusMap);

//   if (dataLayoutBusMap === null || dataLayoutBusMap === undefined) {
//     return null;
//   }

//   const styleBus = {
//     width: dataLayoutBusMap.busWidth,
//     height: dataLayoutBusMap.busHeight,
//     scale: "0.8",
//   };
//   // const keysDriverSeat = Object.keys(dataLayoutBus.driverSeat) as (keyof typeof dataLayoutBus.driverSeat)[];

//   // const keysStairs_0 = Object.keys(dataLayoutBus.stairs[0]) as (keyof (typeof dataLayoutBus.stairs)[0])[];

//   // const keysStairs_1 = dataLayoutBus.stairs.length === 2 && (Object.keys(dataLayoutBus.stairs[1]) as (keyof (typeof dataLayoutBus.stairs)[1])[]);

//   // type styleKey = ("left" | "bottom" | "right" | "top")[]; // Виправлений тип

//   // const getKeysStyles = (
//   //   nameKeys: styleKey,
//   //   data: Record<string, string> // Якщо параметри конкретні, можна вказати точний тип
//   // ): React.CSSProperties => {
//   //   const styleDriverSeat: React.CSSProperties = {};
//   //   nameKeys.forEach((key) => {
//   //     if (key in data) {
//   //       styleDriverSeat[key] = data[key];
//   //     }
//   //   });
//   //   return styleDriverSeat;
//   // };
//   // const styleDriverSeat = getKeysStyles(keysDriverSeat, dataLayoutBus.driverSeat);
//   // const styleStairs_0 = getKeysStyles(keysStairs_0, dataLayoutBus.stairs[0]);
//   // const styleStairs_1 = (keysStairs_1 && getKeysStyles(keysStairs_1, dataLayoutBus.stairs[1])) || null;

//   return (
//     <>
//       {dataLayoutBusMap && (
//         <div className={cn("overflow-auto", className)}>
//           <div style={styleBus} className="relative m-auto  rounded-l-[50px] rounded-r-[25px] bg-[#ccd0d7]  border-2 border-[#000000]">
//             <DriverSeat className="left-[80px] bottom-[20px]" />

//             {/* <Stairs style={styleStairs_0} className="right-[100px] top-[0px]" />
//             {styleStairs_1 && <Stairs style={styleStairs_1 || {}} className="left-[50px] top-[0px]" />} */}

//             {dataLayoutBusMap?.passenger.map((seat: BusSeatInfo, index: number) => {
//               return (
//                 <div key={index}>
//                   <PassengerSeat
//                     seat={seat}
//                     user={user || ""}
//                     sessionUser={sessionUser}
//                     action={action}
//                     driverId={driverId}
//                     userIdSession={userIdSession}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
