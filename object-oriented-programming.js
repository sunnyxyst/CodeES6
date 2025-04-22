class Apple {
    color;
    weight;

    constructor(color, weight) {
        this.color = color;
        this.weight = weight;
    }

    peel() {
        console.log('사과를 깎았어요.')
    }

    eat() {
        console.log('사과를 먹었어요.')
    }
}

const myApple = new Apple('빨강', 150);
myApple.peel();
myApple.eat();