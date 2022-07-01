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
    "/game": {
        template: "./templates/game.html",
        title: "",
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
    let location = window.location.pathname;
    if (!location.length) {
        location = "/";
    }
    console.log(process.env.HOST_URL)

    // const paths = location.split("/")
    //     .filter(x => x)
    //
    // if (paths.length)
    //     location = paths[0];
    // else
    //     location = "/";
    console.log(process.env)

    const route = urlRoutes[location];
    const html = await fetch(route.template)
        .then(response => response.text());
    const mainDiv = document.getElementById("root");
    mainDiv.innerHTML = html;
    if (route.render)
        route.render();
};



export const navigate = (path) => {
    window.history.pushState({}, "", path);
    void urlLocationHandler();
}



window.onpopstate = urlRoute;

// // Listen on hash change:
window.addEventListener("hashchange", urlRoute);
// Listen on page load:
window.addEventListener("load", urlRoute);
