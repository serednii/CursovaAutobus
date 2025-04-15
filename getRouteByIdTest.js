fetch('http://localhost:3000/api/testuser', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
    },
    body: {}
})
    .then(response => {
        if (!response.ok) {
            // Якщо відповідь не вдала, викидаємо помилку
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Парсимо JSON відповідь
    })
    .then(data => {
        // Обробка успішної відповіді
        console.log('Маршрути успішно отримано:', data);
    })
    .catch(error => {
        // Обробка помилок
        console.error('Помилка під час виконання запиту:', error);
    });