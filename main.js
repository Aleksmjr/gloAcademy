const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrices: 0,
  services: {},
  // функция 1
  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();
    appData.logger();
  },
  // функция 2
  asking: function () {
    do {
      appData.title = prompt(
        'Как называется ваш проект?',
        'Этерниал какой-нибудь',
      );
    } while (isNumber(appData.title) || appData.title === null);

    for (let i = 0; i < 2; i++) {
      let name;
      do {
        name = prompt('Какие типы экранов нужно разработать?', 'Сложные?');
        // Проверка на ввод только цифр
        if (isNumber(name)) {
          alert('Название не может состоять только из цифр. Введите строку!');
        }
      } while (isNumber(name) || name === null); // Цикл повторяется, если введены только цифры или null

      let price = 0;
      do {
        price = prompt('Сколько будет стоить данная работа?', '20000');
      } while (!isNumber(price)); // Цикл повторяется, если введено не число

      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name;
      do {
        name = prompt('Какой доп тип услуги нужен?', 'Верстка');
        if (isNumber(name)) {
          alert('Название не может состоять только из цифр. Введите строку!');
        }
      } while (isNumber(name) || name === null);

      let price = 0;
      do {
        price = prompt(`Сколько это будет стоить?`, '2000');
      } while (!isNumber(price));
      let key = name;
      let counter = 1;
      while (appData.services.hasOwnProperty(key)) {
        key = `${name}_${counter}`;
        counter++;
      }
      appData.services[key] = +price;
    }
    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },
  // функция доп (метод )
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (total, screen) {
      return total + +screen.price;
    }, 0);
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
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
  // функция 4
  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
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
    appData.servicePercentPrices = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100),
    );
  },
  // функция 7
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrices);
    console.log(appData.screens);
    console.log(appData.services);
  },
};
//

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

appData.start();
