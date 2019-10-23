import { r as registerInstance, h } from './core-950489bb.js';

const CheckMark = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ticks = 'one';
    }
    render() {
        const secondTick = [
            h("div", { class: "check-mark-second-stem" }),
            h("div", { class: "check-mark-second-kick" }),
            h("div", { class: "check-mark-kick-half" })
        ];
        return (h("div", { class: "container" }, h("div", { class: "check-mark-stem" }), this.ticks === 'one' && h("div", { class: "check-mark-kick" }), this.ticks === 'two' && secondTick));
    }
    static get style() { return ".container {\n    display: inline-block;\n    width: 18px;\n    height:18px;\n    -webkit-transform: translate(-3px, 2px) rotate(45deg);\n    transform: translate(-3px, 2px) rotate(45deg);\n}\n\n.check-mark-stem {\n    position: absolute;\n    width: 2px;\n    height: 14px;\n    background-color: var(--message-check-mark-color);\n    right: 0px;\n    bottom: 4px;\n}\n\n.check-mark-kick {\n    position: absolute;\n    width: 5px;\n    height: 2px;\n    background-color: var(--message-check-mark-color);\n    right: 1px;\n    bottom: 4px;\n}\n\n.check-mark-kick-half {\n    position: absolute;\n    width: 2px;\n    height: 2px;\n    background-color: var(--message-check-mark-color);\n    right: 1px;\n    bottom: 4px;\n}\n\n.check-mark-second-stem {\n    position: absolute;\n    width: 2px;\n    height: 14px;\n    background-color: var(--message-check-mark-color);\n    right: 4px;\n    bottom: 0px;\n}\n\n.check-mark-second-kick {\n    position: absolute;\n    width: 5px;\n    height: 2px;\n    background-color: var(--message-check-mark-color);\n    right: 5px;\n    bottom: 0px;\n}"; }
};

export { CheckMark as chat_check_mark };
