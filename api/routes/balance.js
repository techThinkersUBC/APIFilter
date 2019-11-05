const express = require('express');
const router = express.Router();

const fetch = require('node-fetch');

router.get('/', (req, res) => {
    // Authenticate with open bank project API
    fetch('https://openlab.openbankproject.com/my/logins/direct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': req.header('Authorization')
        }
    })
    .then(authResponse => {
        authResponse.json().then(authData => {
            // Send a request to the open bank project API to request balance info using token
            // acquired from authentication
            fetch('https://openlab.openbankproject.com//obp/v4.0.0/banks/test-1-bank/balances', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'DirectLogin token="' + authData.token + '"'
                }
            })
            .then(balanceResponse => {
                // Return the balance info (we could edit this to only return certain components
                // based on the caller's permissions)
                balanceResponse.json().then(data => {
                    res.status(200).json(data);
                })
            })
            
        })
        .catch((e) => {
            console.log(e);
        })
    })
    .catch((e) => {
        console.log(e);
    })
});

module.exports = router;