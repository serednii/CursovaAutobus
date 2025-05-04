import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { NextResponse } from "next/server";

interface IRouteWithDate {
  arrivalDate: string; // або Date, залежно від вашого типу даних
  departureDate: string;
}

//******************************************************* */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//******************************************************* */
export const travelTime = (departureDate: string, arrivalDate: string) => {
  const departureTime = new Date(departureDate);
  const arrivalTime = new Date(arrivalDate);
  const travelTime = arrivalTime.getTime() - departureTime.getTime();
  const hours = Math.floor(travelTime / (1000 * 60 * 60));
  const minutes = Math.floor((travelTime % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

//******************************************************* */

export const timeAmPm = (data: string) => {
  const date = new Date(data);
  const hours = date.getHours();
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:00 ${amPm}`;
};

//******************************************************* */

export const firstLetterUpperCase = (string: string | undefined): string | undefined => {
  return (
    string &&
    string
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
      .join(" ")
  );
};

//******************************************************* */

export const formatDate = <T extends { arrivalDate: string; departureDate: string }>(
  dateArray: T[] | null
): T[] => {
  if (!dateArray) return [];
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

//******************************************************* */

export const getPastRoutesAndAvailableRoutes = <T extends IRouteWithDate>(routes: T[]) => {
  const currentDate = new Date().getTime();

  const pastRoutesRaw = routes.filter(
    (route) => new Date(route.arrivalDate).getTime() < currentDate
  );
  const availableRoutesRaw = routes.filter(
    (route) => new Date(route.arrivalDate).getTime() > currentDate
  );

  return {
    pastRoutes: formatDate(pastRoutesRaw),
    availableRoutes: formatDate(availableRoutesRaw),
  };
};

//******************************************************* */

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const isAllowedField = (allowedFields: string, field: string) => {
  const result = field.split(",").every((f) => allowedFields.split(",").includes(f));
  if (!result) {
    return NextResponse.json({ error: "Invalid select" }, { status: 400 });
  }
};
export const validateAllowedFields = (fields: string, allowedFields: Set<string>): boolean => {
  return fields.split(",").every((field) => allowedFields.has(field));
};
