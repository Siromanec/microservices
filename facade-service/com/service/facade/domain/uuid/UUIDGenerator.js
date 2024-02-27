const {IUUIDGenerator} = require("./IUUIDGenerator");
const uuidv4 = require('uuid').v4;

/**
 * @implements {IUUIDGenerator}
 * */
class UUIDGenerator extends IUUIDGenerator {
    constructor() {
        super();
        this.generator = uuidv4;
    }

    /**
     * @override
     * @public
     * @return {string} uuid
     * */
    get() {
        return uuidv4();
    }
}

module.exports = {UUIDGenerator}