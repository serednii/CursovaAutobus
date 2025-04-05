import React, { memo } from "react";
import { TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValuesRoute, SubPassengerDetails } from "@/types/form.types";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";

interface Props {
  index: number;
  subPassenger: SubPassengerDetails;
  register: UseFormRegister<FormValuesRoute>;
  //   setValue: UseFormSetValue<FormValuesRoute>;
  errors: FieldErrors<FormValuesRoute>;
  handleChange: (
    index: number,
    value: string,
    field: "subFirstName" | "subLastName" | "subPhone" | "subEmail"
  ) => void;
}

const SubPassengerFields: React.FC<Props> = ({
  index,
  subPassenger,
  register,
  errors,
  handleChange,
}) => {
  const { t: form } = useAppTranslation("form");

  console.log("SubPassengerFields RENDER");
  return (
    <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 gap-4">
      {(["subFirstName", "subLastName", "subPhone", "subEmail"] as const).map(
        (field: "subFirstName" | "subLastName" | "subPhone" | "subEmail") => {
          const newField: "firstName" | "lastName" | "phone" | "email" =
            field === "subFirstName"
              ? "firstName"
              : field === "subLastName"
              ? "lastName"
              : field === "subEmail"
              ? "email"
              : field === "subPhone"
              ? "phone"
              : field;
          return (
            <TextField
              key={field}
              {...register(`${field}.${index}`, {
                required: `${field} is required`,
                ...(field === "subPhone"
                  ? {
                      pattern: {
                        value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                        message: "Invalid phone number",
                      },
                    }
                  : field === "subEmail"
                  ? {
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    }
                  : { minLength: { value: 2, message: "Must be at least 2 characters" } }),
              })}
              value={subPassenger[field]}
              onChange={(e) => handleChange(index, e.target.value, field)}
              label={`${form(newField)} ${index + 1}`}
              variant="outlined"
              fullWidth
              error={!!errors[field]?.[index]}
              helperText={errors[field]?.[index]?.message || ""}
              InputProps={{ style: { height: "42px", marginBottom: "15px" } }}
              InputLabelProps={{ style: { top: "5px" } }}
            />
          );
        }
      )}
    </div>
  );
};

export default memo(SubPassengerFields);
