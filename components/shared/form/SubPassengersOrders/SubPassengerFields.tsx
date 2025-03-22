import React, { memo, useEffect } from "react";
import { TextField } from "@mui/material";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { FormValuesRoute, SubPassengerDetails } from "@/types/form.types";
import useStore from "@/zustand/createStore";

interface Props {
  index: number;
  subPassenger: SubPassengerDetails;
  register: UseFormRegister<FormValuesRoute>;
  setValue: UseFormSetValue<FormValuesRoute>;
  watch: UseFormWatch<FormValuesRoute>;
  errors: FieldErrors<FormValuesRoute>;
}

const SubPassengerFields: React.FC<Props> = ({ index, subPassenger, register, setValue, errors, watch }) => {
  // console.log("SubPassengerFields RENDER");
  const setSubPassengers = useStore((state) => state.setSubPassengers);
  // const [isFirstRender, setIsFirstRender] = React.useState(true);
  const [inputValue, setInputValue] = React.useState<SubPassengerDetails>({
    subFirstName: subPassenger.subFirstName,
    subLastName: subPassenger.subLastName,
    subPhone: subPassenger.subPhone,
    subEmail: subPassenger.subEmail,
  });

  const handleChange = (index: number, value: string, field: "subFirstName" | "subLastName" | "subPhone" | "subEmail") => {
    setValue(`${field}.${index}`, value);
    setSubPassengers((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
    setInputValue((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 gap-4">
        {(["subFirstName", "subLastName", "subPhone", "subEmail"] as const).map((field) => {
          // console.log("field", field);
          return (
            <TextField
              key={field}
              {...register(`${field}.${index}`, {
                required: `${field} is required`,
                ...(field === "subPhone"
                  ? { pattern: { value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, message: "Invalid phone number" } }
                  : field === "subEmail"
                  ? { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } }
                  : { minLength: { value: 2, message: "Must be at least 2 characters" } }),
              })}
              value={inputValue[field]}
              onChange={(e) => handleChange(index, e.target.value, field)}
              label={`${field} ${index + 1}`}
              variant="outlined"
              fullWidth
              error={!!errors[field]?.[index]}
              helperText={errors[field]?.[index]?.message || ""}
              InputProps={{ style: { height: "42px", marginBottom: "15px" } }}
              InputLabelProps={{ style: { top: "5px" } }}
            />
          );
        })}
      </div>
      {/* <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 gap-4">
        {(["subFirstName", "subLastName", "subPhone", "subEmail"] as const).map((field) => {
          console.log("field", field);
          return (
            <div key={field}>
              <label htmlFor={`${field}.${index}`} className="block text-sm font-medium text-gray-700">
                {`${field} ${index + 1}`}
              </label>
              <input
                {...register(`${field}.${index}`, {
                  required: `${field} is required`,
                  ...(field === "subPhone"
                    ? { pattern: { value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, message: "Invalid phone number" } }
                    : field === "subEmail"
                    ? { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } }
                    : { minLength: { value: 2, message: "Must be at least 2 characters" } }),
                })}
                value={inputValue[field]}
                onChange={(e) => handleChange(index, e.target.value, field)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors[field]?.[index] && <p className="mt-1 text-sm text-red-600">{errors[field]?.[index]?.message}</p>}
            </div>
          );
        })}
      </div> */}
    </>
  );
};

export default memo(SubPassengerFields);
