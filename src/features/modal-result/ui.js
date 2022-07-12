export const layout = () => {
    return `
        <div class="modal-game-result" id="modal-game-result">
            <div class="modal-game-result__wrapper">
                <div class="modal-game-result__container animate animate__zoomIn" id="modal-order-container">
                    <form class="modal-game-result__content">
                        <h2 class="modal-game-result__title">
                            Game Over!
                        </h2>
                        <p class="modal-game-result__level-label">
                            Level: <span id="modal-game-result-level">1</span>
                        </p>
                        <p class="modal-game-result__score-label">Your score:</p>
                        <p class="modal-game-result__score-value" id="modal-game-result-score">
                            0
                        </p>
                        <div class="modal-game-result__correct-count">
                            <p>
                                Correct: <span id="modal-game-result-correct-count">0</span>
                            </p>
                            <p>
                                Incorrect: <span id="modal-game-result-incorrect-count">0</span>
                            </p>
                        </div>
        
                        <div class="modal-game-result__buttons">
                            <div>
                                <app-link class="btn-default" href="./">
                                    Home
                                </app-link>
                                <app-link class="btn-default" href="./leaderboard?fromGame=true">
                                    Leaderboard
                                </app-link>
                            </div>
                            <button class="btn-default" id="btn-play-again" type="button">
                                Play again
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
};