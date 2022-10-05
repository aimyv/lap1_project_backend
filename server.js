const express = require('express')
const server = express()

let cors = require("cors")
server.use(cors())

const bodyParser = require('body-parser')
server.use(bodyParser.json())

// server.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Origin');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
//     next();
// });

const entryRoutes = require('./controllers/entries');

server.get('/', (req, res) => {
    res.send('Welcome to the Server!')
})

server.use('/entries', entryRoutes)

module.exports = server;
