import { FieldErrors } from "react-hook-form";

interface FormValues {
    password: string;
    password_repeat: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    license: string;  
}

  interface Props {
    errors: FieldErrors<FormValues>;
    name:keyof FormValues;
  }
  
export default function FormError({errors, name}:Props){
    return(
        <div className="text-red-500 absolute bottom-[-21px] text-[0.8rem]">
        {errors?.[name] && <p>{errors?.[name]?.message || "Error!"}</p>}
    </div>
    )
}