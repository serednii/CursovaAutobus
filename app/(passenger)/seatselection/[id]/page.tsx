import React from "react";
import OrderSeatsBus from "@/components/shared/passenger/OrderSeatsBus";
import SelectedBusInfo from "@/components/shared/passenger/SelectedBusInfo";
import { Container } from "@/components/ui/Container";
import { fetchGetRoutesById, IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import { SeatStatusEnum } from "@/enum/shared.enums";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";
import { selectSeatSelection } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { cloneDeep } from "lodash";

// export type paramsType = Promise<{ id: string }>;

// export async function SeatSelection1(props: { params: paramsType }) {
//   console.log("Rendering SeatSelection");

//   const { id } = await props.params;
//   const session = await getServerSession(authConfig);
//   const driverId: string | undefined = session?.user.id;

//   const routeArray = await fetchGetRoutesById.searchRoute([Number(id)], selectSeatSelection, "seatSelection");

//   const routes = routeArray as IGetRouteSeatSelection[] | null;

//   const route = routes?.[0] ;

//   console.log("route before", cloneDeep(route));

//   //Якщо в маршруті id  пасажира дорівнює id user  то змінюємо статус на SELECTED щоб можна було поміняти
//   if ( route?.busSeats) {
//     const updatedPassengers = route.busSeats.map((e) => {
//       if (e.passenger === Number(driverId) && e.busSeatStatus === SeatStatusEnum.RESERVED) {
//         return { ...e, busSeatStatus: SeatStatusEnum.SELECTED };
//       }
//       return e;
//     });
//     route.busSeats = updatedPassengers;
//   }

//   console.log("route after", route);
//   return (
//     <Container className="pt-4">
//       <SelectedBusInfo route={route} />
//       <OrderSeatsBus key={Math.random()} route={route} />
//       MyBookings Driver Id {route?.driverId} Session user.id {session?.user.id}
//     </Container>
//   );
// }
// import React from "react";
// import OrderSeatsBus from "@/components/shared/passenger/OrderSeatsBus";
// import SelectedBusInfo from "@/components/shared/passenger/SelectedBusInfo";
// import { Container } from "@/components/ui/Container";
// import { fetchGetRoutesById, IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
// import { SeatStatusEnum } from "@/enum/shared.enums";
// import { authConfig } from "@/configs/auth";
// import { getServerSession } from "next-auth/next";
// import { selectSeatSelection } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
// import { cloneDeep } from "lodash";

export type paramsType = Promise<{ id: string }>;

export default async function SeatSelection(props: { params: paramsType }) {
  console.log("Rendering SeatSelection");

  const { id } = await props.params;
  const session = await getServerSession(authConfig);
  const driverId = Number(session?.user.id);

  const routeArray = await fetchGetRoutesById.searchRoute([Number(id)], selectSeatSelection, "seatSelection");
  const routes = routeArray as IGetRouteSeatSelection[] | null;
  const route = routes?.[0];

  console.log("route before", cloneDeep(route));

  if (route?.busSeats) {
    route.busSeats = route.busSeats.map((seat) =>
      seat.passenger === driverId && seat.busSeatStatus === SeatStatusEnum.RESERVED ? { ...seat, busSeatStatus: SeatStatusEnum.SELECTED } : seat
    );
  }

  console.log("route after", route);

  return (
    <Container className="pt-4">
      <SelectedBusInfo route={route} />
      <OrderSeatsBus route={route} />
      <p>
        MyBookings Driver Id {route?.driverId} Session user.id {session?.user.id}
      </p>
    </Container>
  );
}
