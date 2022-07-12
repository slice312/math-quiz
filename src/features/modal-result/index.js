import {gameSessionModel} from "/src/entities/game-session";


const open = (onClickPlayAgain) => {
    const modal = document.getElementById("modal-game-result");
    const content = document.getElementById("modal-order-container");
    modal.style.display = "block";
    setResultModalValues();

    const btnPlayAgain = document.getElementById("btn-play-again");
    btnPlayAgain.onclick = () => {
        content.classList.add("animate__zoomOut");

        content.onanimationstart = () => {
            modal.style.background = "transparent";
        };

        content.onanimationend = () => {
            modal.style.display = "none";
            content.classList.remove("animate__zoomOut");
            content.onanimationend = null;
        };

        onClickPlayAgain?.();
    };
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


export const ModalResult = {
    open
};