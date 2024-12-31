"use client";

import InputEmail from "@/components/shared/form/inputEmail";
import InputLicense from "@/components/shared/form/inputLicenser";
import InputPasswords from "@/components/shared/form/inputPasswords";
import InputPhone from "@/components/shared/form/inputPhone";
import InputText from "@/components/shared/form/inputText";
import { Overlay } from "@/components/shared/overlay";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  password: string;
  password_repeat: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  license: string;
}

export default function Driver() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm({ mode: "onChange" });

  const onSubmit = (e: SubmitHandler<FormValues>) => {
    alert("Form submitted with data: " + JSON.stringify(e));
    reset();
  };

  return (
    <Overlay className="driver justify-center items-center bg-[#CED4DA]">
      <div className="w-[450px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        >
          <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">
            Driver Registration
          </h1>
          <p className="text-center mb-4">Create your driver account</p>

          <div className="flex justify-between">
            <InputText
              className="w-[184px]"
              name="firstName"
              title="First name"
              register={register}
              errors={errors}
            />
            <InputText
              className="w-[184px]"
              name="lastName"
              title="Last name"
              register={register}
              errors={errors}
            />
          </div>

          <InputEmail register={register} errors={errors} />
          <InputPhone register={register} errors={errors} />
          <InputLicense
            name="license"
            title="Driver's License Number"
            register={register}
            errors={errors}
          />
          <InputPasswords register={register} errors={errors} watch={watch} />
          <input
            disabled={!isValid}
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          />
        </form>
      </div>
    </Overlay>
  );
}
