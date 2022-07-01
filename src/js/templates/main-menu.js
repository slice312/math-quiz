import {navigate} from "/src/routes";


export const renderMainMenu = () => {
    const btnPlay = document.getElementById("main-menu-btn-play");
    btnPlay.onclick = () => {
        navigate("/about")
    };
};