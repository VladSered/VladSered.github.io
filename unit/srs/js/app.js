window.onload = function () {

  var myData = JSON.parse(localStorage.getItem('card')); // получение данных из  localstorage

  // создание кнопки для запроса данных
  var buttonGetData = document.createElement('button');
  buttonGetData.id = 'action';
  buttonGetData.classList = 'btn-small pulse blue'
  buttonGetData.appendChild((document.createTextNode('Get Data')));

  function appendBtn() {
    document.querySelector('.staff').appendChild(buttonGetData);
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
        <li class="collection-item">' + '<i class="fa fa-user"></i>' + '<input type="text" class="edit" id="name" value="' + value.name + '" disabled></li>\
        <li class="collection-item">' + '<i class="fa fa-envelope">' + '</i><input class="edit" type="text" id="email"  value="' + value.email + '" disabled></li>\
        <li class="collection-item">' + '<i class="fa fa-phone"></i>' + '<input class="edit" type="text" id="phone"  value="' + value.phone + '" disabled></li>\
        <li class="address collection-item">' + '<strong>Adress</strong>' + '<ul>\
          <li class="collection-item">' + '<span>street: </span>' + '<input class="edit" type="text" id="street" value = "' + value.address.street + '" disabled></li>\
          <li class="collection-item">' + '<span>suite: </span>' + '<input class="edit" type="text" id="suite" value="' + value.address.suite + '" disabled></li>\
          <li class="collection-item">' + '<span>city: </span>' + '<input class="edit" type="text" id="city" value="' + value.address.city + '" disabled></li>\
          </ul>'+ '</li>\
        <li class="collection-item">' + '<strong>Company: </strong>' + '<input class="edit" type="text" id="company" value="' + value.company.name + '" disabled></li>\
        <button class="delete-btn waves-effect waves-light btn-small">Delete</button>\
        <button class="update-btn waves-effect waves-darken btn-small">Update</button>\
        <!--<button class="save-btn waves-effect waves-darken btn-small">Save</button>-->\
        </ul>'
    });
    document.querySelector('.staff').innerHTML = output;
  }

  // удаление карточки из DOM 
  document.body.addEventListener('click', removeList);
  function removeList(e) {
    var idCard = e.target.parentElement;
    // проверка условия по таргет
    if (e.target.classList.contains('delete-btn')) {
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
  const StorageCtrl = (function(){
    // Public methods
    return {
      updateItemStorage: function(updatedItem){
        let items = JSON.parse(localStorage.getItem('card'));
  
        items.forEach(function(item, index){
          if(updatedItem.id === item.id){
            items.splice(index, 1, updatedItem);
          }
        });
        localStorage.setItem('card', JSON.stringify(items));
      },
    }
  })();
  // update click
  document.body.addEventListener('click', itemEditClick);
  // item control
  const ItemCtrl = (function () {
    return {
      getItemById: function (id) {
        let found = null;
        myData.forEach(function (item) {
          if (item.id === id) {
            found = item;
          }
        });
        return found;
      },
      updateItem: function (name, email) {
        let found = null;

        myData.forEach(function (item) {
          if (item.id === myData.currentItem.id) {
            item.name = name;
            item.email = email;
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
    }
  })();
  // ui control 
  const UICtrl = (function () {
    const UISelectors = {
      itemNameInput: '#item-name',
      itemEmailInput: '#item-email',
      // itemPhoneInput: '#item-phone',
      // itempStreerInput: '#item-street',
      // itemSuiteInput: '#item-suite',
      // itemCityInput: '#item-city',
    }
    return {
      getItemInput: function () {
        return {
          name: document.querySelector(UISelectors.itemNameInput).value,
          email: document.querySelector(UISelectors.itemEmailInput).value
        }
      },
      addItemToForm: function () {
        document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
        document.querySelector(UISelectors.itemEmailInput).value = ItemCtrl.getCurrentItem().email;
      },
      getSelectors: function () {
        return UISelectors;
      },
      updateListItem: function(item){
        let listItems = document.querySelectorAll(UISelectors.listItems);
        // Turn Node list into array
        listItems = Array.from(listItems);
  
        listItems.forEach(function(listItem){
          const itemID = listItem.getAttribute('id');
  
          if(itemID === `item-${item.id}`){
            document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`;
          }
        });
      },
    }
  })();
  function itemEditClick(e) {
    if (e.target.classList.contains('update-btn')) {
      // получение id card элемента
      var cardId = e.target.parentElement.id;
      // из строки в число
      var id = parseInt(cardId);

      // получение элемента
      const itemToEdit = ItemCtrl.getItemById(id);
      // Get item
      console.log(itemToEdit)
      ItemCtrl.setCurrentItem(itemToEdit);
      // Add item to form
      UICtrl.addItemToForm();
      e.preventDefault();
    }
  }
  // Update item submit
  document.body.addEventListener('click', itemUpdateSubmit);
   function itemUpdateSubmit(e) {
    if (e.target.classList.contains('save-btn')) {
      console.log('test')
      // Get item input
      const input = UICtrl.getItemInput();

      // Update item
      const updatedItem = ItemCtrl.updateItem(input.name, input.email);

      // Update UI
      // UICtrl.updateListItem(updatedItem);

      // Update local storage
      // function updateItem(name, email) {
      //   let items = JSON.parse(localStorage.getItem('card'));
  
      //   items.forEach(function(item, index){
      //     if(updatedItem.id === item.id){
      //       items.splice(index, 1, updatedItem);
      //     }
      //   });
      //   localStorage.setItem('card', JSON.stringify(items));
      // }
      StorageCtrl.updateItemStorage(updatedItem);

      // UICtrl.clearEditState();

      e.preventDefault();
    }
  }
}
