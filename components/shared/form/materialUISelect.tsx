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
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  className?: string;
}

const MaterialUISelect = ({
  selectedValue,
  setSelectedValue,
  className,
  register,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValue(event.target.value as string);
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
        value={selectedValue}
        onChange={handleChange}
        label="Select Bus Layout"
      >
        <MenuItem value="" disabled>
          <em>Choose an option</em>
        </MenuItem>
        <MenuItem value="bus1">Bus 1</MenuItem>
        <MenuItem value="bus2">Bus 2</MenuItem>
        <MenuItem value="bus3">Bus 3</MenuItem>
      </Select>
    </FormControl>
  );
};

export default MaterialUISelect;
