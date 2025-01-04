import { params } from "./type";

export interface ILayoutData {
  passengerLength: number;
  busWidth: string;
  busHeight: string;
  passenger: params[];
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
