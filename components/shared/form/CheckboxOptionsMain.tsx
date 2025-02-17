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
  reset: UseFormReset<FormValues>;
  className?: string;
}

export default function CheckboxOptionsMain({ register, watch, reset }: Props) {
  return (
    <div className="grid grid-cols-1 justify-self-center min-[900px]:justify-self-start min-[500px]:grid-cols-2 min-[900px]:grid-cols-4 gap-4">
      <FormControlLabel
        control={<Checkbox {...register("wifi")} />}
        checked={watch("wifi") || false}
        disabled={!watch("isOption")}
        label={
          <div style={{ display: "flex", alignItems: "center" }}>
            <IoIosWifi style={{ marginRight: "8px", fontSize: "24px" }} />
            Wi-Fi
          </div>
        }
      />
      <FormControlLabel
        control={<Checkbox {...register("coffee")} />}
        disabled={!watch("isOption")}
        checked={watch("coffee") || false}
        label={
          <div style={{ display: "flex", alignItems: "center" }}>
            <CgCoffee style={{ marginRight: "8px", fontSize: "24px" }} />
            Coffee/Tea
          </div>
        }
      />
      <FormControlLabel
        control={<Checkbox {...register("power")} />}
        disabled={!watch("isOption")}
        checked={watch("power") || false}
        label={
          <div style={{ display: "flex", alignItems: "center" }}>
            <MdOutlinePower style={{ marginRight: "8px", fontSize: "24px" }} />
            Power Outlets
          </div>
        }
      />
      <FormControlLabel
        control={<Checkbox {...register("restRoom")} />}
        disabled={!watch("isOption")}
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
