import { UserSelect } from "@/types/next-auth";

export async function getUsersFetchByIdsBySelect(
  ids: number[],
  select: UserSelect
) {
  try {
    const response = await fetch(
      "http://localhost:3000/api/getUsersByIdBySelect",
      {
        // cache: "force-cache",
        // next: { revalidate: 50 },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids, select }), // Передаємо driverId
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      return null;
    }

    const data: unknown = await response.json();
    return data; // Повертаємо маршрути
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}
