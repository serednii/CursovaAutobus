"use client";
import { RoleEnum, SeatStatusEnum } from "@/enum/shared.enums";
// import { cn } from "@/lib/utils";
import { ILayoutData, BusSeatInfo } from "@/types/layoutbus.types";
import { UserSession } from "@/types/next-auth";
// import useStore from "@/zustand/createStore";
import { useEffect, useState } from "react";
import SeatButton from "./SeatButton";
// import SeatButton from "./SeatButton";
import { observer } from "mobx-react-lite";
import busStore from "@/mobx/busStore";
import { runInAction } from "mobx";

interface Props {
  className?: string;
  params: BusSeatInfo;
  // dataLayoutBus: ILayoutData;
  // handleDataLayoutBus: (value: ILayoutData) => void;
  sessionUser: UserSession;
  action: RoleEnum;
  driverId: number | null | undefined;
}

function PassengerSeat({ className, params, sessionUser, action, driverId }: Props) {
  // console.log("PassengerSeat RENDER");
  // const setDataLayoutBus = useStore((state) => state.setDataLayoutBus);

  const { number } = params;
  const [changeStatus, setChangeStatus] = useState<BusSeatInfo>(() => params);
  const keys = Object.keys(params) as (keyof typeof params)[];
  const styles: React.CSSProperties = {};
  const sessionUserId = parseInt(sessionUser.id);
  const userRole = sessionUser?.role;

  // console.log("sessionUserId === driverId", sessionUserId, driverId);
  //add styles top, bottom, left, right

  keys.forEach((key) => {
    if (params[key] && key !== "number" && key !== "busSeatStatus" && key !== "passenger") {
      styles[key] = typeof params[key] === "number" ? `${params[key]}px` : params[key];
    }
  });

  useEffect(() => {
    runInAction(() => {
      params.busSeatStatus = changeStatus.busSeatStatus;
      params.passenger = changeStatus.passenger;
      busStore.setDataLayoutBus({ ...(busStore.dataLayoutBus as ILayoutData) }, action);
    });
  }, [changeStatus.busSeatStatus, changeStatus.passenger, params, busStore, action]);

  // Змінюємо колір залежно від статусу місця
  const statusColor = {
    [SeatStatusEnum.RESERVED]: "bg-red-500",
    [SeatStatusEnum.RESERVEDEMPTY]: "bg-yellow-500",
    [SeatStatusEnum.AVAILABLE]: "bg-green-500",
    [SeatStatusEnum.SELECTED]: "bg-blue-500",
  }[changeStatus.busSeatStatus];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setChangeStatus((prevParams: BusSeatInfo) => {
      //Якщо являємося водієм і на своєму маршруті
      let updatedStatus: SeatStatusEnum = SeatStatusEnum.AVAILABLE;

      if (
        (userRole === RoleEnum.DRIVER && Number(sessionUser?.id) === driverId) ||
        driverId === 0
      ) {
        updatedStatus =
          prevParams.busSeatStatus === SeatStatusEnum.AVAILABLE
            ? SeatStatusEnum.RESERVEDEMPTY
            : SeatStatusEnum.AVAILABLE;
      } else if (
        (userRole === RoleEnum.DRIVER && sessionUserId !== driverId) ||
        userRole === RoleEnum.PASSENGER
      ) {
        updatedStatus =
          prevParams.busSeatStatus === SeatStatusEnum.AVAILABLE
            ? SeatStatusEnum.SELECTED
            : SeatStatusEnum.AVAILABLE;
      }

      const res = {
        ...prevParams, // Зберігаємо всі інші властивості без змін
        busSeatStatus: updatedStatus, // Оновлюємо статус сидіння
        passenger: updatedStatus === SeatStatusEnum.AVAILABLE ? null : sessionUserId, // Оновлюємо пасажира
      };

      return res;
    });
  };

  return (
    <SeatButton
      number={number}
      changeStatus={changeStatus}
      action={action}
      sessionUserId={sessionUserId}
      driverId={driverId}
      statusColor={statusColor}
      styles={styles}
      className={className}
      handleClick={handleClick}
    />
  );
}
export default observer(PassengerSeat);
