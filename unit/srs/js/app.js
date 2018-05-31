window.onload = function () {

  var myData = JSON.parse(localStorage.getItem('card')); // получение данных из  localstorage

  // создание кнопки для запроса данных
  var buttonGetData = document.createElement('button');
  buttonGetData.id = 'action';
  
  function appendBtn() {
    buttonGetData.appendChild((document.createTextNode('Get Data')));
    document.querySelector('.container').appendChild(buttonGetData);
    document.getElementById('action').addEventListener('click', getData);
  }

  //  проверка данных в localstorge
  if (null == localStorage.getItem('card')) {
    appendBtn();
  } else {
    buttonGetData.remove();
    setDataOnPage(myData);
  }
  // запрос на получения данных с сервера
  function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
    // начало загрузки данных   
    xhr.onloadstart = function () {
      buttonGetData.innerText = 'Loading....'; // замена названия кнопки при загрузке данных
    };
    // окончание загрузки данных
    xhr.onloadend = function () {
      buttonGetData.remove(); // удаление кнопки загрузки
    };
    xhr.send(); // отправка запроса
    // получение данных с сервера
    xhr.onload = function () {
      if (this.status === 200) {
        var response = JSON.parse(this.responseText); // ответ с сервера
        myData = response;
        localStorage.setItem('card', JSON.stringify(myData)); // данные в localstorage
        setDataOnPage(myData);
      }
    }
  }
  function setDataOnPage(myData) {
    var output = '';
    // компиляция HTML
    myData.forEach(function (value) {
      output += '<ul class="list" id =' + value.id + '><button class="close_card"><i class="fas fa-times"></i></button>\
        <li class="name">' + '<span><i class="fas fa-user"></i> </span>' + '<span class="edit">' + value.name + '</span></li>\
        <li class="email">' + '<span><i class="fa fa-envelope"></i> </span>' + '<span class="edit">' + value.email + '</span></li>\
        <li class="phone">' + '<span><i class="fa fa-mobile"></i> </span>' + '<span class="edit">' + value.phone + '</span></li>\
        <li class="adress">' + '<span>Adress: </span>' + '<ul>\
          <li class="street">' + '<span>street: </span>' + '<span class="edit">' + value.address.street + '</span></li>\
          <li class="suite">' + '<span>suite: </span>' + '<span class="edit">' + value.address.suite + '</span></li>\
          <li class="city">' + '<span>city: </span>' + '<span class="edit">' + value.address.city + '</span></li>\
          </ul>'+ '</li>\
        <li class="company">' + '<span>Company: </span>' + '<span class="edit">' + value.company.name + '</span></li>\
      </ul>'
    });
    document.getElementById('out').innerHTML = output;
  }

  // удаление карточки из DOM 
  document.body.addEventListener('click', removeList);
  function removeList(e) {
    var idCard = e.target.parentElement.parentElement;
    if (e.target.parentElement.classList.contains('close_card')) {
      e.target.parentElement.parentElement.remove();
      // удалние объекта из массива
      for (var i = 0; i <= myData.length; i++)
        if (myData[i].id == idCard.id) {
          myData.splice(i, 1);
          break;
        }
    }
    if (myData.length == 0) {
      appendBtn();
    }
    localStorage.setItem('card', JSON.stringify(myData)); // данные в localstorage
  }
};