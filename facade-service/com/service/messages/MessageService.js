/**
 * remote service
 * */
const amqp = require("amqplib")
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
        this.defaultIP = "messages";
        this.queue = "task_queue";
        (async () => {
            try {
                this.connection = await amqp.connect("amqp://rabbitmq");
                this.channel = await this.connection.createChannel();

                await this.channel.assertQueue(this.queue, { durable: true });

                // await channel.close();
            } catch (err) {
                console.warn(err);
            }
            // finally {
            //     if (this.connection) await this.connection.close();
            // }
        })()

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

    /**
     * @param {String} message
     * */

    async save(message) {
        this.channel.sendToQueue(this.queue, Buffer.from(message));
        console.log(" [x] Sent '%s to message queue'", message);
    }

}

module.exports = {MessageService}
