var json;
    // обработчик события загрузки страницы.
    window.onload = function () {
        // Создание объекта запроса.
        $("#action").click(function(){
            $.ajax({
                type: "GET",
                url: "https://jsonplaceholder.typicode.com/users",
                dataType: "json",

                // функция получает десериализованный объект
                success: function (obj) {
                    console.log(obj);
                }
            });
        });
    }