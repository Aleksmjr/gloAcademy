const appData = {
  getElements: function () {
    this.title = document.getElementsByTagName('h1')[0].textContent;
    this.$otherItemsPercent = document.querySelectorAll('.other-items.percent');
    this.$otherItemsNumber = document.querySelectorAll('.other-items.number');
    this.$rollbackVal = document.querySelector('.rollback .range-value');
    this.$rollbackInput = document.querySelector('.rollback [type="range"]');
    this.$buttonStart = document.getElementsByClassName('handler_btn')[0];
    this.$buttonReset = document.getElementsByClassName('handler_btn')[1];
    this.$plus = document.querySelector('.screen-btn');
    this.$inputTotal = document.getElementsByClassName('total-input')[0];
    this.$inputTotalCount = document.getElementsByClassName('total-input')[1];
    this.$inputTotalCountOther =
      document.getElementsByClassName('total-input')[2];
    this.$inputTotalFullCount =
      document.getElementsByClassName('total-input')[3];
    this.$inputTotalCountRollback =
      document.getElementsByClassName('total-input')[4];
    this.$screensCollection = document.querySelectorAll('.screen');
    this.$select = document.querySelector('select');
    this.$screensInput = document.querySelector('.screen input[type="text"]');
    this.$checkboxes = document.querySelectorAll('input[type="checkbox"]');
    this.$totalInputs = document.querySelectorAll(
      '.main-total input[type="text"]',
    );
    this.screens = [];
    this.rollbackAmmount = 0;
    this.totalScreensPrice;
    this.totalScreensAmmount;
    this.fullPrice;
  },
  init: function () {
    this.getElements();

    this.$buttonStart.setAttribute('disabled', '');

    this.addEventListeners();

    // this.addTitle();
  },

  start: function () {
    this.addScreens();
    this.calcPrices();
    this.showResult();
  },

  validateInputs: function () {
    // перебираем элементы в screensCollection и по условию, если значения пустые, задаем кнопке значение enabled
    this.$screensCollection.forEach((screenItem) => {
      const select = screenItem.querySelector('select');
      const screensAmmountInput = screenItem.querySelector('input');
      if (
        select.value !== '' &&
        screensAmmountInput.value !== '' &&
        +screensAmmountInput.value !== 0
      ) {
        this.$buttonStart.removeAttribute('disabled');
        console.log('btn is enabled');
      } else {
        console.log('btn is disabled');
      }
    });
  },

  addEventListeners: function () {
    this.$screensCollection.forEach((screenItem) => {
      const select = screenItem.querySelector('select');
      const screensAmmountInput = screenItem.querySelector('input');
      // событие по select (инпуту) проверка валидации что тут, что ниже
      select.addEventListener('input', () => this.validateInputs());
      screensAmmountInput.addEventListener('input', () =>
        this.validateInputs(),
      );
    });
    // по клику на кнопку клонируем блоки (аддСкринБлок)
    this.$plus.addEventListener('click', () => this.addScreenBlock());
    // записываем % отката в rollbackVal (span)
    // this.$rollbackInput.addEventListener('input', (event) => {
    //   this.$rollbackVal.textContent = event.target.value + `%`;
    // });
    this.$buttonStart.addEventListener('click', (e) => {
      this.start();
      e.target.style.display = 'none';
      this.$buttonReset.style.display = 'block';
      this.$plus.setAttribute('disabled', '');

      // console.log(document.querySelectorAll('input:not([disabled])'));
      this.disabledInputs = document.querySelectorAll(
        'input:not([disabled]):not([type="range"])',
      );
      this.disabledInputs.forEach((el) => {
        el.setAttribute('disabled', '');
      });
    });
    this.$buttonReset.addEventListener('click', (e) => {
      this.reset();
      this.disabledInputs.forEach((el) => {
        el.removeAttribute('disabled');
      });
      e.target.style.display = 'none';
      this.$buttonStart.style.display = 'block';
    });
    // инпут в реалиях
    this.$rollbackInput.addEventListener('input', (event) => {
      // Получаем текущее значение ползунка
      this.rollbackAmmount = event.target.value;

      // Обновляем текст рядом с ползунком
      this.$rollbackVal.textContent = this.rollbackAmmount + '%';

      // Пересчитываем итоговую стоимость с учетом отката
      if (this.totalScreensPrice !== undefined) {
        this.fullPrice =
          this.totalScreensPrice +
          (this.totalCountOther || 0) -
          (this.totalScreensPrice + (this.totalCountOther || 0)) *
            (this.rollbackAmmount / 100);

        // Обновляем поле "Стоимость с учетом отката"
        this.$inputTotalCountRollback.value = this.fullPrice;
      }
    });
  },

  reset: function () {
    this.$screensCollection.forEach((item, index) => {
      if (index === 0) {
        item.querySelector('select').value = '';
        item.querySelector('input').value = '';
        return;
      }
      item.remove();
    });

    this.$inputTotal.value = 0;
    this.$inputTotalFullCount.value = 0;
    this.$inputTotalCount.value = 0;
    this.$inputTotalCountRollback.value = 0;
    this.$rollbackInput.value = 0;
    this.$rollbackVal.textContent = '0%';
    this.screens = [];
    this.$checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    this.$inputTotalCountOther.value = 0;
  },

  addScreens: function () {
    this.$screensCollection.forEach((screenItem, screenIndex) => {
      const select = screenItem.querySelector('select');
      const screensAmmountInput = screenItem.querySelector('input');
      // Добрались до textContent (имя экранов)
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: screenIndex,
        name: selectName,
        ammount: +screensAmmountInput.value,
        price: +select.value * +screensAmmountInput.value,
      });
    });
    console.log(this.$inputTotal);
  },
  calcPrices: function () {
    // весь подсчет сюда (total = сумма всех прайс)
    this.totalScreensPrice = this.screens.reduce(
      (acc, el) => acc + el.price,
      0,
    );

    this.totalScreensAmmount = this.screens.reduce(
      (acc, el) => acc + el.ammount,
      0,
    );

    // Переменная для хранения стоимости доп. услуг
    let additionalServicesPrice = 0;

    // Обрабатываем чекбоксы с процентами (класс percent)
    this.$otherItemsPercent.forEach((el) => {
      const checkbox = el.querySelector('input[type="checkbox"]'); // Находим чекбокс
      const input = el.querySelector('input[type="text"]'); // Находим инпут

      // Если чекбокс отмечен и есть инпут
      if (checkbox.checked && input) {
        additionalServicesPrice += this.totalScreensPrice * (input.value / 100); // Добавляем процент от общей суммы
      }
    });

    // Обрабатываем чекбоксы с числами (класс number)
    this.$otherItemsNumber.forEach((el) => {
      const checkbox = el.querySelector('input[type="checkbox"]'); // Находим чекбокс
      const input = el.querySelector('input[type="text"]'); // Находим инпут

      // Если чекбокс отмечен и есть инпут
      if (checkbox.checked && input) {
        additionalServicesPrice += parseFloat(input.value);
      }
    });

    // Записываем стоимость доп. услуг
    this.totalCountOther = additionalServicesPrice;

    // Итоговая стоимость с учетом отката
    this.fullPrice =
      this.totalScreensPrice + // Общая стоимость верстки
      (this.totalCountOther || 0) - // Стоимость доп. услуг
      (this.totalScreensPrice + (this.totalCountOther || 0)) *
        (this.rollbackAmmount / 100);
  },
  showResult: function () {
    // записывать итоговую стоимость
    this.$inputTotal.value = this.totalScreensPrice;
    this.$inputTotalFullCount.value =
      this.totalScreensPrice + this.totalCountOther; // Итоговая стоимость с учетом доп. услуг
    this.$inputTotalCount.value = this.totalScreensAmmount;
    this.$inputTotalCountOther.value = this.totalCountOther; // Стоимость доп. услуг
    this.$inputTotalCountRollback.value = this.fullPrice;
  },
  addScreenBlock: function () {
    // присваем КлонСкрину свойство клонирования (true - клонируем дочерние эл. тоже)
    const cloneScreen = this.$screensCollection[0].cloneNode(true);
    //обнуляем значения инпутов в склонированном блоке, потому что они клонируются с введенными данными изначально!
    cloneScreen.querySelector('select').value = '';
    cloneScreen.querySelector('input').value = '';
    // обращаемся к прерыдущему блоку и после клонируем такой же еще один
    this.$screensCollection[this.$screensCollection.length - 1].after(
      cloneScreen,
    );
    // перезаписываем НОДУ, это из-за (querySelectorAll - который выводит Ноду)
    this.$screensCollection = document.querySelectorAll('.screen');
    // проверка на валидацию у каждого элемента screenCollection (инпуты наши)
    this.$screensCollection.forEach((screenItem) => {
      const select = screenItem.querySelector('select');
      const screensAmmountInput = screenItem.querySelector('input');

      select.addEventListener('input', () => this.validateInputs());
      screensAmmountInput.addEventListener('input', () =>
        this.validateInputs(),
      );
    });
    this.validateInputs();
  },
};

appData.init();
