"use client";
import React, { memo, useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { cn } from "@/lib/utils";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValuesRoute } from "@/types/form.types";
import { SelectChangeEvent } from "@mui/material/Select";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";
import busStore from "@/mobx/busStore";
import { useMediaQuery } from "@uidotdev/usehooks";
import { handleChangeVariantBus } from "@/app/[locale]/(driver)/createroute/[[...slug]]/action";
// import { handleChangeVariantBus } from "./action";

interface Props {
  register: UseFormRegister<FormValuesRoute>;
  errors: FieldErrors<FormValuesRoute>;
  className?: string;
  passengersLength: number[];
  // handleChangeVariantBus: (value: number) => void;
  // indexSelectVariantBus: number | null;
}

const MaterialUISelect = ({
  className,
  register,
  errors,
  passengersLength,
}: // handleChangeVariantBus,
// indexSelectVariantBus,
Props) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const { t: home } = useAppTranslation("home");
  const { t: form } = useAppTranslation("form");

  const isMobile = useMediaQuery("(max-width: 768px)");
  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = Number(event.target.value); // Приводимо значення до числа
    setSelectedValue(event.target.value); // Оновлюємо локальний стан
    // busStore.setIndexSelectVariantBus(value);
    handleChangeVariantBus(value, isMobile); // Викликаємо зовнішню функцію-обробник
  };

  // useEffect(() => {
  //   setSelectedValue(String(indexSelectVariantBus || "")); // Оновлюємо локальний стан з indexSelectVariantBus
  // }, [indexSelectVariantBus]);

  useEffect(() => {
    if (busStore.indexSelectVariantBus !== null) {
      setSelectedValue(String(busStore.indexSelectVariantBus)); // Оновлюємо локальний стан з indexSelectVariantBus
    }
  }, [busStore.indexSelectVariantBus]);

  // console.log("indexSelectVariantBus+++++++++++++", indexSelectVariantBus);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      className={cn("", className)}
      error={!!errors}
      style={{ borderColor: "black" }}
    >
      <InputLabel style={{ color: "black", top: "5px" }} id="select-label">
        {home("select_options")}
      </InputLabel>

      <Select
        {...register("selectBusLayout", {
          required: "This field is required",
        })}
        labelId="select-label"
        value={selectedValue ?? ""}
        onChange={handleChange}
        label={form("select_bus")}
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
            {form("bus")} {index + 1}: {e} {form("seats")}
          </MenuItem>
        ))}
        ;
      </Select>

      {errors && <FormHelperText>{errors.root?.message}</FormHelperText>}
    </FormControl>
  );
};

export default memo(MaterialUISelect);
