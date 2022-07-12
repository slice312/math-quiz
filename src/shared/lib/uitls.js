import {LEADERBOARD_LS_KEY} from "/src/shared/constants";

/**
 * Приводит число к строке заполняя leading zeroes под указанную длину.
 * @param {number} num - Число
 * @param {number} targetLength - Длина строки
 * @returns {string} - Число в виде строки с leading zeroes
 */
const padWithZero = (num, targetLength) => {
    return String(num).padStart(targetLength, "0");
};


/**
 * Возвращает рандомное число в заданном диапазоне.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const random = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};


const getLeaderboard = () => {
    return JSON.parse(window.localStorage.getItem(LEADERBOARD_LS_KEY));
};


export const Utils = {
    String: {
        padWithZero
    },
    Number: {
        random
    },
    getLeaderboard
}