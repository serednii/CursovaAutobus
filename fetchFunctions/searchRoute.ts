import { GenerateBooleanType, GenerateType } from "@/types/generaty.types";
import { IRouteDataBase } from "@/types/interface";
import { IGetSearchRouteManyOptionData, IGetSearchRouteOneOptionData } from "@/types/searchRoute.types";
import { ZodSchemaSearchRouteMany, ZodSchemaSearchRouteOne } from "@/zod_shema/zodGetSearchRoute";
import { z } from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type selectRouteManyKeys = (
  | "id"
  | "driverId"
  | "departureDate"
  | "arrivalDate"
  | "departureFrom"
  | "arrivalTo"
  | "busNumber"
  | "routePrice"
  | "modelBus"
  | "maxSeats"
  | "bookedSeats"
  | "busSeats"
  | "passengersSeatsList"
) &
  keyof IRouteDataBase;

type selectRouteOneKeys = ("departureDate" | "driverId") & keyof IRouteDataBase;

export type IGetSearchRouteManyOption = GenerateBooleanType<selectRouteManyKeys>;

export type IGetSearchRouteMany = GenerateType<IRouteDataBase, selectRouteManyKeys>;

export type IGetSearchRouteOneOption = GenerateBooleanType<selectRouteOneKeys>;

export type IGetSearchRouteOne = GenerateType<IRouteDataBase, selectRouteOneKeys>;

// const searchRoute = async <T, K>(data: T): Promise<K | null> => {
//   console.log("data searchRoute", data);
//   try {
//     const response = await fetch(`${API_URL}/api/searchRoute`, {
//       cache: "no-cache",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching data:", (error as Error).message);
//     return null;
//   }
// };

// export default searchRoute;

// // Фабрика для створення запитів із перевіркою даних  Патерн "Фабрика запитів" (Request Factory)
// const createSearchRouteFetcher = <T, K>(schema: z.ZodSchema<K>) => {
//   return async (data: T): Promise<K | null> => {
//     console.log("data", data);
//     const result = await searchRoute<T, K>(data);
//     console.log("result", result);
//     try {
//       return schema.parse(result);
//     } catch (parseError) {
//       throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
//     }
//   };
// };

// // Використання фабрики для конкретних запитів
// export const searchRouteMany = createSearchRouteFetcher<IGetSearchRouteManyOptionData, IGetSearchRouteMany[]>(ZodSchemaSearchRouteMany.array());

// export const searchRouteOne = createSearchRouteFetcher<IGetSearchRouteOneOptionData, IGetSearchRouteOne[]>(ZodSchemaSearchRouteOne.array());

// export const strategySearchRoute = (
//   data: IGetSearchRouteManyOptionData | IGetSearchRouteOneOptionData,
//   type: "many" | "one"
// ): Promise<IGetSearchRouteMany[] | IGetSearchRouteOne[] | null> => {
//   if (type === "many") {
//     return searchRouteMany(data as IGetSearchRouteManyOptionData);
//   } else if (type === "one") {
//     return searchRouteOne(data as IGetSearchRouteOneOptionData);
//   }
//   return Promise.resolve(null);
// };

interface TypeObject<T, K> {
  type: string;
  schema: z.ZodSchema<K>;
  search: (data: T) => Promise<K | null>;
}

class SearchRoute {
  private types: TypeObject<any, any>[] = [];

  addType<T, K>(type: string, schema: z.ZodSchema<K>) {
    this.types.push({
      type,
      schema,
      search: async (data: T): Promise<K | null> => {
        console.log("data searchRoute", data);
        try {
          const response = await fetch(`${API_URL}/api/searchRoute`, {
            cache: "no-cache",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
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

  async strategySearchRoute<T, K>(data: T, type: string): Promise<K | null> {
    const foundType = this.types.find((item) => item.type === type);
    if (!foundType) {
      console.error(`Type "${type}" not found`);
      return null;
    }
    return foundType.search(data);
  }
}

export const searchRoute = new SearchRoute();

searchRoute.addType<IGetSearchRouteManyOptionData, IGetSearchRouteMany[]>("many", ZodSchemaSearchRouteMany.array());
searchRoute.addType<IGetSearchRouteOneOptionData, IGetSearchRouteOne[]>("one", ZodSchemaSearchRouteOne.array());

// private createSearchRouteFetcher = <T, K>(schema: z.ZodSchema<K>) => {
//   return async (data: T): Promise<K | null> => {
//     console.log("data", data);
//     const result = await this.searchRoute<T, K>(data);
//     console.log("result", result);
//     try {
//       return schema.parse(result);
//     } catch (parseError) {
//       throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
//     }
//   };
// };

// private searchRouteMany = this.createSearchRouteFetcher<IGetSearchRouteManyOptionData, IGetSearchRouteMany[]>(ZodSchemaSearchRouteMany.array());

// private searchRouteOne = this.createSearchRouteFetcher<IGetSearchRouteOneOptionData, IGetSearchRouteOne[]>(ZodSchemaSearchRouteOne.array());

// export const searchRouteMany = async <T, K extends IGetSearchRouteMany[]>(data: T): Promise<K | null> =>
//   searchRoute<T, K>(data).then((res: unknown) => {
//     console.log("search route many", data);
//     try {
//       const parsedData = ZodSchemaSearchRouteMany.array().parse(res) as K;
//       return parsedData;
//     } catch (parseError) {
//       throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
//     }
//   });

// export const searchRouteOne = async <T, K extends IGetSearchRouteOne[]>(data: T): Promise<K | null> =>
//   searchRoute<T, K>(data).then((res: unknown) => {
//     try {
//       const parsedData = ZodSchemaSearchRouteOne.array().parse(res) as K;
//       return parsedData;
//     } catch (parseError) {
//       throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
//     }
//   });
