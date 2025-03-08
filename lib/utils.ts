import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { DateNumberType } from "react-datepicker/dist/date_utils";
import { IGetRouteMyRoute } from "@/fetchFunctions/fetchGetRoutesById";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const travelTime = (departureDate: string, arrivalDate: string) => {
  const departureTime = new Date(departureDate);
  const arrivalTime = new Date(arrivalDate);
  const travelTime = arrivalTime.getTime() - departureTime.getTime();
  const hours = Math.floor(travelTime / (1000 * 60 * 60));
  const minutes = Math.floor((travelTime % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

export const timeAmPm = (data: string) => {
  const date = new Date(data);
  const hours = date.getHours();
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:00 ${amPm}`;
};

export const firstLetterUpperCase = (string: string | undefined): string | undefined => {
  return (
    string &&
    string
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
      .join(" ")
  );
};

export const formatDate = <T extends { arrivalDate: string; departureDate: string }>(dateArray: T[]): T[] => {
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

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
