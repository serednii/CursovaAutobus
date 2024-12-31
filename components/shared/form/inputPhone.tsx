import { cn } from "@/lib/utils";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FaPhoneAlt } from "react-icons/fa";

interface FormValues {
  password: string;
  password_repeat: string;
}

interface Props {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  name: string;
  className: string;
}

export default function InputPhone({ register, errors, className }: Props) {
  return (
    <div className={cn("mb-2", className)}>
      <label
        htmlFor="phone"
        className="block text-sm font-medium text-gray-700"
      >
        Phone
      </label>
      <div className="relative">
        <input
          {...register("phone", {
            required: "This field is required.",
            pattern: {
              value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
              message: "Invalid phone number",
            },
          })}
          placeholder="+123456789"
          className="mt-1 w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="absolute inset-y-0 left-2 flex items-center">
          <FaPhoneAlt style={{ color: "gray" }} />
        </div>
      </div>
      <div className=" text-red-500">
        {errors?.phone && <p>{errors?.phone?.message || "Error!"}</p>}
      </div>
    </div>
  );
}
