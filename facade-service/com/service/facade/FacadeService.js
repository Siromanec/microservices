const {OutMessage} = require("./domain/message/OutMessage");

class FacadeService {
    /**
     * @param {LoggingService} loggingService
     * @param {MessageService} messageService
     * */
    constructor(loggingService, messageService) {
        this.loggingService = loggingService;
        this.messageService = messageService;

    }

    /**
     * @return {Promise<string>}
     * */
    async getMessages() {
        const loggingPromise = this.loggingService.getMessages();
        const messagesPromise = this.messageService.get();

        return Promise.all([loggingPromise, messagesPromise])
            .then(([loggingString, messagesString]) => {
                if (loggingString === undefined)
                    throw new Error('Logging response is undefined');
                if (messagesString === undefined)
                    throw new Error('Messages response is undefined');
                return `${loggingString}:${messagesString}`;
            })
    }

    /**
     * @param {string} message
     *
     * */
    async save(message) {
        if (message === undefined) {
            return Promise.reject(new Error("'message' is undefined"));
        }
        const loggingPromise = this.loggingService.save(new OutMessage(message));
        const messagePromise = this.messageService.save(message);
        return Promise.all([loggingPromise, messagePromise]);
    }
}

module.exports = {FacadeService}
