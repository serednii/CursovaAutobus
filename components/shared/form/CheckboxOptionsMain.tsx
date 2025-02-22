import { Checkbox, FormControlLabel } from "@mui/material";
import { IoIosWifi } from "react-icons/io";
import { CgCoffee } from "react-icons/cg";
import { MdOutlinePower } from "react-icons/md";
import { FaRestroom } from "react-icons/fa";
import { UseFormRegister, UseFormReset, UseFormWatch } from "react-hook-form";
import { FormValues } from "@/types/form.types";

interface Props {
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
  className?: string;
}

export default function CheckboxOptionsMain({ register, watch }: Props) {
  return (
    <div className="w-full grid grid-cols-1 justify-self-center min-[900px]:justify-self-start min-[500px]:grid-cols-2 min-[900px]:grid-cols-4 gap-4">
      <FormControlLabel
        className="pl-[10%] min-[300px]:pl-[20%] min-[900px]:pl-0"
        control={<Checkbox {...register("wifi")} />}
        checked={watch("wifi") || false}
        label={
          <div style={{ display: "flex", alignItems: "center" }}>
            <IoIosWifi style={{ marginRight: "8px", fontSize: "24px" }} />
            Wi-Fi
          </div>
        }
      />
      <FormControlLabel
        className="pl-[10%] min-[300px]:pl-[20%] min-[900px]:pl-0"
        control={<Checkbox {...register("coffee")} />}
        checked={watch("coffee") || false}
        label={
          <div style={{ display: "flex", alignItems: "center" }}>
            <CgCoffee style={{ marginRight: "8px", fontSize: "24px" }} />
            Coffee/Tea
          </div>
        }
      />
      <FormControlLabel
        className="pl-[10%] min-[300px]:pl-[20%] min-[900px]:pl-0"
        control={<Checkbox {...register("power")} />}
        checked={watch("power") || false}
        label={
          <div style={{ display: "flex", alignItems: "center" }}>
            <MdOutlinePower style={{ marginRight: "8px", fontSize: "24px" }} />
            Power Outlets
          </div>
        }
      />
      <FormControlLabel
        className="pl-[10%] min-[300px]:pl-[20%] min-[900px]:pl-0"
        control={<Checkbox {...register("restRoom")} />}
        checked={watch("restRoom") || false}
        label={
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaRestroom style={{ marginRight: "8px", fontSize: "24px" }} />
            RestRoom
          </div>
        }
      />
    </div>
  );
}
