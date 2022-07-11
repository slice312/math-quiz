import {Router} from "/src/shared/routing/router";
import {renderMainMenu} from "/src/pages/main-menu"
import {renderMainGameScreen} from "/src/components/templates/main-game-screen";
import {renderAboutPage} from "/src/components/templates/about";
import {renderLeaderboardScreen} from "/src/components/templates/leaderboard";


// TODO: [How to emulate `history fallback` for SPA on Github Pages](https://stackoverflow.com/questions/36296012/is-there-a-configuration-in-github-pages-that-allows-you-to-redirect-everything)

const urlRoutes = {
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
    "/about": {
        template: "./src/page/about/index.html",
        render: renderAboutPage,
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
