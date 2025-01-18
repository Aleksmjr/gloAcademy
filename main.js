let title = prompt('Как называется ваш проект?', 'Ваш проект');
let screens = prompt(
  'Какие типы экранов нужно разработать?',
  'Simple? Problem? Interactive?',
);
let screenPrice = +prompt('Сколько будет стоить данная работа?', '20000');
let rollback = 2;
let adaptive = alert('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой доп тип услуги нужен?', 'Ремонт');
let servicePrice1 = +prompt('Сколько это будет стоить?', '2000');
let service2 = prompt('Какой доп тип услуги нужен?', 'Прочистка');
let servicePrice2 = +prompt('Сколько это будет стоить?', '1600');

// price full job
let fullPrice = screenPrice + servicePrice1 + servicePrice2;

// percentage to the intermediary
let persentageAmount = fullPrice * (rollback / 100);

// final sum with percent my ontermediary
let servicePercentPrice = fullPrice - persentageAmount;

// added in console servicePercentPrice around
console.log(Math.ceil(servicePercentPrice));

// full price in consol log
console.log(`Цена за работу ${fullPrice}`);

if (fullPrice >= 30000) {
  console.log('Скидка в 10%');
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log('Скидка в 5%');
} else if (fullPrice < 15000) {
  console.log('Скидка не предусмотрена');
} else {
  console.log('Что то пошло не так');
}
