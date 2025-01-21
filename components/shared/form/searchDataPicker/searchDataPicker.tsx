"use client";
import React, { useEffect, useState } from "react";
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
  highlightedDates: Date[]; // Масив дат для підсвічування
}

const SearchDataPicker = ({
  name,
  title,
  control,
  errors,
  className,
  watch,
  highlightedDates,
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

  // Функція для підсвічування днів
  const dayClassName = (date: Date) => {
    const isHighlighted = highlightedDates.some((highlightedDate) => {
      const selectDay = highlightedDate.getDate();
      const selectMonth = highlightedDate.getMonth();
      const selectYear = highlightedDate.getFullYear();

      const currentDay = new Date().getDate();
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const notLastDate =
        selectYear >= currentYear &&
        selectMonth >= currentMonth &&
        selectDay >= currentDay;
      return (
        notLastDate && highlightedDate.toDateString() === date.toDateString()
      );
    });

    return isHighlighted ? "highlighted-day" : ""; // Додаємо клас, якщо дата підсвічена
  };

  return (
    <div className={className || "grow border search-data-picker"}>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${title} is required` }}
        render={({ field }) => (
          <DatePicker
            className="w-[100%] mt-1 p-2 border border-gray-300  "
            selected={field.value}
            onChange={(date: Date | null) => {
              setSelectedDate(date);
              field.onChange(date);
            }}
            placeholderText="MM/DD/YYYY"
            dateFormat="MM/dd/yyyy"
            minDate={now} // Мінімальна дата
            minTime={
              selectedDate && selectedDate.toDateString() === now.toDateString()
                ? now
                : startOfDay
            } // Мінімальний час
            maxTime={endOfDay} // Максимальний час
            dayClassName={dayClassName} // Підсвічування днів
            customInput={
              <TextField
                label={title}
                {...field}
                placeholder="MM/DD/YYYY"
                error={!!errors[name]}
                InputLabelProps={{
                  style: {
                    top: "-20px",
                    zIndex: 10,
                    fontSize: "18px", // Налаштувати розмір шрифту
                  },
                }}
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

export default SearchDataPicker;
