const express = require('express')
const server = express()

let cors = require("cors")
server.use(cors());

server.get('/', (req, res) => {
    res.send('Welcome to the Server!')
})

module.exports = server;
