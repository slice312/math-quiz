

export const renderRootMenu = () => {
    const form = document.getElementById("root-menu");
    const btnPlay = document.getElementById("root-menu-btn-play");
    btnPlay.onclick = () => {
        const name = form.elements.name.value;
        const mode = form.elements.gameMode.value;
        debugger

    };
}