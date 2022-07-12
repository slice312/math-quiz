import {gameSessionModel} from "/src/entities/game-session";
import {GameMode, LEADERBOARD_LS_KEY} from "/src/shared/constants";


export const setMockerFunction = () => {

    if (!window.App)
        window.App = {};

    window.App.mockFillLeaderBoard = () => {
        window.localStorage.setItem(LEADERBOARD_LS_KEY, JSON.stringify(leaderboard));
    };


    // для отладки
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
        score: 4
    },
    {
        name: "DeRosa",
        mode: GameMode.TimeAttack,
        level: 2,
        score: 55
    },
    {
        name: "Colnago",
        mode: GameMode.TimeAttack,
        level: 2,
        score: 74
    },
    {
        name: "Orbea",
        mode: GameMode.TimeAttack,
        level: 2,
        score: 43
    },
    {
        name: "Cute",
        mode: GameMode.TimeAttack,
        level: 2,
        score: 76
    },
    {
        name: "Slice Mem",
        mode: GameMode.TimeAttack,
        level: 2,
        score: 21
    },
    {
        name: "SliceHo",
        mode: GameMode.TimeAttack,
        level: 2,
        score: 44
    },
    {
        name: "Kern",
        mode: GameMode.Practice,
        level: 3,
        score: 12
    },
    {
        name: "Aterm7",
        mode: GameMode.Practice,
        level: 1,
        score: 4
    },
    {
        name: "Aterm5",
        mode: GameMode.Practice,
        level: 1,
        score: 4
    },
    {
        name: "Aterm23",
        mode: GameMode.Practice,
        level: 1,
        score: 4
    },
    {
        name: "Aterm24",
        mode: GameMode.Practice,
        level: 1,
        score: 4
    },
    {
        name: "Aterm25",
        mode: GameMode.Practice,
        level: 1,
        score: 4
    },
    {
        name: "Aterm31",
        mode: GameMode.Practice,
        level: 1,
        score: 4
    },
    {
        name: "Aterm35",
        mode: GameMode.Practice,
        level: 1,
        score: 4
    }
];