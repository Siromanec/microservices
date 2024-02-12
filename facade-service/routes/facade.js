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

/* GET facade */
// router.get('/', (req, res, next) => {
//     const loggingPromise = fetch("http://logging:8080")
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then((data) => JSON.stringify(data))
//         .catch(error => {
//             next(error);
//         });
//
//     const messagesPromise = fetch("http://messages:8000")
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then((data) => JSON.stringify(data))
//         .catch(error => {
//             next(error);
//         });
//
//     Promise.all([loggingPromise, messagesPromise])
//         .then(([loggingString, messagesString]) => {
//             if (loggingString === undefined)
//                 throw new Error('Logging response is undefined');
//             if (messagesString === undefined)
//                 throw new Error('Messages response is undefined');
//             return `${loggingString}:${messagesString}`;
//         })
//         .then((response) => {
//             console.log("Sending response:");
//             console.log(response);
//             res.send(response);
//             return response;
//         })
//         .catch(error => {
//             next(error);
//         });
// });
//
// /* POST facade */
// router.post('/', (req, res, next) => {
//     fetch("http://logging:8080", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({uuid: uuidv4(), message: req.body.message})
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok. Logging failed.');
//             }
//             res.send("OK");
//             return response
//         }).catch(error => {
//         next(error);
//     });
//
// });


module.exports = router;
