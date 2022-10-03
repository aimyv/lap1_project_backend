const request = require('supertest')
const server = require('../server')

const port = 5000

describe('API server', () => {
    let api
    beforeAll(() => {
        // start the server and store it in the api variable
        api = server.listen(port, () =>
            console.log(`Test server running on port ${port}`)
        )
    })

    afterAll((done) => {
        // close the server, then run done
        console.log('Gracefully stopping test server');
        api.close(done);
    })

    test('server starts up', (done) => {
        request(api).get('/').expect(200, done)
    })
})