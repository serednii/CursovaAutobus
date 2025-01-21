import { IGetRouteById } from "@/types/route-driver.types";
import { UserSelect } from "@/types/users.types";

import { format } from "date-fns";
import { uk } from "date-fns/locale";

export const formatDate = (dateArray: IGetRouteById[]) => {
  return dateArray.map((route: IGetRouteById) => {
    return {
      ...route,
      arrivalDate: format(route.arrivalDate, "d MMMM yyyy HH:mm", {
        locale: uk,
      }),
      departureDate: format(route.departureDate, "d MMMM yyyy HH:mm", {
        locale: uk,
      }),
    };
  });
};
