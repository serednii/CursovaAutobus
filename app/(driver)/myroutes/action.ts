import { GetRoutesByDriverId } from "@/types/route-driver.types";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

const formatDate = <T extends { arrivalDate: string; departureDate: string }>(
  dateArray: T[]
) => {
  return dateArray.map((route: T) => {
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

export const sortDate = <
  T extends { arrivalDate: string; departureDate: string }
>(
  routes: T[]
) => {
  const currentDate = new Date().getTime();
  const pastRoutesRaw = routes.filter(
    (route: T) => new Date(route.arrivalDate).getTime() < currentDate
  );

  const availableRoutesRaw = routes.filter(
    (route: T) => new Date(route.arrivalDate).getTime() > currentDate
  );

  return {
    pastRoutes: formatDate(pastRoutesRaw),
    availableRoutes: formatDate(availableRoutesRaw),
  };
};
