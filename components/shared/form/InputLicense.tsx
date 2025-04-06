import { FormValues } from "@/app/[locale]/(auth)/interface";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";
import { cn } from "@/lib/utils";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { FaIdCard } from "react-icons/fa6";
import FormError from "./FormError";

interface Props {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
  className?: string;
}

export default function InputLicense({ register, errors, className, watch }: Props) {
  const license = watch("license", "");
  const { t: form } = useAppTranslation("form");
  return (
    <div className={cn("mb-4 relative", className)}>
      <label htmlFor="license" className="block text-sm font-medium text-gray-700">
        {form("driver_license_number")}
      </label>
      <input
        {...register("license", {
          required: form("this_field_is_required"),
          minLength: {
            value: 5,
            message: form("minimum_5_symbol_license"),
          },
        })}
        type="text"
        className={` ${
          license === "" ? "pl-6" : ""
        }mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {license === "" && (
        <FaIdCard style={{ color: "gray" }} className="absolute top-[37px] left-1 " />
      )}

      <FormError errors={errors} name="license" />
    </div>
  );
}
