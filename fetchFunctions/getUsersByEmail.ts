import { GenerateBooleanType, GenerateType } from "@/types/generaty.types";
import { UserDataBase } from "@/types/next-auth";
import { zodSchemaUsers } from "@/zod_shema/zodUser";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type selectUserKeys = ("id" | "firstName" | "lastName" | "email" | "phone" | "role") &
  keyof UserDataBase;

export type IGetUsersByIdBySelectOption = GenerateBooleanType<selectUserKeys>;
export type IGetUsersByIdBySelect = GenerateType<UserDataBase, selectUserKeys>;

export async function getUsersByEmail(email: string): Promise<IGetUsersByIdBySelect | null> {
  try {
    console.log("email address", `${API_URL}/api/v1/users?email=${email}`);
    if (!email) return null;
    const response = await fetch(`${API_URL}/api/v1/users?email=${email}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data || null;
    // try {
    //   const parsedData: IGetUsersByIdBySelect | null = zodSchemaUsers.parse(data);
    //   return parsedData;
    // } catch (parseError: unknown) {
    //   console.error("Помилка парсингу даних:", parseError);
    //   throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
    // }
  } catch (error) {
    console.error("Error during request execution:", error);
    throw error;
  }
}
