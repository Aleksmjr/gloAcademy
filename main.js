let title = 'my title';
let screens = 'Simple, Problem, Interactive';
let screenPrice = 10000;
let rollback = 70;
let fullPrice = 100000;
let adaptive = true;

// find data types (title, fullPrice, adaptive)
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

// find lenght of the string
console.log(screens.length);

// cost of layout
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);

// cost of development
console.log(`Стоимость разработки сайтов ${fullPrice} рублей`);

// turn string -> array with ', '
screens.split(', ');

// transform screens -> to lower case
console.log(screens.toLowerCase());

// find percentage of the amount
console.log(fullPrice * (rollback / 100));
