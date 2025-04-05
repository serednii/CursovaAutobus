// const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
// const origin = "Houston";
// const destination = "San Antonio";

// export const getStops = () => {
//   fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`)
//     .then((response) => response.json())
//     .then((data) => {
//       const stops = data.routes[0].legs[0].steps.map((step: any) => step.html_instructions);
//       console.log("Проміжні зупинки:", stops);
//     })
//     .catch((error) => console.error("Помилка запиту до API:", error));
// };
interface DirectionResponse {
  routes: {
    legs: {
      steps: {
        html_instructions: string;
      }[];
    }[];
  }[];
}

const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
const origin = "Houston";
const destination = "San Antonio";

export const getStops = async () => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }

    const data: DirectionResponse = await response.json();

    if (!data.routes.length || !data.routes[0].legs.length) {
      console.error("Маршрут не знайдено");
      return [];
    }

    const stops = data.routes[0].legs[0].steps.map((step) => step.html_instructions);

    // console.log("Проміжні зупинки:", stops);
    return stops;
  } catch (error) {
    console.error("Помилка отримання маршрутів:", error);
    return [];
  }
};
