import { FormValues } from "@/app/(auth)/interface";
import { cn } from "@/lib/utils";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import FormError from "./DFFormError";

interface Props {
  name: keyof FormValues;
  title: string;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  className?: string;
}

export default function InputText({ name, title, register, errors, className }: Props) {
  return (
    <div className={cn("relative  mb-4 inline-block w-[184px] max-[420px]:w-[100%] ", className)}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <input
        type="text"
        {...register(name, {
          required: "This field is required.",
          minLength: {
            value: 2,
            message: `Minimum 2 symbol ${name}`,
          },
        })}
        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <FormError errors={errors} name={name} />
    </div>
  );
}
