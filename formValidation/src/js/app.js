window.onload = function () {
	// Валидация
	document.getElementById('name').addEventListener('blur', validateName);
	document.getElementById('email').addEventListener('blur', validateEmail);
	document.getElementById('phone').addEventListener('blur', validatePhone);
	document.getElementById('street').addEventListener('blur', validateStreet);
	document.getElementById('suite').addEventListener('blur', validateSuite);
	document.getElementById('city').addEventListener('blur', validateCity);
	document.getElementById('company').addEventListener('blur', validateCompany);
	// Проверка формы на заполнение
	document.getElementById('submit').addEventListener('click', validateForm);
	function validateForm() {
		if (!validateName() && !validateEmail() && !validatePhone() && !validateStreet() && !validateSuite() && !validateCity() && !validateCompany()) {
			createAlertMessage('Please fill in all fields', 'error alert-red');
		} else {
			createAlertMessage('OK', 'success alert-green');
			// Очистка полей
			document.getElementById('name').value = '';
			document.getElementById('email').value = '';
			document.getElementById('phone').value = '';
			document.getElementById('street').value = '';
			document.getElementById('suite').value = '';
			document.getElementById('city').value = '';
			document.getElementById('company').value = '';
			// Удаление класса
			const inputs = document.querySelectorAll('.validate');
			for (let i = 0; i < inputs.length; i++) {
				inputs[i].classList.remove('valid');
			}
		}
	}
	// Notification
	function createAlertMessage(message, className) {
		const div = document.createElement('div');
		div.className = `alert ${className}`;
		div.appendChild(document.createTextNode(message));
		const form = document.querySelector('#basic-form');

		form.appendChild(div);

		//TimeOut after 3sec 
		setTimeout(function () {
			document.querySelector('.alert').remove();
		}, 3000);
	}


	function validateName() {
		const name = document.getElementById('name');
		const re = /^[a-zA-Z ]{5,20}$/;
		if (!re.test(name.value)) {
			name.classList.add('invalid');
			return false;
		} else {
			name.classList.remove('invalid');
			return true;
		}
	}

	function validateEmail() {
		const email = document.getElementById('email');
		const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
		if (!re.test(email.value)) {
			email.classList.add('invalid');
			return false;
		} else {
			email.classList.remove('invalid');
			return true;
		}
	}

	function validatePhone() {
		const phone = document.getElementById('phone');
		const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
		if (!re.test(phone.value)) {
			phone.classList.add('invalid');
			return false;

		} else {
			phone.classList.remove('invalid');
			return true;

		}
	}

	function validateStreet() {
		const street = document.getElementById('street');
		const re = /^[a-zA-Z0-9 .-]/;
		if (!re.test(street.value)) {
			street.classList.add('invalid');
			return false;

		} else {
			street.classList.remove('invalid');
			return true;

		}
	}

	function validateSuite() {
		const suite = document.getElementById('suite');
		const re = /^[a-zA-Z0-9 .-]/;
		if (!re.test(suite.value)) {
			suite.classList.add('invalid');
			return false;
		} else {
			suite.classList.remove('invalid');
			return true;
		}
	}

	function validateCity() {
		const city = document.getElementById('city');
		const re = /^[a-zA-Z0-9 .-]/;
		if (!re.test(city.value)) {
			city.classList.add('invalid');
			return false;
		} else {
			city.classList.remove('invalid');
			return true;
		}
	}

	function validateCompany() {
		const company = document.getElementById('company');
		const re = /^[a-z ]/i;
		if (!re.test(company.value)) {
			company.classList.add('invalid');
			return false;
		} else {
			company.classList.remove('invalid');
			return true;
		}
	}
}