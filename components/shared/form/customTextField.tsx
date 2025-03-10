"use client";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TextField } from "@mui/material";
import { cn } from "@/lib/utils";
import { FormValuesRoute } from "@/types/form.types";
import { useEffect, useState } from "react";

interface Props {
  register: UseFormRegister<FormValuesRoute>;
  errors: FieldErrors<FormValuesRoute>;
  name: keyof FormValuesRoute;
  title: string;
  // handleSearch?: () => void;
  className?: string;
  isList?: boolean;
}

export default function CustomTextField({ register, errors, name, title, className, isList = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn("", className)}>
      <div className="relative z-[150]">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {title}
        </label>
        <TextField
          id={name}
          {...register(name, {
            required: "This field is required.",
            minLength: {
              value: 1,
              message: `Minimum 1 symbol license`,
            },
          })}
          variant="outlined"
          fullWidth
          InputProps={{
            style: { height: "42px" },
          }}
          error={!!errors?.[name]}
          // autoComplete="off"
          onClick={handleOpenList}
          helperText={errors?.[name] ? String(errors?.[name]?.message) : ""}
        />
        {isList && isOpen && (
          <>
            <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0  z-[100]" onClick={() => setIsOpen(false)}></div>
            <div className="absolute top-[70px] left-0  bg-white h-[162px] w-full z-[150]  overflow-auto  text-[1rem] border-2  border-sky-500 p-3">
              <ul className="">
                <li className="h-[20px]">1</li>
                <li className="h-[20px]">2</li>
                <li className="h-[20px]">3</li>
                <li className="h-[20px]">4</li>
                <li className="h-[20px]">5</li>
                <li className="h-[20px]">6</li>
                <li className="h-[20px]">7</li>
                <li className="h-[20px]">8</li>
                <li className="h-[20px]">9</li>
                <li className="h-[20px]">10</li>
                <li className="h-[20px]">11</li>
                <li className="h-[20px]">12</li>
                <li className="h-[20px]">13</li>
                <li className="h-[20px]">14</li>
                <li className="h-[20px]">15</li>
                <li className="h-[20px]">16</li>
                <li className="h-[20px]">17</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
