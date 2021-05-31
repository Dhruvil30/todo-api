process.env.NODE_ENV = 'TEST';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../../bin/www');
const errorCodes = require('../../utils/error-codes');
const UserModel = require('../../lib/mongooseConfig').models.userModel;
const { userTestData } = require('../../utils/test-vars');

chai.should();
chai.use(chaiHttp);

const baseRoute = '/users';
const userId = userTestData.userId;

describe('User APIs', () => {
  before(async () => {
    const users = userTestData.users;
    for (userData of users) {
      const user = new UserModel(userData);
      await user.save();
    }
  });

  describe('POST /users/login', () => {
    const validLoginData = {
      email: 'd@gmail.com',
      password: 'password',
    };
    const invalidLoginData = {
      name: 'Dhruvil',
      password: 'password',
    };
    it('Valid data to login', () =>
      chai
        .request(server)
        .post(`${baseRoute}/login`)
        .send(validLoginData)
        .then((res) => {
          res.status.should.be.equal(200);
          res.body.should.have.property('id').be.a('string');
          res.body.should.have.property('name').be.a('string');
        }));
    it('Invalid data to login', () =>
      chai
        .request(server)
        .post(`${baseRoute}/login`)
        .send(invalidLoginData)
        .then((res) => {
          res.status.should.be.equal(errorCodes.DATA_INVALID.statusCode);
        }));
    it('User already logged in', () =>
      chai
        .request(server)
        .post(`${baseRoute}/login`)
        .set('userId', userId)
        .send(validLoginData)
        .then((res) => {
          res.status.should.be.equal(errorCodes.USER_LOGGED_IN.statusCode);
        }));
  });

  describe('POST /users/register', () => {
    const validRegisterData = {
      name: 'test user',
      email: 'tu@gmail.com',
      password: 'password',
    };
    const invalidRegisterData = {
      id: '000user01236',
      name: 'test user',
      password: 'password',
    };
    it('Valid data to register', () =>
      chai
        .request(server)
        .post(`${baseRoute}/register`)
        .send(validRegisterData)
        .then((res) => {
          res.status.should.be.equal(201);
          res.body.should.have.property('id').be.a('string');
          res.body.should.have.property('name').be.a('string');
        }));
    it('Duplicate data to register', () =>
      chai
        .request(server)
        .post(`${baseRoute}/register`)
        .send(validRegisterData)
        .then((res) => {
          res.status.should.be.equal(errorCodes.DUPLICATE_KEY_ERROR.statusCode);
        }));
    it('Invalid data to register', () =>
      chai
        .request(server)
        .post(`${baseRoute}/register`)
        .send(invalidRegisterData)
        .then((res) => {
          res.status.should.be.equal(errorCodes.DATA_INVALID.statusCode);
        }));
    it('User already logged in', () =>
      chai
        .request(server)
        .post(`${baseRoute}/register`)
        .set('userId', userId)
        .send(validRegisterData)
        .then((res) => {
          res.status.should.be.equal(errorCodes.USER_LOGGED_IN.statusCode);
        }));
  });

  describe('GET /users/logout', () => {
    it('Valid user logout', () =>
      chai
        .request(server)
        .get(`${baseRoute}/logout`)
        .set('userId', userId)
        .then((res) => {
          res.status.should.be.equal(200);
        }));
    it('Unauthorizaed Access on logout route', () =>
      chai
        .request(server)
        .get(`${baseRoute}/logout`)
        .then((res) => {
          res.status.should.be.equal(errorCodes.UNAUTHORIZED.statusCode);
        }));
  });
});
