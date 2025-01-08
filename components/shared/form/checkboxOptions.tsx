import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { IoIosWifi } from "react-icons/io";
import { CgCoffee } from "react-icons/cg";
import { MdOutlinePower } from "react-icons/md";
import { FaRestroom } from "react-icons/fa";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

interface FormValues {
  wifi: any;
  coffeeTea: any;
  powerOutlets: any;
  restRoom: any;
}

interface Props {
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
  className?: string;
}

export default function CheckboxOptions({ register, watch }: Props) {
  return (
    <div className="flex justify-between">
      <div>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            {...register("wifi")}
            checked={watch("wifi") || false}
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <IoIosWifi style={{ marginRight: "8px", fontSize: "24px" }} />
                Wi-Fi
              </div>
            }
          />
          <FormControlLabel
            control={<Checkbox />}
            {...register("coffeeTea")}
            checked={watch("coffeeTea") || false}
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <CgCoffee style={{ marginRight: "8px", fontSize: "24px" }} />
                Coffee/Tea
              </div>
            }
          />
        </FormGroup>
      </div>
      <div>
        <Typography variant="h6" gutterBottom></Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            {...register("powerOutlets")}
            checked={watch("powerOutlets") || false}
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <MdOutlinePower
                  style={{ marginRight: "8px", fontSize: "24px" }}
                />
                Power Outlets
              </div>
            }
          />
          <FormControlLabel
            control={<Checkbox />}
            {...register("restRoom")}
            checked={watch("restRoom") || false}
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaRestroom style={{ marginRight: "8px", fontSize: "24px" }} />
                RestRoom
              </div>
            }
          />
        </FormGroup>
      </div>
    </div>
  );
}
