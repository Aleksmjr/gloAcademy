const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');
const inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  ServicePricesPercent: 0,
  ServicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrices: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function () {
    appData.addTitle();

    startBtn.addEventListener('click', appData.start);
    buttonPlus.addEventListener('click', appData.addScreenBlock);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  // функция 1
  start: function () {
    appData.addScreens();
    appData.addServices();
    // appData.getServicePercentPrices() по дз
    appData.addPrices();
    appData.showResult();
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value =
      appData.ServicePricesPercent + appData.ServicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
  },
  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen);
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach(function (screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
  },
  // функция 2

  // функция доп (метод )
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }
    for (let key in appData.servicesNumber) {
      appData.ServicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPercent) {
      appData.ServicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }
    appData.fullPrice =
      +appData.screenPrice +
      appData.ServicePricesNumber +
      appData.ServicePricesPercent;
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

appData.init();
