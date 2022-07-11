import {Router} from "/src/shared/routing/router";
import {renderMainMenu} from "/src/pages/main-menu"
import {renderMainGameScreen} from "/src/components/templates/main-game-screen";
import {renderAboutPage} from "/src/components/templates/about";
import {renderLeaderboardScreen} from "/src/components/templates/leaderboard";


const urlRoutes = {
    "404": {
        template: "./src/templates/404.html",
        render: null,
        title: "",
        description: ""
    },
    "/": {
        template: "./src/templates/main-menu.html",
        render: renderMainMenu,
        title: "",
        description: ""
    },
    "/about": {
        template: "./src/templates/about.html",
        render: renderAboutPage,
        title: "",
        description: ""
    },
    "/main-game-screen": {
        template: "./src/templates/main-game-screen.html",
        render: renderMainGameScreen,
        title: "Quiz",
        description: ""
    },
    "/leaderboard": {
        template: "./src/templates/leaderboard.html",
        render: renderLeaderboardScreen,
        title: "Leaderboard",
        description: ""
    }
};



export const AppRouter = new Router(urlRoutes);
