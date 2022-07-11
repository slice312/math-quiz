import {gameSessionModel} from "/src/entities/game-session";
import {AppRouter} from "/src/shared/routing/app-router";


export const renderMainMenu = () => {
    const form = document.getElementById("main-menu");
    const btn = document.getElementById("main-menu-btn-play");

    btn.onclick = (e) => {
        gameSessionModel.state.gameMode = form.elements.gameMode.value;
        gameSessionModel.state.playerName = form.elements.name.value;

        if (form.checkValidity()) {
            e.preventDefault();
            AppRouter.navigate("main-game-screen");
        }
    };
};