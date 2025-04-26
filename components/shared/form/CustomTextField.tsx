"use client";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { TextField } from "@mui/material";
import { cn } from "@/lib/utils";
import { FormValuesRoute } from "@/types/form.types";
import { memo, useState } from "react";

interface Props {
  register: UseFormRegister<FormValuesRoute>;
  errors: FieldErrors<FormValuesRoute>;
  name: keyof FormValuesRoute;
  setValue?: UseFormSetValue<FormValuesRoute>;
  title: string;
  // handleSearch?: () => void;
  className?: string;
  listCity?: string[] | undefined;
  action: "createRoute" | "searchRoute";
  limit?: number;
}

export default memo(function CustomTextField({
  register,
  errors,
  setValue,
  name,
  title,
  className,
  limit,
  listCity,
  action,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [zIndex, setZIndex] = useState<{ zIndex: string }>({ zIndex: "auto" });

  const handleOpenList = () => {
    setIsOpen((prev) => {
      if (prev) {
        setZIndex({ zIndex: "auto" });
        return false;
      } else {
        setZIndex({ zIndex: "150" });
        return true;
      }
    });
  };
  const isRequired =
    action === "createRoute"
      ? {
          required: "This field is required.",
          minLength: {
            value: 1,
            message: `Minimum 1 symbol license`,
          },
        }
      : {};
  const changeCity = (event: React.MouseEvent<HTMLLIElement>) => {
    const city = event.currentTarget.textContent;
    if (city && setValue) {
      setValue(name, city);
      setIsOpen(false); // Закриваємо список
    }
  };

  return (
    <div className={cn("", className)}>
      <div style={zIndex} className="relative">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {title}
        </label>
        <TextField
          id={name}
          {...register(name, {
            required: true,
            max: limit, // максимальне значення
          })}
          variant="outlined"
          fullWidth
          InputProps={{
            style: { height: "42px" },
          }}
          error={!!errors?.[name]}
          autoComplete="off"
          onClick={handleOpenList}
          helperText={errors?.[name] ? String(errors?.[name]?.message) : ""}
        />
        {listCity && isOpen && (
          <>
            <div
              className="fixed w-full h-full top-0 left-0 right-0 bottom-0  z-[100]"
              onClick={() => {
                setZIndex({ zIndex: "auto" });
                setIsOpen(false);
              }}
            ></div>
            <div className="absolute top-[70px] left-0  bg-white h-[162px] w-full z-[150]  overflow-auto  text-[1rem] border-2  border-sky-500 p-3">
              <ul>
                {listCity.map((city: string) => (
                  <li
                    key={city}
                    className="h-[1.5rem] leading-[1.5rem] cursor-pointer hover:bg-gray-200 transition-colors px-1"
                    onClick={changeCity}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
});
