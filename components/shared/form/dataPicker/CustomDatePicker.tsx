"use client";
import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker from "react-datepicker";
import "./style.scss";

import { FieldErrors, UseFormRegister, Controller, Control, UseFormWatch } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { FormValuesRoute } from "@/types/form.types";
import { IRoutesByIdDriverListBlocked } from "@/fetchFunctions/fetchGetRoutesByDriverId";

interface Props {
  name: keyof FormValuesRoute;
  title: string;
  register: UseFormRegister<FormValuesRoute>;
  control: Control<FormValuesRoute>;
  errors: FieldErrors<FormValuesRoute>;
  className?: string;
  watch?: UseFormWatch<FormValuesRoute>;
  listBlockedDate: IRoutesByIdDriverListBlocked[] | [];
}

// const listBlockedDate = [
//   // { departureDate: "2025-01-05T08:00:00.000Z", arrivalDate: "2025-01-05T12:30:00.000Z" },
//   // { departureDate: "2025-01-12T14:15:00.000Z", arrivalDate: "2025-01-12T18:45:00.000Z" },
//   // { departureDate: "2025-01-18T09:00:00.000Z", arrivalDate: "2025-01-18T13:15:00.000Z" },
//   // { departureDate: "2025-01-22T16:30:00.000Z", arrivalDate: "2025-01-22T20:00:00.000Z" },
//   // { departureDate: "2025-01-30T10:45:00.000Z", arrivalDate: "2025-01-30T14:00:00.000Z" },

//   // { departureDate: "2025-02-03T07:30:00.000Z", arrivalDate: "2025-02-03T11:45:00.000Z" },
//   // { departureDate: "2025-02-10T15:00:00.000Z", arrivalDate: "2025-02-10T19:30:00.000Z" },
//   // { departureDate: "2025-02-17T08:45:00.000Z", arrivalDate: "2025-02-17T12:15:00.000Z" },
//   // { departureDate: "2025-02-22T13:00:00.000Z", arrivalDate: "2025-02-22T17:15:00.000Z" },
//   // { departureDate: "2025-02-28T09:30:00.000Z", arrivalDate: "2025-02-28T14:00:00.000Z" },

//   { departureDate: "2025-03-02T12:00:00.000Z", arrivalDate: "2025-03-02T16:30:00.000Z" },
//   { departureDate: "2025-03-09T08:30:00.000Z", arrivalDate: "2025-03-09T13:00:00.000Z" },
//   { departureDate: "2025-03-15T18:00:00.000Z", arrivalDate: "2025-03-15T22:45:00.000Z" },
//   { departureDate: "2025-03-23T09:15:00.000Z", arrivalDate: "2025-03-23T12:45:00.000Z" },
//   { departureDate: "2025-03-28T14:30:00.000Z", arrivalDate: "2025-03-30T18:15:00.000Z" },

//   { departureDate: "2025-04-04T07:45:00.000Z", arrivalDate: "2025-04-04T11:30:00.000Z" },
//   { departureDate: "2025-04-08T15:15:00.000Z", arrivalDate: "2025-04-08T19:00:00.000Z" },
//   { departureDate: "2025-04-14T08:15:00.000Z", arrivalDate: "2025-04-14T12:30:00.000Z" },
//   { departureDate: "2025-04-20T13:30:00.000Z", arrivalDate: "2025-04-20T17:45:00.000Z" },
//   { departureDate: "2025-04-27T10:00:00.000Z", arrivalDate: "2025-04-27T14:30:00.000Z" },

//   { departureDate: "2025-05-03T12:45:00.000Z", arrivalDate: "2025-05-03T16:30:00.000Z" },
//   { departureDate: "2025-05-10T09:30:00.000Z", arrivalDate: "2025-05-10T13:45:00.000Z" },
//   { departureDate: "2025-05-15T17:00:00.000Z", arrivalDate: "2025-05-15T20:30:00.000Z" },
//   { departureDate: "2025-05-21T08:00:00.000Z", arrivalDate: "2025-05-21T12:15:00.000Z" },
//   { departureDate: "2025-05-28T14:45:00.000Z", arrivalDate: "2025-05-28T19:15:00.000Z" },

//   { departureDate: "2025-06-05T10:00:00.000Z", arrivalDate: "2025-06-05T14:30:00.000Z" },
//   { departureDate: "2025-06-12T08:30:00.000Z", arrivalDate: "2025-06-12T12:45:00.000Z" },
//   { departureDate: "2025-06-18T16:00:00.000Z", arrivalDate: "2025-06-18T20:15:00.000Z" },
//   { departureDate: "2025-06-23T07:15:00.000Z", arrivalDate: "2025-06-23T11:45:00.000Z" },
//   { departureDate: "2025-06-29T14:00:00.000Z", arrivalDate: "2025-06-29T18:30:00.000Z" },

