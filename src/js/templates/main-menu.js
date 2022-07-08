import {State} from "/src/state";

import {AppRouter} from "/src/shared/routing/app-router";


export const renderMainMenu = () => {
    const form = document.getElementById("main-menu");
    const btn = document.getElementById("main-menu-btn-play");

    btn.onclick = (e) => {
        State.gameMode = form.elements.gameMode.value;
        State.playerName = form.elements.name.value;
        console.log("GLOBAL state", State);

            if (form.checkValidity()) {
            e.preventDefault();
            AppRouter.navigate("main-game-screen");
        }
    };
};