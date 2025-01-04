export type SeatStatus = "reserved" | "available" | "selected";

export type params = {
  left?: number;
  bottom?: number;
  top?: number;
  right?: number;
  number: number;
  busSeatStatus: SeatStatus;
};

export type paramsSeat = {
  left?: string;
  bottom?: string;
  top?: string;
  right?: string;
};