const express = require('express');
const router = express.Router();
const {LoggingService} = require("../com/service/logging/LoggingService")
const {MessageService} = require("../com/service/messages/MessageService")
const {FacadeService} = require("../com/service/facade/FacadeService")
const {FacadeController} = require("../com/service/facade/FacadeController")
const {PortSelectionStrategyStaticFactory} = require("../com/port-selection/PortSelectionStrategyStaticFactory");



const loggingService = new LoggingService(PortSelectionStrategyStaticFactory.get(process.env.LOGGING_SERVICE_PORTS));
const messagesService = new MessageService(PortSelectionStrategyStaticFactory.get(process.env.MESSAGES_SERVICE_PORTS));
const facadeService = new FacadeService(loggingService, messagesService)
const facadeController = new FacadeController(facadeService)


router.get('/', facadeController.get.bind(facadeController))
router.post('/', facadeController.post.bind(facadeController))

module.exports = router;
