import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
