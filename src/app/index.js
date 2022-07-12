import "./styles/index.scss";
import {configureRouting} from "./providers/routing";
import {setMockerFunction} from "./providers/mock";


export const app = () => {
    configureRouting();
    setMockerFunction();
};


