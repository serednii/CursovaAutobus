"use client";
import { RoleEnum, SeatStatusEnum } from "@/enum/shared.enums";
import { cn } from "@/lib/utils";
import { ILayoutData, BusSeatInfo } from "@/types/layoutbus.types";
import { UserSession } from "@/types/next-auth";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
  params: BusSeatInfo;
  user: string;
  dataLayoutBus: ILayoutData;
  setDataLayoutBus: (value: ILayoutData) => void;
  sessionUser: UserSession | null;
}

export default function PassengerSeat(props: Props) {
  const { className, params, user, dataLayoutBus, setDataLayoutBus, sessionUser } = props;
  const { number } = params;
  const [changeStatus, setChangeStatus] = useState<BusSeatInfo>(() => params);

  const keys = Object.keys(params) as (keyof typeof params)[];
  const styles: React.CSSProperties = {};

  //add styles top, bottom, left, right
  keys.forEach((key) => {
    if (params[key] && key !== "number" && key !== "busSeatStatus" && key !== "passenger") {
      styles[key] = typeof params[key] === "number" ? `${params[key]}px` : params[key];
    }
  });

  useEffect(() => {
    params.busSeatStatus = changeStatus.busSeatStatus;
    params.passenger = changeStatus.passenger;

    // console.log(params, dataPassenger);
    // console.log("PassengerSeat ************************** ----", dataLayoutBus);

    setDataLayoutBus({ ...dataLayoutBus });
  }, [changeStatus.busSeatStatus]);

  // Змінюємо колір залежно від статусу місця
  const statusColor = {
    reserved: "bg-red-500",
    available: "bg-green-500",
    selected: "bg-blue-500",
  }[changeStatus.busSeatStatus];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setChangeStatus((prevParams: BusSeatInfo) => {
      const updatedStatus: SeatStatusEnum =
        user === RoleEnum.DRIVER
          ? prevParams.busSeatStatus === SeatStatusEnum.AVAILABLE
            ? SeatStatusEnum.RESERVED
            : SeatStatusEnum.AVAILABLE
          : prevParams.busSeatStatus === SeatStatusEnum.AVAILABLE
          ? SeatStatusEnum.SELECTED
          : SeatStatusEnum.AVAILABLE;
      // console.log(updatedStatus);

      const res = {
        ...prevParams, // Зберігаємо всі інші властивості без змін
        busSeatStatus: updatedStatus, // Оновлюємо статус сидіння
        passenger: updatedStatus === "available" ? null : Number(sessionUser?.id), // Оновлюємо пасажира
      };

      console.log(res);

      // Повертаємо новий об'єкт params з оновленими значеннями

      return res;
    });
  };

  return (
    <button
      disabled={changeStatus.busSeatStatus === "reserved" && user === "passenger"}
      onClick={handleClick}
      style={styles}
      className={cn("absolute disabled:cursor-not-allowed", className)}
    >
      <div className={cn("relative w-[60px] h-[40px] rounded-t-lg rounded-b-md flex justify-center items-center", statusColor)}>
        <p className="text-white text-[1.5rem] translate-x-[-5px]">{number}</p>
        <div className="absolute right-[2px] top-[0px] rounded-t-md rounded-b-xl w-[15px] h-[40px] bg-[#5a8950]"></div>
      </div>
    </button>
  );
}
