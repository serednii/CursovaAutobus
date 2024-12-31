import React from "react";
import { cn } from "@/lib/utils";
import { FieldErrors, UseFormRegister } from "react-hook-form";

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

export default function InputText({
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
      <input
        {...register(name, {
          required: "This field is required.",
          minLength: {
            value: 5,
            message: `Minimum 5 symbol ${name}`,
          },
        })}
        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="text-red-500">
        {errors?.[name] && <p>{errors?.[name]?.message || "Error!"}</p>}
      </div>
    </div>
  );
}
