export class Timer {
    /** @type {function} */
    #onTick;
    /** @type {function} */
    #onComplete;
    /** @type {number} */
    #seconds;
    /** @type {number} */
    #intervalCallbackId


    set onTick(callback) {
        this.#onTick = callback;
    }

    set onComplete(callback) {
        this.#onComplete = callback;
    }

    start(seconds) {
        this.#seconds = seconds;
        this.#tick();
        this.#intervalCallbackId = setInterval(this.#tick.bind(this), 1000);
    };

    stop() {
        clearInterval(this.#intervalCallbackId);
        this.#onComplete?.();
    }

    #tick() {
        if (this.#seconds <= 0) {
            this.stop();
        } else {
            this.#seconds -= 1;
            this.#onTick?.(this.#seconds);
        }
    };
}
