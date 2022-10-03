const server = require('./server');

const port = 3000

server.listen(port, () => {
    console.log(`Script.js listening on port ${port}`)
})
