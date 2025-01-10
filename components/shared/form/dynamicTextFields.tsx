"use client";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import {
  FieldErrors,
  UseFormRegister,
  UseFormUnregister,
} from "react-hook-form";
import { FormValues } from "@/types/form.types";

interface Props {
  register: UseFormRegister<FormValues>;
  unregister: UseFormUnregister<FormValues>;
  errors: FieldErrors<FormValues>;
  className?: string;
}

const DynamicTextFields = ({ register, unregister, errors }: Props) => {
  const [stops, setStops] = useState<string[]>([]);

  const addStop = () => {
    setStops([...stops, ""]); // Додаємо новий порожній input
  };

  const changeStop = (index: number, value: string) => {
    console.log(index);
    const updatedStops = [...stops];
    updatedStops[index] = value; // Оновлюємо відповідне значення
    setStops(updatedStops);
  };

  const deleteStop = (event: React.MouseEvent<HTMLButtonElement>) => {
    const stopIndex = Number(event.currentTarget.getAttribute("data-id")); // Зчитуємо data-id
    unregister(`intermediateStops.${stopIndex}`); // Видаляємо значення з react-hook-form
    setStops((prevStops) =>
      prevStops.filter((_, index) => index !== stopIndex)
    ); // Видаляємо stop за індексом
  };

  return (
    <div>
      <div className="flex gap-4 items-center">
        <h3>Intermediate Stops</h3>
        <button
          type="button"
          onClick={addStop}
          className="w-[32px] h-[32px] bg-[#F3F4F6] flex items-center justify-center rounded-lg"
        >
          <FaPlus />
        </button>
      </div>
      <div className="mt-4">
        {stops.map((stop, index) => (
          <div className="relative" key={index}>
            <button
              data-id={index}
              type="button"
              onClick={deleteStop}
              className="absolute right-3 top-[9px] z-10 cursor-pointer"
            >
              <FiPlus
                style={{ width: "26px", height: "26px", rotate: "45deg" }}
              />
            </button>
            <TextField
              {...register(`intermediateStops.${index}`, {
                required: "This field is required",
              })}
              value={stops[index]} // Прив'язка до стану
              onChange={(e) => changeStop(index, e.target.value)}
              label={`Stop ${index + 1}`}
              variant="outlined"
              fullWidth
              error={!!errors.intermediateStops?.[index]}
              helperText={errors.intermediateStops?.[index]?.message || ""}
              InputProps={{
                style: { height: "42px", marginBottom: "15px" },
              }}
              InputLabelProps={{
                style: { top: "5px" },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicTextFields;
