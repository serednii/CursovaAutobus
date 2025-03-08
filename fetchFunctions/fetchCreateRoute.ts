import { zodSchemaCreateRoute } from "@/zod_shema/zodCreateRoute";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const fetchCreateRoute = async <T>(data: T): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/api/createroute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }

    const obj = await response.json();
    console.log("obj", obj);
    try {
      const res = zodSchemaCreateRoute.parse(obj);
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

export default fetchCreateRoute;
