import {PLAYER_LS_KEY} from "/src/shared/constants";
import {gameSessionModel} from "/src/entities/game-session";
import {AppRouter} from "/src/features/app-router";
import {ModalAbout} from "/src/features/modal-about";


export const renderMainMenu = () => {
    const form = document.getElementById("main-menu");
    form.elements.name.value = gameSessionModel.state.playerName;

    const btn = document.getElementById("main-menu-btn-play");
    btn.onclick = onBtnPlayClick;

    const btnAbout = document.getElementById("main-menu-btn-about");
    btnAbout.onclick = ModalAbout.open;
};


const onBtnPlayClick = (e) => {
    const form = document.getElementById("main-menu");
    form.elements.name.value = form.elements.name.value.trim();
    gameSessionModel.state.gameMode = form.elements.gameMode.value;
    gameSessionModel.state.playerName = form.elements.name.value;

    window.localStorage.setItem(PLAYER_LS_KEY, gameSessionModel.state.playerName);

    if (form.checkValidity()) {
        e.preventDefault();
        AppRouter.navigate("main-game-screen");
    }
};
