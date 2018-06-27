window.onload = function () {

  var myData = JSON.parse(localStorage.getItem('card')); // получение данных из  localstorage
  // // Модальное окно
  // var modalOne = document.getElementById('modal-one');
  // var modalTwo = document.getElementById('modal-two');
  var modalThree = document.getElementById('modal-three');
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
  var ItemControl = (function () {
    // Конструктор карточки
    var Item = function (id, name, email, phone, street, suite, city, company) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.street = street;
      this.suite = suite;
      this.city = city;
      this.company = company;
    }
    // var data = {
    //   items: [],
    //   currentItem: null
    // }


    return {
      getItems: function () {
        return myData.items;
      },
      logData: function () {
        return myData;
      },
      addItem: function (name, email, phone, street, suite, city, company) {
        let ID
        // Генерация ID 
        if (myData.length > 0) {
          ID = myData[myData.length - 1].id + 1;
        } else {
          ID = 0;
        }
        // Создание нового элемента
        newItem = new Item(ID, name, email, phone, street, suite, city, company);
        // Добавление в массив
        myData.push(newItem);
        console.log(myData);
        return newItem;
      },


      // updateItemStorage: function (updatedItem) {
      //   myData.forEach(function (item, index) {
      //     if (updatedItem.id === item.id) {
      //       myData.splice(index, 1, updatedItem);
      //     }
      //     localStorage.setItem('card', JSON.stringify(myData));
      //   })
      // },
      // deleteItemFromStorage: function (id) {
      //   myData.forEach(function (item, index) {
      //     if (id === item.id) {
      //       myData.splice(index, 1);
      //     }
      //   });
      //   localStorage.setItem('card', JSON.stringify(myData));
      // },
      // getItemById: function (id) {
      //   var found = null;
      //   myData.forEach(function (item) {
      //     if (item.id === id) {
      //       found = item;
      //     }
      //   });
      //   return found;
      // },
      // updateItem: function (name, email, phone, street, suite, city, job) {
      //   var found = null;
      //   myData.forEach(function (item) {
      //     if (item.id === myData.currentItem.id) {
      //       item.name = name;
      //       item.email = email;
      //       item.phone = phone;
      //       item.address.street = street;
      //       item.address.suite = suite;
      //       item.address.city = city;
      //       item.company.name = job;
      //       found = item;
      //     }
      //   });
      //   return found;
      // },
      // setCurrentItem: function (item) {
      //   myData.currentItem = item;
      // },
      // getCurrentItem: function () {
      //   return myData.currentItem;
      // },
      checkSolveForButton: function (e, selector) {
        return e.target.classList.contains(selector);
      }
    }
  })();

  // Работа с интерфейсом пользователя
  var UI = (function () {
    var UISelectors = {

      itemName: '#name',
      itemEmail: '#email',
      itemPhone: '#phone',
      itemStreet: '#street',
      itemSuite: '#suite',
      itemCity: '#city',
      itemCompany: '#company',

      itemNameInput: '#item-name',
      itemEmailInput: '#item-email',
      itemPhoneInput: '#item-phone',
      itemStreetInput: '#item-street',
      itemSuiteInput: '#item-suite',
      itemCityInput: '#item-city',
      itemCompanyInput: '#item-company',
      addBtn: '.add-btn',
      listItems: '#staff',
    }
    return {
      //   getItemInput: function () {
      //     return {
      //       name: document.querySelector(UISelectors.itemNameInput).value,
      //       email: document.querySelector(UISelectors.itemEmailInput).value,
      //       phone: document.querySelector(UISelectors.itemPhoneInput).value,
      //       street: document.querySelector(UISelectors.itemStreetInput).value,
      //       suite: document.querySelector(UISelectors.itemSuiteInput).value,
      //       city: document.querySelector(UISelectors.itemCityInput).value,
      //       company: document.querySelector(UISelectors.itemCompanyInput).value
      //     }
      //   },
      //   addItemToForm: function () {
      //     document.querySelector(UISelectors.itemNameInput).value = ItemControl.getCurrentItem().name;
      //     document.querySelector(UISelectors.itemEmailInput).value = ItemControl.getCurrentItem().email;
      //     document.querySelector(UISelectors.itemPhoneInput).value = ItemControl.getCurrentItem().phone;
      //     document.querySelector(UISelectors.itemStreetInput).value = ItemControl.getCurrentItem().address.street;
      //     document.querySelector(UISelectors.itemSuiteInput).value = ItemControl.getCurrentItem().address.suite;
      //     document.querySelector(UISelectors.itemCityInput).value = ItemControl.getCurrentItem().address.city;
      //     document.querySelector(UISelectors.itemCompanyInput).value = ItemControl.getCurrentItem().company.name;
      //   },
      getSelectors: function () {
        return UISelectors;
      },
      //   updateListItem: function (item) {
      //     var listItems = document.querySelectorAll(UISelectors.listItems);
      //     listItems.forEach(function (listItem) {
      //       var itemID = listItem.getAttribute('id');
      //       var currentItemId = parseInt(itemID);
      //       if (currentItemId === item.id) {
      //         setDataOnPage(myData);
      //       }
      //     });
      //   },
      //   clearEditState: function () {
      //     document.querySelector(UISelectors.itemNameInput).value = '';
      //     document.querySelector(UISelectors.itemEmailInput).value = '';
      //     document.querySelector(UISelectors.itemPhoneInput).value = '';
      //     document.querySelector(UISelectors.itemStreetInput).value = '';
      //     document.querySelector(UISelectors.itemSuiteInput).value = '';
      //     document.querySelector(UISelectors.itemCityInput).value = '';
      //     document.querySelector(UISelectors.itemCompanyInput).value = '';

      //     modalOne.style.display = 'none';

      //   },
      clearFields: function () {
        document.querySelector(UISelectors.itemName).value = '';
        document.querySelector(UISelectors.itemEmail).value = '';
        document.querySelector(UISelectors.itemPhone).value = '';
        document.querySelector(UISelectors.itemStreet).value = '';
        document.querySelector(UISelectors.itemSuite).value = '';
        document.querySelector(UISelectors.itemCity).value = '';
        document.querySelector(UISelectors.itemCompany).value = '';
        
        modalThree.style.display = 'none';
      },
      //   undoDeleteItem: function () {
      //     modalTwo.style.display = 'none';
      // }

      // populateItemList: function (items) {
      //   var html = '';

      //   items.forEach(function (item) {
      //     html += '<li id=' + item.id + ' class="collection-items">\
      //     <strong>'+ item.name + '</strong><strong>'+ item.email + '</strong>'
      //   });

        // document.querySelector('#staff').innerHTML = html;
      // },

      getItemInputModal: function () {
        return {
          name: document.querySelector(UISelectors.itemName).value,
          email: document.querySelector(UISelectors.itemEmail).value,
          phone: document.querySelector(UISelectors.itemPhone).value,
          street: document.querySelector(UISelectors.itemStreet).value,
          suite: document.querySelector(UISelectors.itemSuite).value,
          city: document.querySelector(UISelectors.itemCity).value,
          company: document.querySelector(UISelectors.itemCompany).value
        }
      },

      addListItem: function (item) {
        const ul = document.createElement('ul');
        ul.className = 'col s12 m5 card collection';
        ul.id = item.id;
        ul.innerHTML = '<li class="collection-item">' + '<i class="fa fa-user"></i>' + '<span class="edit"> ' + item.name + '</span></li>\
             <li class="collection-item">' + '<i class="fa fa-envelope">' + '</i><span class="edit"> ' + item.email + '</span></li>\
             <li class="collection-item">' + '<i class="fa fa-phone"></i>' + '<span class="edit"> ' + item.phone + '</span></li>\
             <li class="address collection-item">' + '<strong>Adress</strong>' + '<ul>\
               <li class="collection-item">' + '<span>street: </span>' + '<span class="edit"> ' + item.street + '</span></li>\
               <li class="collection-item">' + '<span>suite: </span>' + '<span class="edit"> ' + item.suite + '</span></li>\
               <li class="collection-item">' + '<span>city: </span>' + '<span class="edit" > ' + item.city + '</span></li>\
               </ul>'+ '</li>\
             <li class="collection-item">' + '<strong>Company</strong>' + '<span class="edit"> ' + item.company + '</span></li>\
             <button class="delete-btn waves-effect waves-light btn-small red">Delete</button>\
             <button class="update-btn waves-effect waves-darken btn-small orange">Update</button>';
        document.querySelector(UISelectors.listItems).insertAdjacentElement
          ('beforeend', ul);
      }
    }
  })();

  var App = (function (ItemControl, UI) {
    // События
    var loadEventListnerers = function () {
      // Получение селекторов
      var UISelectors = UI.getSelectors();

      document.querySelector(UISelectors.addBtn).addEventListener
        ('click', itemAddSubmit);
    }
    const itemAddSubmit = function (e) {
      // получение данный из формы модалки 3
      const inputModal = UI.getItemInputModal();
      // проверка ввода данных
      if (inputModal.name !== '') {
        const newItem = ItemControl.addItem(inputModal.name, inputModal.email, inputModal.phone, inputModal.street, inputModal.suite, inputModal.city, inputModal.company);
        UI.addListItem(newItem);

        // Очистка полей 
        UI.clearFields();
      }
      e.preventDefault();
    }
    return {
      init: function () {
        console.log('initialization');
        // var items = ItemControl.getItems();
        // UI.populateItemList(items);

        loadEventListnerers();
      }
    }
  })(ItemControl, UI);
  App.init();







  //   // Обновление данных пользователя
  //   document.body.addEventListener('click', itemEditClick);
  //   function itemEditClick(e) {
  //     if (ItemControl.checkSolveForButton(e, 'update-btn')) {
  //       // получение id card элемента
  //       var cardId = e.target.parentElement.id;
  //       // из строки в число
  //       var id = parseInt(cardId);
  //       // получение элемента
  //       var itemToEdit = ItemControl.getItemById(id);
  //       ItemControl.setCurrentItem(itemToEdit);
  //       // Отправляем карточку в форму
  //       modalOne.style.display = 'block';
  //       UI.addItemToForm();
  //       e.preventDefault();
  //     }
  //   }
  //   // Отмена на изменение данных
  //   document.body.querySelector('.cancel-btn').addEventListener('click', UI.clearEditState);
  //   document.body.querySelector('.undo-btn').addEventListener('click', UI.undoDeleteItem);
  //   // Сохранение данных
  //   document.body.addEventListener('click', itemUpdateSubmit);
  //   function itemUpdateSubmit(e) {
  //     if (ItemControl.checkSolveForButton(e, 'save-btn')) {
  //       // Получение профиля из формы
  //       var input = UI.getItemInput();
  //       // Обновление профиля
  //       var updatedItem = ItemControl.updateItem(input.name, input.email, input.phone, input.street, input.suite, input.city, input.company);
  //       // Обновление на странице
  //       UI.updateListItem(updatedItem);
  //       // Обновление в LocalStorage
  //       ItemControl.updateItemStorage(updatedItem);
  //       // Очистка формы после сохранения
  //       UI.clearEditState();
  //       modalOne.style.display = 'none';
  //       e.preventDefault();
  //     }
  //   }
  // Модалка создания новой карточки
  document.body.addEventListener('click', staffAdd);
  function staffAdd(e) {
    if (ItemControl.checkSolveForButton(e, 'createStaff')) {
      modalThree.style.display = 'block';
    }
    if (ItemControl.checkSolveForButton(e, 'cancel-btn')) {
      modalThree.style.display = 'none';
    }
    e.preventDefault();
  }
};

