"use client";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FaUnlockKeyhole } from "react-icons/fa6";
import FormError from "./FormError";
import { FormValues } from "@/app/[locale]/(auth)/interface";

interface Props {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
  className?: string;
  t: any;
  one?: boolean;
}

export default function InputPassword({
  register,
  errors,
  t,
  watch,
  one = false,
  className,
}: Props) {
  const password = watch("password", "");
  const password_repeat = watch("password_repeat", "");

  // console.log(password);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  return (
    <div>
      <div className={cn("mb-4 relative", className)}>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          {t("form:password")}
        </label>
        <input
          {...register("password", {
            required: t("form:you_must_specify_password"),
            minLength: {
              value: 5,
              message: t("form:password_must_have_at_least_8_characters"),
            },
          })}
          type={toggle1 ? "text" : "password"}
          className="pr-8 mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {password === "" && (
          <FaUnlockKeyhole style={{ color: "gray" }} className="absolute top-[37px] left-1" />
        )}
        <div
          className="absolute top-[37px] right-2 cursor-pointer"
          onClick={() => setToggle1(!toggle1)}
        >
          {toggle1 ? <FaRegEye /> : <FaRegEyeSlash />}
        </div>
        <FormError errors={errors} name="password" />
      </div>

      {!one && (
        <div className="mb-4 relative">
          <label htmlFor="password_repeat" className="block text-sm font-medium text-gray-700">
            {t("form:repeat_password")}
          </label>
          <input
            {...register("password_repeat", {
              validate: (value: string) =>
                value === password || t("form:the_passwords_do_not_match"),
            })}
            type={toggle2 ? "text" : "password"}
            className="pr-8 mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {password_repeat === "" && (
            <FaUnlockKeyhole style={{ color: "grey" }} className="absolute top-[37px] left-1" />
          )}
          <div
            className="absolute top-[37px] right-2 cursor-pointer"
            onClick={() => setToggle2(!toggle2)}
          >
            {toggle2 ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
          <FormError errors={errors} name="password_repeat" />
        </div>
      )}
    </div>
  );
}
