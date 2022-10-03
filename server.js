const express = require('express')
const server = express()

let cors = require("cors")
server.use(cors());

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const entryRoutes = require('./controllers/entries');

server.get('/', (req, res) => {
    res.send('Welcome to the Server!')
})

server.use('/entries', entryRoutes)

module.exports = server;
