const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrices: 0,
  service1: '',
  service2: '',
  // функция 1
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrices = appData.getServicePercentPrices();
    appData.getTitle();
    appData.logger();
  },
  // функция 2
  asking: function () {
    appData.title = prompt('Как называется ваш проект?', 'Ваш проект');
    appData.screens = prompt(
      'Какие типы экранов нужно разработать?',
      'Simple? Problem? Interactive?',
    );
    do {
      appData.screenPrice = prompt(
        'Сколько будет стоить данная работа?',
        '20000',
      );
    } while (!isNumber(appData.screenPrice));
    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },
  // Функция 2
  getRollbackMessage: function () {
    if (appData.fullPrice >= 30000) {
      return 'Скидка в 10%';
    } else if (appData.fullPrice >= 15000 && appData.fullPrice < 30000) {
      return 'Скидка в 5%';
    } else if (appData.fullPrice < 15000) {
      return 'Скидка не предусмотрена';
    } else {
      return 'Что-то пошло не так';
    }
  },
  // функция 3
  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      let price = 0;
      if (i === 0) {
        appData.service1 = prompt('Какой доп тип услуги нужен?', 'Ремонт');
      } else if (i === 1) {
        appData.service2 = prompt('Какой доп тип услуги нужен?', 'Прочистка');
      }
      do {
        price = prompt(`Сколько это будет стоить?`, '2000');
      } while (!isNumber(price));
      sum += +price; // Приводим к числу и добавляем к сумме
    }

    return sum; // Возвращаем общую сумму
  },
  // функция 4
  getFullPrice: function () {
    return +appData.screenPrice + appData.allServicePrices;
  },
  // функция 5
  getTitle: function () {
    return (
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substr(1).toLowerCase()
    );
  },
  // функция 6
  getServicePercentPrices: function () {
    return Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100),
    );
  },
  // функция 7
  logger: function () {
    for (let key in appData) {
      console.log(key);
    }
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrices);
  },
};
//

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

appData.start();
