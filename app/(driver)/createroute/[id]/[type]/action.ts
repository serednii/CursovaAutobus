import { z } from "zod";
import { FormValuesRoute } from "@/types/form.types";
import { ILayoutData } from "@/types/layoutbus.types";
import { UserSession } from "@/types/next-auth";
import { ISendDataBaseRouteDriver } from "@/types/route-driver.types";
import { ISubPassengersList } from "@/types/interface";

// const subPassengerSchema = z.object({
//   subFirstName: z.string().min(1, "First name is required"),
//   subLastName: z.string().min(1, "Last name is required"),
//   subPhone: z.string().min(1, "Phone is required"),
//   subEmail: z.string().email("Invalid email format"),
// });

const transformDataSchema = z.object({
  data: z.object({
    routePrice: z
      .string()
      .min(1)
      .regex(/^[0-9]+$/, "Route price must be a number"),
    departureDate: z.date().min(new Date(), "Departure date is required"),
    selectBusLayout: z.string(),
    intermediateStops: z.array(z.string()).optional(),
    subFirstName: z.array(z.string()).optional(),
    subLastName: z.array(z.string()).optional(),
    subPhone: z.array(z.string()).optional(),
    subEmail: z.array(z.string()).optional(),
  }),
  dataLayoutBus: z.object({
    modelBus: z.string().min(1, "Model bus is required"),
    passenger: z.array(
      z.object({
        number: z.number(),
        busSeatStatus: z.string(),
        passenger: z.number().nullable(),
      })
    ),
  }),
});

export const transformData = (data: FormValuesRoute, dataLayoutBus: ILayoutData, sessionUser: UserSession): ISendDataBaseRouteDriver => {
  console.log("data", data);
  console.log("dataLayoutBus", dataLayoutBus);
  console.log("sessionUser", sessionUser);
  // Валідація даних за допомогою Zod
  transformDataSchema.parse({ data, dataLayoutBus });

  const newFormatPassenger = dataLayoutBus.passenger.map(({ number, busSeatStatus, passenger }) => ({
    number,
    busSeatStatus,
    passenger,
  }));

  const passengersSeatsList: ISubPassengersList = {
    subPassengersList: [],
    idPassenger: Number(sessionUser?.id),
  };

  if (
    data.subFirstName &&
    data.subLastName &&
    data.subPhone &&
    data.subEmail &&
    Array.isArray(data.subFirstName) &&
    Array.isArray(data.subLastName) &&
    Array.isArray(data.subPhone) &&
    Array.isArray(data.subEmail) &&
    data.subFirstName.length === data.subLastName.length &&
    data.subLastName.length === data.subPhone.length &&
    data.subPhone.length === data.subEmail.length
  ) {
    const subPassengersList = data.subFirstName.map((_, index) => ({
      subFirstName: data.subFirstName ? data.subFirstName[index] : "",
      subLastName: data.subLastName ? data.subLastName[index] : "",
      subPhone: data.subPhone ? data.subPhone[index] : "",
      subEmail: data.subEmail ? data.subEmail[index] : "",
    }));

    passengersSeatsList.subPassengersList = subPassengersList;
  }

  return {
    ...data,
    routePrice: Number(data.routePrice),
    modelBus: dataLayoutBus.modelBus,
    busSeats: newFormatPassenger,
    driverId: Number(sessionUser.id),
    departureDate: new Date(data.departureDate),
    notate: "This is a comfortable route.",
    selectBusLayout: String(data.selectBusLayout),
    intermediateStops: data.intermediateStops || [],
    maxSeats: newFormatPassenger.length,
    bookedSeats: newFormatPassenger.filter((e) => e.busSeatStatus === "reserved").length,
    passengersSeatsList: [passengersSeatsList],
  };
};
