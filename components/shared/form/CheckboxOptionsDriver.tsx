import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { IoIosWifi } from "react-icons/io";
import { CgCoffee } from "react-icons/cg";
import { MdOutlinePower } from "react-icons/md";
import { FaRestroom } from "react-icons/fa";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormValuesRoute } from "@/types/form.types";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";

interface Props {
  register: UseFormRegister<FormValuesRoute>;
  watch: UseFormWatch<FormValuesRoute>;
}

export default function CheckboxOptionsDriver({ register, watch }: Props) {
  const { t: form } = useAppTranslation("form");
  const options1 = [
    { name: "wifi", label: form("wi_fi"), icon: IoIosWifi },
    { name: "coffee", label: form("coffee"), icon: CgCoffee },
  ];
  const options2 = [
    { name: "power", label: form("power"), icon: MdOutlinePower },
    { name: "restRoom", label: form("restRoom"), icon: FaRestroom },
  ];

  return (
    <div className="flex justify-between flex-wrap">
      <FormGroup>
        {options1.map(({ name, label, icon: Icon }) => (
          <FormControlLabel
            key={name}
            control={<Checkbox {...register(name as keyof FormValuesRoute)} />}
            checked={watch(name as "wifi" | "coffee") || false}
            label={
              <div className="flex items-center">
                <Icon className="mr-2 text-xl" />
                {label}
              </div>
            }
          />
        ))}
      </FormGroup>
      <FormGroup>
        {options2.map(({ name, label, icon: Icon }) => (
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
      </FormGroup>
    </div>
  );
}
