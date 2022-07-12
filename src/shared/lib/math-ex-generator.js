import {Utils} from "/src/shared/lib/uitls";


export class MathExGenerator {
    static #operators = ["+", "-", "*", "/"];
    #level; // TODO: добавить уровни


    /**
     * @returns {{num1: number, num2: number, operator: string, result: number}}
     */
    generateExpression() {
        const num1 = Utils.Number.random(1, 10);
        const num2 = Utils.Number.random(1, 10);
        const operator = MathExGenerator.#operators[Utils.Number.random(0, 3)];
        if (operator === "/") {
            const multiply = num1 * num2;
            return {num1: multiply, num2, operator, result: num1};
        }

        const result = this.getResult(num1, num2, operator);
        return {num1, num2, operator, result};
    }

    getResult(a, b, operator) {
        switch (operator) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return a / b;
            default:
                throw new Error(`Unexpected operator: ${operator}`);
        }
    }
}
