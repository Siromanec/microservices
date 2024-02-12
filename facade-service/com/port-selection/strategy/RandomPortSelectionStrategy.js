const {IPortSelectionStrategy} = require("./IPortSelectionStrategy");

/**
 * @param {number} max
 * @return {number} randomInt*/
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
/**
 * @implements {IPortSelectionStrategy}*/
class RandomPortSelectionStrategy extends IPortSelectionStrategy {

    /**
     * @param {Array.<string>} ports
     * */
    constructor(ports) {
        super();
        /**
         * @readonly
         * @const
         * @type {Array.<string>}
         * */
        this.ports = ports;
    }

    /**
     * @inheritDoc
     * */
    getPort() {
        return this.ports[getRandomInt(this.ports.length)]
    }
}

module.exports = {RandomPortSelectionStrategy}
