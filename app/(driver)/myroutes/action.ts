import { formatDate } from "@/lib/utils";

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
