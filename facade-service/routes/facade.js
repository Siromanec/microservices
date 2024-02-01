var express = require('express');
var uuidv4 = require('uuid').v4;
var router = express.Router();


/* GET facade */
router.get('/', (req, res, next) => {
    const loggingPromise = fetch("http://localhost:8080/logging")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => JSON.stringify(data))
        .catch(error => {
            next(error);
        });

    const messagesPromise = fetch("http://127.0.0.1:8000/messages")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => JSON.stringify(data))
        .catch(error => {
            next(error);
        });

    Promise.all([loggingPromise, messagesPromise])
        .then(([loggingString, messagesString]) => loggingString + ":" + messagesString)
        .then((response) => {
            console.log("Sending response:");
            console.log(response);
            res.send(response);
            return response;
        })
        .catch(error => {
            next(error);
        });
});

/* POST facade */
router.post('/', (req, res, next) => {
    console.log(req.body)
    fetch("http://localhost:8080/logging", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({uuid: uuidv4(), message: req.body.message})
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok. Logging failed.');
            }
            res.send("OK");
            return response
        }).catch(error => {
        next(error);
    });

});


module.exports = router;
