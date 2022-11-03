import {DomLoader} from "./dom-loader";


/**
 * @typedef UrlRouteInfo
 * @property {string} template
 * @property {function|null} render
 * @property {string} title
 * @property {string} description
 */


export class Router {
    #urlRoutes;

    /**
     * @param {Object<string, UrlRouteInfo>} urlRoutes
     */
    constructor(urlRoutes) {
        this.#urlRoutes = urlRoutes;
    }

    init() {
        const routeHandle = e => this.#urlRoute(e);
        window.addEventListener("popstate", routeHandle);
        window.addEventListener("hashchange", routeHandle);
        window.addEventListener("load", routeHandle);
    }

    #urlRoute(event) {
        event.preventDefault();
        window.history.pushState({}, "", event.target.href);
        void this.#urlLocationHandler();
    };


    async #urlLocationHandler() {
        const path = this.getCurrentUrlPath();
        const route = this.#urlRoutes[path];

        const html = await fetch(route.template)
            .then(response => response.text());

        const pageTemplateElement = DomLoader.renderElement(html);
        DomLoader.setElement(pageTemplateElement.body.firstChild);

        if (route.render)
            route.render();
    };

    /**
     * Получение текущего path, с учетом того что в проде среды добавляют вначало path'ы,
     * например для https://slice312.github.io/math-quiz/
     * "math-quiz" выносится в переменную среды {@link process.env.PUBLIC_URL}
     * @returns {string}
     */
    getCurrentUrlPath() {
        const path = window.location.pathname;

        if (process.env?.PUBLIC_URL && path.indexOf("/" + process.env?.PUBLIC_URL) >= 0)
            return path.replace("/" + process.env.PUBLIC_URL, "");

        return path;
    }


    navigate(path) {
        window.history.pushState({}, "", path);
        void this.#urlLocationHandler();
    }
}