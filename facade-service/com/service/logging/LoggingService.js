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
        const port = this.portSelectionStrategy.getPort();
        console.log(`selected logging service \`http://${this.defaultIP}:${port || this.defaultPort}\``)
        return fetch(`http://${this.defaultIP}:${port || this.defaultPort }`)
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
        const port = this.portSelectionStrategy.getPort();
        console.log(`selected logging service \`http://${this.defaultIP}:${port || this.defaultPort}\``)
        return fetch(`http://${this.defaultIP}:${port || this.defaultPort}/`, {
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
