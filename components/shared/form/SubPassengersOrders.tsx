"use client";
import React, { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormUnregister } from "react-hook-form";
import { FormValues, SubPassengerDetails } from "@/types/form.types";

import { NullableNumber } from "@/types/types";
import { ISubPassengersList } from "@/types/interface";

interface Props {
  register: UseFormRegister<FormValues>;
  unregister: UseFormUnregister<FormValues>;
  errors: FieldErrors<FormValues>;
  className?: string;
  setValue: UseFormSetValue<FormValues>;
  idOrderPassengers: NullableNumber[];
  myListPassengers: ISubPassengersList | undefined;
  renderRef: React.RefObject<number>;
}

const SubPassengersOrders = ({ register, unregister, errors, setValue, idOrderPassengers, myListPassengers, renderRef }: Props) => {
  const [subPassengers, setSubPassengers] = useState<SubPassengerDetails[] | []>([]);

  if (!myListPassengers) {
    renderRef.current = 4;
  }
  console.log("SubPassengersOrders ----subPassengers", subPassengers, renderRef.current);
  
  useEffect(() => {
    if (myListPassengers && renderRef.current === 0) {
      console.log("myListPassenger in useEffect", myListPassengers);
      renderRef.current++;
      const startSubPassengers: SubPassengerDetails[] = [];

      myListPassengers.subPassengersList.forEach((item: SubPassengerDetails, index: number) => {
        console.log("SubPassengersOrders item", item);
        startSubPassengers.push({
          subFirstName: item.subFirstName,
          subLastName: item.subLastName,
          subPhone: item.subPhone,
          subEmail: item.subEmail,
        });
      });

      setSubPassengers(startSubPassengers);
    } else if (renderRef.current > 2) {
      if (idOrderPassengers && idOrderPassengers.length > 1) {
        // console.log("delete stopIndexxxxxxxxxxxxxx");
        // Перевірка на кількість пасажирів

        if (idOrderPassengers.length > subPassengers.length) {
          //Добавляємо нове поле
          setSubPassengers((prev) =>
            prev
              ? [
                  ...prev,
                  {
                    subFirstName: "",
                    subLastName: "",
                    subPhone: "",
                    subEmail: "",
                  },
                ]
              : []
          );
        }
      }

      if (idOrderPassengers && idOrderPassengers.length > 0) {
        // console.log("delete stopIndexxxxxxxxxxxxxxzzzzzzzzzzzz");
        // Перевірка на кількість пасажирів
        if (idOrderPassengers.length <= subPassengers.length) {
          // console.log("delete stopIndeNNNNNNNNNNNNNNN");
          //останній елемент викинути
          setSubPassengers(subPassengers.slice(0, subPassengers.length - 1));
          const stopIndex = subPassengers.length - 1;
          unregister(`subFirstName.${stopIndex}`); // Видаляємо значення з react-hook-form
          unregister(`subLastName.${stopIndex}`); // Видаляємо значення з react-hook-form
          unregister(`subPhone.${stopIndex}`); // Видаляємо значення з react-hook-form
          unregister(`subEmail.${stopIndex}`); // Видаляємо значення з react-hook-form
        }
      }
    }
    renderRef.current++;
  }, [idOrderPassengers?.length, myListPassengers]);

  const handleChange = (index: number, value: string, inputName: "subFirstName" | "subLastName" | "subPhone" | "subEmail") => {
    console.log("value", value, inputName, index);
    setValue(`${inputName}.${index}`, value);

    const updatedSubPassengers = [...subPassengers];
    updatedSubPassengers[index][inputName] = value; // Оновлюємо відповідне значення
    setSubPassengers(updatedSubPassengers);
  };
  if (subPassengers.length < 1) {
    return null;
  }
  return (
    <div>
      <div className="flex gap-4 items-center">
        <h3>Add Sub Passengers</h3>
      </div>
      <div className="mt-4">
        {subPassengers.length > 0 &&
          subPassengers.map((subPassenger, index) => (
            <div className="grid min-[400px]:grid-cols-2 md:grid-cols-4 grid-cols-1 gap-4 " key={index}>
              <TextField
                {...register(`subFirstName.${index}`, {
                  required: "This field is required",
                  minLength: {
                    value: 4,
                    message: "Must be at least 2 characters",
                  },
                })}
                value={subPassenger.subFirstName} // Прив'язка до стану
                onChange={(e) => handleChange(index, e.target.value, "subFirstName")}
                label={`subFirstName ${index + 1}`}
                variant="outlined"
                fullWidth
                error={!!errors.subFirstName?.[index]}
                helperText={errors.subFirstName?.[index]?.message || ""}
                InputProps={{
                  style: { height: "42px", marginBottom: "15px" },
                }}
                InputLabelProps={{
                  style: { top: "5px" },
                }}
              />

              <TextField
                {...register(`subLastName.${index}`, {
                  required: "This field is required",
                  minLength: {
                    value: 4,
                    message: "Must be at least 2 characters",
                  },
                })}
                value={subPassenger.subLastName} // Прив'язка до стану
                onChange={(e) => handleChange(index, e.target.value, "subLastName")}
                label={`subLastName ${index + 1}`}
                variant="outlined"
                fullWidth
                error={!!errors.subLastName?.[index]}
                helperText={errors.subLastName?.[index]?.message || ""}
                InputProps={{
                  style: { height: "42px", marginBottom: "15px" },
                }}
                InputLabelProps={{
                  style: { top: "5px" },
                }}
              />

              <TextField
                {...register(`subPhone.${index}`, {
                  required: "Phone is required.",
                  pattern: {
                    value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                    message: "Invalid phone number",
                  },
                })}
                type="tel"
                value={subPassenger.subPhone} // Прив'язка до стану
                onChange={(e) => handleChange(index, e.target.value, "subPhone")}
                label={`subPhone ${index + 1}`}
                variant="outlined"
                fullWidth
                error={!!errors.subPhone?.[index]}
                helperText={errors.subPhone?.[index]?.message || ""}
                InputProps={{
                  style: { height: "42px", marginBottom: "15px" },
                }}
                InputLabelProps={{
                  style: { top: "5px" },
                }}
              />

              <TextField
                {...register(`subEmail.${index}`, {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                value={subPassenger.subEmail} // Прив'язка до стану
                onChange={(e) => handleChange(index, e.target.value, "subEmail")}
                label={`subEmail ${index + 1}`}
                variant="outlined"
                fullWidth
                error={!!errors.subEmail?.[index]}
                helperText={errors.subEmail?.[index]?.message || ""}
                InputProps={{
                  style: { height: "42px", marginBottom: "15px" },
                }}
                InputLabelProps={{
                  style: { top: "5px" },
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SubPassengersOrders;
