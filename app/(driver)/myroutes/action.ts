import { format } from "date-fns";
import { uk } from "date-fns/locale";

const formatDate = <T extends { arrivalDate: string; departureDate: string }>(dateArray: T[]): T[] => {
  return dateArray.map((route: T) => {
    return {
      ...route,
      arrivalDate: format(route.arrivalDate, "d-MM-yyyy HH:mm", {
        locale: uk,
      }),
      departureDate: format(route.departureDate, "d-MM-yyyy HH:mm", {
        locale: uk,
      }),
    };
  });
};

interface IRouteWithDate {
  arrivalDate: string; // або Date, залежно від вашого типу даних
  departureDate: string;
}

export const sortDate = <T extends IRouteWithDate>(routes: T[]) => {
  const currentDate = new Date().getTime();

  const pastRoutesRaw = routes.filter((route) => new Date(route.arrivalDate).getTime() < currentDate);
  const availableRoutesRaw = routes.filter((route) => new Date(route.arrivalDate).getTime() > currentDate);

  return {
    pastRoutes: formatDate(pastRoutesRaw),
    availableRoutes: formatDate(availableRoutesRaw),
  };
};
