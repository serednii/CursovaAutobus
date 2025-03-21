"use client";
import React, { memo, useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { cn } from "@/lib/utils";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValuesRoute } from "@/types/form.types";
import { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  register: UseFormRegister<FormValuesRoute>;
  errors: FieldErrors<FormValuesRoute>;
  className?: string;
  passengersLength: number[];
  handleChangeVariantBus: (value: number) => void;
  indexSelectVariantBus: number | null;
}

const MaterialUISelect = ({ className, register, errors, passengersLength, handleChangeVariantBus, indexSelectVariantBus }: Props) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = Number(event.target.value); // Приводимо значення до числа
    setSelectedValue(event.target.value); // Оновлюємо локальний стан
    handleChangeVariantBus(value); // Викликаємо зовнішню функцію-обробник
  };

  // useEffect(() => {
  //   setSelectedValue(String(indexSelectVariantBus || "")); // Оновлюємо локальний стан з indexSelectVariantBus
  // }, [indexSelectVariantBus]);

  useEffect(() => {
    if (indexSelectVariantBus !== null) {
      setSelectedValue(String(indexSelectVariantBus)); // Оновлюємо локальний стан з indexSelectVariantBus
    }
  }, [indexSelectVariantBus]);

  console.log("indexSelectVariantBus+++++++++++++", indexSelectVariantBus);

  return (
    <FormControl fullWidth variant="outlined" className={cn("", className)} error={!!errors} style={{ borderColor: "black" }}>
      <InputLabel style={{ color: "black", top: "5px" }} id="select-label">
        Select an Option
      </InputLabel>

      <Select
        {...register("selectBusLayout", {
          required: "This field is required",
        })}
        labelId="select-label"
        value={selectedValue ?? ""}
        onChange={handleChange}
        label="Select Bus Layout"
        sx={{
          "& .MuiOutlinedInput-notchedOutline.MuiOutlinedInput-notchedOutline": {
            borderColor: "gray", // Чорна рамка
            height: "45px",
            top: "0",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "blue", // Синя рамка при наведенні
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black", // Червона рамка при фокусі
          },
        }}
      >
        {passengersLength.map((e, index) => (
          <MenuItem key={index} value={index}>
            Bus {index + 1}: {e} seats
          </MenuItem>
        ))}
        ;
      </Select>

      {errors && <FormHelperText>{errors.root?.message}</FormHelperText>}
    </FormControl>
  );
};

export default memo(MaterialUISelect);
