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
const selectAll = document.querySelector('select');
const inputAll = document.querySelector('input[type="text"]');
const checkAll = document.querySelector('input[type=checkbox]');

let screens = document.querySelectorAll('.screen');

// Флаг, отслеживающий, что расчет уже произведён
let calculationDone = false;

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
    this.addTitle();
    this.validateInputs();
    startBtn.addEventListener('click', () => {
      if (!this.disabled) {
        this.start();
        calculationDone = true;
      }
    });
    buttonPlus.addEventListener('click', () => {
      this.addScreenBlock();
      this.validateInputs();
    });
    document.addEventListener('input', this.validateInputs);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  // функция 1
  start: function () {
    this.addScreens();
    this.addServices();
    // this.getServicePercentPrices() по дз
    this.addPrices();
    this.showResult();
    this.blockButtons();
    this.reset();
  },
  reset: function () {
    this.btnReset();
  },
  btnReset: function () {
    resetBtn.addEventListener('click', (event) => {
      // Блокируем инпуты и селекты в блоках экранов
      screens.forEach((screen, index) => {
        if (selectAll) selectAll.disabled = false;
        if (inputAll) inputAll.disabled = false;

        selectAll.selectedIndex = 0;
        inputAll.value = '';
      });

      // Блокируем чекбоксы и инпуты в блоках дополнительных услуг
      otherItemsPercent.forEach(() => {
        if (checkAll) checkAll.disabled = false;
        if (inputAll) inputAll.disabled = false;

        checkAll.checked = false;
        inputAll.value = '';
      });

      otherItemsNumber.forEach(() => {
        if (checkAll) checkAll.disabled = false;
        if (inputAll) inputAll.disabled = false;

        checkAll.checked = false;
        inputAll.value = '';
      });
      this.screens.forEach((screen, index) => {
        if (index !== 0) {
          screen.remove();
        }
      });
      this.screens = [];
      this.servicesPercent = {};
      this.servicesNumber = {};
      this.screenPrice = 0;
      this.ServicePricesPercent = 0;
      this.ServicePricesNumber = 0;
      this.fullPrice = 0;
      this.servicePercentPrices = 0;
      calculationDone = false;

      // Очищаем итоговые поля
      total.value = '';
      totalCount.value = '';
      totalCountOther.value = '';
      fullTotalCount.value = '';
      totalCountRollback.value = '';
      // Блокируем кнопку "Рассчитать"
      startBtn.disabled = false;
      resetBtn.style.display = 'none';
      startBtn.style.display = 'block';
    });
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value =
      this.ServicePricesPercent + this.ServicePricesNumber;
    fullTotalCount.value = this.fullPrice;
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen);
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    this.screens = [];
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
    // заносим все наши экраны в переменную
    screens.length = this.screens;
    console.log(this.screens);
    document.querySelector('#total-count').value = this.screens.length;
  },
  // функция 2

  // функция доп (метод )
  addPrices: function () {
    this.screenPrice = 0;
    this.ServicePricesNumber = 0;
    this.ServicePricesPercent = 0;
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }
    for (let key in this.servicesNumber) {
      this.ServicePricesNumber += this.servicesNumber[key];
    }
    for (let key in this.servicesPercent) {
      this.ServicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice =
      +this.screenPrice + this.ServicePricesNumber + this.ServicePricesPercent;
    // c учетом отката посреднику
    this.servicePercentPrices = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100),
    );
    document.querySelector('#total-count-rollback').value =
      this.servicePercentPrices;
  },

  // проверка на заполненность инпутов
  validateInputs: () => {
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
  // блокировка левой секции (с помощью чата ГПТ, к сожалению)
  blockButtons: function () {
    // Блокируем инпуты и селекты в блоках экранов
    screens.forEach((screen) => {
      if (selectAll) selectAll.disabled = true;
      if (inputAll) inputAll.disabled = true;
    });

    // Блокируем чекбоксы и инпуты в блоках дополнительных услуг
    otherItemsPercent.forEach((item) => {
      if (checkAll) checkAll.disabled = true;
      if (inputAll) inputAll.disabled = true;
    });

    otherItemsNumber.forEach((item) => {
      if (checkAll) checkAll.disabled = true;
      if (inputAll) inputAll.disabled = true;
    });

    // Блокируем кнопку "Рассчитать"
    startBtn.disabled = true;
    startBtn.style.display = 'none';
    resetBtn.style.display = 'block';
  },
};
//выключаем изначально кнопку, чтобы не тыкать
startBtn.disabled = true;
// вешаем на инпут событие, которое при передвижении ползунка заносит в спан инпута значения и если расчет уже был произведен, то оно пересчитывает его в режиме реального времени
document
  .querySelector('.rollback [type="range"]')
  .addEventListener('input', function () {
    document.querySelector('.range-value').textContent = this.value;
    appData.rollback = this.value;
    if (calculationDone) {
      appData.servicePercentPrices = Math.ceil(
        appData.fullPrice - appData.fullPrice * (appData.rollback / 100),
      );
      document.querySelector('#total-count-rollback').value =
        appData.servicePercentPrices;
    }
  });

appData.init();
