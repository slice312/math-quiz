/**
 * @typedef  UrlRouteInfo
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

        const domParser = new DOMParser();
        const htmlDocument = domParser.parseFromString(html, "text/html");

        const appContainer = document.getElementById("root");

        this.#removeChildNodes(appContainer);

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
    getCurrentUrlPath() {
        const path = window.location.pathname;

        if (process.env?.PUBLIC_URL && path.indexOf("/" + process.env?.PUBLIC_URL) >= 0)
            return path.replace("/" + process.env.PUBLIC_URL, "");

        return path;
    }

    /**
     * @param {Node} node
     */
    #removeChildNodes = (node) => {
        while (node.lastChild) {
            node.removeChild(node.lastChild);
        }
    };

    navigate(path) {
        window.history.pushState({}, "", path);
        void this.#urlLocationHandler();
    }
}