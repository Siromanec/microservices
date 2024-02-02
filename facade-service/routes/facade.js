const express = require('express');
const uuidv4 = require('uuid').v4;
const router = express.Router();


/* GET facade */
router.get('/', (req, res, next) => {
    const loggingPromise = fetch("http://logging:8080")
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

    const messagesPromise = fetch("http://messages:8000")
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
        .then(([loggingString, messagesString]) => {
            if (loggingString === undefined)
                throw new Error('Logging response is undefined');
            if (messagesString === undefined)
                throw new Error('Messages response is undefined');
            return `${loggingString}:${messagesString}`;
        })
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
    fetch("http://logging:8080", {
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
