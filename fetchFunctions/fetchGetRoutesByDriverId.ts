import { zodSchemaGetRoutesBuDriverId, zodSchemaGetRoutesBuDriverIdListBlocked } from "@/zod_shema/zodGetRoutesBuDriverId";
import { GenerateBooleanType, GenerateType } from "@/types/generaty.types";
import { IRouteDataBase } from "@/types/interface";
import { z } from "zod";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

//********************************************************** */

type selectRoutesByIdDriverKeys = (
  | "id"
  | "departureDate"
  | "arrivalDate"
  | "departureFrom"
  | "arrivalTo"
  | "routePrice"
  | "bookedSeats"
  | "maxSeats"
) &
  keyof IRouteDataBase;
export type IGetRoutesByDriverOption = GenerateBooleanType<selectRoutesByIdDriverKeys>;
export type IRoutesByIdDriver = GenerateType<IRouteDataBase, selectRoutesByIdDriverKeys>;

export const selectGetRoutesByDriverId: IGetRoutesByDriverOption = {
  id: true,
  departureDate: true,
  arrivalDate: true,
  departureFrom: true,
  arrivalTo: true,
  routePrice: true,
  bookedSeats: true,
  maxSeats: true,
};
//********************************************************** */

type selectRoutesByIdDriverListBlockedKeys = ("id" | "departureDate" | "arrivalDate") & keyof IRouteDataBase;
export type IGetRoutesByDriverListBlockedOption = GenerateBooleanType<selectRoutesByIdDriverListBlockedKeys>;
export type IRoutesByIdDriverListBlocked = GenerateType<IRouteDataBase, selectRoutesByIdDriverListBlockedKeys>;

export const selectRouteListBlocked: IGetRoutesByDriverListBlockedOption = {
  id: true,
  departureDate: true, // Залишаємо це поле
  arrivalDate: true, // Залишаємо це поле
};

//********************************************************** */
interface TypeObject<T, K> {
  type: string;
  schema: z.ZodSchema<K>;
  search: (driverId: number[], select: T) => Promise<K | null>;
}

class GetRoutesByDriverId {
  private types: TypeObject<any, any>[] = [];

  addType<T, K>(type: string, schema: z.ZodSchema<K>) {
    this.types.push({
      type,
      schema,
      search: async (driverId: number[], select: T): Promise<K | null> => {
        console.log("data searchRoute", select);

        try {
          const response = await fetch(`${API_URL}/api/getRoutesByDriverId`, {
            cache: "no-store",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ driverId, select }),
          });

          if (!response.ok) throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);

          const result = await response.json();
          return schema.parse(result); // Перевірка через Zod перед поверненням
        } catch (error) {
          console.error("Error fetching data:", (error as Error).message);
          return null;
        }
      },
    });
  }

  async searchRoute<T, K>(driverId: number[], data: T, type: string): Promise<K | null> {
    const foundType = this.types.find((item) => item.type === type);

    if (!foundType) {
      console.error(`Type "${type}" not found`);
      return null;
    }

    return foundType.search(driverId, data);
  }
}

const fetchGetRoutesByDriverId = new GetRoutesByDriverId();
export default fetchGetRoutesByDriverId;
fetchGetRoutesByDriverId.addType<IGetRoutesByDriverOption, IRoutesByIdDriver[]>("getDriver", zodSchemaGetRoutesBuDriverId.array());

fetchGetRoutesByDriverId.addType<IGetRoutesByDriverListBlockedOption, IRoutesByIdDriverListBlocked[]>(
  "listBlocked",
  zodSchemaGetRoutesBuDriverIdListBlocked.array()
);

// async function fetchGetRoutesByDriverId1(driverId: number): Promise<IRoutesByIdDriver[] | null> {
//   try {
//     // Відправка POST-запиту
//     const response = await fetch(`${API_URL}/api/getRoutesByDriverId`, {
//       cache: "no-store",
//       // next: { revalidate: 50 },
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ driverId }), // Передаємо driverId
//     });

//     // Перевіряємо статус відповіді
//     if (!response.ok) {
//       throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
//     }

//     // Обробка відповіді
//     const data: unknown = await response.json();

//     try {
//       const res: IRoutesByIdDriver[] = zodSchemaGetRoutesBuDriverId.array().parse(data);
//       return res;
//     } catch (parseError) {
//       throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
//     }
//   } catch (error) {
//     console.error("Помилка під час виконання запиту:", error);
//     return null;
//   }
// }

// export default fetchGetRoutesByDriverId1;
