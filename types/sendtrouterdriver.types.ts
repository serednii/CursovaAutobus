import { RouteDriver } from "./interface";

export interface SendRouteDriver extends RouteDriver {
  passengersListId: number[]; // ID пасажирів
}
