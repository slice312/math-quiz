import {State} from "/src/state";
import {Timer} from "/src/js/components/timer";
import {Utils} from "/src/utils";

export const renderMainGameScreen = () => {
    const playerLabel = document.getElementById("game-screen-player-name");
    playerLabel.textContent = `${State.playerName}`;
    initTimer();
};



const initTimer = () => {
    const timerLabel = document.getElementById("game-screen-timer-label");
    const circle = document.getElementById("game-screen-timer-circle");
    const perimeter = circle.getAttribute('r') * 2 * Math.PI;

    circle.setAttribute("stroke-dasharray", String(perimeter));

    const countdownValue = 121;

    const timer = new Timer();

    timer.onTick = (remainingTime) => {
        timeRemainingSet(remainingTime)
        circle.setAttribute("stroke-dashoffset", String(perimeter * remainingTime / countdownValue - perimeter));
    };

    const timeRemainingSet = (time) => {
        const minutes = Utils.String.padWithZero(Math.floor(time / 60), 2);
        const seconds = Utils.String.padWithZero(time % 60, 2);
        timerLabel.textContent = `${minutes}:${seconds}`;
    };

    timer.onComplete = () => {
        console.log("time over");
    };

    timer.start(countdownValue);
};


