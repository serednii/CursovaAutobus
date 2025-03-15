import { FormValues } from "@/app/(auth)/interface";
import { cn } from "@/lib/utils";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { FaPhoneAlt } from "react-icons/fa";
import FormError from "./DFFormError";

interface Props {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
  className?: string;
}

export default function InputPhone({ register, errors, watch, className }: Props) {
  const phone = watch("phone", "");
  const emptyPhone = phone === "" ? "pl-6" : "";

  return (
    <div className={cn("mb-4 relative", className)}>
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <input
        {...register("phone", {
          required: "This field is required.",
          pattern: {
            value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
            message: "Invalid phone number",
          },
        })}
        placeholder="+123456789"
        type="tel"
        className={`mt-1 w-full p-2 ${emptyPhone} border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {phone === "" && <FaPhoneAlt style={{ color: "gray" }} className="absolute top-[37px] left-1 " />}
      <FormError errors={errors} name="phone" />
    </div>
  );
}
