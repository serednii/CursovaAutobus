// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// const searchRoute<T, K> = async (data: T): Promise<K | null> => {
//   try {
//     const response = await fetch(`${API_URL}/api/searchRoute`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       // Якщо сервер повертає помилку (код статусу не 2xx)
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const res = await response.json();

//     return res;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     // Можливо, повернути значення за замовчуванням або null
//     return null;
//   }
// };
// export default searchRoute;

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const searchRoute = async <T, K>(data: T): Promise<K | null> => {
  try {
    const response = await fetch(`${API_URL}/api/searchRoute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res: K = await response.json();

    // Переконаємось, що відповідь має правильний тип
    if (!res || typeof res !== "object") {
      throw new Error("Invalid response format");
    }

    return res;
  } catch (error) {
    console.error("Error fetching data:", (error as Error).message);
    return null;
  }
};

export default searchRoute;
