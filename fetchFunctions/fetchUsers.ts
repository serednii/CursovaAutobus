import {
  IGetUsersByIdBySelect,
  IGetUsersByIdBySelectOption,
} from "@/types/user.types";

export async function getUsersFetchByIdsBySelect(
  ids: number[],
  select: IGetUsersByIdBySelectOption
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

    const data: IGetUsersByIdBySelect[] = await response.json();
    return data; // Повертаємо маршрути
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}
