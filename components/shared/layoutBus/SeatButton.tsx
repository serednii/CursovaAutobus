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
  scale: number;
  isMobile: boolean;
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
  scale,
  isMobile,
  handleClick,
}) => {
  const disabled =
    changeStatus.busSeatStatus === SeatStatusEnum.RESERVED ||
    (action === RoleEnum.PASSENGER && sessionUserId === driverId) ||
    (driverId > 0 &&
      changeStatus.busSeatStatus === SeatStatusEnum.RESERVEDEMPTY &&
      sessionUserId !== driverId);

  const sizeSeatButton_1 = {
    width: 60 * scale,
    height: 40 * scale,
    border: 4 * scale + "px",
    borderRadius: 4 * scale + "px",
  };

  const sizeSeatButton_2 = {
    width: 15 * scale,
    height: 40 * scale,
    border: 4 * scale + "px",
    right: 2 * scale + "px",
  };

  const sizeSeatButton_p = {
    fontSize: 1.5 * scale + "rem",
    transform: `translateX(-${-5 * scale}px)`,
    borderRadius: 4 * scale + "px",
    rotate: `${isMobile ? -90 : 0}deg`,
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      style={{ ...styles, rotate: `${isMobile ? 90 : 0}deg` }}
      className={cn("absolute disabled:cursor-not-allowed ", className)}
    >
      <div
        style={sizeSeatButton_1}
        className={cn("relative  flex justify-center items-center", statusColor)}
      >
        <p style={sizeSeatButton_p} className="text-white ">
          {number}
        </p>
        <div
          style={sizeSeatButton_2}
          className="absolute  top-[0px] rounded-t-md rounded-b-xl  bg-[#5a8950]"
        ></div>
      </div>
    </button>
  );
};

export default memo(SeatButton);
