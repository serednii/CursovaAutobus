"use client";

import { useState } from "react";
import GoogleButton from "@/components/shared/form/GoogleButton";
import GitHubButton from "@/components/shared/form/GithubButton";
import InputEmail from "@/components/shared/form/InputEmail";
import InputPassword from "@/components/shared/form/InputPasswords";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormValues } from "@/app/[locale]/(auth)/interface";

export default function SignInComponent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setLoading(false);

    if (res && !res.error) {
      router.push("/");
    } else {
      console.log(res);
    }

    reset();
  };

  return (
    <div className="max-w-[450px] w-[100%] mb-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Sign In</h1>
        <GoogleButton />
        <GitHubButton />
        <div className="text-center my-1 text-[2rem]">Or</div>
        <InputEmail register={register} errors={errors} watch={watch} />
        <InputPassword register={register} errors={errors} watch={watch} one={true} />

        <button
          type="submit"
          disabled={!isValid || loading}
          className="mt-2 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-500 w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
}
