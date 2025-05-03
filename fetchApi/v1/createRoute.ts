import { zodRouteDriverSchema } from "@/zod_shema/zodCreateRoute";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const createRoute = async <T>(data: T): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/routes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    try {
      const res = zodRouteDriverSchema.parse(result.data);
      return res;
    } catch (parseError) {
      throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
    }
  } catch (error: unknown) {
    console.error("Error fetching data:", error);
    // Можливо, повернути значення за замовчуванням або null
    throw new Error("Failed to fetch data", error as Error);
  }
};

export default createRoute;