//   { departureDate: "2025-07-03T08:00:00.000Z", arrivalDate: "2025-07-03T12:30:00.000Z" },
//   { departureDate: "2025-07-10T15:15:00.000Z", arrivalDate: "2025-07-10T19:00:00.000Z" },
//   { departureDate: "2025-07-17T09:30:00.000Z", arrivalDate: "2025-07-17T13:45:00.000Z" },
//   { departureDate: "2025-07-22T13:00:00.000Z", arrivalDate: "2025-07-22T17:15:00.000Z" },
//   { departureDate: "2025-07-30T10:45:00.000Z", arrivalDate: "2025-07-30T14:00:00.000Z" },

//   { departureDate: "2025-08-05T08:30:00.000Z", arrivalDate: "2025-08-05T12:45:00.000Z" },
//   { departureDate: "2025-08-12T14:00:00.000Z", arrivalDate: "2025-08-12T18:30:00.000Z" },
//   { departureDate: "2025-08-18T09:15:00.000Z", arrivalDate: "2025-08-18T11:45:00.000Z" },
//   { departureDate: "2025-08-22T16:30:00.000Z", arrivalDate: "2025-08-22T20:00:00.000Z" },
//   { departureDate: "2025-08-28T10:00:00.000Z", arrivalDate: "2025-08-28T13:15:00.000Z" },

//   { departureDate: "2025-09-03T07:30:00.000Z", arrivalDate: "2025-09-03T11:45:00.000Z" },
//   { departureDate: "2025-09-10T15:00:00.000Z", arrivalDate: "2025-09-10T19:30:00.000Z" },
//   { departureDate: "2025-09-17T08:45:00.000Z", arrivalDate: "2025-09-17T12:15:00.000Z" },
//   { departureDate: "2025-09-22T13:00:00.000Z", arrivalDate: "2025-09-22T17:15:00.000Z" },
//   { departureDate: "2025-09-28T09:30:00.000Z", arrivalDate: "2025-09-28T14:00:00.000Z" },

//   { departureDate: "2025-10-04T12:00:00.000Z", arrivalDate: "2025-10-04T16:30:00.000Z" },
//   { departureDate: "2025-10-09T08:30:00.000Z", arrivalDate: "2025-10-09T13:00:00.000Z" },
//   { departureDate: "2025-10-14T18:00:00.000Z", arrivalDate: "2025-10-14T22:45:00.000Z" },
//   { departureDate: "2025-10-23T09:15:00.000Z", arrivalDate: "2025-10-23T12:45:00.000Z" },
//   { departureDate: "2025-10-29T14:30:00.000Z", arrivalDate: "2025-10-29T18:15:00.000Z" },

//   { departureDate: "2025-11-05T07:45:00.000Z", arrivalDate: "2025-11-05T11:30:00.000Z" },
//   { departureDate: "2025-11-10T15:15:00.000Z", arrivalDate: "2025-11-10T19:00:00.000Z" },
//   { departureDate: "2025-11-15T08:15:00.000Z", arrivalDate: "2025-11-15T12:30:00.000Z" },
//   { departureDate: "2025-11-21T13:30:00.000Z", arrivalDate: "2025-11-21T17:45:00.000Z" },
//   { departureDate: "2025-11-28T10:00:00.000Z", arrivalDate: "2025-11-28T14:30:00.000Z" },

//   { departureDate: "2025-12-03T12:45:00.000Z", arrivalDate: "2025-12-03T16:30:00.000Z" },
//   { departureDate: "2025-12-08T09:30:00.000Z", arrivalDate: "2025-12-08T13:45:00.000Z" },
//   { departureDate: "2025-12-14T17:00:00.000Z", arrivalDate: "2025-12-14T20:30:00.000Z" },
//   { departureDate: "2025-12-19T08:00:00.000Z", arrivalDate: "2025-12-19T12:15:00.000Z" },
//   { departureDate: "2025-12-25T14:45:00.000Z", arrivalDate: "2025-12-25T19:15:00.000Z" },
// ];

// const minusOneMonth = (date: string): string => {
//   const newDate: string[] = date.split("-");
//   newDate[1] = newDate[1].length === 1 ? `0${Number(newDate[1]) - 1}` : `${Number(newDate[1]) - 1}`;
//   const result = newDate.join("-");
//   // console.log(result);
//   return result;
// };

// const minusOneMonth = (dateStr: string): string => {
//   const date = new Date(dateStr);
//   date.setMonth(date.getMonth() - 1); // Віднімаємо місяць
//   const result = date.toISOString();
//   console.log(result);

//   return result; // Повертаємо у форматі ISO
// };

// const newListCloseDate = listBlockedDate.map(({ departureDate, arrivalDate }) => {
//   return {
//     departureDate: minusOneMonth(departureDate),
//     arrivalDate: minusOneMonth(arrivalDate),
//   };
// });

// const newListCloseDate = listBlockedDate.map(({ departureDate, arrivalDate }) => ({
//   departureDate: minusOneMonth(departureDate),
//   arrivalDate: minusOneMonth(arrivalDate),
// }));

