// обработчик события загрузки страницы.
$(document).ready(function () {

    var localData = JSON.parse(localStorage.getItem('card')); // получение данных из  localstorage

    // функция для выводаданных на страницу
    function showData(data) {
        $.each(data, function (key, value) {
            $('#out').append('<ul class="list" id =' + value.id + '><button class="close_card"><i class="fas fa-times"></i></button>\
                <li class="name">' + '<span><i class="fas fa-user"></i> </span>' + '<span class="edit">' + value.name + '</span></li>\
                <li class="email">' + '<span><i class="fa fa-envelope"></i> </span>' + '<span class="edit">' + value.email + '</span></li>\
                <li class="phone">' + '<span><i class="fa fa-mobile"></i> </span>' + '<span class="edit">' + value.phone + '</span></li>\
                <li class="adress">' + '<span>Adress: </span>' + '<ul>\
                    <li class="street">' + '<span>street: </span>' + '<span class="edit">' + value.address.street + '</span></li>\
                    <li class="suite">' + '<span>suite: </span>' + '<span class="edit">' + value.address.suite + '</span></li>\
                    <li class="city">' + '<span>city: </span>' + '<span class="edit">' + value.address.city + '</span></li>\
                    </ul>'+ '</li>\
                <li class="company">' + '<span>Company: </span>' + '<span class="edit">' + value.company.name + '</span></li>\
            </ul>');
        });
    }

    //  проверка данных в localstorge
    if (null == localStorage.getItem('card')) {

        // Создание объекта запроса.
        $('#action').click(function () {
            $.ajax({
                type: 'GET',
                url: 'https://jsonplaceholder.typicode.com/users',
                dataType: 'json',

                beforeSend: function () {
                    $('#action').val('loading...').attr('disabled', true);  //изменяем значение кнопки и делаем ее неактивной
                },

                // функция получает десериализованный объект
                success: function getData(data) {
                    localData = data;
                    localStorage.setItem('card', JSON.stringify(localData)); // данные в localstorage
                    showData(data); // вывод данных на страницу
                    $('#action').remove(); //удаляем кнопку из DOM
                }
            });
        });
    } else {
        showData(localData); // вывод данных на страницу
        $('#action').remove(); // удаляем кнопку из DOM

    }//else

    // удаляем карточку из DOM и из массива
    $('body').on('click', '.close_card', function () {
        var $ul = $(this).closest('.list');
        localData.splice(this, 1);
        $ul.remove();
        localStorage.setItem('card', JSON.stringify(localData)); // сохраняем изменения данных в localstorage
    });

    // работа с инфой
    $('body').on('dblclick', '.edit', function () {

        var text = $(this).text();
        $(this).html('<input type="text" class="editBox" value="' + text + '">\
                    <button class="save"><i class="fas fa-save"></i></button>');
    });

    // функции изменения персональных данных
    function change(name, value, personId) {
        for (var i in localData) {
            if (localData[i].id == personId) {
                localData[i][name] = value;
                break;
            }
        }
    }
    // функции изменения персональных данных
    function changeAddress(name, value, personId) {
        for (var i in localData) {
            if (localData[i].id == personId) {
                localData[i].address[name] = value;
                break;
            }
        }
    }
    function changeCompany(name, value, personId) {
        for (var i in localData) {
            if (localData[i].id == personId) {
                localData[i][name].name = value;
                break;
            }
        }
    }

    // сохранение изменений 
    $('body').on('click', '.save', function () {

        var val = $('.editBox').val();
        var personId = $(this).parents('ul.list').attr('id');
        var personClass = $(this).parents('li').attr('class');

        var newText = $(this).siblings('.editBox').val();
        $(this).parent().text(newText);

        change(personClass, val, personId);
        changeAddress(personClass, val, personId);
        changeCompany(personClass, val, personId);

        localStorage.setItem('card', JSON.stringify(localData)); // сохраняем изменения данных в localstorage
    });
});  