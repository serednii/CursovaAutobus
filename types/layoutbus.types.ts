import { NullableNumber, SeatStatus } from "./types";

export type params = {
  left?: number;
  bottom?: number;
  top?: number;
  right?: number;
  number: number;
  busSeatStatus: SeatStatus;
  passenger: NullableNumber;
};

export type paramsSeat = {
  left?: string;
  bottom?: string;
  top?: string;
  right?: string;
};

export interface ILayoutData {
  passengerLength: number;
  busWidth: string;
  busHeight: string;
  passenger: params[];
  modelBus: string;
  driverSeat: {
    left?: string;
    bottom?: string;
    top?: string;
    right?: string;
  };
  stairs: {
    left?: string;
    bottom?: string;
    top?: string;
    right?: string;
  }[];
}
