"use strict"

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(callback => {
        if (callback) {
            location.reload(true);
        }
    });
};

ApiConnector.current(callback => {
    if (callback) {
        ProfileWidget.showProfile(callback.data);
    };
});



const ratesBoard = new RatesBoard();

let getRatesBoard = () => {
    ApiConnector.getStocks(callback => {
        if (callback) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(callback.data);
        }
    });
};

getRatesBoard();
setInterval(getRatesBoard, 60000);



const balance = new MoneyManager();

balance.addMoneyCallback = data => {
    ApiConnector.addMoney(data, callback => {
        if (callback) {
            ProfileWidget.showProfile(callback.data);
          balance.setMessage(false, `Ваш счет пополнен`);
      } else {
            balance.setMessage(true, `Не удалось поплнить счет`);
        };
   });
};

balance.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, callback => {
        if (callback) {
            ProfileWidget.showProfile(callback.data);
          balance.setMessage(false, `Конвертация прошла успешно`);
      } else {
            balance.setMessage(true, `Не удалось конвертировать средства`);
        };
    });
};

balance.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, callback => {
        if (callback) {
            ProfileWidget.showProfile(callback.data);
          balance.setMessage(false, `Перевод успешно выполнен`);
      } else {
            balance.setMessage(true, `Перевод не выполнен`);
        };
    });
};


const widget = new FavoritesWidget();

ApiConnector.getFavorites(callback => {
    if (callback) {
        widget.clearTable();
        widget.fillTable(callback.data);
        balance.updateUsersList(callback.data);
    };
});


widget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, callback => {
        if (callback) {
            widget.clearTable();
            widget.fillTable(data);
            balance.updateUsersList(data);
            widget.setMessage(false, `Пользователь добавлен`);
        } else {
            widget.setMessage(true, `Не удалось добавить пользователя`);
        };
    });
};

widget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, callback => {
        if (callback) {
            widget.clearTable();
            widget.fillTable(data);
            balance.updateUsersList(data);
            widget.setMessage(false, `Пользователь удален`);
        } else {
            widget.setMessage(true, `Не удалось удалить пользователя`);
        };
    });
};



