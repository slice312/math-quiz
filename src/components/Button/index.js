export class Button {
    #props = {
        name: "alo"
    }


    constructor(props) {
        this.#props = props;
    }

    render() {
        return (`
            <button class="btn-default" type="button">
                ${this.#props.name}
            </button>
        `);
    }
}
