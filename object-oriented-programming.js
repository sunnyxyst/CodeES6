class Apple {
    color;
    weight;
    // 생성자 - 클래스로 객체를 처음 생성시 자동실행되는 함수
    // (color, weight) 정보를 받아 
    // this.color, this.weight 라는 속성을 만들어준다.
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
// 호출방식인 new Apple로 정보가 전달되면 생성자 함수가 실행된다.
const myApple = new Apple('빨강', 150);
myApple.peel();
myApple.eat();