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
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormValues } from "@/types/form.types";

interface Props {
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
  className?: string;
  name: string;
  title: string;
  IconComponent:any
}

export default function CheckboxOption({ register, watch, name, title, IconComponent }: Props) {
  return (
 
          <FormControlLabel
            control={<Checkbox />}
            {...register(name)}
            checked={watch(name) || false}

            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconComponent/>
               {title}
              </div>
            }
          />
        
  );
}
