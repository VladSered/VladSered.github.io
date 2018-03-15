window.onload = function () {

    document.getElementById("action").onclick = function () {

        var xhr = new XMLHttpRequest();          // Создание объекта для HTTP запроса.
        xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);  // Настройка объекта для отправки асинхронного GET запроса

        // функция-обработчик срабатывает при изменении свойства readyState
        // Значения свойства readyState:
        // 0 - Метод open() еще не вызывался
        // 1 - Метод open() уже был вызван, но метод send() еще не вызывался.
        // 2 - Метод send() был вызван, но ответ от сервера еще не получен
        // 3 - Идет прием данных от сервера. 
        // 4 - Ответ от сервера полностью получен (Запрос успешно завершен).

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) { // если получен ответ
                if (xhr.status == 200) { // и если статус код ответа 200
                    var data = JSON.parse(xhr.responseText);

                    document.getElementById("output").innerHTML += data[1]; // responseText - текст ответа полученного с сервера.
                }
            }
        }
        
        xhr.send();                              // Отправка запроса, так как запрос асинхронный сценарий продолжит свое выполнение. Когда с сервера придет ответ сработает событие onreadystatechange
    }
}