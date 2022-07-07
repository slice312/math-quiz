class Router {
    #urlRoutes

    constructor(urlRoutes) {
        this.#urlRoutes = urlRoutes;
    }

    init() {
        window.onpopstate.a = urlRoute;

// // Listen on hash change:
        window.addEventListener("hashchange", urlRoute);
// Listen on page load:
        window.addEventListener("load", urlRoute);

    }

    urlRoute (event) {
        console.log("urlRoute", event);
        event.preventDefault();
        window.history.pushState({}, "", event.target.href);
        void urlLocationHandler();
    };


    async urlLocationHandler () {
        const path = getCurrentUrlPath();
        const route = urlRoutes[path];

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

        if (path.indexOf("/" + process.env?.PUBLIC_URL) >= 0)
            return path.replace("/" + process.env.PUBLIC_URL, "");

        return path;
    }

    navigate() {

    }

    /**
     * @param {Node} node
     */
    #removeChildNodes = (node) => {
        while (node.lastChild) {
            node.removeChild(node.lastChild);
        }
    }

}