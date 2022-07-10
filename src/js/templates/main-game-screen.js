import {State} from "/src/state";
import {Utils} from "/src/utils";
import {Timer} from "/src/js/components/timer";
import {AppRouter} from "../../shared/routing/app-router";


export const renderMainGameScreen = () => {
    const playerLabel = document.getElementById("game-screen-player-name");
    playerLabel.textContent = State.playerName;
    initTimer(15);


    const expressionForm = document.getElementById("game-screen-task-form");
    expressionForm.onsubmit = (e) => e.preventDefault();


    const scoreLabel = document.getElementById("game-screen-score-label");

    const exprGenerator = new MathExGenerator();
    let expr = exprGenerator.generateExpression();
    loadExpression(expr);

    State.score = 0;
    State.correctCount = 0;
    State.incorrectCount = 0;

    // TODO: на форм сабмит помнетяь
    expressionForm.onsubmit = (e) => {
        e.preventDefault();
        if (expressionForm.elements.result.value) {
            const answer = Number(expressionForm.elements.result.value);
            if (answer === expr.result) {
                // alert("красава");
                State.score += 1;
                State.correctCount += 1;

            } else {
                // alert("нет");
                State.score = Math.max( State.score - 1, 0);
                State.incorrectCount += 1;

            }

            const animatedExprWrap = document.getElementById("game-screen-expr-wrap");

            animatedExprWrap.classList.add("animate__fadeOutLeft");


            window.requestAnimationFrame(() => {

                animatedExprWrap.classList.remove("animate__fadeOutLeft");

                expressionForm.elements.result.value = "";
                expr = exprGenerator.generateExpression();
                loadExpression(expr);
            });

            scoreLabel.textContent = State.score;
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
        openResultModal();
    };


    timer.start(countdownSeconds);
};


const openResultModal = () => {
    const modal = document.getElementById("modal-game-result");
    const content = document.getElementById("modal-order-container");
    modal.style.display = "block";
    setResultModalValues();

    const agaon = document.getElementById("btn-play-again");
    agaon.onclick = () => {
        content.classList.add("animate__zoomOut");
        content.onanimationstart = () => {
            modal.style.background = "transparent";
        };

        content.onanimationend = () => {
            modal.style.display = "none";
            content.classList.remove("animate__zoomOut");
            AppRouter.navigate("./main-game-screen");
        };
    };
};


const setResultModalValues = () => {
    const outputElements = {
        level: document.getElementById("modal-game-result-level"),
        score: document.getElementById("modal-game-result-score"),
        correct: document.getElementById("modal-game-result-correct-count"),
        incorrect: document.getElementById("modal-game-result-incorrect-count")
    };

    // debugger
    outputElements.level.textContent = String(State.level);
    outputElements.score.textContent = String(State.score);
    outputElements.correct.textContent = String(State.correctCount);
    outputElements.incorrect.textContent = String(State.incorrectCount);
};

