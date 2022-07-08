import "./styles/index.scss";

import {configureRouting} from "./shared/routing";


console.log("PAGE LOADING");

const app = () => {
    configureRouting()
};



document.addEventListener("DOMContentLoaded", app);

