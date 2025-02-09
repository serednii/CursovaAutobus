const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchGetRoutesByPassengerId<TSelect, TResult>(
  passengerId: number,
  select: TSelect
): Promise<TResult | null> {
  try {
    // Відправка POST-запиту
    const response = await fetch(`${API_URL}/api/getRoutesByPassengerId`, {
      // cache: "force-cache",
      // next: { revalidate: 50 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ passengerId, select }), // Передаємо driverId
    });

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

export default fetchGetRoutesByPassengerId;
