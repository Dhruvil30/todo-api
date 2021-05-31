process.env.NODE_ENV = 'TEST';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../../bin/www');
const errorCodes = require('../../utils/error-codes');
const UserModel = require('../../lib/mongooseConfig').models.userModel;
const { noteTestData } = require('../../utils/test-vars');

chai.should();
chai.use(chaiHttp);

const baseRoute = '/notes';
const userId = noteTestData.userId;
const noteId = noteTestData.noteId;
const invalidNoteId = '000000000000';

const checkValidNoteData = (note) => {
  note.should.have.property('name').be.a('string');
  note.should.have.property('description').be.a('string');
  note.should.have.property('reminderTime');
};

describe('Note APIs', () => {
  before(async () => {
    const userData = new UserModel(noteTestData.testData);
    await userData.save();
  });

  describe('GET /notes', () => {
    it('Should return all notes', () =>
      chai
        .request(server)
        .get(baseRoute)
        .set('userId', userId)
        .then((res) => {
          res.status.should.be.equal(200);
          res.body.should.be.an('array');
          res.body.forEach((note) => checkValidNoteData(note));
        }));
    it('Unauthorizaed Access on get all notes route', () =>
      chai
        .request(server)
        .get(baseRoute)
        .then((res) => {
          res.status.should.be.equal(errorCodes.UNAUTHORIZED.statusCode);
        }));
  });

  describe('GET /notes/search/today', () => {
    it('Should return note for today', () =>
      chai
        .request(server)
        .get(`${baseRoute}/search/today`)
        .set('userId', userId)
        .then((res) => {
          res.status.should.be.equal(200);
          res.body.should.be.an('array');
          res.body.forEach((note) => checkValidNoteData(note));
        }));
    it("Unauthorizaed Access on search today's note route", () =>
      chai
        .request(server)
        .get(`${baseRoute}/search/today`)
        .then((res) => {
          res.status.should.be.equal(errorCodes.UNAUTHORIZED.statusCode);
        }));
  });

  describe('GET /notes/search?name=searchName', () => {
    it('Should return note that match search name', () =>
      chai
        .request(server)
        .get(`${baseRoute}/search?name=implement`)
        .set('userId', userId)
        .then((res) => {
          res.status.should.be.equal(200);
          res.body.should.be.an('array');
          res.body.forEach((note) => checkValidNoteData(note));
        }));
    it('Unauthorizaed Access on search note by name route', () =>
      chai
        .request(server)
        .get(`${baseRoute}/search?name=implement`)
        .then((res) => {
          res.status.should.be.equal(errorCodes.UNAUTHORIZED.statusCode);
        }));
  });

  describe('GET /notes/note/:id', () => {
    it('Valid id to get', () =>
      chai
        .request(server)
        .get(`${baseRoute}/note/${noteId}`)
        .set('userId', userId)
        .then((res) => {
          res.status.should.be.equal(200);
          checkValidNoteData(res.body);
        }));
    it('Invalid id to get', () =>
      chai
        .request(server)
        .get(`${baseRoute}/note/${invalidNoteId}`)
        .set('userId', userId)
        .then((res) => {
          res.status.should.be.equal(errorCodes.RESOURCE_NOT_FOUND.statusCode);
        }));
    it('Unauthorizaed Access on get note route', () =>
      chai
        .request(server)
        .get(`${baseRoute}/note/${noteId}`)
        .then((res) => {
          res.status.should.be.equal(errorCodes.UNAUTHORIZED.statusCode);
        }));
  });

  describe('POST /notes', () => {
    const validDataToPost = {
      name: 'Test Post',
      description: 'Post note when testing',
      reminderTime: '2021-05-24T05:30:00.000+00:00',
    };
    const invalidDataToPost = {
      name: 'Test Post',
      description: 'Post note when testing',
    };
    it('Valid data to post', () =>
      chai
        .request(server)
        .post(baseRoute)
        .set('userId', userId)
        .send(validDataToPost)
        .then((res) => {
          res.status.should.be.equal(201);
        }));
    it('Invalid data to post', () =>
      chai
        .request(server)
        .post(baseRoute)
        .set('userId', userId)
        .send(invalidDataToPost)
        .then((res) => {
          res.status.should.be.equal(errorCodes.DATA_INVALID.statusCode);
        }));
    it('Unauthorizaed Access on post route', () =>
      chai
        .request(server)
        .post(baseRoute)
        .send(validDataToPost)
        .then((res) => {
          res.status.should.be.equal(errorCodes.UNAUTHORIZED.statusCode);
        }));
  });

  describe('PUT /notes/note/:id', () => {
    const validDataToUpdate = {
      name: 'Updated name',
      description: 'Updated description',
    };
    const invalidDataToUpdate = {
      note_name: 'Updated name',
      description: 'Updated description',
    };
    it('Valid data to update', () =>
      chai
        .request(server)
        .put(`${baseRoute}/note/${noteId}`)
        .set('userId', userId)
        .send(validDataToUpdate)
        .then((res) => {
          res.status.should.be.equal(200);
        }));
    it('Invalid data to update', () =>
      chai
        .request(server)
        .put(`${baseRoute}/note/${noteId}`)
        .set('userId', userId)
        .send(invalidDataToUpdate)
        .then((res) => {
          res.status.should.be.equal(errorCodes.DATA_INVALID.statusCode);
        }));
    it('Invalid id to update', () =>
      chai
        .request(server)
        .put(`${baseRoute}/note/${invalidNoteId}`)
        .set('userId', userId)
        .send(validDataToUpdate)
        .then((res) => {
          res.status.should.be.equal(errorCodes.RESOURCE_NOT_FOUND.statusCode);
        }));
    it('Unauthorizaed Access on put route', () =>
      chai
        .request(server)
        .put(`${baseRoute}/note/${noteId}`)
        .send(validDataToUpdate)
        .then((res) => {
          res.status.should.be.equal(errorCodes.UNAUTHORIZED.statusCode);
        }));
  });

  describe('Delete /notes/note/:id', () => {
    it('Valid id to delete', async () =>
      chai
        .request(server)
        .delete(`${baseRoute}/note/${noteId}`)
        .set('userId', userId)
        .then((res) => {
          res.status.should.be.equal(204);
        }));
    it('Invalid id to delete', async () =>
      chai
        .request(server)
        .delete(`${baseRoute}/note/${invalidNoteId}`)
        .set('userId', userId)
        .then((res) => {
          res.status.should.be.equal(errorCodes.RESOURCE_NOT_FOUND.statusCode);
        }));
    it('Unauthorizaed Access on delete route', () =>
      chai
        .request(server)
        .delete(`${baseRoute}/note/${noteId}`)
        .then((res) => {
          res.status.should.be.equal(errorCodes.UNAUTHORIZED.statusCode);
        }));
  });
});
