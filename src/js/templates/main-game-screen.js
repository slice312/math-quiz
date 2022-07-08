import {State} from "/src/state";

export const renderMainGameScreen = () => {
    const playerLabel = document.getElementById("game-screen-player-name");
    playerLabel.textContent = `${State.playerName}`;


    const input = document.querySelector('#duration');
    const circle = document.querySelector('circle');
    const perimetr = circle.getAttribute('r') * 2 * Math.PI;

    circle.setAttribute('stroke-dasharray', perimetr);

    let duration;
    let currentOffset = 0;
    const t1 = new Timer(250, input, {
        onStart(totalDuration) {
            duration = totalDuration;
        },
        onTick(timeRemaining) {
            circle.setAttribute('stroke-dashoffset', perimetr * timeRemaining / duration - perimetr);
        },
        onComplite() {
            console.log('timer completed');
        }
    });

    t1.start();
};


class Timer {
    constructor(seconds, durationInput, callbacks) {
        this.seconds = seconds;
        this.durationInput = durationInput;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplite = callbacks.onComplite;
        }
    }

    start = () => {
        if (this.onStart) {
            this.onStart(this.seconds);
        }
        console.log(this.durationInput.value);
        this.tick();
        this.interval = setInterval(this.tick, 1000);
    };
    pause = () => {
        clearInterval(this.interval);
    };


    tick = () => {
        if (this.seconds <= 0) {
            this.pause();
            if (this.onComplite)
                this.onComplite();
        } else {
            this.seconds = this.seconds - 1;
            this.timeRemainingSet(this.seconds);
            if (this.onTick) {
                this.onTick(this.seconds);
            }
        }
    };


    timeRemainingSet(time) {
        const minutes = padWithZero(Math.floor(time / 60), 2);
        const seconds = padWithZero(time % 60, 2);
        this.durationInput.textContent = `${minutes}:${seconds}`;
    }
}


/**
 * Приводит число к строке заполняя leading zeroes под указанную длину.
 * @param {number} num - Число
 * @param {number} targetLength - Длина строки
 * @returns {string} - Число в виде строки с leading zeroes
 */
const padWithZero = (num, targetLength) => {
    return String(num).padStart(targetLength, "0");
};
