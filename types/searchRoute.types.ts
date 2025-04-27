import { IGetSearchRouteManyOption, IGetSearchRouteOneOption } from "@/fetchApi/v1/getRoutes";
import { IGetBusSeatsBoolean, IGetPassengersSeatsList } from "./generaty.types";

export interface IGetSearchRouteManyOptionData {
  departureSearch: string | undefined;
  arrivalToSearch: string | undefined;
  endOfDay: Date;
  startOfDay: Date;
  wifi: boolean;
  coffee: boolean;
  power: boolean;
  restRoom: boolean;
  select: Omit<IGetSearchRouteManyOption, "busSeats" | "passengersSeatsList"> &
    IGetBusSeatsBoolean &
    IGetPassengersSeatsList;
}

export interface IGetSearchRouteOneOptionData {
  select: IGetSearchRouteOneOption;
}
