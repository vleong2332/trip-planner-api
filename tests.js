const request = require('supertest');
const app = require('./app');

describe('Requests to the root path', function() {
  it('Returns 200 status code', function(done) {
    request(app)
      .get('/trip-planner/')
      .expect(200, done)
  });
});

describe('Requests to the login path', function() {
  it('Returns 200 status code', function(done) {
    request(app)
      .post('/trip-planner/login')
      .expect(200, done)
  });
});

describe('Requests to the users path', function() {
  const payload = 'email=testemail@email.com&username=testusername&password=testpassword&confirmPassword=testpassword'
  it('Returns 201 status code', function(done) {
    request(app)
      .post('/trip-planner/users')
      .send(payload)
      .expect(201, done)
  });
});
