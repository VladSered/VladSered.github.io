var json;
    // обработчик события загрузки страницы.
    window.onload = function () {
        // Создание объекта запроса.
        $('#action').click(function(){
            $.ajax({
                type: 'GET',
                url: 'https://jsonplaceholder.typicode.com/users',
                dataType: 'json',

                // функция получает десериализованный объект
                success: function (obj) {
                    var data = '';
                    $.each(obj, function (key, value) {
                        // генерируем HTML
                        data += '<div>';
                        data += '<p>' + value.id + '</p>';
                        data += '<p>' + value.name + '</p>';
                        data += '</div>';
                        // data += '<p>' + value.id + '</p>';
                    });
                    //отправляем данные на страницу
                    $('#out').append(data);
                }
            });
        });
    }