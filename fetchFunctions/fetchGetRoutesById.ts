const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default async function fetchGetRoutesById<TSelect, TResult>(
  id: number[],
  select: TSelect
): Promise<TResult | null> {
  try {
    console.log("iddd ", id, select);
    const response = await fetch(`${API_URL}/api/getRoutesById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, select }),
    });

    console.log("response ", response);

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
