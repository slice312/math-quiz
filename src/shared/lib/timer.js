export class Timer {
    /** @type {function} */
    #onTick;
    /** @type {function} */
    #onComplete;
    /** @type {number} */
    #initSeconds;
    /** @type {number} */
    #remainingSeconds;
    /** @type {number} */
    #intervalCallbackId;


    set onTick(callback) {
        this.#onTick = callback;
    }

    set onComplete(callback) {
        this.#onComplete = callback;
    }

    start(seconds) {
        this.#remainingSeconds = this.#initSeconds = seconds;
        this.#tick();
        this.#intervalCallbackId = setInterval(this.#tick.bind(this), 1000);
    };

    stop() {
        clearInterval(this.#intervalCallbackId);
        this.#onComplete?.();
    }

    #tick() {
        if (this.#remainingSeconds <= 0) {
            this.stop();
        } else {
            this.#remainingSeconds -= 1;
            this.#onTick?.(this.#remainingSeconds, this.#initSeconds);
        }
    };
}
