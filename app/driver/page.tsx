"use client";

import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Container } from "@/components/shared/container";

import CustomDatePicker from "@/components/shared/form/dataPicker/dataPicker";
import DynamicTextFields from "@/components/shared/form/dynamicTextFields";
import MaterialUISelect from "@/components/shared/form/materialUISelect";
import CheckboxOptions from "@/components/shared/form/checkboxOptions";
import CustomTextField from "@/components/shared/form/customTextField";

import "react-datepicker/dist/react-datepicker.css";

export default function Driver() {
  const [selectedValue, setSelectedValue] = useState("");
  console.log(selectedValue);
  const {
    register,
    unregister,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
    control,
  } = useForm<FormValues>({ mode: "onChange" });

  interface FormValues {
    departureDate: Date;
    arrivalDate: Date;
    busStops: string[];
    busNumber: string;
    routePrice: string;
    departureFrom: string;
    arrivalTo: string;
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    alert("Form submitted with data: " + JSON.stringify(data));
    // reset();
  };

  return (
    <Container>
      <header className=" px-4 pt-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Route Management</h1>
          <p>Create and manage your bus routes</p>
        </div>
        {/* <div>
          <Link
            href="/driver/route"
            className="bg-[#2563EB] flex items-center justify-center gap-2 rounded-lg w-[158px] h-[40px] text-white p-2 
                hover:bg-[#1E3A8A] hover:shadow-lg transition duration-300"
          >
            <FaPlus style={{ color: "white" }} /> Create Route
          </Link>
        </div> */}
      </header>

      <main className="px-4 bg-[white] rounded-xl">
        {/* Форму тепер обгортаємо в onSubmit */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* TextField з react-hook-form */}

          {/* Додавання CustomDatePicker */}

          <div className="flex gap-5 mb-5">
            <CustomDatePicker
              title="Departure Date"
              name="departureDate"
              register={register}
              errors={errors}
              control={control} // Передаємо control
            />
            <CustomDatePicker
              title="Arrival Date"
              name="arrivalDate"
              register={register}
              errors={errors}
              control={control} // Передаємо control
            />
          </div>
          <div className="flex gap-5  mb-5">
            <CustomTextField
              register={register}
              errors={errors}
              name={"departureFrom"}
              title={"Departure From"}
              className="grow"
            />
            <CustomTextField
              register={register}
              errors={errors}
              name={"arrivalTo"}
              title={"Arrival To"}
              className="grow"
            />
          </div>

          <DynamicTextFields
            unregister={unregister}
            register={register}
            errors={errors}
          />

          <CustomTextField
            register={register}
            errors={errors}
            name={"busNumber"}
            title={"Bus Number"}
            className="mb-5"
          />

          <div>
            <h2>Bus Layout</h2>
            <MaterialUISelect
              register={register}
              errors={errors}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              className="mb-5"
            />
          </div>

          <CustomTextField
            register={register}
            errors={errors}
            name={"routePrice"}
            title={"Route Price"}
            className="mb-5"
          />

          <div className="flex justify-between items-center">
            <div className="grow">
              <Typography variant="h6" gutterBottom>
                Additional options:
              </Typography>
              <CheckboxOptions register={register} errors={errors} />
            </div>
            <div className="flex justify-end items-center gap-5 grow">
              <Button variant="contained" color="primary">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isValid} // Вимикає кнопку, якщо форма не валідна
              >
                Create Route
              </Button>
            </div>
          </div>
        </form>
      </main>
    </Container>
  );
}
