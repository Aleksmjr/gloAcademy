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
  title = prompt('Как называется ваш проект?', 'проект');
  screens = prompt(
    'Какие типы экранов нужно разработать?',
    'мелкие, средние, большие',
  );

  do {
    let anyPrice = prompt('Сколько будет стоить данная работа?');
    if (anyPrice === null) {
      screenPrice = 0;
      break;
    }
    screenPrice = parseFloat(anyPrice.trim());
  } while (!isNumber(screenPrice));

  adaptive = confirm('Нужен ли адаптив на сайте?');
};

const showTypeof = function (variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?', 'ремонт');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?', 'прочистка');
    }
    let price;
    do {
      let anyPrice = prompt('Сколько это будет стоить?');
      if (anyPrice === null) {
        price = 0;
        break;
      }
      price = parseFloat(anyPrice.trim());
    } while (!isNumber(price));
    sum += price;
  }
  return sum;
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
