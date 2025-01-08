import { SubmitHandler } from "react-hook-form";
import { FormValues } from "./interface";
import { createUser } from "./utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function useDriverAuth(reset: any, role: string) {
  const router = useRouter();
  const onSubmit = async (data: SubmitHandler<FormValues>) => {
    delete data.password_repeat;

    data.role = role;
    console.log(data);
    const result = await createUser(data);

    if (result.error) {
      alert(result.error);
      return;
    }
    console.log("add user to data base");
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
    reset();
  };

  return { onSubmit };
}
