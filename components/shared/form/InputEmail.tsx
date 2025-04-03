import { FormValues } from "@/app/[locale]/(auth)/interface";
import { cn } from "@/lib/utils";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { AiTwotoneMail } from "react-icons/ai";
import FormError from "./FormError";

interface Props {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
  t: any;
  className?: string;
}

export default function InputEmail({ register, errors, t, className, watch }: Props) {
  const email = watch("email", "");
  const emptyEmail = email === "" ? "pl-6" : "";

  return (
    <div className={cn("mb-4 relative", className)}>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        {t("form:email")}
      </label>
      <input
        {...register("email", {
          required: t("form:email_is_required"),
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: t("form:invalid_email"),
          },
        })}
        placeholder="example@domain.com"
        type="email"
        className={`${emptyEmail} mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {email === "" && (
        <AiTwotoneMail style={{ color: "gray" }} className="absolute top-[37px] left-1 " />
      )}
      <FormError errors={errors} name="email" />
    </div>
  );
}
