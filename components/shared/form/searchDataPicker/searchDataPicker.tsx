"use client";
import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-datepicker";
import { CircularProgress } from "@mui/material";
import { FieldErrors, UseFormRegister, Controller, Control, UseFormWatch } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { FormValues } from "@/types/form.types";
import { cn } from "@/lib/utils";
import "./style.scss";

interface Props {
  name: keyof FormValues;
  title: string;
  register: UseFormRegister<FormValues>;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  className?: string;
  watch?: UseFormWatch<FormValues>;
  clickToDate: number;
  setClickToDate: React.Dispatch<React.SetStateAction<number>>;
  highlightedDates: Date[]; // Масив дат для підсвічування
  isLoading: boolean;
}

const SearchDataPicker = ({ name, title, control, errors, className, watch, highlightedDates, clickToDate, setClickToDate, isLoading }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const departureDate = watch && watch("departureDate");
  console.log("selectedDate", selectedDate);
  // Поточна дата і час
  const now = departureDate || new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0); // Початок дня
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59); // Кінець дня

  // Функція підсвічування
  const dayClassName = (date: Date) => {
    const isHighlighted = highlightedDates.some((highlightedDate) => {
      const selectDay = highlightedDate.getDate();
      const selectMonth = highlightedDate.getMonth();
      const selectYear = highlightedDate.getFullYear();

      const currentDay = new Date().getDate();
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      if (selectYear > currentYear) {
        return highlightedDate.toDateString() === date.toDateString();
      } else if (selectYear === currentYear) {
        if (selectMonth > currentMonth) {
          return highlightedDate.toDateString() === date.toDateString();
        } else if (selectMonth === currentMonth) {
          if (selectDay > currentDay) {
            return highlightedDate.toDateString() === date.toDateString();
          }
        }
      }
      return false;
    });

    // console.log("isHighlighted", isHighlighted);
    return isHighlighted ? "highlighted-day" : ""; // Додаємо клас, якщо дата підсвічена
  };

  return (
    <div className={cn(className, "grow  search-data-picker relative")}>
      {isLoading && <CircularProgress className="absolute top-1/2 left-1/2 color-[#94f07c] z-10" size={60} />}
      <Controller
        name={name}
        control={control}
        rules={{ required: `${title} is required` }}
        render={({ field }) => (
          <div className="relative react-datepicker-wrapper-first">
            <IoMdClose
              onClick={() => {
                setSelectedDate(null);
                field.onChange(null);
              }}
              className="absolute top-[7px] right-[15px] text-2xl cursor-pointer z-10"
            />
            <DatePicker
              className="w-[100%]  border border-gray-300"
              selected={field.value}
              onChange={(date: Date | null) => {
                setSelectedDate(date);
                field.onChange(date);
              }}
              placeholderText="MM/DD/YYYY"
              dateFormat="MM/dd/yyyy"
              minDate={now}
              minTime={selectedDate ? (selectedDate.toDateString() === now.toDateString() ? now : startOfDay) : startOfDay}
              maxTime={endOfDay}
              dayClassName={dayClassName}
              customInput={
                <TextField
                  label={title}
                  onClick={() => setClickToDate(clickToDate + 1)}
                  value={field.value || ""}
                  onChange={field.onChange}
                  placeholder="MM/DD/YYYY"
                  // error={!!errors[name]}
                  InputLabelProps={{
                    style: { top: "-20px", fontWeight: "bold", zIndex: 10, fontSize: "20px" },
                  }}
                  InputProps={{
                    style: { height: "38px" },
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon onClick={() => setClickToDate(clickToDate + 1)} style={{ cursor: "pointer" }} />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth={false}
                />
              }
            />
          </div>
        )}
      />
    </div>
  );
};

export default SearchDataPicker;
