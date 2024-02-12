const {IPortSelectionStrategy} = require("./IPortSelectionStrategy");

/**
 * @implements {IPortSelectionStrategy}*/
class SinglePortSelectionStrategy extends IPortSelectionStrategy {
    /**
     * @param {string} port
     * */
    constructor(port) {
        super();
        /**
         * @const
         * @readonly
         * @type {string}
         * */
        this.port = port
    }

    /**
     * @inheritDoc
     * */
    getPort() {
        return this.port;
    }
}

module.exports = {SinglePortSelectionStrategy}
