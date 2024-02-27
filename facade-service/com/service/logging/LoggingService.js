/**
 * remote service
 * */
class LoggingService {
    /**
     * @param {IPortSelectionStrategy} portSelectionStrategy
     * */
    constructor(portSelectionStrategy) {
        /**
         * @const
         * @readonly
         * @type {IPortSelectionStrategy} portSelectionStrategy
         * */
        this.portSelectionStrategy = portSelectionStrategy;
        this.defaultPort = "8080";
        this.defaultIP = "logging"
    }

    /**
     * @throws {Error} 'Network response was not ok'
     * @returns {Promise<string>}
     * */
    async getMessages() {
        return fetch(`http://${this.defaultIP}:${this.portSelectionStrategy.getPort() || this.defaultPort }`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => JSON.stringify(data))
    }

    /**
     * @throws {Error} 'Network response was not ok. Logging failed.'
     * @param {OutMessage} message
     * @return Promise<Response>
     * */
    async save(message) {
        return fetch(`http://${this.defaultIP}:${this.portSelectionStrategy.getPort() || this.defaultPort}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: message.toString()
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok. Logging failed.');
                }
                return response
            });
    }
}

module.exports = {LoggingService}
