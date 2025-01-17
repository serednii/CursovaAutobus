const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
const origin = "Houston";
const destination = "San Antonio";

export const getStops = () => {
  fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const stops = data.routes[0].legs[0].steps.map(
        (step: any) => step.html_instructions
      );
      console.log("Проміжні зупинки:", stops);
    })
    .catch((error) => console.error("Помилка запиту до API:", error));
};