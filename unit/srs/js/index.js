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
                        <li class="name edit">' + '<span><i class="fas fa-user"></i> </span>' + value.name +'</li>\
                        <li class="email edit">' + '<span><i class="fa fa-envelope"></i> </span>' + value.email +'</li>\
                        <li class="phone edit">' + '<span><i class="fa fa-mobile"></i> </span>' + value.phone +'</li>\
                        <li class="adress">' + '<span>Adress: </span>' + '<ul>\
                            <li class="place edit">' + '<span>street: </span>' + value.address.street + '</li>\
                            <li class="place edit">' + '<span>suite: </span>' + value.address.suite + '</li>\
                            <li class="place edit">' + '<span>city: </span>' + value.address.city + '</li>\
                            </ul>'+'</li>\
                        <li class="company edit">' + '<span>Company: </span>' + value.company.name +'</li>\
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

        // работа с инфой
        $('body').on('dblclick', '.edit', replaceHTML); 
        function replaceHTML(){
            var text =  $(this).text(); 

            $(this).html('<input type="text" class="editBox" value="'+ text +'">\
                <a href="#" class="save">save</a>');
        };
        // сохранение изменений 
        $('body').on('click', '.save', function() {
            var newText = $(this).siblings('.editBox').val();

            $(this).parent().text(newText);
        }); 
    });
});