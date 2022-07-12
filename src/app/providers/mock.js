import {gameSessionModel} from "/src/entities/game-session";
import {GameMode} from "/src/shared/constants";
import {LEADERBOARD_LS_KEY} from "/src/shared/constants";


export const setMockerFunction = () => {

    if (!window.App)
        window.App = {};

    window.App.mockFillLeaderBoard = () => {
        window.localStorage.setItem(LEADERBOARD_LS_KEY, JSON.stringify(leaderboard));
    };


    window.App.gameSession = gameSessionModel.state;
};


const leaderboard = [
    {
        name: "Aterm",
        mode: GameMode.Practice,
        level: 1,
        score: 4
    },
    {
        name: "Nurz",
        mode: GameMode.TimeAttack,
        level: 1,
        score: 4
    },
    {
        name: "Talgat",
        mode: GameMode.Practice,
        level: 1,
        score: 4
    },
    {
        name: "Tala",
        mode: GameMode.TimeAttack,
        level: 1,
        score: 4
    },
    {
        name: "Sardor",
        mode: GameMode.TimeAttack,
        level: 1,
        score: 3
    },
    {
        name: "Hurma",
        mode: GameMode.TimeAttack,
        level: 1,
        score: 4,
    },
    {
        name: "Slice",
        mode: GameMode.TimeAttack,
        level: 2,
        score: 7
    },
    {
        name: "Kern",
        mode: GameMode.Practice,
        level: 3,
        score: 12
    },
    {
        name: "Aterm",
        mode: GameMode.Practice,
        level: 1,
        score: 4
    },
];