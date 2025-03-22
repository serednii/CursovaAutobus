import { FormValuesRoute, SubPassengerDetails } from "@/types/form.types";
import React, { memo } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import IsShowSubPassengerFields from "./isShowSubPassengerFields";

interface Props {
  watch: UseFormWatch<FormValuesRoute>;
  fullSubPassengers: SubPassengerDetails[];
  register: UseFormRegister<FormValuesRoute>;
  errors: FieldErrors<FormValuesRoute>;
  setValue: UseFormSetValue<FormValuesRoute>;
}

const SubPassengersOrdersMap = ({ fullSubPassengers, register, setValue, errors, watch }: Props) => {
  // console.log("SubPassengersOrdersMap RENDER XXXXXXXXXXXXXXXXXX");
  return (
    <div>
      {fullSubPassengers.map((subPassenger, index) => (
        <IsShowSubPassengerFields
          key={index}
          index={index}
          subPassenger={subPassenger}
          register={register}
          setValue={setValue}
          errors={errors}
          watch={watch}
        />
      ))}
    </div>
  );
};

export default memo(SubPassengersOrdersMap);
