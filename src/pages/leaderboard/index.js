import {gameSessionModel} from "/src/entities/game-session";
import {Utils} from "/src/shared/lib/uitls";


export const renderLeaderboardScreen = () => {
    hidePlayButton();
    const selector = document.getElementById("leaderboard-mode-selector");

    const option = Array.from(selector.options)
        .find(x => x.value === gameSessionModel.state.gameMode);
    option.selected = true;

    selector.onchange = onModeChanged;
    onModeChanged();
};

const hidePlayButton = () => {
    const url = new URL(window.location);
    if (!url.searchParams.get("fromGame")) {
        const btn = document.getElementById("leaderboard-btn-play");
        btn.style.display = "none";
    }
};


const onModeChanged = () => {
    const selector = document.getElementById("leaderboard-mode-selector");

    const selected = Array.from(selector.options)
        .find(x => x.selected);
    const selectedMode = selected.value;
    const leaderboard = getLeaderBoard(selectedMode);
    renderTable(leaderboard);
};

/**
 * @param {GameMode} selectedMode
 */
const getLeaderBoard = (selectedMode) => {
    return Utils.getLeaderboard()?.filter(x => x.mode === selectedMode)
        ?? [];
};


/**
 * Заполняет таблицу, рендерит элемент:
 * <div class="leaderboard__table-row">
 *     <span>First</span>
 *     <span>2</span>
 *     <span>25</span>
 * </div>
 * @param {GameResult[]} leaderboard
 */
const renderTable = (leaderboard) => {
    const table = document.getElementById("leaderboard-table");
    while (table.lastChild) {
        table.removeChild(table.lastChild);
    }

    leaderboard.sort((a, b) => b.score - a.score);

    for (const rec of leaderboard) {
        const row = document.createElement("div");
        row.classList.add("leaderboard__table-row");
        table.appendChild(row);

        const colName = document.createElement("span");
        colName.textContent = rec.name;
        row.appendChild(colName);

        const colLevel = document.createElement("span");
        colLevel.textContent = String(rec.level);
        row.appendChild(colLevel);

        const colScore = document.createElement("span");
        colScore.textContent = String(rec.score);
        row.appendChild(colScore);
    }
};