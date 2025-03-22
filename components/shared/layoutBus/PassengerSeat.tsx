"use client";
import { RoleEnum, SeatStatusEnum } from "@/enum/shared.enums";
// import { cn } from "@/lib/utils";
import { BusSeatInfo } from "@/types/layoutbus.types";
import { UserSession } from "@/types/next-auth";
import useStore from "@/zustand/createStore";
import { memo, useEffect, useState } from "react";
import SeatButton from "./SeatButton";
// import SeatButton from "./SeatButton";
import debounce from "lodash/debounce";

interface Props {
  className?: string;
  seat: BusSeatInfo;
  user: string;
  sessionUser: UserSession | null;
  action: RoleEnum;
  driverId: number | null | undefined;
  userIdSession: number;
}

export default memo(function PassengerSeat(props: Props) {
  // console.log("PassengerSeat RENDER");
  const setDataLayoutBus = useStore((state) => state.setDataLayoutBus);
  const updateIdOrderPassengers = useStore((state) => state.updateIdOrderPassengers);

  const { className, seat, user, sessionUser, action, driverId, userIdSession } = props;
  const { number } = seat;
  const [changeStatus, setChangeStatus] = useState<BusSeatInfo>(() => seat);
  const keys = Object.keys(seat) as (keyof typeof seat)[];
  const styles: React.CSSProperties = {};
  const sessionUserId = Number(sessionUser?.id) as number;

  // console.log("sessionUserId === driverId", sessionUserId, driverId);
  //add styles top, bottom, left, right

  keys.forEach((key) => {
    if (seat[key] && key !== "number" && key !== "busSeatStatus" && key !== "passenger") {
      styles[key] = typeof seat[key] === "number" ? `${seat[key]}px` : seat[key];
    }
  });

  useEffect(() => {
    seat.busSeatStatus = changeStatus.busSeatStatus;
    seat.passenger = changeStatus.passenger;
    // const debouncedUpdate = debounce(() => updateIdOrderPassengers(userIdSession, action), 300);
    updateIdOrderPassengers(userIdSession, action); //update counter reserved seats
    // return () => {
    //   debouncedUpdate.cancel();
    // };
  }, [changeStatus.busSeatStatus, changeStatus.passenger, seat, setDataLayoutBus]);

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
      if ((user === RoleEnum.DRIVER && Number(sessionUser?.id) === driverId) || driverId === 0) {
        updatedStatus = prevParams.busSeatStatus === SeatStatusEnum.AVAILABLE ? SeatStatusEnum.RESERVEDEMPTY : SeatStatusEnum.AVAILABLE;
      } else if (user === RoleEnum.DRIVER && sessionUserId !== driverId) {
        updatedStatus = prevParams.busSeatStatus === SeatStatusEnum.AVAILABLE ? SeatStatusEnum.SELECTED : SeatStatusEnum.AVAILABLE;
      } else if (user === RoleEnum.PASSENGER) {
        updatedStatus = prevParams.busSeatStatus === SeatStatusEnum.AVAILABLE ? SeatStatusEnum.SELECTED : SeatStatusEnum.AVAILABLE;
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
});
