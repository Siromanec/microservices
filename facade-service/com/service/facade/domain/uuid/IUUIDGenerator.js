/**
* @interface
* */
class IUUIDGenerator {
    /**
     * @public
     * @return {string} uuid
     * */
    get() {
        throw Error("IUUIDGenerator.get not implemented!")
    }
}

module.exports = {IUUIDGenerator}