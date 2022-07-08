import {AppRouter} from "/src/shared/routing/app-router";


export class AppLink extends HTMLElement {
    connectedCallback() {
        this.addEventListener("click", () => {
            const link = this.getAttribute("href");
            AppRouter.navigate(link);
        }, false);
    }
}
