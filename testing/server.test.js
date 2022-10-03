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

    test('get post entry by id', (done) => {
        request(api).get('/entries/2').expect(200).expect({
            "postId": 2,
            "author": "Peter",
            "title": "Second Title",
            "content": "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing indu",
            "comments": ["comment 1", "comment 2"],
            "gifUrl": "https://media.giphy.com/media/3o7H5jZq2TmpnRBdOE/giphy.gif",
            "e1": 2,
            "e2": 0,
            "e3": 1,    
        }, done)
    })
})
