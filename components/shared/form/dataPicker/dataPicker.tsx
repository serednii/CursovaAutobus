"use client";
import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker from "react-datepicker";
import "./style.scss";

import {
  FieldErrors,
  UseFormRegister,
  Controller,
  Control,
  UseFormWatch,
} from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { FormValues } from "@/types/form.types";

interface Props {
  name: keyof FormValues;
  title: string;
  register: UseFormRegister<FormValues>;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  className?: string;
  watch?: UseFormWatch<FormValues>;
}

const CustomDatePicker = ({
  name,
  title,
  // register,
  control,
  errors,
  className,
  watch,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const departureDate = watch && watch("departureDate");

  // Поточна дата і час
  const now = departureDate || new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0
  ); // Початок дня
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59
  ); // Кінець дня

  return (
    <div className={className || "grow"}>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${title} is required` }}
        render={({ field }) => (
          <DatePicker
            className="w-[100%]"
            selected={field.value}
            onChange={(date: Date | null) => {
              setSelectedDate(date);
              field.onChange(date);
            }}
            placeholderText="MM/DD/YYYY HH:MM"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MM/dd/yyyy h:mm aa"
            minDate={now} // Мінімальна дата
            minTime={
              selectedDate && selectedDate.toDateString() === now.toDateString()
                ? now
                : startOfDay
            } // Мінімальний час
            maxTime={endOfDay} // Максимальний час
            customInput={
              <TextField
                label={title}
                {...field}
                placeholder="MM/DD/YYYY HH:MM"
                error={!!errors[name]}
                // helperText={errors[name]?.message}
                InputProps={{
                  style: { height: "42px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon
                        style={{
                          cursor: "pointer",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                fullWidth={false}
              />
            }
          />
        )}
      />
    </div>
  );
};

export default CustomDatePicker;
