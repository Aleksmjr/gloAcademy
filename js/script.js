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
    appData.validateInputs();
    startBtn.addEventListener('click', () => {
      if (!startBtn.disabled) {
        appData.start();
      }
    });
    buttonPlus.addEventListener('click', () => {
      appData.addScreenBlock();
      appData.validateInputs();
    });
    document.addEventListener('input', appData.validateInputs);
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
    appData.screens = [];
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
    // заносим все наши экраны в переменную
    screens.length = appData.screens;
    console.log(appData.screens);
    document.querySelector('#total-count').value = appData.screens.length;
  },
  // функция 2

  // функция доп (метод )
  addPrices: function () {
    appData.screenPrice = 0;
    appData.ServicePricesNumber = 0;
    appData.ServicePricesPercent = 0;
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
    // c учетом отката посреднику
    appData.servicePercentPrices = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100),
    );
    document.querySelector('#total-count-rollback').value =
      appData.servicePercentPrices;
  },

  getServicePercentPrices: function () {},
  // функция 7
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrices);
    console.log(appData.screens);
    console.log(appData.services);
  },
  // проверка на заполненность инпутов
  validateInputs: function () {
    screens = document.querySelectorAll('.screen');
    let isValid = true;

    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      if (
        select.value === '' ||
        input.value.trim() === '' ||
        isNaN(input.value) ||
        +input.value <= 0
      ) {
        isValid = false;
      }
    });

    startBtn.disabled = !isValid;
  },
};
//выключаем изначально кнопку, чтобы не тыкать
startBtn.disabled = true;
// вешаем на инпут событие, которое при передвижении ползунка заносит в спан инпута значения
document
  .querySelector('.rollback [type="range"]')
  .addEventListener('input', function () {
    document.querySelector('.range-value').textContent = this.value;
    appData.rollback = this.value;
  });

appData.init();
