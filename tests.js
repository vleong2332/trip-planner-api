const request = require('supertest');
const app = require('./app');

describe('Requests to the root path', function() {
  it('Returns a 200 status code', function(done) {
    request(app)
      .get('/hey')
      .expect(200)
      .end(function(error) {
        if (error) throw error;
        done();
      })
  })
});
