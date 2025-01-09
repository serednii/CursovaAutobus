"use client";
import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { cn } from "@/lib/utils";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "@/types/form.types";

interface Props {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  className?: string;
  passengersLength: number[];
  handleChangeVariantBus: (value: number) => void;
  IndexSelectVariantBus: number | null;
}

const MaterialUISelect = ({
  className,
  register,
  errors,
  passengersLength,
  handleChangeVariantBus,
  IndexSelectVariantBus,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(
    IndexSelectVariantBus
  );

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as number; // Приводимо значення до числа
    setSelectedValue(value); // Оновлюємо локальний стан для відображення вибраного елемента
    handleChangeVariantBus(value); // Викликаємо функцію-обробник
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      className={cn("", className)}
      error={!!errors.selectBusLayout}
    >
      <InputLabel id="select-label">Select an Option</InputLabel>
      <Select
        sx={{ top: "4px", height: "42px" }}
        {...register("selectBusLayout", {
          required: "This field is required", // Повідомлення про помилку
        })}
        labelId="select-label"
        value={selectedValue ?? ""} // Використання локального стану для відображення вибору
        onChange={handleChange}
        label="Select Bus Layout"
      >
        {passengersLength.map((e, index) => (
          <MenuItem key={index} value={index}>
            Bus {index + 1}: {e} seats
          </MenuItem>
        ))}
      </Select>
      {errors.selectBusLayout && (
        <FormHelperText>{errors.selectBusLayout.message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default MaterialUISelect;
