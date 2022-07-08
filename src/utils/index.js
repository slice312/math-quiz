/**
 * Приводит число к строке заполняя leading zeroes под указанную длину.
 * @param {number} num - Число
 * @param {number} targetLength - Длина строки
 * @returns {string} - Число в виде строки с leading zeroes
 */
const padWithZero = (num, targetLength) => {
    return String(num).padStart(targetLength, "0");
};



export const Utils = {
    String: {
        padWithZero
    }
}