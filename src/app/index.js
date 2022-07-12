import "./styles/index.scss";
import {configureRouting} from "./providers/routing";


export const app = () => {
    configureRouting();
};

// import {State} from "../state";
//
// if (!State.playerName && window.AppState)
//     State.playerName = window.AppState.playerName;
// // для отладки
// window.AppState = State;
