let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 2;
let fullPrice;
let allServicePrices;
let servicePercentPrices;
let service1;
let service2;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt('Как называется ваш проект?', 'Ваш проект');
  screens = prompt(
    'Какие типы экранов нужно разработать?',
    'Simple? Problem? Interactive?',
  );
  screenPrice = prompt('Сколько будет стоить данная работа?', '20000');
  while (!isNumber(screenPrice)) {
    screenPrice = prompt('Сколько будет стоить данная работа?', '20000');
  }
  adaptive = confirm('Нужен ли адаптив на сайте?');
};

const showTypeof = function (variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    let serviceName;
    if (i === 0) {
      serviceName = prompt('Какой доп тип услуги нужен?', 'Ремонт');
      service1 = serviceName; // Сохраняем название первой услуги
    } else if (i === 1) {
      serviceName = prompt('Какой доп тип услуги нужен?', 'Прочистка');
      service2 = serviceName; // Сохраняем название второй услуги
    }

    let price = prompt(`Сколько будет стоить услуга "${serviceName}"?`, '2000');
    while (!isNumber(price)) {
      price = prompt(
        `Введите корректную стоимость для услуги "${serviceName}":`,
        '2000',
      );
    }
    sum += +price; // Приводим к числу и добавляем к сумме
  }

  return sum; // Возвращаем общую сумму
};
function getFullPrice() {
  return screenPrice + allServicePrices;
}

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return 'Скидка в 10%';
  } else if (price >= 15000 && price < 30000) {
    return 'Скидка в 5%';
  } else if (price < 15000) {
    return 'Скидка не предусмотрена';
  } else {
    return 'Что-то пошло не так';
  }
};

function getTitle(title) {
  return title.trim()[0].toUpperCase() + title.trim().toLowerCase().slice(1);
}
function getServicePercentPrices() {
  return Math.ceil(fullPrice - fullPrice * (rollback / 100));
}
asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
title = getTitle(title);
servicePercentPrices = getServicePercentPrices();

showTypeof(title);
showTypeof(screenPrice);
showTypeof(adaptive);

console.log(getRollbackMessage(fullPrice));
