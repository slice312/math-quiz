import {State} from "/src/state";
import {Utils} from "/src/utils";
import {Timer} from "/src/js/components/timer";


export const renderMainGameScreen = () => {
    const playerLabel = document.getElementById("game-screen-player-name");
    playerLabel.textContent = State.playerName;
    initTimer(121);


    const expressionForm = document.getElementById("game-screen-task-form");
    expressionForm.onsubmit = (e) => e.preventDefault();


    const scoreLabel = document.getElementById("game-screen-score-label");

    let score = 0;
    const exprGenerator = new MathExGenerator();
    let expr = exprGenerator.generateExpression();
    loadExpression(expr);


    // TODO: на форм сабмит помнетяь
    expressionForm.onsubmit = (e) => {
        e.preventDefault();
        if (expressionForm.elements.result.value) {
            const answer = Number(expressionForm.elements.result.value);
            if (answer === expr.result) {
                // alert("красава");
                score += 1;
                State.score = score;

            } else {
                // alert("нет");
                score = Math.max(score - 1, 0);
                State.score = score;
            }

            const animatedExprWrap = document.getElementById("game-screen-expr-wrap");

            animatedExprWrap.classList.add("animate__fadeOutLeft");


            window.requestAnimationFrame(() => {

                animatedExprWrap.classList.remove("animate__fadeOutLeft");

                expressionForm.elements.result.value = "";
                expr = exprGenerator.generateExpression();
                loadExpression(expr);
            });

            scoreLabel.textContent = score;
        }
        console.log(expressionForm.elements.result.value);
    };
};


const loadExpression = (ex) => {
    const leftOperand = document.getElementById("game-screen-ex-left");
    const operator = document.getElementById("game-screen-ex-op");
    const rightOperand = document.getElementById("game-screen-ex-right");

    leftOperand.textContent = ex.num1;
    operator.textContent = ex.operator;
    rightOperand.textContent = ex.num2;
};


class MathExGenerator {
    operators = ["+", "-", "*"];
    #rightExResult;

    constructor() {
    }


    generateExpression() {
        const num1 = this.getRandom(1, 10);
        const num2 = this.getRandom(1, 10);
        const operator = this.operators[this.getRandom(0, 2)];
        const result = this.sum(num1, num2, operator);

        return {num1, num2, operator, result};
    }

    getRandom(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }


    sum(a, b, operator) {
        if (operator === '+') return a + b;
        if (operator === '-') return a - b;
        return a * b;
    }
}


const initTimer = (countdownSeconds) => {
    const timerLabel = document.getElementById("game-screen-timer-label");
    const circle = document.getElementById("game-screen-timer-circle");
    const perimeter = circle.getAttribute('r') * 2 * Math.PI;

    circle.setAttribute("stroke-dasharray", String(perimeter));


    const timer = new Timer();

    timer.onTick = (remainingTime) => {
        timeRemainingSet(remainingTime);
        circle.setAttribute("stroke-dashoffset",
            String(perimeter * remainingTime / countdownSeconds - perimeter));
    };

    const timeRemainingSet = (time) => {
        const minutes = Utils.String.padWithZero(Math.floor(time / 60), 2);
        const seconds = Utils.String.padWithZero(time % 60, 2);
        timerLabel.textContent = `${minutes}:${seconds}`;
    };

    timer.onComplete = () => {
        console.log("time over");
    };

    timer.start(countdownSeconds);
};




