let title = prompt('Как называется ваш проект?', 'Ваш проект');
let screens = prompt(
  'Какие типы экранов нужно разработать?',
  'Simple? Problem? Interactive?',
);
let screenPrice = +prompt('Сколько будет стоить данная работа?', '20000');
let rollback = 2;
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой доп тип услуги нужен?', 'Ремонт');
let servicePrice1 = +prompt('Сколько это будет стоить?', '2000');
let service2 = prompt('Какой доп тип услуги нужен?', 'Прочистка');
let servicePrice2 = +prompt('Сколько это будет стоить?', '1600');

const showTypeof = function (variable) {
  console.log(variable, typeof variable);
};

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
console.log(getRollbackMessage(fullPrice));

showTypeof(title);
showTypeof(screenPrice);
showTypeof(adaptive);

//1)
let getAllServicePrices = function () {
  return servicePrice1 + servicePrice2;
};
let allServicePrices = getAllServicePrices();

//2)
function getFullPrice(screenPrice, allServicePrices) {
  return screenPrice + allServicePrices;
}

let fullPrice = getFullPrice(screenPrice, allServicePrices);

//3)
function getTitle(title) {
  return title.trim()[0].toUpperCase() + title.trim().toLowerCase().slice(1);
}

title = getTitle(title);

//4)
function getServicePercentPrices() {
  return Math.ceil(fullPrice - fullPrice * (rollback / 100));
}
let servicePercentPrices = getServicePercentPrices();
