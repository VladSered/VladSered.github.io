window.onload = function () {

  var myData = JSON.parse(localStorage.getItem('card')); // получение данных из  localstorage
  // Модальное окно
  var modalOne = document.getElementById('modal-one');
  var modalTwo = document.getElementById('modal-two');
  // создание кнопки для запроса данных
  var buttonGetData = document.createElement('button');
  buttonGetData.id = 'action';
  buttonGetData.class = 'rigth';
  buttonGetData.classList = 'btn-small pulse blue'
  buttonGetData.appendChild((document.createTextNode('Get Data')));

  function appendBtn() {
    document.querySelector('.getData').appendChild(buttonGetData);
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
        <li class="collection-item">' + '<i class="fa fa-user"></i>' + '<span class="edit"> ' + value.name + '</span></li>\
        <li class="collection-item">' + '<i class="fa fa-envelope">' + '</i><span class="edit"> ' + value.email + '</span></li>\
        <li class="collection-item">' + '<i class="fa fa-phone"></i>' + '<span class="edit"> ' + value.phone + '</span></li>\
        <li class="address collection-item">' + '<strong>Adress</strong>' + '<ul>\
          <li class="collection-item">' + '<span>street: </span>' + '<span class="edit"> ' + value.address.street + '</span></li>\
          <li class="collection-item">' + '<span>suite: </span>' + '<span class="edit"> ' + value.address.suite + '</span></li>\
          <li class="collection-item">' + '<span>city: </span>' + '<span class="edit" > ' + value.address.city + '</span></li>\
          </ul>'+ '</li>\
        <li class="collection-item">' + '<strong>Company</strong>' + '<span class="edit"> ' + value.company.name + '</span></li>\
        <button class="delete-btn waves-effect waves-light btn-small red">Delete</button>\
        <button class="update-btn waves-effect waves-darken btn-small orange">Update</button>\
        </ul>'
    });
    document.querySelector('#staff').innerHTML = output;
  }
  // удаление карточки из DOM и LocalStorage
  document.body.addEventListener('click', removeList);
  function removeList(e) {
    // проверка условия по таргет на удаление
    if (ItemControl.checkSolveForButton(e, 'delete-btn')) {
      modalTwo.style.display = 'block';
      var cardFound = e.target.parentElement;
      return card = cardFound;
    }
    // Подтверждение на удаление
    if (ItemControl.checkSolveForButton(e, 'confirm-btn')) {
          var currentId = parseInt(card.id);
          card.remove();
          ItemControl.deleteItemFromStorage(currentId);
          modalTwo.style.display = 'none';
    }
    // проверка массива
    if (myData.length == 0) {
      appendBtn();
    }
  }
  // управление LocalStorage
  var ItemControl = {
    updateItemStorage: function (updatedItem) {
      myData.forEach(function (item, index) {
        if (updatedItem.id === item.id) {
          myData.splice(index, 1, updatedItem);
        }
        localStorage.setItem('card', JSON.stringify(myData));
      })
    },
    deleteItemFromStorage: function (id) {
      myData.forEach(function (item, index) {
        if (id === item.id) {
          myData.splice(index, 1);
        }
      });
      localStorage.setItem('card', JSON.stringify(myData));
    },
    getItemById: function (id) {
      var found = null;
      myData.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItem: function (name, email, phone, street, suite, city, job) {
      var found = null;
      myData.forEach(function (item) {
        if (item.id === myData.currentItem.id) {
          item.name = name;
          item.email = email;
          item.phone = phone;
          item.address.street = street;
          item.address.suite = suite;
          item.address.city = city;
          item.company.name = job;
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: function (item) {
      myData.currentItem = item;
    },
    getCurrentItem: function () {
      return myData.currentItem;
    },
    checkSolveForButton: function (e, selector) {
      return e.target.classList.contains(selector);
    }
  }
  // Работа с интерфейсом пользователя
  var UI = (function () {
    var UISelectors = {
      itemNameInput: '#item-name',
      itemEmailInput: '#item-email',
      itemPhoneInput: '#item-phone',
      itemStreetInput: '#item-street',
      itemSuiteInput: '#item-suite',
      itemCityInput: '#item-city',
      itemCompanyInput: '#item-company',
      listItems: '#staff ul',
    }
    return {
      getItemInput: function () {
        return {
          name: document.querySelector(UISelectors.itemNameInput).value,
          email: document.querySelector(UISelectors.itemEmailInput).value,
          phone: document.querySelector(UISelectors.itemPhoneInput).value,
          street: document.querySelector(UISelectors.itemStreetInput).value,
          suite: document.querySelector(UISelectors.itemSuiteInput).value,
          city: document.querySelector(UISelectors.itemCityInput).value,
          company: document.querySelector(UISelectors.itemCompanyInput).value
        }
      },
      addItemToForm: function () {
        document.querySelector(UISelectors.itemNameInput).value = ItemControl.getCurrentItem().name;
        document.querySelector(UISelectors.itemEmailInput).value = ItemControl.getCurrentItem().email;
        document.querySelector(UISelectors.itemPhoneInput).value = ItemControl.getCurrentItem().phone;
        document.querySelector(UISelectors.itemStreetInput).value = ItemControl.getCurrentItem().address.street;
        document.querySelector(UISelectors.itemSuiteInput).value = ItemControl.getCurrentItem().address.suite;
        document.querySelector(UISelectors.itemCityInput).value = ItemControl.getCurrentItem().address.city;
        document.querySelector(UISelectors.itemCompanyInput).value = ItemControl.getCurrentItem().company.name;
      },
      getSelectors: function () {
        return UISelectors;
      },
      updateListItem: function (item) {
        var listItems = document.querySelectorAll(UISelectors.listItems);
        listItems.forEach(function (listItem) {
          var itemID = listItem.getAttribute('id');
          var currentItemId = parseInt(itemID);
          if (currentItemId === item.id) {
            setDataOnPage(myData);
          }
        });
      },
      clearEditState: function () {
        document.querySelector(UISelectors.itemNameInput).value = '';
        document.querySelector(UISelectors.itemEmailInput).value = '';
        document.querySelector(UISelectors.itemPhoneInput).value = '';
        document.querySelector(UISelectors.itemStreetInput).value = '';
        document.querySelector(UISelectors.itemSuiteInput).value = '';
        document.querySelector(UISelectors.itemCityInput).value = '';
        document.querySelector(UISelectors.itemCompanyInput).value = '';

        modalOne.style.display = 'none';

      },
      undoDeleteItem: function () {
        modalTwo.style.display = 'none';
      }
    }
  })();

  // Обновление данных пользователя
  document.body.addEventListener('click', itemEditClick);
  function itemEditClick(e) {
    if (ItemControl.checkSolveForButton(e, 'update-btn')) {
      // получение id card элемента
      var cardId = e.target.parentElement.id;
      // из строки в число
      var id = parseInt(cardId);
      // получение элемента
      var itemToEdit = ItemControl.getItemById(id);
      ItemControl.setCurrentItem(itemToEdit);
      // Отправляем карточку в форму
      modalOne.style.display = 'block';
      UI.addItemToForm();
      e.preventDefault();
    }
  }
  // Отмена на изменение данных
  document.body.querySelector('.cancel-btn').addEventListener('click', UI.clearEditState);
  document.body.querySelector('.undo-btn').addEventListener('click', UI.undoDeleteItem);
  // Сохранение данных
  document.body.addEventListener('click', itemUpdateSubmit);
  function itemUpdateSubmit(e) {
    if (ItemControl.checkSolveForButton(e, 'save-btn')) {
      // Получение профиля из формы
      var input = UI.getItemInput();
      // Обновление профиля
      var updatedItem = ItemControl.updateItem(input.name, input.email, input.phone, input.street, input.suite, input.city, input.company);
      // Обновление на странице
      UI.updateListItem(updatedItem);
      // Обновление в LocalStorage
      ItemControl.updateItemStorage(updatedItem);
      // Очистка формы после сохранения
      UI.clearEditState();
      modalOne.style.display = 'none';
      e.preventDefault();
    }
  }
};

