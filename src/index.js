import "./styles/index.scss";

import {configureRouting} from "./shared/routing";


const app = () => {
    configureRouting()
};


document.addEventListener("DOMContentLoaded", app);

