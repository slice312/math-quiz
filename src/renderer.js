const render = (component) => {
    console.log('RENDER');
    register(component)
    return component.render();
};

const components = [];

const register = (component) => {
    components.push(component)
}

const afterRender = () => {
    for (cmp of components) {
        cmp.afterRender();
    }
};

const renderRoot = (Component) => {

    return new Component().render();

};


export const Renderer = {
    renderRoot,
    render,
    afterRender
};


/**
 * Базовый рендеринг буду применять только после перерисовывания всего
 */