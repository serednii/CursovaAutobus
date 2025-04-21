import { SeatStatusEnum, RoleEnum } from "@/enum/shared.enums";
import { cn } from "@/lib/utils";
import { BusSeatInfo } from "@/types/layoutbus.types";
import React, { memo } from "react";

interface SeatButtonProps {
  number: number;
  changeStatus: BusSeatInfo;
  action: RoleEnum;
  sessionUserId: number;
  driverId: number;
  statusColor: string;
  styles?: React.CSSProperties;
  className?: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SeatButton: React.FC<SeatButtonProps> = ({
  number,
  changeStatus,
  action,
  sessionUserId,
  driverId,
  statusColor,
  styles,
  className,
  handleClick,
}) => {
  const disabled =
    changeStatus.busSeatStatus === SeatStatusEnum.RESERVED ||
    (action === RoleEnum.PASSENGER && sessionUserId === driverId) ||
    (driverId > 0 &&
      changeStatus.busSeatStatus === SeatStatusEnum.RESERVEDEMPTY &&
      sessionUserId !== driverId);
  // console.log("SeatButton RENDER", changeStatus.busSeatStatus, action, sessionUserId, driverId);
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      style={styles}
      className={cn("absolute disabled:cursor-not-allowed", className)}
    >
      <div
        className={cn(
          "relative w-[60px] h-[40px] rounded-t-lg rounded-b-md flex justify-center items-center",
          statusColor
        )}
      >
        <p className="text-white text-[1.5rem] translate-x-[-5px]">{number}</p>
        <div className="absolute right-[2px] top-[0px] rounded-t-md rounded-b-xl w-[15px] h-[40px] bg-[#5a8950]"></div>
      </div>
    </button>
  );
};

export default memo(SeatButton);
