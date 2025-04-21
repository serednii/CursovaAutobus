import { SeatStatusEnum } from "@/enum/shared.enums";
import { NullableNumber } from "./types";

export type SeatPositionString = {
  left?: number;
  bottom?: number;
  top?: number;
  right?: number;
};

export type SeatPositionNumber = {
  left?: number;
  bottom?: number;
  top?: number;
  right?: number;
};

export type BusSeatInfo = {
  number: number;
  busSeatStatus: SeatStatusEnum;
  passenger: NullableNumber;
} & SeatPositionNumber;

export interface ILayoutData {
  passengerLength: number;
  busWidth: number;
  busHeight: number;
  passenger: BusSeatInfo[];
  modelBus: string;
  driverSeat: SeatPositionNumber;
  stairs: SeatPositionNumber[];
}
