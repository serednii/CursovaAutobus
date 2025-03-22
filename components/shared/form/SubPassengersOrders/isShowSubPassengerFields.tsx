import React, { memo } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { FormValuesRoute, SubPassengerDetails } from "@/types/form.types";
import useStore from "@/zustand/createStore";
import SubPassengerFields from "./SubPassengerFields";

interface Props {
  index: number;
  subPassenger: SubPassengerDetails;
  register: UseFormRegister<FormValuesRoute>;
  setValue: UseFormSetValue<FormValuesRoute>;
  watch: UseFormWatch<FormValuesRoute>;
  errors: FieldErrors<FormValuesRoute>;
  // handleChange: (index: number, value: string, field: "subFirstName" | "subLastName" | "subPhone" | "subEmail") => void;
}

const isShowSubPassengerFields: React.FC<Props> = ({ index, subPassenger, register, setValue, errors, watch }) => {
  const idOrderPassengers = useStore((state) => state.idOrderPassengers);
  // console.log("idOrderPassengers", idOrderPassengers);
  // console.log("isShowSubPassengerFields RENDER", idOrderPassengers.length);

  const isShow = index < idOrderPassengers.length;
  // return <>{isShow && <h1>SubPassengerFields</h1>}</>;
  return (
    <>
      {isShow && (
        <SubPassengerFields index={index} subPassenger={subPassenger} register={register} setValue={setValue} errors={errors} watch={watch} />
        // <div>
        //   <span>SubPassengerFields</span>
        //   <span>SubPassengerFields</span>
        //   <span>SubPassengerFields</span>
        //   <span>SubPassengerFields</span>
        //   <span>SubPassengerFields</span>
        //   <span>SubPassengerFields</span>
        // </div>
      )}
    </>
  );
};

export default memo(isShowSubPassengerFields);
