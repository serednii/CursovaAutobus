import { GetRoutesByDriverId } from "@/types/route-driver.types";
import {
  IDeleteRoutePassenger,
  IUpdateRouteWithId,
} from "@/types/route-passenger.types";

export const fetchCreateRoute = async (data: any): Promise<any> => {
  try {
    const response = await fetch("http://localhost:3000/api/createroute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Якщо сервер повертає помилку (код статусу не 2xx)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Можливо, повернути значення за замовчуванням або null
    return null;
  }
};

export async function fetchGetRoutesById<TSelect, TResult>(
  id: number[],
  select: TSelect
): Promise<TResult | null> {
  try {
    console.log("iddd ", id);
    const response = await fetch("http://localhost:3000/api/getRoutesById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, select }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      return null;
    }

    const data = await response.json();
    return data.routes as TResult; // Приводимо результат до типу TResult
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}

export const searchRoute = async (data: any): Promise<any> => {
  try {
    const response = await fetch("http://localhost:3000/api/searchRoute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Якщо сервер повертає помилку (код статусу не 2xx)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res = await response.json();

    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Можливо, повернути значення за замовчуванням або null
    return null;
  }
};

export async function fetchGetRoutesByDriverId(driverId: number) {
  try {
    // Відправка POST-запиту
    const response = await fetch(
      "http://localhost:3000/api/getRoutesByDriverId",
      {
        // cache: "force-cache",
        next: { revalidate: 50 },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ driverId }), // Передаємо driverId
      }
    );

    // Перевіряємо статус відповіді
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      return null;
    }

    // Обробка відповіді
    const data = await response.json();
    // console.log("Отримані маршрути:", data.routes);
    return data.routes as GetRoutesByDriverId[]; // Повертаємо маршрути
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}
//GetRoutesByDriverId
export async function fetchGetRoutesByPassengerId<TSelect, TResult>(
  passengerId: number,
  select: TSelect
): Promise<TResult | null> {
  try {
    // Відправка POST-запиту
    const response = await fetch(
      "http://localhost:3000/api/getRoutesByPassengerId",
      {
        // cache: "force-cache",
        // next: { revalidate: 50 },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ passengerId, select }), // Передаємо driverId
      }
    );

    // Перевіряємо статус відповіді
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      return null;
    }

    // Обробка відповіді
    const data = await response.json();
    // console.log("Отримані маршрути:", data.routes);
    return data.routes as TResult; // Повертаємо маршрути
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}

export async function fetchUpdateRouteById(
  updateRouteById: IUpdateRouteWithId
) {
  try {
    // Відправка POST-запиту
    const response = await fetch("http://localhost:3000/api/updateRouteById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateRouteById), // Передаємо driverId
    });

    // Перевіряємо статус відповіді
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      return null;
    }

    // Обробка відповіді
    const data = await response.json();
    console.log("Отримані маршрути:", data);
    return data as GetRoutesByDriverId[]; // Повертаємо маршрути
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}

export async function fetchDeleteRoutePassenger(
  updateRouteById: IDeleteRoutePassenger
) {
  try {
    // Відправка POST-запиту
    const response = await fetch(
      "http://localhost:3000/api/deletePassengerSeatsList",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateRouteById), // Передаємо driverId
      }
    );

    // Перевіряємо статус відповіді
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      return null;
    }

    // Обробка відповіді
    const data = await response.json();
    console.log("Отримані маршрути/*-/*-/*-*/-*/-*/-*:", data);
    return data as GetRoutesByDriverId[]; // Повертаємо маршрути
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}
