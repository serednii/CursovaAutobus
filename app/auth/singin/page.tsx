"use client"
import InputEmail from "@/components/shared/form/inputEmail";
import InputPassword from "@/components/shared/form/inputPasswords";
import { Overlay } from "@/components/shared/overlay";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
    password: string;
    password_repeat: string;
    email: string;
}

export default function Passenger() {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
        watch,
    } = useForm({ mode: "onChange" });
 
    const onSubmit = (data: SubmitHandler<FormValues>) => {
        alert("Form submitted with data: " + JSON.stringify(data));
        reset();
    }

    return (

        <Overlay className="driver justify-center items-center bg-[#CED4DA]">
            <div className="max-w-[450px] w-[100%]">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
                >
                    <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Sing In</h1>

                    <InputEmail register={register} errors={errors} watch={watch} />

                <InputPassword register={register} errors={errors} watch={watch} one={true}/>
                   
                    <input
                    disabled={!isValid}
                        type="submit"
                        className="mt-2 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-500 w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                    />
                </form>

            </div>
        </Overlay>


    )
}