class Apple {
    color;
    weight;

    constructor(color, weight) {
        this.color = color;
        this.weight = weight;
    }
    // 데이터 가공 후 새로운 데이터를 반환,
    // private한 값을 반환
    // 함수처럼 사용하지만 변수를 키값으로 가져온다.
    get colorAndWeight() {
        return `${this.color}는(가) ${this.weight}g`;
    }
    // setter는 값을 새로 정의할 때
    // setter는 무조건 파라미터 값 설정이 필요
    set setColor(color) {
        this.color = color;
    }
}

const redApple = new Apple('빨간사과', 100);
console.log(redApple);
console.log(redApple.colorAndWeight);

redApple.setColor = '푸른사과';
console.log(redApple);

class Pear {
    #color; // private value (외부에서 엑세스 하지 못하는 값) ES7 지원
    weight;

    constructor(color, weight) {
        this.#color = color;
        this.weight = weight;
    }
    // 외부 엑세스가 불가능 private값을 getter를 이용해 값을 가져온다
    get color() {
        return this.#color;
    }

    set color(color) {
        this.#color = color;
    }
}

const greenPear = new Pear('노란배', 300);
console.log(greenPear);
console.log(greenPear.color);

greenPear.color = '푸른배';
console.log(greenPear.color);

// setter는 자주 사용하지 않는다.