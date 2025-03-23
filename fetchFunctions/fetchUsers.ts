import { GenerateBooleanType, GenerateType } from "@/types/generaty.types";
import { UserDataBase } from "@/types/next-auth";
import { zodSchemaUsers } from "@/zod_shema/zodUser";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type selectUserKeys = ("id" | "firstName" | "lastName" | "email" | "phone" | "role") & keyof UserDataBase;

export type IGetUsersByIdBySelectOption = GenerateBooleanType<selectUserKeys>;
export type IGetUsersByIdBySelect = GenerateType<UserDataBase, selectUserKeys>;

export async function getUsersFetchByIdsBySelect(ids: number[], select: IGetUsersByIdBySelectOption): Promise<IGetUsersByIdBySelect[] | null> {
  try {
    if (ids && Array.isArray(ids) && ids.length === 0) return null;
    const response = await fetch(`${API_URL}/api/getUsersByIdBySelect`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids, select }),
    });

    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }

    const data: unknown = await response.json();
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
