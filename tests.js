const request = require('supertest');
const app = require('./app');
const User = require('./user');

describe('Request to the root path', function() {
  it('Returns 200 status code', function(done) {
    request(app)
      .get('/trip-planner/')
      .expect(200, done)
  });
});

describe('Request to the users path', function() {
  beforeEach(done => {
    User.remove({}, (err) => {
       done();
    });
  });
  const payload = 'email=testemail@email.com&username=testusername&password=testpassword&confirmPassword=testpassword';
  it('Returns 201 status code', function(done) {
    request(app)
      .post('/trip-planner/users')
      .send(payload)
      .expect(201, done)
  });
});

describe('Request to the login path', function() {
  const payload = 'username=testusername&password=testpassword';
  it('Returns 200 status code', function(done) {
    request(app)
      .post('/trip-planner/login')
      .send(payload)
      .expect(200, done)
  });

  const passwordPayload = 'password=testpassword';
  it('Returns 401 status code without username', function(done) {
    request(app)
      .post('/trip-planner/login')
      .send(passwordPayload)
      .expect(401, done)
  });

  const usernamePayload = 'username=testusername';
  it('Returns 401 status code without password', function(done) {
    request(app)
      .post('/trip-planner/login')
      .send(usernamePayload)
      .expect(401, done)
  });

  const wrongUsernamePayload = 'username=wrongtestusername&password=testpassword';
  it('Returns 401 status code with wrong username', function(done) {
    request(app)
      .post('/trip-planner/login')
      .send(wrongUsernamePayload)
      .expect(401, done)
  });

  const wrongPasswordPayload = 'username=testusername&password=wrongtestpassword';
  it('Returns 401 status code with wrong password', function(done) {
    request(app)
      .post('/trip-planner/login')
      .send(wrongPasswordPayload)
      .expect(401, done)
  });
});
