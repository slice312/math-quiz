import {DomLoader} from "/src/shared/lib/dom-loader";
import {layout} from "./ui";


const open = () => {
    render();
};

const render = () => {
    const htmlTemplate = DomLoader.renderElement(layout());
    const modalAbout =  DomLoader.addElement(htmlTemplate.body.firstChild);

    const btnAboutModalClose = document.getElementById("modal-order-close-btn");
    btnAboutModalClose.onclick = () => {
        modalAbout.remove();
    };
};


export const ModalAbout = {
    open
};