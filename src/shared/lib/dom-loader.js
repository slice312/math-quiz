/**
 * @param {string} htmlTemplate
 */
const renderElement = (htmlTemplate) => {
    const domParser = new DOMParser();
    return domParser.parseFromString(htmlTemplate, "text/html");
};

/**
 * @param {Node} node
 */
const addElement = (node) => {
    const appContainer = document.getElementById("root");
    return appContainer.appendChild(node);
};

/**
 * @param {Node} node
 */
const setElement = (node) => {
    const appContainer = document.getElementById("root");
    while (appContainer.lastChild) {
        appContainer.removeChild(appContainer.lastChild);
    }

    appContainer.appendChild(node);
};


export const DomLoader = {
    renderElement,
    addElement,
    setElement
};