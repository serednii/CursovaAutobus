import { SeatStatusEnum } from "../enum/shared.enums";

export type NullableNumber = number | null | undefined;
export type SeatStatus =
  | SeatStatusEnum.Selected
  | SeatStatusEnum.Available
  | SeatStatusEnum.Reserved;
