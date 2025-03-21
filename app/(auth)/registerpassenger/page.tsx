"use client";
import InputEmail from "@/components/shared/form/InputEmail";
import InputPassword from "@/components/shared/form/InputPasswords";
import InputPhone from "@/components/shared/form/InputPhone";
import InputText from "@/components/shared/form/InputText";
import { Overlay } from "@/components/shared/Overlay";
import { RoleEnum } from "@/enum/shared.enums";
import { useForm } from "react-hook-form";
import useDriverAuth from "../actions";
import { FormValues } from "../interface";

export default function RegisterPassenger() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormValues>({ mode: "onChange" });
  const { onSubmit } = useDriverAuth(reset, RoleEnum.PASSENGER);

  return (
    <Overlay className="driver justify-center top-[80px]">
      <div className="w-[50%] flex justify-center items-center">
        <div className="max-w-[450px] w-[100%]">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Passenger Registration</h1>
            <p className="text-center mb-4 text-[#4B5563]">Create your passenger account</p>
            <div className="flex justify-between flex-wrap">
              <InputText title="First Name" name="firstName" register={register} errors={errors} />
              <InputText title="Last Name" name="lastName" register={register} errors={errors} />
            </div>
            <InputPhone register={register} errors={errors} watch={watch} />
            <InputEmail register={register} errors={errors} watch={watch} />
            <InputPassword register={register} errors={errors} watch={watch} />
            <input
              disabled={!isValid}
              type="submit"
              className="mt-2 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-500 w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            />
          </form>
        </div>
      </div>
    </Overlay>
  );
}
