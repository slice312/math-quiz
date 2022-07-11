import {State} from "/src/state";


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

    // debugger
    outputElements.level.textContent = String(State.level);
    outputElements.score.textContent = String(State.score);
    outputElements.correct.textContent = String(State.correctCount);
    outputElements.incorrect.textContent = String(State.incorrectCount);
};

export const ModalResult = {
    open
};