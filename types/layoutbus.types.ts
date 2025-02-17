import { NullableNumber, SeatStatus } from "./types";

export type SeatPositionString = {
  left?: string;
  bottom?: string;
  top?: string;
  right?: string;
};

export type SeatPositionNumber = {
  left?: number;
  bottom?: number;
  top?: number;
  right?: number;
};

export type BusSeatInfo = {
  number: number;
  busSeatStatus: SeatStatus;
  passenger: NullableNumber;
} & SeatPositionNumber;

export interface ILayoutData {
  passengerLength: number;
  busWidth: string;
  busHeight: string;
  passenger: BusSeatInfo[];
  modelBus: string;
  driverSeat: SeatPositionString;
  stairs: SeatPositionString[];
}
