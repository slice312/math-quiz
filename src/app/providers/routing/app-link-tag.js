import {AppRouter} from "/src/features/app-router";


export class AppLink extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener("click", () => {
            const link = this.getAttribute("href");
            AppRouter.navigate(link);
        }, false);
    }
}