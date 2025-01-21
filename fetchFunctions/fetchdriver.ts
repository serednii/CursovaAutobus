import { IGetRouteById } from "@/types/route-driver.types";
import { UserSelect } from "@/types/users.types";

export async function routeFetch(id: number) {
  try {
    const response = await fetch("http://localhost:3000/api/getRouteById", {
      // cache: "force-cache",
      // next: { revalidate: 50 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      return null;
    }

    const data = await response.json();
    return data.routes as IGetRouteById[];
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}

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

    const data = await response.json();
    return data; // Повертаємо маршрути
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}
