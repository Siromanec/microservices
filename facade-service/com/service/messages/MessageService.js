/**
 * remote service
 * */
class MessageService {
    /**
     * @param {IPortSelectionStrategy | undefined} portSelectionStrategy
     * */
    constructor(portSelectionStrategy) {
        /**
         * @const
         * @readonly
         * @type {IPortSelectionStrategy | undefined} portSelectionStrategy
         * */
        this.portSelectionStrategy = portSelectionStrategy;
        this.defaultPort = "8000";
        this.defaultIP = "messages"

    }

    /**
     * @throws {Error} 'Network response was not ok'
     * @returns {Promise<string>}
     * */
    async get() {
        return fetch(`http://${this.defaultIP}:${this.portSelectionStrategy.getPort() || this.defaultPort}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => JSON.stringify(data))
    }

}

module.exports = {MessageService}
