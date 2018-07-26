window.onload = function () {

  var myData = JSON.parse(localStorage.getItem('card')); // получение данных из  localstorage
  // // Модальное окно
  var modalOne = document.getElementById('modal-one');
  var modalTwo = document.getElementById('modal-two');
  var modalThree = document.getElementById('modal-three');

  // Присвоение body класс для блокировки фона модального окна
  function closeModal() {
    document.body.className = 'modal-close';
  }
  function openModal() {
    document.body.className = 'modal-open';
  }

  // создание кнопки для запроса данных
  var buttonGetData = document.createElement('button');
  buttonGetData.id = 'action';
  buttonGetData.class = 'rigth';
  buttonGetData.classList = 'btn-small pulse blue';
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
      output += '<ul class="col s12 m8 l5 card collection" id =' + value.id + '>\
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

  // управление LocalStorage
  var ItemControl = (function () {
    // Конструктор карточки
    var Item = function (id, name, email, phone, street, suite, city, company) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.address = {
        street: street,
        suite: suite,
        city: city
      }
      this.company = {
        name: company
      }
    }
    return {
      getItems: function () {
        return myData.items;
      },
      logData: function () {
        return myData;
      },
      addItem: function (name, email, phone, street, suite, city, company) {
        // Генерация ID 
        let ID = 0;
        // Создание нового элемента
        newItem = new Item(ID, name, email, phone, street, suite, city, company);
        // Добавление в массив
        myData.unshift(newItem);
        // После добавления нового элемента, увеличение id на 1 следю за ним элементов 
        myData.forEach(function (value) {
          return value.id++;
        });
        localStorage.setItem('card', JSON.stringify(myData));
        return newItem;
      },
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
      updateItem: function (name, email, phone, street, suite, city, company) {
        var found = null;
        myData.forEach(function (item) {
          if (item.id === myData.currentItem.id) {
            item.name = name;
            item.email = email;
            item.phone = phone;
            item.address.street = street;
            item.address.suite = suite;
            item.address.city = city;
            item.company.name = company;
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

      createBtn: '.create-btn',
      confirmBtn: '.confirm-btn',
      saveBtn: '.save-btn',
      cancelBtn: '.cancel-btn',
      addBtn: '.add-btn',
      deleteBtn: '.delete-btn',

      list: '#staff ul',
      listItems: '#staff'
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
        var listItems = document.querySelectorAll(UISelectors.list);
        listItems.forEach(function (listItem) {
          var itemID = listItem.getAttribute('id');
          var currentItemId = parseInt(itemID);
          console.log()
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
        ul.className = 'col s12 m6 card collection';
        ul.id = item.id;
        ul.innerHTML = '<li class="collection-item">' + '<i class="fa fa-user"></i>' + '<span class="edit"> ' + item.name + '</span></li>\
             <li class="collection-item">' + '<i class="fa fa-envelope">' + '</i><span class="edit"> ' + item.email + '</span></li>\
             <li class="collection-item">' + '<i class="fa fa-phone"></i>' + '<span class="edit"> ' + item.phone + '</span></li>\
             <li class="address collection-item">' + '<strong>Adress</strong>' + '<ul>\
               <li class="collection-item">' + '<span>street: </span>' + '<span class="edit"> ' + item.address.street + '</span></li>\
               <li class="collection-item">' + '<span>suite: </span>' + '<span class="edit"> ' + item.address.suite + '</span></li>\
               <li class="collection-item">' + '<span>city: </span>' + '<span class="edit" > ' + item.address.city + '</span></li>\
               </ul>'+ '</li>\
             <li class="collection-item">' + '<strong>Company</strong>' + '<span class="edit"> ' + item.name.company + '</span></li>\
             <button class="delete-btn waves-effect waves-light btn-small red">Delete</button>\
             <button class="update-btn waves-effect waves-darken btn-small orange">Update</button>';
        document.querySelector(UISelectors.listItems).insertAdjacentElement('afterbegin', ul);
      },
      showAlert: function (message, className) {
        const div = document.createElement('div');
        div.className = `${className} z-depth-3`;
        div.appendChild(document.createTextNode(message));
        const alertMessage = document.querySelector('.modal-content-three');
        const itemList = document.querySelector('#creator');
        alertMessage.insertBefore(div, itemList);
        // Удаление сообщения после трех секунд
        setTimeout(function () {
          document.querySelector('.alert').remove();
        }, 3000);
      },
      validName: function () {
        const name = document.querySelector(UISelectors.itemName);
        const re = /^[a-zA-Z ]{5,20}$/;
        if (!re.test(name.value)) {
          name.classList.add('invalid');
        } else {
          name.classList.remove('invalid');
        }
      },
      validEmail: function () {
        const email = document.querySelector(UISelectors.itemEmail);
        const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if (!re.test(email.value)) {
          email.classList.add('invalid');
        } else {
          email.classList.remove('invalid');
        }
      },
      validPhone: function () {
        const phone = document.querySelector(UISelectors.itemPhone);
        const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
        if (!re.test(phone.value)) {
          phone.classList.add('invalid');
        } else {
          phone.classList.remove('invalid');
        }
      },
      validStreet: function () {
        const street = document.querySelector(UISelectors.itemStreet);
        const re = /^[a-zA-Z0-9 .-]/;
        if (!re.test(street.value)) {
          street.classList.add('invalid');
        } else {
          street.classList.remove('invalid');
        }
      },
      validSuite: function () {
        const suite = document.querySelector(UISelectors.itemSuite);
        const re = /^[a-zA-Z0-9 .-]/;
        if (!re.test(suite.value)) {
          suite.classList.add('invalid');
        } else {
          suite.classList.remove('invalid');
        }
      },
      validCity: function () {
        const city = document.querySelector(UISelectors.itemcity);
        const re = /^[a-zA-Z0-9 .-]/;
        if (!re.test(city.value)) {
          city.classList.add('invalid');
        } else {
          city.classList.remove('invalid');
        }
      },
      validCompany: function () {
        const company = document.querySelector(UISelectors.itemcompany);
        const re = /^[a-z ]/i;
        if (!re.test(company.value)) {
          company.classList.add('invalid');
        } else {
          company.classList.remove('invalid');
        }
      },
    }
  })();

  var App = (function (ItemControl, UI) {
    // События
    var loadEventListnerers = function () {
      // Получение селекторов
      var UISelectors = UI.getSelectors();

      // Модалка с формой новой карточки
      document.body.addEventListener('click', createCard);

      // Подтверждение на добавление новой карточки
      document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

      // удаление карточки из DOM и LocalStorage
      document.body.addEventListener('click', removeList);

      // Обновление данных пользователя
      document.body.addEventListener('click', itemEditClick);

      // Отмена на изменение данных
      document.querySelector(UISelectors.cancelBtn).addEventListener('click', UI.clearEditState);

      // Проверка формы на добавление карточки
      document.querySelector(UISelectors.itemName).addEventListener('blur', UI.validName);
      document.querySelector(UISelectors.itemEmail).addEventListener('blur', UI.validEmail);
      document.querySelector(UISelectors.itemPhone).addEventListener('blur', UI.validPhone);
      document.querySelector(UISelectors.itemStreet).addEventListener('blur', UI.validStreet);
      document.querySelector(UISelectors.itemSuite).addEventListener('blur', UI.validSuite);
      document.querySelector(UISelectors.itemCity).addEventListener('blur', UI.validCity);
      document.querySelector(UISelectors.itemCompany).addEventListener('blur', UI.validCompany);

      // Проверка формы на редактирование карточки
      // document.querySelector(UISelectors.itemNameInput).addEventListener('blur', UI.validName);
      // document.querySelector(UISelectors.itemEmailInput).addEventListener('blur', UI.validEmail);
      // document.querySelector(UISelectors.itemPhoneInput).addEventListener('blur', UI.validPhone);
      // document.querySelector(UISelectors.itemStreetInput).addEventListener('blur', UI.validStreet);
      // document.querySelector(UISelectors.itemSuiteInput).addEventListener('blur', UI.validSuite);
      // document.querySelector(UISelectors.itemCityInput).addEventListener('blur', UI.validCity);
      // document.querySelector(UISelectors.itemCompanyInput).addEventListener('blur', UI.validCompany);
    }

    // Модалка создания новой карточки
    function createCard(e) {
      if (ItemControl.checkSolveForButton(e, 'create-btn')) {
        modalThree.style.display = 'block';
        openModal();
      } else if (ItemControl.checkSolveForButton(e, 'cancel-btn')) {
        modalTwo.style.display = 'none';
        modalThree.style.display = 'none';
        closeModal();
      }
      e.preventDefault();
    }

    // Добавление новой карточки
    function itemAddSubmit(e) {
      // получение данный из формы модалки 3
      const inputModal = UI.getItemInputModal();
      // проверка ввода данных
      if (inputModal.name == '' || inputModal.email == '' || inputModal.phone == '' || inputModal.street == '' || inputModal.suite == '' || inputModal.city == '' || inputModal.company == '') {
        UI.showAlert('Please fill in all fields', 'alert');
      } else {
        const newItem = ItemControl.addItem(inputModal.name, inputModal.email, inputModal.phone, inputModal.street, inputModal.suite, inputModal.city, inputModal.company);
        UI.addListItem(newItem);
        closeModal();
        // Очистка полей 
        UI.clearFields();
        M.toast({ html: 'New card has been added successfuly!' });
      }
      e.preventDefault();
    }

    // Удаление карточки из DOM и LS
    function removeList(e) {
      // проверка условия по таргет на удаление
      if (ItemControl.checkSolveForButton(e, 'delete-btn')) {
        modalTwo.style.display = 'block';
        openModal();
        var cardFound = e.target.parentElement;
        return card = cardFound;
      }
      // Подтверждение на удаление
      if (ItemControl.checkSolveForButton(e, 'confirm-btn')) {
        var currentId = parseInt(card.id);
        card.remove();
        ItemControl.deleteItemFromStorage(currentId);
        modalTwo.style.display = 'none';
        closeModal();
        M.toast({ html: 'Card has been deleted' });
      }
      // проверка массива
      if (myData.length == 0) {
        appendBtn();
      }
      e.preventDefault();
    }
    return {
      init: function () {
        loadEventListnerers();
      }
    }
  })(ItemControl, UI);

  // Функция на закрытие modal
  window.addEventListener('click', outsideClick);
  function outsideClick(e) {
    if (e.target == modalThree) {
      modalThree.style.display = 'none';
      closeModal();
    } else if (e.target == modalTwo) {
      modalTwo.style.display = 'none';
      closeModal();
    } else if (e.target == modalOne) {
      modalOne.style.display = 'none';
      closeModal();
    }
  }


  // Редактирование карточки
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
      openModal();
      UI.addItemToForm();
      e.preventDefault();
    }
  }

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
      closeModal();



      M.toast({ html: 'Updated successfuly!' });
      e.preventDefault();
    }
  }
  App.init();
};