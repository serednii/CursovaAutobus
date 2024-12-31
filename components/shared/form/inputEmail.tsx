"use client";
import { cn } from "@/lib/utils";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AiTwotoneMail } from "react-icons/ai";

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

export default function InputEmail({ register, errors, className }: Props) {
  return (
    <div className={cn("mb-2", className)}>
      {" "}
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email
      </label>
      <div className="relative">
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          placeholder="example@domain.com"
          className="mt-1 w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute inset-y-0 left-2 flex items-center z-10">
          <AiTwotoneMail  style={{ color: "gray" }}/>
        </div>
      </div>
      <div className="text-red-500">
        {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
      </div>
    </div>
  );
}
