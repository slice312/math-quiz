import "./styles/index.scss";
import {PLAYER_LS_KEY} from "/src/shared/constants";
import {gameSessionModel} from "/src/entities/game-session";
import {configureRouting} from "./providers/routing";
import {setMockerFunction} from "./providers/mock";


export const app = () => {
    configureRouting();
    setMockerFunction();

    const player = window.localStorage.getItem(PLAYER_LS_KEY);
    if (player) {
        gameSessionModel.state.playerName = player;
    }
};


