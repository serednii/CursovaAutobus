"use client";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FaUnlockKeyhole } from "react-icons/fa6";

interface FormValues {
  password: string;
  password_repeat: string;
}

interface Props {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
  className: string;
}

export default function InputPasswords({
  register,
  errors,
  watch,
  className,
}: Props) {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  const password = watch("password", "");

  return (
    <div>
      <div className={cn("mb-2", className)}>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={toggle1 ? "text" : "password"}
            {...register("password", {
              required: "You must specify a password",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
            className="mt-1 w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-2 flex items-center">
            <FaUnlockKeyhole  style={{ color: "gray" }}/>
          </div>

          <div
            className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
            onClick={() => setToggle1(!toggle1)}
          >
            {toggle1 ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        <div className="text-red-500">
          {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm password
        </label>
        <div className="relative">
          <input
            type={toggle2 ? "text" : "password"}
            {...register("password_repeat", {
              validate: (value: string) =>
                value === password || "The passwords do not match",
            })}
            className="mt-1 w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-2 flex items-center">
            <FaUnlockKeyhole  style={{ color: "gray" }}/>
          </div>

          <div
            className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
            onClick={() => setToggle2(!toggle2)}
          >
            {toggle2 ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        <div className="text-red-500">
          {errors?.password_repeat && (
            <p>{errors?.password_repeat?.message || "Error!"}</p>
          )}
        </div>
      </div>
    </div>
  );
}
