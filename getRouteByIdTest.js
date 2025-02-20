fetch('http://localhost:3000/api/testuser', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'api-key': 'f7db8c96-0ab3-434e-8741-cbabfc0342d5',
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