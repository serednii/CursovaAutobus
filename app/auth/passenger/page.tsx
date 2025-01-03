"use client"
import InputEmail from "@/components/shared/form/inputEmail";
import InputPassword from "@/components/shared/form/inputPasswords";
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
}

export default function PassengerAuth() {
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
                    <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Passenger Registration</h1>
                    <p className="text-center mb-4 text-[#4B5563]">Create your passenger account</p>
                    <div className="flex justify-between flex-wrap">
                        <InputText title="First Name" name="firstName" register={register} errors={errors} />
                        <InputText title="Last Name" name="lastName" register={register} errors={errors} />
                    </div>
                    <InputPhone register={register} errors={errors} watch={watch}/>
                    <InputEmail register={register} errors={errors} watch={watch} />

                <InputPassword register={register} errors={errors} watch={watch}/>
                   
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