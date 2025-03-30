import { Checkbox, FormControlLabel } from "@mui/material";
import { IoIosWifi } from "react-icons/io";
import { CgCoffee } from "react-icons/cg";
import { MdOutlinePower } from "react-icons/md";
import { FaRestroom } from "react-icons/fa";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormValuesRoute } from "@/types/form.types";

interface Props {
  register: UseFormRegister<FormValuesRoute>;
  watch: UseFormWatch<FormValuesRoute>;
  t: any;
  className?: string;
}

export default function CheckboxOptionsMain({ register, watch, t }: Props) {
  const options = [
    { name: "wifi", label: t("form:wi_fi"), icon: IoIosWifi },
    { name: "coffee", label: t("form:coffee"), icon: CgCoffee },
    { name: "power", label: t("form:power"), icon: MdOutlinePower },
    { name: "restRoom", label: t("form:restRoom"), icon: FaRestroom },
  ];

  return (
    <div className="w-full grid grid-cols-1 justify-self-center min-[900px]:justify-self-start min-[500px]:grid-cols-2 min-[900px]:grid-cols-4 gap-4">
      {options.map(({ name, label, icon: Icon }) => (
        <FormControlLabel
          key={name}
          control={<Checkbox {...register(name as keyof FormValuesRoute)} />}
          checked={watch(name as "power" | "restRoom") || false}
          label={
            <div className="flex items-center">
              <Icon className="mr-2 text-xl" />
              {label}
            </div>
          }
        />
      ))}
    </div>
  );
}
