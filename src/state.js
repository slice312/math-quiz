
export const State = {
    playerName: "",
    gameMode: "",
    score: 0,
};



if (!State.playerName && window.AppState)
    State.playerName = window.AppState.playerName;
// для отладки
window.AppState = State;
