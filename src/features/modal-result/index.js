import {gameSessionModel} from "/src/entities/game-session";
import {DomLoader} from "/src/shared/lib/dom-loader";
import {layout} from "./ui";


const open = (onClickPlayAgain) => {
    render();
    setResultModalValues();
    setHandlers(onClickPlayAgain);
};

const render = () => {
    const htmlTemplate = DomLoader.renderElement(layout());
    DomLoader.addElement(htmlTemplate.body.firstChild);
};


const setResultModalValues = () => {
    const outputElements = {
        level: document.getElementById("modal-game-result-level"),
        score: document.getElementById("modal-game-result-score"),
        correct: document.getElementById("modal-game-result-correct-count"),
        incorrect: document.getElementById("modal-game-result-incorrect-count")
    };

    const {state} = gameSessionModel;
    outputElements.level.textContent = String(state.level);
    outputElements.score.textContent = String(state.score);
    outputElements.correct.textContent = String(state.correctCount);
    outputElements.incorrect.textContent = String(state.incorrectCount);
};


const setHandlers = (onClickPlayAgain) => {
    const modal = document.getElementById("modal-game-result");
    const content = document.getElementById("modal-order-container");

    const btnPlayAgain = document.getElementById("btn-play-again");
    btnPlayAgain.onclick = () => {
        content.classList.add("animate__zoomOut");

        content.onanimationstart = () => {
            modal.style.background = "transparent";
        };

        content.onanimationend = () => {
            modal.remove();
            content.classList.remove("animate__zoomOut");
            content.onanimationend = null;
        };

        onClickPlayAgain?.();
    };
};

export const ModalResult = {
    open
};