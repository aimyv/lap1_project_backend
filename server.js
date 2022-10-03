const express = require('express')
const server = express()

let cors = require("cors")
server.use(cors());

const entryRoutes = require('./controllers/entries');

server.get('/', (req, res) => {
    res.send('Welcome to the Server!')
})

server.use('/entry', entryRoutes)

module.exports = server;
