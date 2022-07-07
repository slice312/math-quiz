
import {renderMainMenu} from "/src/js/templates/main-menu"
import {renderAboutPage} from "/src/js/templates/about";


const urlRoutes = {
    "404": {
        template: "./templates/404.html",
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
        render: null,
        title: "",
        description: ""
    },
    "/leaderboard": {
        template: "./templates/leaderboard.html",
        render: null,
        title: "Leaderboard",
        description: ""
    }
};

const urlRoute = (event) => {
    console.log("urlRoute", event);
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    void urlLocationHandler();
};


const urlLocationHandler = async () => {
    const path = getCurrentUrlPath();
    const route = urlRoutes[path];

    const html = await fetch(route.template)
        .then(response => response.text());

    const domParser = new DOMParser();
    const htmlDocument = domParser.parseFromString(html, "text/html");

    const appContainer = document.getElementById("root");

    removeChildNodes(appContainer);

    for (const nd of htmlDocument.body.childNodes) {
        appContainer.appendChild(nd);
    }

    if (route.render)
        route.render();
};


/**
 * Получение текущего path, с учетом того что в проде среды добавляют вначало path'ы,
 * например для https://slice312.github.io/zeon-module-2_MathQuiz/
 * "zeon-module-2_MathQuiz" выносится в переменную среды {@link process.env.PUBLIC_URL}
 * @returns {string}
 */
const getCurrentUrlPath = () => {
    const path = window.location.pathname;

    if (path.indexOf("/" + process.env?.PUBLIC_URL) >= 0)
        return path.replace("/" + process.env.PUBLIC_URL, "");

    return path;
}



/**
 * @param {Node} node
 */
const removeChildNodes = (node) => {
    while (node.lastChild) {
        node.removeChild(node.lastChild);
    }
}

export const navigate = (path) => {
    window.history.pushState({}, "", path);
    void urlLocationHandler();
}



window.onpopstate = urlRoute;

// // Listen on hash change:
window.addEventListener("hashchange", urlRoute);
// Listen on page load:
window.addEventListener("load", urlRoute);
