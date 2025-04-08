"use client";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";
import InputEmail from "@/components/shared/form/InputEmail";
import InputLicense from "@/components/shared/form/InputLicense";
import InputPassword from "@/components/shared/form/InputPasswords";
import InputPhone from "@/components/shared/form/InputPhone";
import InputText from "@/components/shared/form/InputText";
import { Overlay } from "@/components/shared/Overlay";
import { RoleEnum } from "@/enum/shared.enums";
import { useForm } from "react-hook-form";
import useDriverAuth from "../actions";
import { FormValues } from "../interface";

export default function RegisterDriver() {
  const { t } = useAppTranslation("auth");
  const { t: form } = useAppTranslation("form");

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormValues>({ mode: "onChange" });

  const { onSubmit } = useDriverAuth(reset, RoleEnum.DRIVER);

  return (
    <Overlay className="driver justify-center top-[80px]">
      <div className="flex justify-center items-center">
        <div className="max-w-[450px] w-[100%]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              {t("register_driver.title")}
            </h1>
            <p className="text-center mb-4 text-[#4B5563]">{t("register_driver.sub_title")}</p>
            <div className="flex justify-between flex-wrap">
              <InputText
                title={form("firstName")}
                name="firstName"
                register={register}
                errors={errors}
              />
              <InputText
                title={form("lastName")}
                name="lastName"
                register={register}
                errors={errors}
              />
            </div>
            <InputPhone register={register} errors={errors} watch={watch} />
            <InputEmail register={register} errors={errors} watch={watch} />
            <InputPassword register={register} errors={errors} watch={watch} />
            <InputLicense register={register} errors={errors} watch={watch} />
            <input
              disabled={!isValid}
              type="submit"
              value={form("submit")}
              className="mt-2 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-500 w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            />
          </form>
        </div>
      </div>
    </Overlay>
  );
}
