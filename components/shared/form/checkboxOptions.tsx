import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
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

export default function CheckboxOptions({ register, watch, reset }: Props) {
  return (
    <div className="flex justify-between flex-wrap">
      {/* <Typography variant="h6" gutterBottom>
        <FormControlLabel
          control={
            <Checkbox
              {...register("isOption")}
              checked={watch("isOption") || false} // Переконайтеся, що значення не `undefined`
              onChange={(e) => {
                const checked = e.target.checked;
                reset({
                  ...watch(),
                  isOption: checked,
                  wifi: checked,
                  coffee: checked,
                  power: checked,
                  restRoom: checked,
                });
              }}
            />
          }
          label={<div style={{ display: "flex", alignItems: "center" }}> Additional options:</div>}
        />
      </Typography> */}
      <div>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox {...register("wifi")} />}
            // {...register("wifi")}
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
            // {...register("coffee")}
            disabled={!watch("isOption")}
            checked={watch("coffee") || false}
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
            control={<Checkbox {...register("power")} />}
            // {...register("power")}
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
            // {...register("restRoom")}
            disabled={!watch("isOption")}
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
