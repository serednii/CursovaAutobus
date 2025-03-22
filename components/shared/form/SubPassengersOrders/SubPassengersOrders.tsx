"use client";
import React, { memo, useMemo } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormUnregister, UseFormWatch } from "react-hook-form";
import { FormValuesRoute } from "@/types/form.types";
import { ISubPassengersList } from "@/types/interface";
import { UserSession } from "@/types/next-auth";
import { RoleEnum } from "@/enum/shared.enums";
import { useSubPassengers } from "./useSubPassengers";
import SubPassengerFields from "./SubPassengerFields";
import useStore from "@/zustand/createStore";
import IsShowSubPassengerFields from "./isShowSubPassengerFields";
import { shallow } from "zustand/shallow";
import SubPassengersOrdersMap from "./SubPassengersOrdersMap";

interface Props {
  register: UseFormRegister<FormValuesRoute>;
  unregister: UseFormUnregister<FormValuesRoute>;
  errors: FieldErrors<FormValuesRoute>;
  setValue: UseFormSetValue<FormValuesRoute>;
  myListPassengers?: ISubPassengersList;
  renderRef: React.RefObject<number>;
  watch: UseFormWatch<FormValuesRoute>;
  sessionUser?: UserSession | null;
  action: RoleEnum;
}

export default memo(function SubPassengersOrders({
  sessionUser,
  register,
  unregister,
  errors,
  setValue,
  myListPassengers,
  renderRef,
  watch,
  action,
}: Props) {
  // console.log("SubPassengersOrders RENDER");
  const dataLayoutBusMap = useStore((state) => state.dataLayoutBusMap);
  // console.log("dataLayoutBusMap", dataLayoutBusMap);

  useSubPassengers({
    myListPassengers,
    renderRef,
    unregister,
    watch,
    setValue,
    sessionUser,
    action,
  });

  const fullSubPassengers = useMemo(() => {
    const passengerLength = dataLayoutBusMap?.passengerLength ?? 0;

    return Array.from({ length: passengerLength }, () => ({
      subFirstName: action === RoleEnum.DRIVER ? "RESERVATION DRIVER" : "",
      subLastName: action === RoleEnum.DRIVER ? "RESERVATION DRIVER" : "",
      subPhone: action === RoleEnum.DRIVER ? sessionUser?.phone || "" : "",
      subEmail: action === RoleEnum.DRIVER ? "RESERVATIONDRIVER@gmail.com" : "",
    }));
  }, [action, dataLayoutBusMap?.passengerLength, sessionUser]);

  // console.log("fullSubPassengers", fullSubPassengers);

  return (
    <>
      <div className="bg-white p-4 mb-4">
        <h3 className="mb-4">Add Sub Passengers</h3>
        <SubPassengersOrdersMap fullSubPassengers={fullSubPassengers} register={register} setValue={setValue} errors={errors} watch={watch} />
      </div>
    </>
  );
});

// "use client";
// import React, { memo } from "react";
// import { TextField } from "@mui/material";
// import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormUnregister, UseFormWatch } from "react-hook-form";
// import { FormValuesRoute } from "@/types/form.types";
// import { NullableNumber } from "@/types/types";
// import { ISubPassengersList } from "@/types/interface";
// import { UserSession } from "@/types/next-auth";
// import { RoleEnum } from "@/enum/shared.enums";
// import { useSubPassengers } from "./useSubPassengers";

// interface Props {
//   register: UseFormRegister<FormValuesRoute>;
//   unregister: UseFormUnregister<FormValuesRoute>;
//   errors: FieldErrors<FormValuesRoute>;
//   setValue: UseFormSetValue<FormValuesRoute>;
//   idOrderPassengers: NullableNumber[];
//   myListPassengers?: ISubPassengersList;
//   renderRef: React.RefObject<number>;
//   watch: UseFormWatch<FormValuesRoute>;
//   sessionUser?: UserSession | null;
//   action: RoleEnum;
// }

// export default memo(function SubPassengersOrders({
//   sessionUser,
//   register,
//   unregister,
//   errors,
//   setValue,
//   idOrderPassengers,
//   myListPassengers,
//   renderRef,
//   watch,
//   action,
// }: Props) {
//   const { subPassengers, setSubPassengers } = useSubPassengers({
//     idOrderPassengers,
//     myListPassengers,
//     renderRef,
//     unregister,
//     watch,
//     setValue,
//     sessionUser,
//     action,
//   });

//   const handleChange = (index: number, value: string, field: "subFirstName" | "subLastName" | "subPhone" | "subEmail") => {
//     setValue(`${field}.${index}`, value);
//     setSubPassengers((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
//   };

//   if (subPassengers.length === 0) return null;

//   return (
//     <div className="bg-white p-4 mb-4">
//       <h3 className="mb-4">Add Sub Passengers</h3>
//       {subPassengers.map((subPassenger, index) => (
//         <div key={index} className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 gap-4">
//           {(["subFirstName", "subLastName", "subPhone", "subEmail"] as const).map((field) => (
//             <TextField
//               key={field}
//               {...register(`${field}.${index}`, {
//                 required: `${field} is required`,
//                 ...(field === "subPhone"
//                   ? { pattern: { value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, message: "Invalid phone number" } }
//                   : field === "subEmail"
//                   ? { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } }
//                   : { minLength: { value: 2, message: "Must be at least 2 characters" } }),
//               })}
//               value={subPassenger[field]}
//               onChange={(e) => handleChange(index, e.target.value, field)}
//               label={`${field} ${index + 1}`}
//               variant="outlined"
//               fullWidth
//               error={!!errors[field]?.[index]}
//               helperText={errors[field]?.[index]?.message || ""}
//               InputProps={{ style: { height: "42px", marginBottom: "15px" } }}
//               InputLabelProps={{ style: { top: "5px" } }}
//             />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// });
