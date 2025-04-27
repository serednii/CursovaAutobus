import { GenerateBooleanType, GenerateType } from "@/types/generaty.types";
import { UserDataBase } from "@/types/next-auth";
import { zodSchemaUsers } from "@/zod_shema/zodUser";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type selectUserKeys = ("id" | "firstName" | "lastName" | "email" | "phone" | "role") &
  keyof UserDataBase;

export type IGetUsersByIdBySelectOption = GenerateBooleanType<selectUserKeys>;
export type IGetUsersByIdBySelect = GenerateType<UserDataBase, selectUserKeys>;

export async function getUsersById(
  ids: number[],
  select: IGetUsersByIdBySelectOption
): Promise<IGetUsersByIdBySelect[] | null> {
  try {
    if (ids && Array.isArray(ids) && ids.length === 0) return null;
    if (select === null) return null;
    const selectString = Object.keys(select).join(",");
    const idString = ids.join(",");
    console.log(
      "getUsersByIdsBySelect",
      `${API_URL}/api/v1/users/?filter[ids]=${idString}&select=${selectString}`
    );

    const response = await fetch(
      `${API_URL}/api/v1/users/?filter[ids]=${idString}&select=${selectString}`,
      {
        cache: "no-store",
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }

    const { data }: { data: unknown } = await response.json();
    console.log("data getUsersById============", data);

    try {
      const parsedData: IGetUsersByIdBySelect[] | null = zodSchemaUsers.array().parse(data);
      return parsedData;
    } catch (parseError: unknown) {
      console.error("Помилка парсингу даних:", parseError);
      throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
    }
  } catch (error) {
    console.error("Error during request execution:", error);
    throw error;
  }
}
