import React from "react";
import cn from "classnames";
import { RoleEnum, SeatStatusEnum } from "@/enum/shared.enums";

interface SeatButtonProps {
  number: number;
  changeStatus: { busSeatStatus: SeatStatusEnum };
  action: RoleEnum;
  sessionUserId: string;
  driverId: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  statusColor?: string;
  sizeFactor?: number; // Коефіцієнт масштабу
}

const SeatButton: React.FC<SeatButtonProps> = ({
  number,
  changeStatus,
  action,
  sessionUserId,
  driverId,
  handleClick,
  className,
  statusColor,
  sizeFactor = 1, // За замовчуванням 100%
}) => {
  const isDisabled = changeStatus.busSeatStatus === SeatStatusEnum.RESERVED || (action === RoleEnum.PASSENGER && sessionUserId === driverId);

  // Динамічні розміри
  const width = 60 * sizeFactor;
  const height = 40 * sizeFactor;
  const numberFontSize = 1.5 * sizeFactor + "rem";
  const sideWidth = 15 * sizeFactor;
  const sideHeight = height;

  return (
    <button disabled={isDisabled} onClick={handleClick} className={cn("absolute disabled:cursor-not-allowed", className)}>
      <div className={cn("relative flex justify-center items-center rounded-t-lg rounded-b-md", statusColor)} style={{ width, height }}>
        <p className="text-white" style={{ fontSize: numberFontSize, transform: "translateX(-5px)" }}>
          {number}
        </p>
        <div className="absolute right-[2px] top-[0px] rounded-t-md rounded-b-xl bg-[#5a8950]" style={{ width: sideWidth, height: sideHeight }}></div>
      </div>
    </button>
  );
};

export default SeatButton;
