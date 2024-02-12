
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
     * @return {Promise<Response>}
     * */
    async save(message) {
        return this.loggingService.save(message);
    }
}

module.exports = {FacadeService}
