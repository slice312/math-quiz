export const layout = () => {
    return `
        <div class="modal-about" id="modal-about">
            <div class="modal-about__wrapper">
                <div class="modal-about__container animate animate__zoomIn" id="modal-about-container">
                    <form class="modal-about__content">
                        <button class="btn-default modal-about__btn-close" id="modal-order-close-btn" type="button">
                            <img src="/src/assets/icons/x-mark.svg" alt="x-mark">
                        </button>
                        <h2 class="modal-about__title">
                            About
                        </h2>
                        <h3 class="modal-about__sub-title">
                            Rules:
                        </h3>
                        <p>
                            This is a math quiz, solve examples and earn points.
                        </p>
                        <p>
                            In practice mode, you can endlessly solve examples.
                        </p>
                        <p>
                            In attack mode, you have a minute and 30 seconds, go ahead and become the best
                        </p>
                    </form>
                </div>
            </div>
        </div>
    `;
};