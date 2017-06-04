const request = require('supertest');
const app = require('./app');

describe('Requests to the root path', function() {
  it('Returns 200 status code', function(done) {
    request(app)
      .get('/')
      .expect(200, done)
  })
});
