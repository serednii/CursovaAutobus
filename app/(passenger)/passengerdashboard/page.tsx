"use client";

import { useState, useMemo } from "react";
import { Button, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Container } from "@/components/shared/container";

import CustomDatePicker from "@/components/shared/form/dataPicker/dataPicker";
import DynamicTextFields from "@/components/shared/form/dynamicTextFields";
import MaterialUISelect from "@/components/shared/form/materialUISelect";
import CheckboxOptions from "@/components/shared/form/checkboxOptions";
import CustomTextField from "@/components/shared/form/customTextField";

import LayoutBus from "@/components/shared/layoutBus/layuotBus";
import { layoutsData } from "@/components/shared/layoutBus/layoutData";
import { FormValues } from "@/types/form.types";
import { ILayoutData } from "@/types/layoutbus.types";

import "react-datepicker/dist/react-datepicker.css";
import { useSession } from "next-auth/react";
import { SendRouteDriver } from "@/types/sendtrouterdriver.types";
import { UserSession } from "@/types/session.types";

const fetchRouterDriver = async (data: any): Promise<any> => {
  try {
    const response = await fetch("http://localhost:3000/api/routedriver", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Якщо сервер повертає помилку (код статусу не 2xx)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Можливо, повернути значення за замовчуванням або null
    return null;
  }
};

export default function CreateRouter() {
  const { data: session, status } = useSession();
  let sessionUser: UserSession | null = null;

  if (status === "authenticated") {
    sessionUser = session?.user as UserSession; // Присвоюємо значення session.user
  }

  const {
    register,
    unregister,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
    control,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      wifi: true, // Початкове значення для чекбокса
      coffee: true,
      power: true,
      restRoom: true,
    },
  });

  const [indexSelectVariantBus, setIndexSelectVariantBus] = useState<number>(0);

  const [dataLayoutBus, setDataLayoutBus] = useState<ILayoutData>(
    layoutsData[indexSelectVariantBus]
  );

  const passengersLength: number[] = useMemo(
    () => layoutsData.map((e) => e.passengerLength),
    [layoutsData.length]
  );

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newFormatPassenger = dataLayoutBus.passenger.map((e) => {
      const { number, busSeatStatus, passenger } = e;
      return { number, busSeatStatus, passenger };
    });

    const busSeats = {
      passengersLength: dataLayoutBus.passengerLength,
      modelBus: dataLayoutBus.modelBus,
      passenger: newFormatPassenger,
    };

    data.busSeats = busSeats;
    data.passengersListId = [1, 2, 80];
    // data.driverId = Number(sessionUser?.id);
    data.driverId = 1;

    // delete data.selectBusLayout;
    // data.routePrice = data.routePrice;

    fetchRouterDriver(data)
      .then((response) => {
        if (response) {
          console.log("Response:", response);
        } else {
          console.log("No data received or an error occurred.");
        }
      })
      .catch((err) => console.error("Fetch failed:", err));
    console.log(data);
    // alert("Form submitted with data: " + JSON.stringify(data));
    // reset();
  };

  // console.log(indexSelectVariantBus, dataLayoutBus);

  // console.log(errors);

  const handleChangeVariantBus = (number: number) => {
    setIndexSelectVariantBus(number);
    setDataLayoutBus(layoutsData[number]);
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <Container>
      <header className=" px-4 pt-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Route Management</h1>
          <p>Create and manage your bus routes</p>
        </div>
      </header>

      <main className="px-4 bg-[white] rounded-xl ">
        {/* Форму тепер обгортаємо в onSubmit */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* TextField з react-hook-form */}

          {/* Додавання CustomDatePicker */}

          <div className="flex gap-5 mb-5">
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
            <CustomDatePicker
              title="Departure Date"
              name="departureDate"
              register={register}
              errors={errors}
              control={control} // Передаємо control
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="grow">
              <Typography variant="h6" gutterBottom>
                Additional options:
              </Typography>
              <CheckboxOptions register={register} watch={watch} />
            </div>
          </div>
        </form>
      </main>
      <div className="footer"></div>
    </Container>
  );
}
