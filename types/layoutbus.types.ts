import { NullableNumber, SeatStatus } from "./types";

export type SeatPosition = {
  left?: number;
  bottom?: number;
  top?: number;
  right?: number;
};

export type BusSeatInfo = {
  number: number;
  busSeatStatus: SeatStatus;
  passenger: NullableNumber;
} & SeatPosition;

export interface ILayoutData {
  passengerLength: number;
  busWidth: string;
  busHeight: string;
  passenger: BusSeatInfo[];
  modelBus: string;
  driverSeat: SeatPosition;
  stairs: SeatPosition[];
}
