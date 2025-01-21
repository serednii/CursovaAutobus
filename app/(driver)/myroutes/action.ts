import { GetRoutesByDriverId, RouteDriver } from "@/types/route-driver.types";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

const formatDate = (dateArray: GetRoutesByDriverId[]) => {
  return dateArray.map((route: GetRoutesByDriverId) => {
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

export const sortDate = (routes: GetRoutesByDriverId[]) => {
  const newDate = new Date().getTime();
  const pastRoutesRaw = routes.filter(
    (route: GetRoutesByDriverId) =>
      new Date(route.arrivalDate).getTime() < newDate
  );

  const availableRoutesRaw = routes.filter(
    (route: GetRoutesByDriverId) =>
      new Date(route.arrivalDate).getTime() > newDate
  );

  return {
    pastRoutes: formatDate(pastRoutesRaw),
    availableRoutes: formatDate(availableRoutesRaw),
  };
};
