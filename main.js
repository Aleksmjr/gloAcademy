class First {
  constructor() {}
  hello() {
    console.log('Я метод родителя');
  }
}
class Second extends First {
  hello() {
    super.hello();
    console.log('Я наследуемый метод');
  }
}

const firstSecond = new Second();
firstSecond.hello();
