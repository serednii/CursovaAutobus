import { NullableNumber, SeatStatus } from "./types";

export type SeatPosition = {
  left?: string;
  bottom?: string;
  top?: string;
  right?: string;
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
