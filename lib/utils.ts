import { IUser } from "@/types/users.types";
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

export function isUserArray(array: any): { message: string; status: boolean } {
  if (!Array.isArray(array)) {
    return { message: "Invalid user array", status: false };
  }

  for (let i = 0; i < array.length; i++) {
    const obj = array[i];

    if (!obj || typeof obj !== "object") {
      return { message: `Invalid user object at index ${i}`, status: false };
    }

    const requiredFields: { key: keyof IUser; type: string }[] = [
      { key: "id", type: "number" },
      { key: "firstName", type: "string" },
      { key: "lastName", type: "string" },
      { key: "email", type: "string" },
      { key: "phone", type: "string" },
    ];

    for (const { key, type } of requiredFields) {
      if (!(key in obj)) {
        return { message: `Missing '${key}' at index ${i}`, status: false };
      }

      if (typeof obj[key] !== type) {
        return {
          message: `Invalid type for '${key}' at index ${i}`,
          status: false,
        };
      }
    }
  }

  return { message: "", status: true };
}
