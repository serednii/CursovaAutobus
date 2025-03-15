"use client";
import React, { memo, useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker from "react-datepicker";
import "./style.scss";

import { FieldErrors, UseFormRegister, Controller, Control, UseFormWatch } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { FormValuesRoute } from "@/types/form.types";

interface Props {
  name: keyof FormValuesRoute;
  title: string;
  register: UseFormRegister<FormValuesRoute>;
  control: Control<FormValuesRoute>;
  errors: FieldErrors<FormValuesRoute>;
  className?: string;
  watch?: UseFormWatch<FormValuesRoute>;
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
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0); // Початок дня
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59); // Кінець дня

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
            minDate={now} // Мінімальна дата
            minTime={selectedDate && selectedDate.toDateString() === now.toDateString() ? now : startOfDay} // Мінімальний час
            maxTime={endOfDay} // Максимальний час
            customInput={
              <TextField
                label={title}
                {...field}
                value={field.value instanceof Date ? field.value.toLocaleDateString() : ""} //add new change
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

export default memo(CustomDatePicker);

// "use client";
// import React, { useState } from "react";
// import { TextField, InputAdornment } from "@mui/material";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import DatePicker from "react-datepicker";
// import "./style.scss";

// import { FieldErrors, UseFormRegister, Controller, Control, UseFormWatch } from "react-hook-form";
// import "react-datepicker/dist/react-datepicker.css";
// import { FormValuesRoute } from "@/types/form.types";

// interface Props {
//   name: keyof FormValuesRoute;
//   title: string;
//   register: UseFormRegister<FormValuesRoute>;
//   control: Control<FormValuesRoute>;
//   errors: FieldErrors<FormValuesRoute>;
//   className?: string;
//   watch?: UseFormWatch<FormValuesRoute>;
// }

// const listCloseDate = [
//   { startOfDay: "2025-04-10T08:30:00.000Z", endOfDay: "2025-04-10T12:45:00.000Z" },
//   { startOfDay: "2025-04-12T14:00:00.000Z", endOfDay: "2025-04-12T18:30:00.000Z" },
//   { startOfDay: "2025-04-15T09:15:00.000Z", endOfDay: "2025-04-15T11:45:00.000Z" },
//   { startOfDay: "2025-04-18T16:30:00.000Z", endOfDay: "2025-04-18T20:00:00.000Z" },
//   { startOfDay: "2025-04-22T10:00:00.000Z", endOfDay: "2025-04-22T13:15:00.000Z" },
//   { startOfDay: "2025-04-25T17:45:00.000Z", endOfDay: "2025-04-25T21:30:00.000Z" },
//   { startOfDay: "2025-04-28T07:00:00.000Z", endOfDay: "2025-04-28T10:30:00.000Z" },
//   { startOfDay: "2025-05-01T12:00:00.000Z", endOfDay: "2025-05-01T16:45:00.000Z" },
//   { startOfDay: "2025-05-04T09:30:00.000Z", endOfDay: "2025-05-04T14:00:00.000Z" },
//   { startOfDay: "2025-05-07T18:15:00.000Z", endOfDay: "2025-05-07T22:00:00.000Z" },
// ];

// const CustomDatePicker = ({
//   name,
//   title,
//   // register,
//   control,
//   errors,
//   className,
//   watch,
// }: Props) => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const departureDate = watch && watch("departureDate");
//   const now = departureDate || new Date();
//   const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0);
//   const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59);

//   // Перевіряє, чи вибрана дата знаходиться у списку заборонених
//   const isDateDisabled = (date: Date) => {
//     return listCloseDate.some(({ startOfDay, endOfDay }) => {
//       const start = new Date(startOfDay);
//       const end = new Date(endOfDay);
//       return date >= start && date <= end;
//     });
//   };

//   // Отримує список заборонених годин для вибраного дня
//   const getDisabledTimes = (date: Date) => {
//     const blockedRanges = listCloseDate.filter(({ startOfDay, endOfDay }) => {
//       return date.toDateString() === new Date(startOfDay).toDateString();
//     });

//     return blockedRanges.flatMap(({ startOfDay, endOfDay }) => {
//       const start = new Date(startOfDay);
//       const end = new Date(endOfDay);
//       const times = [];
//       let current = new Date(start);

//       while (current <= end) {
//         times.push(new Date(current));
//         current.setMinutes(current.getMinutes() + 15);
//       }
//       return times;
//     });
//   };

//   return (
//     <div className={className || "grow"}>
//       <Controller
//         name={name}
//         control={control}
//         rules={{ required: `${title} is required` }}
//         render={({ field }) => (
//           <DatePicker
//             className="w-[100%]"
//             selected={field.value instanceof Date ? field.value : null}
//             onChange={(date: Date | null) => {
//               setSelectedDate(date);
//               field.onChange(date);
//             }}
//             placeholderText="MM/DD/YYYY HH:MM"
//             showTimeSelect
//             timeFormat="HH:mm"
//             timeIntervals={15}
//             timeCaption="Time"
//             dateFormat="MM/dd/yyyy h:mm aa"
//             minDate={now}
//             minTime={selectedDate && selectedDate.toDateString() === now.toDateString() ? now : startOfDay}
//             maxTime={endOfDay}
//             filterDate={(date) => !isDateDisabled(date)}
//             excludeTimes={selectedDate ? getDisabledTimes(selectedDate) : []}
//             customInput={
//               <TextField
//                 label={title}
//                 {...field}
//                 value={field.value instanceof Date ? field.value.toLocaleDateString() : ""}
//                 placeholder="MM/DD/YYYY HH:MM"
//                 error={!!errors[name]}
//                 helperText={errors[name]?.message}
//                 InputProps={{
//                   style: { height: "42px" },
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <CalendarTodayIcon style={{ cursor: "pointer" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 fullWidth={false}
//               />
//             }
//           />
//         )}
//       />
//     </div>
//   );
// };

// export default CustomDatePicker;
