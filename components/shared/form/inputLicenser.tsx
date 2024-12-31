import React from "react";
import { cn } from "@/lib/utils";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FaIdCard } from "react-icons/fa6";

interface FormValues {
  password: string;
  password_repeat: string;
}

interface Props {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  name: string;
  title: string;
  className?: string;
}

export default function InputLicense({
  name,
  register,
  errors,
  title,
  className,
}: Props) {
  return (
    <div className={cn("mb-2", className)}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <div className="relative">
        <input
          {...register(name, {
            required: "This field is required.",
            minLength: {
              value: 5,
              message: `Minimum 5 symbol ${name}`,
            },
          })}
          className="mt-1 w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute inset-y-0 left-2 flex items-center">
          <FaIdCard style={{ color: "gray" }} />
        </div>
      </div>
      <div className="text-red-500">
        {errors?.[name] && <p>{errors?.[name]?.message || "Error!"}</p>}
      </div>
    </div>
  );
}
