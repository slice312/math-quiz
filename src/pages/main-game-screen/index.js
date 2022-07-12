import {GameMode} from "/src/shared/constants";
import {gameSessionModel} from "/src/entities/game-session";
import {Utils} from "/src/shared/lib/uitls";
import {Timer} from "/src/shared/lib/timer";
import {MathExGenerator} from "/src/shared/lib/math-ex-generator";
import {Api} from "/src/shared/api";
import {ModalResult} from "/src/features/modal-result";


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
    playerLabel.textContent = gameSessionModel.state.playerName;

    const btnStopGame = document.getElementById("game-screen-btn-stop");
    btnStopGame.onclick = () => {
        if (_timer) {
            _timer.onComplete = null;
            _timer.stop();
        }
        stopGame();
    };

    const timerElement = document.getElementById("game-screen-timer");
    if (gameSessionModel.state.gameMode === GameMode.Practice)
        timerElement.style.display = "none";
    else
        timerElement.style.display = "block";
};

/**
 * @returns {Timer}
 */
const getTimer = () => {
    if (gameSessionModel.state.gameMode === GameMode.Practice)
        return null;

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
    _timer?.start(90);

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
    void saveGameResults();
};

const resetState = () => {
    gameSessionModel.state.level = 1;
    const labelLevel = document.getElementById("game-screen-level-label");
    labelLevel.textContent = String(gameSessionModel.state.level);

    gameSessionModel.state.score = 0;
    renderScoreLabel(false);

    gameSessionModel.state.correctCount = 0;
    gameSessionModel.state.incorrectCount = 0;
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
    gameSessionModel.state.score += 1;
    gameSessionModel.state.correctCount += 1;
    const labelPlusPoint = document.getElementById("game-screen-score-label-plus");

    labelPlusPoint.classList.add("label_lift-up");
    labelPlusPoint.onanimationend = () => {
        labelPlusPoint.classList.remove("label_lift-up");
        labelPlusPoint.onanimationend = null;
    };

    renderScoreLabel(false);
};

const handleFalseAnswer = () => {
    gameSessionModel.state.score = Math.max(gameSessionModel.state.score - 1, 0);
    gameSessionModel.state.incorrectCount += 1;

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
    scoreLabel.textContent = String(gameSessionModel.state.score);
};

const saveGameResults = async () => {
    const response = await Api.sendGameResult({
        name: gameSessionModel.state.playerName,
        mode: gameSessionModel.state.gameMode,
        level: gameSessionModel.state.level,
        score: gameSessionModel.state.score,
    });
};