// Create an express application
const express = require('express');
const app = express();

const accountInfoRoutes = require('./api/routes/balance')

// Deal with any potential CORS problems
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST');
        return res.status(200).json({});
    }

    next();
});

app.use('/balance', accountInfoRoutes);

module.exports = app;
