// страница входа и регистрации
'use strict'

const loginForm = new UserForm();

// авторизация пользователя
loginForm.loginFormCallback = function(data = {login: null, password: null}) {
   // запрос на сервер для попытки авторизации
   ApiConnector.login(data, (response) => {
      if (response.success) {
         location.reload(); // успешная авторизация - обновление страницы
      } else {
         // alert(response.data);
         alert('Неверный логин или пароль'); // вывод ошибки
      }
   })
};

// регистрация пользователя
loginForm.registerFormCallback = function(data = {login: null, password: null}) {
   // запрос на сервер для регистрации
   ApiConnector.register(data, (response) => {
      if (response.success) {
         location.reload(); // успешная авторизация - обновление страницы
      } else {
         // alert(response.data);
         alert('Ошибка регистрации. Попробуйте снова'); // вывод ошибки
      }
   })
};