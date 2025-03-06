import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TextField } from "@mui/material";
import { cn } from "@/lib/utils";
import { FormValuesRoute } from "@/types/form.types";

interface Props {
  register: UseFormRegister<FormValuesRoute>;
  errors: FieldErrors<FormValuesRoute>;
  name: keyof FormValuesRoute;
  title: string;
  // handleSearch?: () => void;
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
        {...register(name)}
        variant="outlined"
        fullWidth
        InputProps={{
          style: { height: "42px" },
        }}
        error={!!errors?.[name]}
        // onChange={handleSearch}
        helperText={errors?.[name] ? String(errors?.[name]?.message) : ""}
      />
    </div>
  );
}
