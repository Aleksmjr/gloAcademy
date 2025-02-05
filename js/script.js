let headers = document.getElementsByTagName('h1');
console.log(headers[0].textContent);

let buttons = document.getElementsByClassName('handler_btn');
let calculateButton = buttons[0]; // Кнопка "Рассчитать"
let resetButton = buttons[1]; // Кнопка "сброс"
console.log(calculateButton.textContent);
console.log(resetButton.textContent);

let btnPlus = document.querySelector('.screen-btn');
console.log(btnPlus);

// Элементы с классами 'other-items' и 'percent'
let otherItemsWithPercent = document.querySelectorAll('.other-items.percent');

// Элементы с классами 'other-items' и 'number'
let otherItemsWithNumber = document.querySelectorAll('.other-items.number');
let percentArray = Array.from(otherItemsWithPercent);
let numberArray = Array.from(otherItemsWithNumber);
console.log(percentArray);
console.log(numberArray);

let rangeInput = document.querySelector('.rollback input[type="range"]');
console.log(rangeInput);

let rangeValues = document.querySelector('.rollback span.range-value');
console.log(rangeValues);

let totalInputs = document.getElementsByClassName('total-input');

let input1 = totalInputs[0];
let input2 = totalInputs[1];
let input3 = totalInputs[2];
let input4 = totalInputs[3];
let input5 = totalInputs[4];

console.log(input1, input2, input3, input4, input5);

let screens = document.querySelectorAll('.screen');
console.log(screens);
screens = document.querySelectorAll('.new-screen'); //переопределяем?
console.log(screens);
