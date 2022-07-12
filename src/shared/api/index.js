import dayjs from "dayjs";
import {LEADERBOARD_LS_KEY} from "/src/shared/constants";


/**
 * @typedef GameResult
 * @property {string} name
 * @property {string} mode
 * @property {number} level
 * @property {number} score
 */


/**
 * @param {GameResult} gameResult
 * @returns {Promise<void>}
 */
const sendGameResult = async (gameResult) => {
    console.log(`sendGameResult ${dayjs().format("DD.MM.YYYY hh:mm:ss")}`);
    const leaderboard = JSON.parse(window.localStorage.getItem(LEADERBOARD_LS_KEY));
    updateLeaderboard(leaderboard, gameResult);
    window.localStorage.setItem(LEADERBOARD_LS_KEY, JSON.stringify(leaderboard));
};

/**
 * @param {object|null} leaderboard
 * @param {GameResult} gameResult
 */
const updateLeaderboard = (leaderboard, gameResult) => {
    if (!leaderboard)
        return [gameResult];

    const existedRec = leaderboard
        .find(x => x.name === gameResult.name && x.mode === gameResult.mode);

    if (existedRec)
        existedRec.score = Math.max(existedRec.score, gameResult.score);
    else
        leaderboard.push(gameResult);
};


export const Api = {
    sendGameResult
};