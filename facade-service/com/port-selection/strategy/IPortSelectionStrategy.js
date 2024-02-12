
/**
 * @interface */
class IPortSelectionStrategy {

    /**
     * @access public
     * @returns {string} port*/
    getPort() {
        throw Error("IPortSelectionStrategy.getPort not implemented!")
    }
}

module.exports = {IPortSelectionStrategy}
