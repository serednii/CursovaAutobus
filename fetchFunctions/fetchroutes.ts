import {
  GetRoutesByDriverId,
  IBusSeats,
  ISubPassengersList,
} from "@/types/route-driver.types";

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

// export async function fetchGetRouteById(id: number, select: any) {
//   try {
//     const response = await fetch("http://localhost:3000/api/getRouteById", {
//       // cache: "force-cache",
//       // next: { revalidate: 50 },
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id, select }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("Помилка запиту:", errorData.error || "Невідома помилка");
//       return null;
//     }

//     const data = await response.json();
//     return data.routes;
//   } catch (error) {
//     console.error("Помилка під час виконання запиту:", error);
//     return null;
//   }
// }

// export async function fetchGetRouteById(id: number, select: any) {
//   try {
//     const response = await fetch("http://localhost:3000/api/getRouteById", {
//       // cache: "force-cache",
//       // next: { revalidate: 50 },
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id, select }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("Помилка запиту:", errorData.error || "Невідома помилка");
//       return null;
//     }

//     const data = await response.json();
//     return data.routes as IGetRouteById[];
//   } catch (error) {
//     console.error("Помилка під час виконання запиту:", error);
//     return null;
//   }
// }

export async function fetchGetRouteById<TSelect, TResult>(
  id: number,
  select: TSelect
): Promise<TResult | null> {
  try {
    const response = await fetch("http://localhost:3000/api/getRouteById", {
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

export async function fetchGetRoutesByDriverId(driverId: any) {
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
