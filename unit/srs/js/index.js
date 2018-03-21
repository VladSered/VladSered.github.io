// обработчик события загрузки страницы.
$(document).ready(function(){
    // Создание объекта запроса.
    $('#action').click(function () {
        $.ajax({
            type: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users',
            dataType: 'json',
            
            beforeSend: function(){
                //изменяем значение кнопки и делаем ее неактивной
                $('#action').val('loading...').attr('disabled', true);
            },

            // функция получает десериализованный объект
            success: function (obj) {
                $.each(obj, function (key, value) {
                    $('#out').append('<ul class="list"><button class="close_card"><i class="fas fa-times"></i></button>\
                        <li class="name">'+'<span><i class="fa fa-user"></i> </span>'+ value.name +'</li>\
                        <li class="email">' + '<span><i class="fa fa-envelope"></i> </span>' + value.email +'</li>\
                        <li class="phone">' + '<span><i class="fa fa-mobile"></i> </span>' + value.phone +'</li>\
                        <li class="adress">' + '<span>Adress: </span>' + '<ul>\
                            <li class="place">' + '<span>street: </span>' + value.address.street + '</li>\
                            <li class="place">' + '<span>suite: </span>' + value.address.suite + '</li>\
                            <li class="place">' + '<span>city: </span>' + value.address.city + '</li>\
                            </ul>'+'</li>\
                        <li class="company">' + '<span>Company: </span>' + value.company.name +'</li>\
                    </ul>');
                });
                //удаляем кнопку из DOM
                $('#action').remove();
            }
        });
        // удаляем карточку из DOM
        $('body').on('click', '.close_card', function(){
            $(this).parents('.list').remove();
        });
    });
});