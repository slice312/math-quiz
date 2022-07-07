import "./styles/index.scss";

import {configureRouting} from "./shared/routing";

console.log("PAGE UPDATED");


const app = () => {
    configureRouting()
};


document.addEventListener("DOMContentLoaded", app);

