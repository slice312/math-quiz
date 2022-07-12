import {Router} from "/src/shared/lib/router";
import {renderMainMenu} from "/src/pages/main-menu";
import {renderMainGameScreen} from "/src/pages/main-game-screen";
import {renderLeaderboardScreen} from "/src/pages/leaderboard";


const urlRoutes = {
    /* eslint-disable */
    // TODO: [How to emulate `history fallback` for SPA on Github Pages](https://stackoverflow.com/questions/36296012/is-there-a-configuration-in-github-pages-that-allows-you-to-redirect-everything)
    /* eslint-enable */
    "404": {
        template: "./src/templates/404.html", // TODO: invalid
        render: null,
        title: "",
        description: ""
    },
    "/": {
        template: "./src/pages/main-menu/index.html",
        render: renderMainMenu,
        title: "",
        description: ""
    },
    "/main-game-screen": {
        template: "./src/pages/main-game-screen/index.html",
        render: renderMainGameScreen,
        title: "Quiz",
        description: ""
    },
    "/leaderboard": {
        template: "./src/pages/leaderboard/index.html",
        render: renderLeaderboardScreen,
        title: "Leaderboard",
        description: ""
    }
};


export const AppRouter = new Router(urlRoutes);
