// страница личного кабинета пользователя
const logout = new LogoutButton();

// выход из личного кабинета 
logout.action = function() {
   ApiConnector.logout(response => {
      if (response.success) location.reload();
   });
}

// получение информации о пользователе
ApiConnector.current(response => {
   if (response.success) {
      ProfileWidget.showProfile(response.data);
   }
})

// получение текущих курсов валюты
const ratesBoard = new RatesBoard();
function getValutes() {
   ApiConnector.getStocks(response => {
      if (response.success) {
         ratesBoard.clearTable();
         ratesBoard.fillTable(response.data);
      }
   })
}
getValutes();
const interval = setInterval(getValutes, 60000);

// операции с деньгами
const moneyManager = new MoneyManager();
   // пополнение баланса
moneyManager.addMoneyCallback = (data = {currency: null, amount: null}) => {
   ApiConnector.addMoney(data, (response) => {
      if (response.success) {
         ProfileWidget.showProfile(response.data);
         moneyManager.setMessage(true, `Счет пополнен на ${data.amount} ${data.currency}`);
      } 
      else {
         moneyManager.setMessage(false, response.data);
      }
   });
}
   // конвертирование валюты 
moneyManager.conversionMoneyCallback = (data = {fromCurrency: null, targetCurrency: null, fromAmount: null}) => {
   ApiConnector.convertMoney(data, (response) => {
      if (response.success) {
         ProfileWidget.showProfile(response.data);
         moneyManager.setMessage(true, `${data.fromAmount} ${data.fromCurrency} конвертированы в ${data.targetCurrency}`);
      } else {
         moneyManager.setMessage(false, response.data);
      }
   });
}
   // перевод валюты 
moneyManager.sendMoneyCallback = (data = {to: null, currency: null, amount: null}) => {
   ApiConnector.transferMoney(data, (response) => {
      if (response.success) {
         ProfileWidget.showProfile(response.data);
         moneyManager.setMessage(true, `Перевод ${data.amount} ${data.currency} пользователю ${data.to} выполнен`);
      } else {
         moneyManager.setMessage(false, response.data);
      }
   });
}

// работа с избранным
const favoritesWidget = new FavoritesWidget();
   // запрос начального списка избранного 
ApiConnector.getFavorites(response => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
})
   // добавление пользователя в список избранного 
favoritesWidget.addUserCallback = (data = {id: null, name: null}) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(true, `Пользователь ${data.name} добавлен в адресную книгу`);
    } else {
      favoritesWidget.setMessage(false, response.data);
    }  
  })
}
   // удаление пользователя из избранного 
favoritesWidget.removeUserCallback = (data = {id: null}) => {
   ApiConnector.removeUserFromFavorites(data, (response) => {
      if (response.success) {
         favoritesWidget.clearTable();
         favoritesWidget.fillTable(response.data);
         moneyManager.updateUsersList(response.data);
         favoritesWidget.setMessage(true, `Пользователь удален из адресной книги`);
      } else {
         favoritesWidget.setMessage(false, response.data);
      }  
   })
}