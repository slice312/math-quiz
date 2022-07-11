import {State} from "/src/state";
import {Utils} from "/src/utils";
import {Timer} from "/src/shared/lib/timer";
import {MathExGenerator} from "/src/shared/lib/math-ex-generator";
import {Api} from "/src/api";
import {ModalResult} from "./modal-result";



/** @type {Timer} */
let _timer;

/** @type {MathExGenerator} */
let _mathExGenerator;

/** @type {HTMLFormElement} */
let _expressionForm;


export const renderMainGameScreen = () => {
    _timer = getTimer();
    _mathExGenerator = new MathExGenerator();
    _expressionForm = document.getElementById("game-screen-task-form");
    renderStaticElements();
    startGame();
};

const renderStaticElements = () => {
    const playerLabel = document.getElementById("game-screen-player-name");
    playerLabel.textContent = State.playerName;

    const btnStopGame = document.getElementById("game-screen-btn-stop");
    btnStopGame.onclick = () => {
        _timer.stop();
    };
};

/**
 * @returns {Timer}
 */
const getTimer = () => {
    const timerLabel = document.getElementById("game-screen-timer-label");
    const circle = document.getElementById("game-screen-timer-circle");
    const perimeter = circle.getAttribute("r") * 2 * Math.PI;

    circle.setAttribute("stroke-dasharray", String(perimeter));

    const timer = new Timer();

    timer.onTick = (remainingSeconds, initSeconds) => {
        timeRemainingSet(remainingSeconds);
        circle.setAttribute("stroke-dashoffset",
            String(perimeter * remainingSeconds / initSeconds - perimeter));
    };

    const timeRemainingSet = (time) => {
        const minutes = Utils.String.padWithZero(Math.floor(time / 60), 2);
        const seconds = Utils.String.padWithZero(time % 60, 2);
        timerLabel.textContent = `${minutes}:${seconds}`;
    };

    timer.onComplete = () => {
        stopGame();
    };

    return timer;
};

const startGame = () => {
    resetState();
    _timer.start(15);

    let expr = nextExpression();
    _expressionForm.onsubmit = (e) => {
        e.preventDefault();

        if (_expressionForm.elements.result.value) {
            const answer = Number(_expressionForm.elements.result.value);
            if (answer === expr.result)
                handleTrueAnswer();
            else
                handleFalseAnswer();

            expr = nextExpression();
        }
    };
};

const stopGame = () => {
    ModalResult.open(() => startGame());
    saveGameResults();
};

const resetState = () => {
    State.level = 1;
    const labelLevel = document.getElementById("game-screen-level-label");
    labelLevel.textContent = String(State.level);

    State.score = 0;
    renderScoreLabel(false);

    State.correctCount = 0;
    State.incorrectCount = 0;
};

const nextExpression = () => {
    const animatedExprWrap = document.getElementById("game-screen-expr-wrap");
    animatedExprWrap.classList.add("animate__fadeOutLeft");

    window.requestAnimationFrame(() => {
        animatedExprWrap.classList.remove("animate__fadeOutLeft");
        _expressionForm.elements.result.value = "";
    });

    const expr = _mathExGenerator.generateExpression();
    renderExpression(expr);
    return expr;
};

/**
 * @param {object} expr
 */
const renderExpression = (expr) => {
    const leftOperand = document.getElementById("game-screen-ex-left");
    const operator = document.getElementById("game-screen-ex-op");
    const rightOperand = document.getElementById("game-screen-ex-right");

    leftOperand.textContent = expr.num1;
    operator.textContent = expr.operator;
    rightOperand.textContent = expr.num2;
};

const handleTrueAnswer = () => {
    State.score += 1;
    State.correctCount += 1;
    const labelPlusPoint = document.getElementById("game-screen-score-label-plus");

    labelPlusPoint.classList.add("label_lift-up");
    labelPlusPoint.onanimationend = () => {
        labelPlusPoint.classList.remove("label_lift-up");
        labelPlusPoint.onanimationend = null;
    };

    renderScoreLabel(false);
};

const handleFalseAnswer = () => {
    State.score = Math.max( State.score - 1, 0);
    State.incorrectCount += 1;

    const labelMinusPoint = document.getElementById("game-screen-score-label-minus");
    labelMinusPoint.classList.add("label_lift-up");
    labelMinusPoint.onanimationend = () => {
        labelMinusPoint.classList.remove("label_lift-up");
        labelMinusPoint.onanimationend = null;
    };

    renderScoreLabel(true);
};

/**
 * @param {boolean} withShakeUpdate - Применить анимацию shake при обновлении текста.
 */
const renderScoreLabel = (withShakeUpdate) => {
    if (withShakeUpdate) {
        const labelScore = document.getElementById("game-screen-score-label");
        labelScore.classList.add("animate__shakeX");
        labelScore.onanimationend = () => {
            labelScore.classList.remove("animate__shakeX");
            labelScore.onanimationend = null;
        };
    }

    const scoreLabel = document.getElementById("game-screen-score-value");
    scoreLabel.textContent = String(State.score);
};

const saveGameResults = async () => {
    const response = await Api.sendGameResult({
        name: State.playerName,
        mode: State.gameMode,
        score: State.score
    });
};