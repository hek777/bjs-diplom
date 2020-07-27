"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, callback => {
   if (callback) {
    location.reload();
   } else {
    userForm.setLoginErrorMessage('Неверный логин или пароль');
   }
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, callback => {
    if (callback === true) {
      location.reload();
    } else {
      console.log(callback);
      userForm.setRegisterErrorMessage('Такой пользователь существует!');
    }
  });
};