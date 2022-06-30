// import {renderRootMenu} from "/src/components/root-menu";
//
// const root = document.getElementById("root");
//
// export const app = () => {
//     // renderRootMenu();
//
//     /*const rootMenuScreen = document.getElementById("root-menu-screen");
//     const gameScreen = document.getElementById("game-screen");
//
//     root.removeChild(rootMenuScreen);*/
//     // document.addEventListener("click", e => {
//     //     const {target} = e;
//     //     if (!target.matches("nav a")) {
//     //         return;
//     //     }
//     //
//     //     e.preventDefault();
//     //     urlRoute();
//     // })
//     //
//
//     window.onpopstate = urlRoute;
//     window.route = urlRoute;
// };
//
//
//
// const urlRoutes = {
//     "404": {
//         template: "./templates/404_.html",
//         title: "",
//         description: ""
//     },
//     "/about": {
//         template: "./templates/about.html",
//         title: "",
//         description: ""
//     },
//     "/main": {
//         template: "./templates/main.html",
//         title: "",
//         description: ""
//     }
// }
//
// const urlRoute = (event) => {
//     console.log("urlRoute", event);
//     event = event || window.event;
//     event.preventDefault();
//     window.history.pushState({}, "", event.target.href);
//     urlLocationHandler();
// };
//
//
// const urlLocationHandler = async () => {
//     let location = window.location.pathname;
//     if (!location.length) {
//         location = "/";
//     }
//
//     const route = urlRoutes[location];
//     const html = await fetch(route.template)
//         .then(response => response.text());
//     const mainDiv = document.getElementById("main");
//     mainDiv.innerHTML = html;
// };
//



// import Home         from './views/pages/Home.js'
// import About        from './views/pages/About.js'
// import Error404     from './views/pages/Error404.js'
// import PostShow     from './views/pages/PostShow.js'
// import Register     from './views/pages/Register.js'
//
// import Navbar       from './views/components/Navbar.js'
// import Bottombar    from './views/components/Bottombar.js'

import Utils from "/src/utils";
import {MainMenu} from "/src/components/MainMenu";
import {Renderer} from "/src/renderer";

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    "/": MainMenu
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

    const content = document.getElementById('root');
    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL();



    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');



    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : null; //Error404
    debugger
    content.innerHTML = Renderer.renderRoot(page);
    Renderer.afterRender();
    // await page.after_render();

};

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);

console.log("alo");
export const app = () => {

};