// обработчик события загрузки страницы.
$(document).ready(function () {

    // проверка данных в localstorge
    if (localStorage.getItem("data") != null) {
        //удаляем кнопку из DOM
        $('#action').remove();

        var test = JSON.parse(localStorage.getItem('data'));

        $.each(test, function (key, value) {
            $('#out').append('<ul class="list"><button class="close_card"><i class="fas fa-times"></i></button>\
                <li class="name">' + '<span><i class="fas fa-user"></i> </span>' + '<span class="edit">' + value.name + '</span></li>\
                <li class="email">' + '<span><i class="fa fa-envelope"></i> </span>' + '<span class="edit">' + value.email + '</span></li>\
                <li class="phone">' + '<span><i class="fa fa-mobile"></i> </span>' + '<span class="edit">' + value.phone + '</span></li>\
                <li class="adress">' + '<span>Adress: </span>' + '<ul>\
                    <li class="place">' + '<span>street: </span>' + '<span class="edit">' + value.address.street + '</span></li>\
                    <li class="place">' + '<span>suite: </span>' + '<span class="edit">' + value.address.suite + '</span></li>\
                    <li class="place">' + '<span>city: </span>' + '<span class="edit">' + value.address.street + '</span></li>\
                    </ul>'+ '</li>\
                <li class="company">' + '<span>Company: </span>' + '<span class="edit">' + value.company.name + '</span></li>\
            </ul>');
        });

    } else {
        // Создание объекта запроса.
        $('#action').click(function () {
            $.ajax({
                type: 'GET',
                url: 'https://jsonplaceholder.typicode.com/users',
                dataType: 'json',

                beforeSend: function () {
                    //изменяем значение кнопки и делаем ее неактивной
                    $('#action').val('loading...').attr('disabled', true);
                },
                // функция получает десериализованный объект
                success: function (obj) {
                    $.each(obj, function (key, value) {
                        $('#out').append('<ul class="list"><button class="close_card"><i class="fas fa-times"></i></button>\
                            <li class="name">' + '<span><i class="fas fa-user"></i> </span>' + '<span class="edit">' + value.name + '</span></li>\
                            <li class="email">' + '<span><i class="fa fa-envelope"></i> </span>' + '<span class="edit">' + value.email + '</span></li>\
                            <li class="phone">' + '<span><i class="fa fa-mobile"></i> </span>' + '<span class="edit">' + value.phone + '</span></li>\
                            <li class="adress">' + '<span>Adress: </span>' + '<ul>\
                                <li class="place">' + '<span>street: </span>' + '<span class="edit">' + value.address.street + '</span></li>\
                                <li class="place">' + '<span>suite: </span>' + '<span class="edit">' + value.address.suite + '</span></li>\
                                <li class="place">' + '<span>city: </span>' + '<span class="edit">' + value.address.street + '</span></li>\
                                </ul>'+ '</li>\
                            <li class="company">' + '<span>Company: </span>' + '<span class="edit">' + value.company.name + '</span></li>\
                        </ul>');
                    });
                    // данные в localstorage
                    localStorage.setItem('data', JSON.stringify(obj));
                    //удаляем кнопку из DOM
                    $('#action').remove();
                }
            });
        });
    }

    // удаляем карточку из DOM и из массива test
    $('body').on('click', '.close_card', function () {
        // var test = JSON.parse(localStorage.getItem('data'));
        var $ul = $(this).closest('.list');
        test.splice($ul.index(), 1);
        $ul.remove();
        // localStorage.setItem('data', JSON.stringify(test));
    });

    // работа с инфой
    $('body').on('dblclick', '.edit', function () {
        var text = $(this).text();
        $(this).html('<input type="text" class="editBox" value="' + text + '">\
                    <button class="save"><i class="fas fa-save"></i></button>');

    });

    // сохранение изменений 
    $('body').on('click', '.save', function () {
        var newText = $(this).siblings('.editBox').val();
        $(this).parent().text(newText);
    });
});


