import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TextField } from "@mui/material";
import { cn } from "@/lib/utils";

interface FormValues {
  departureFrom?: string;
  arrivalTo?: string;
  busNumber?: string;
  routePrice?: string;
}

interface Props {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  name: keyof FormValues;
  title: string;
  className?: string;
}

export default function CustomTextField({ register, errors, name, title, className }: Props) {
  return (
    <div className={cn("", className)}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {title}
      </label>
      <TextField
        id={name}
        {...register(name, {
          required: `${name} is required`,
        })}
        variant="outlined"
        fullWidth
        InputProps={{
          style: { height: "42px" },
        }}
        error={!!errors?.[name]}
        helperText={errors?.[name] ? errors?.[name]?.message : ""}
      />
    </div>
  );
}
