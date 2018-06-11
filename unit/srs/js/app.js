window.onload = function () {

  var myData = JSON.parse(localStorage.getItem('card')); // получение данных из  localstorage

  // создание кнопки для запроса данных
  var buttonGetData = document.createElement('button');
  buttonGetData.id = 'action';
  buttonGetData.classList = 'btn-small pulse blue'
  buttonGetData.appendChild((document.createTextNode('Get Data')));

  function appendBtn() {
    document.querySelector('.card-content').appendChild(buttonGetData);
    document.getElementById('action').addEventListener('click', getData);
  }

  //  проверка данных в localstorge
  if (null == localStorage.getItem('card') || (myData.length == 0)) {
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
      buttonGetData.innerText = 'Get Data';
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
      output += '<ul class="col s12 m5 card collection" id =' + value.id + '>\
        <li class="collection-item">' + '<i class="fa fa-user"></i>' + '<input type="text" class="edit" id="name" value="' + value.name + '"></li>\
        <li class="collection-item">' + '<i class="fa fa-envelope">' + '</i><input class="edit" type="text" id="email"  value="' + value.email + '"></li>\
        <li class="collection-item">' + '<i class="fa fa-phone"></i>' + '<input class="edit" type="text" id="phone"  value="' + value.phone + '"></li>\
        <li class="address collection-item">' + '<strong>Adress</strong>' + '<ul>\
          <li class="collection-item">' + '<span>street: </span>' + '<input class="edit" type="text" id="street" value = "' + value.address.street + '"></li>\
          <li class="collection-item">' + '<span>suite: </span>' + '<input class="edit" type="text" id="suite" value="' + value.address.suite + '"></li>\
          <li class="collection-item">' + '<span>city: </span>' + '<input class="edit" type="text" id="city" value="' + value.address.city + '"></li>\
          </ul>'+ '</li>\
        <li class="collection-item">' + '<strong>Company: </strong>' + '<input class="edit" type="text" id="company" value="' + value.company.name + '"></li>\
        <button class="close-card waves-effect waves-light btn-small">Delete</button>\
        <button class="update-btn waves-effect waves-darken btn-small">Update</button>\
        </ul>'
    });
    document.querySelector('.card-content').innerHTML = output;
  }

  // удаление карточки из DOM 
  document.body.addEventListener('click', removeList);
  function removeList(e) {
    var idCard = e.target.parentElement;
    // проверка условия по таргет
    if (e.target.classList.contains('close-card')) {
      e.target.parentElement.remove(); // удаление из DOM
      // удалние объекта из массива
      for (var i = 0; i <= myData.length; i++)
        if (myData[i].id == idCard.id) {
          myData.splice(i, 1);
          break;
        }
      // проверка массива
      if (myData.length == 0) {
        appendBtn();
      }
    }
    localStorage.setItem('card', JSON.stringify(myData)); // данные в localstorage
  }
  // изменение информации
  document.body.addEventListener('click', changeText);

  var updateBtn = document.body.querySelector('.update-btn');
  // updateBtn.addEventListener('click', saveChange);
    //   updateItemStorage: function(updatedItem){
    //   let items = JSON.parse(localStorage.getItem('items'));

    //   items.forEach(function(item, index){
    //     if(updatedItem.id === item.id){
    //       items.splice(index, 1, updatedItem);
    //     }
    //   });
    //   localStorage.setItem('items', JSON.stringify(items));
    // },
  function changeText(e) {
    var elementValue = e.target.value;
    var elementId = e.target.parentElement.parentElement.id;
    console.log(elementId, elementValue)
    for (var i in myData) {
      if (myData[i].id == elementId) {
        myData[i].name = elementValue;
        break;
      }
    }
    console.log(myData)
  };
}