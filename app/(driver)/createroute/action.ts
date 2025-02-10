import { z } from "zod";
import { FormValues } from "@/types/form.types";
import { ILayoutData } from "@/types/layoutbus.types";
import { UserSession } from "@/types/next-auth";
import { ISendDataBaseRouteDriver } from "@/types/route-driver.types";

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
    departureDate: z.string().min(1, "Departure date is required"),
    selectBusLayout: z.string().min(1, "Bus layout is required"),
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
  sessionUser: z.object({
    id: z.string().min(1, "User ID is required"),
  }),
});

export const transformData = (
  data: FormValues,
  dataLayoutBus: ILayoutData,
  sessionUser: UserSession
): ISendDataBaseRouteDriver => {
  // Валідація даних за допомогою Zod
  transformDataSchema.parse({ data, dataLayoutBus, sessionUser });

  const newFormatPassenger = dataLayoutBus.passenger.map(
    ({ number, busSeatStatus, passenger }) => ({
      number,
      busSeatStatus,
      passenger,
    })
  );

  // let subPassengersList = [];
  // if (data.subFirstName && data.subLastName && data.subPhone && data.subEmail) {
  //   subPassengersList = data.subFirstName.map((_, index) =>
  //     subPassengerSchema.parse({
  //       subFirstName: data.subFirstName[index],
  //       subLastName: data.subLastName[index],
  //       subPhone: data.subPhone[index],
  //       subEmail: data.subEmail[index],
  //     })
  //   );
  // }

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
    bookedSeats: newFormatPassenger.filter(
      (e) => e.busSeatStatus === "reserved"
    ).length,
  };
};
