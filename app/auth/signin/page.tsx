"use client";
import { GoogleButton } from "@/components/GoogleButton";
import GitHubButton from "@/components/shared/form/githubButton";
import InputEmail from "@/components/shared/form/inputEmail";
import InputPassword from "@/components/shared/form/inputPasswords";
import { Overlay } from "@/components/shared/overlay";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormValues {
  password: string;
  email: string;
}

export default function SingIn() {
  const router = useRouter();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit = async (data: SubmitHandler<FormValues>) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res && !res.error) {
      router.push("/");
    } else {
      console.log(res);
    }

    // alert("Form submitted with data: " + JSON.stringify(data));
    reset();
  };

  return (
    <Overlay className="driver justify-center items-center bg-[#CED4DA]">
      <div className="max-w-[450px] w-[100%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Sing In
          </h1>
          <GitHubButton />
          <div className="text-center my-1 text-[2rem]">Or</div>
          <InputEmail register={register} errors={errors} watch={watch} />

          <InputPassword
            register={register}
            errors={errors}
            watch={watch}
            one={true}
          />

          <input
            disabled={!isValid}
            value="Sing In"
            type="submit"
            className="mt-2 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-500 w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          />
        </form>
      </div>
    </Overlay>
  );
}