const CustomDatePicker = ({
  name,
  title,
  // register,
  control,
  errors,
  className,
  watch,
  listBlockedDate,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const departureDate1 = watch && watch("departureDate");
  const now = departureDate1 || new Date();
  const departureDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0);
  const arrivalDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59);
  console.log("listBlockedDate", listBlockedDate);
  // Нова функція для перевірки, чи є вільні проміжки в дні
  const hasAvailableTimeSlots = (date: Date) => {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    // Знаходимо всі заблоковані проміжки для цього дня
    const blockedIntervals = listBlockedDate
      .filter(({ departureDate, arrivalDate }) => {
        const intervalStart = new Date(departureDate);
        const intervalEnd = new Date(arrivalDate);
        return intervalStart <= dayEnd && intervalEnd >= dayStart;
      })
      .map(({ departureDate, arrivalDate }) => ({
        start: new Date(departureDate),
        end: new Date(arrivalDate),
      }));

    // Якщо немає заблокованих проміжків, весь день доступний
    if (blockedIntervals.length === 0) return true;

    // Сортуємо інтервали за часом початку
    blockedIntervals.sort((a, b) => a.start.getTime() - b.start.getTime());

    // Перевіряємо проміжки між заблокованими інтервалами
    let lastEndTime = dayStart;
    for (const interval of blockedIntervals) {
      if (interval.start > lastEndTime) {
        // Знайшли вільний проміжок
        return true;
      }
      lastEndTime = new Date(Math.max(lastEndTime.getTime(), interval.end.getTime()));
    }

    // Перевіряємо проміжок після останнього заблокованого інтервалу
    return lastEndTime < dayEnd;
  };
  // Функція для виділення днів з заблокованими проміжками
  const dayClassName = (date: Date) => {
    if (date < new Date()) {
      return "";
    }
    if (dayHasBlockedIntervals(date)) {
      return "react-datepicker__day--day-with-blocked-intervals";
    }
    return "";
  };
  // Перевіряє, чи день має заблоковані проміжки
  const dayHasBlockedIntervals = (date: Date) => {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    return listBlockedDate.some(({ departureDate, arrivalDate }) => {
      const intervalStart = new Date(departureDate);
      const intervalEnd = new Date(arrivalDate);
      return intervalStart <= dayEnd && intervalEnd >= dayStart;
    });
  };

  const getDisabledTimes = (date: Date) => {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const disabledTimes = [];
    // const current = new Date(dayStart);

    // Знаходимо всі заблоковані проміжки для цього дня
    const blockedIntervals = listBlockedDate
      .filter(({ departureDate, arrivalDate }) => {
        const intervalStart = new Date(departureDate);
        const intervalEnd = new Date(arrivalDate);
        return intervalStart <= dayEnd && intervalEnd >= dayStart;
      })
      .map(({ departureDate, arrivalDate }) => ({
        start: new Date(departureDate),
        end: new Date(arrivalDate),
      }));

    // Якщо немає заблокованих проміжків, повертаємо пустий масив
    if (blockedIntervals.length === 0) return [];

    // Додаємо всі часи з заблокованих проміжків
    for (const interval of blockedIntervals) {
      const start = new Date(Math.max(interval.start.getTime(), dayStart.getTime()));
      const end = new Date(Math.min(interval.end.getTime(), dayEnd.getTime()));

      const currentTime = new Date(start);
      while (currentTime <= end) {
        disabledTimes.push(new Date(currentTime));
        currentTime.setMinutes(currentTime.getMinutes() + 15);
      }
    }

    return disabledTimes;
  };

  const getTimeClassName = (time: Date) => {
    const disabledTimes = getDisabledTimes(time);
    const isDisabled = disabledTimes.some((disabledTime) => {
      return disabledTime.getHours() === time.getHours() && disabledTime.getMinutes() === time.getMinutes();
    });

    return isDisabled ? "disabled-time" : "";
  };

  return (
    <div className={className || "grow"}>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${title} is required` }}
        render={({ field }) => (
          <DatePicker
            className="w-[100%]"
            selected={field.value instanceof Date ? field.value : null}
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
            minDate={now}
            minTime={selectedDate && selectedDate.toDateString() === now.toDateString() ? now : departureDate}
            maxTime={arrivalDate}
            filterDate={(date) => hasAvailableTimeSlots(date)}
            excludeTimes={selectedDate ? getDisabledTimes(selectedDate) : []}
            dayClassName={dayClassName} // Додаємо клас для днів з заблокованими проміжками
            timeClassName={getTimeClassName} // Виділяємо заблоковані години
            customInput={
              <TextField
                label={title}
                {...field}
                value={field.value instanceof Date ? field.value.toLocaleDateString() : ""}
                placeholder="MM/DD/YYYY HH:MM"
                error={!!errors[name]}
                helperText={errors[name]?.message}
                InputProps={{
                  style: { height: "42px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon style={{ cursor: "pointer" }} />
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
