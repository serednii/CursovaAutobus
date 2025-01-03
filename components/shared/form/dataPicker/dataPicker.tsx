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
} from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

interface FormValues {
  departureDate?: Date;
  arrivalDate?: Date;
}

interface Props {
  name: keyof FormValues;
  title: string;
  register: UseFormRegister<FormValues>;
  control: Control<FormValues>; // Тип для control
  errors: FieldErrors<FormValues>;
  className?: string;
}

const CustomDatePicker = ({
  name,
  title,
  register,
  control,
  errors,
  className,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className={className || "grow"}>
      <Controller
        name={name}
        control={control} // Використовуємо control
        rules={{ required: `${title} is required` }}
        render={({ field }) => (
          <DatePicker
            className="w-[100%]"
            selected={field.value}
            onChange={(date: Date | null) => {
              setSelectedDate(date);
              field.onChange(date); // Передаємо значення в react-hook-form
            }}
            placeholderText="MM/DD/YYYY HH:MM"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MM/dd/yyyy h:mm aa"
            customInput={
              <TextField
                label={title}
                {...field}
                placeholder="MM/DD/YYYY HH:MM"
                error={!!errors[name]}
                helperText={errors[name]?.message}
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
