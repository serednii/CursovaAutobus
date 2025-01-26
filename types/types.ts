import { SeatStatusEnum } from "../enum/shared.enums";

export type NullableNumber = number | null | undefined;

export type SeatStatus =
  | SeatStatusEnum.SELECTED
  | SeatStatusEnum.AVAILABLE
  | SeatStatusEnum.RESERVED;
