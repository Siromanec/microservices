const {UUIDGenerator} = require("../uuid/UUIDGenerator");

class OutMessage {

    /**
     * @param {string} messageText
     * */
    constructor(messageText) {
        /**
         * @readonly
         * @const
         * @type {IUUIDGenerator}
         * */
        this.UUIDGenerator = new UUIDGenerator();
        /**
         * @readonly
         * @const
         * @type {string}
         * */
        this.messageText = messageText;

    }

    /**
     * @return {string}
     * */
    toString() {
        return JSON.stringify({uuid: this.UUIDGenerator.get(), message: this.messageText})
    }
}

module.exports = {OutMessage}