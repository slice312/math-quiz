import {Router} from "/src/shared/routing/router";
import {renderMainMenu} from "/src/js/templates/main-menu"
import {renderMainGameScreen} from "/src/js/templates/main-game-screen";
import {renderAboutPage} from "/src/js/templates/about";


const urlRoutes = {
    "404": {
        template: "./templates/404.html",
        render: null,
        title: "",
        description: ""
    },
    "/": {
        template: "./templates/main-menu.html",
        render: renderMainMenu,
        title: "",
        description: ""
    },
    "/about": {
        template: "./templates/about.html",
        render: renderAboutPage,
        title: "",
        description: ""
    },
    "/main-game-screen": {
        template: "./templates/main-game-screen.html",
        render: renderMainGameScreen,
        title: "Quiz",
        description: ""
    },
    "/leaderboard": {
        template: "./templates/leaderboard.html",
        render: null,
        title: "Leaderboard",
        description: ""
    }
};



export const AppRouter = new Router(urlRoutes);;
