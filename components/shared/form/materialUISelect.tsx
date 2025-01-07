"use client";
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { cn } from "@/lib/utils";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface FormValues {
  selectBusLayout: string;
}

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
  passengersLength,
  handleChangeVariantBus,
  IndexSelectVariantBus,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    handleChangeVariantBus(event.target.value as number);
  };

  return (
    <FormControl fullWidth variant="outlined" className={cn("", className)}>
      <InputLabel id="select-label">Select an Option</InputLabel>
      <Select
        sx={{ top: "4px", height: "42px" }}
        {...register("selectBusLayout", {
          required: "selectBusLayout is required",
        })}
        labelId="select-label"
        value={IndexSelectVariantBus ?? ""} // Перевірка на undefined
        onChange={handleChange}
        label="Select Bus Layout"
      >
        {passengersLength.map((e, index) => (
          <MenuItem key={index} value={index}>
            bus {index + 1} {e}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MaterialUISelect;
