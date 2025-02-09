const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const fetchCreateRoute = async (data: any): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/api/createroute`, {
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

export default fetchCreateRoute;
