"use strict";

function form() {
  var message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так'
  };
  var form = document.querySelector('.main-form'),
      input = document.getElementsByTagName('input'),
      statusMessage = document.createElement('div');
  statusMessage.classList.add('status');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.appendChild(statusMessage);
    var request = new XMLHttpRequest();
    request.open('POST', 'server.php'); // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); THIS IS FOR USUAL FormData Php ms and the next string is JSON

    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    var formData = new formData(form);
    var obj = {};
    formData.forEach(function (value, key) {
      obj[key] = value;
    });
    var json = JSON.stringify(obj);
    request.send(obj); //formData , if its usual formData request

    request.addEventListener('readystatechange', function () {
      if (request.readyState < 4) {
        statusMessage.innerHTML = message.loading;
      } else if (request.readyState === 4 && request.status == 200) {
        statusMessage.innerHTML = message.success;
      } else {
        statusMessage.innerHTML = message.failure;
      }
    });

    for (var i = 0; i < input.length; i++) {
      input[i].value = '';
    }
  });
}

module.exports = form;