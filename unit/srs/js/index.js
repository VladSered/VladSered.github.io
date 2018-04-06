// обработчик события загрузки страницы.
$(document).ready(function () {

    // получение данных из  localstorage
    var localData = JSON.parse(localStorage.getItem('card'));

    //  проверка данных в localstorge
    if (localStorage.getItem('card') == null) {

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
                success: function getData(data) {

                    // данные в localstorage
                    var dataToStore = JSON.stringify(data);
                    localStorage.setItem('card', dataToStore);

                    // вывод данных на страницу
                    $.each(data, function (key, value) {
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

                    // присвоение id элементам ul
                    var i = 0;
                    $('#out ul').each(function () {
                        i++;
                        $(this).attr('id','person' + i);
                    });

                    //удаляем кнопку из DOM
                    $('#action').detach();
                }
            });
        });

    } else {
        // удаляем кнопку из DOM
        $('#action').detach();

        // вывод данных на страницу
        $.each(localData, function (key, value) {
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

        // присвоение id элементам ul
        var i = 0;
        $('#out ul').each(function () {
            i++;
            $(this).attr("id","person" +i);
        });
    }//else

    // удаляем карточку из DOM и из массива
    $('body').on('click', '.close_card', function () {

        var data = JSON.parse(localStorage.getItem('card'));
        var $ul = $(this).closest('.list');
        data.splice(this, 1);
        $ul.remove();

        // сохраняем изменения данных в localstorage
        localStorage.setItem('card', JSON.stringify(data));
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

        $.each(localData, function(){
            this.name = newText;
        });

        console.log(localData);
    });
});

