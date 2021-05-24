process.env.ENV = 'TEST';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../bin/www');
const errorCodes = require('../../utils/error-codes');
const UserModel = require('../../lib/mongooseConfig').models.userModel;
const { noteTestData } = require('../../utils/const-vars');

chai.should();
chai.use(chaiHttp);

const userId = noteTestData.userId;
const noteId = noteTestData.noteId;
const baseRoute = '/notes';

const checkValidData = (note) => {
    note.should.have.property('name').be.a('string');
    note.should.have.property('description').be.a('string');
    note.should.have.property('reminderTime').be.a('string');
}

describe("Note APIs", () => {
    
    before(async () => {
        const userData = new UserModel(noteTestData.testData);
        await userData.save();
    })

    describe("GET /notes", () => {
        it("Should return all notes from database", () => chai.request(server)
            .get(baseRoute)
            .set('userId', userId)
            .then((res) => {
                res.status.should.be.equal(200);
                res.body.should.be.an("array");
                res.body.forEach(note => checkValidData(note));
            })
        );
        it("Should return error with unauthorized access", () => chai.request(server)
            .get(baseRoute)
            .then((res) => {
                chai.expect(res.status).to.be.equal(errorCodes.UNAUTHORIZED.statusCode);
            })
        );
    });

    describe("GET /notes/search/today", () => {
        it("Should return note for today from database", () => chai.request(server)
            .get(`${baseRoute}/search/today`)
            .set('userId', userId)
            .then((res) => {
                res.status.should.be.equal(200);
                res.body.should.be.an("array");
                res.body.forEach(note => checkValidData(note));
            })
        );
        it("Should return error with unauthorized access", () => chai.request(server)
            .get(`${baseRoute}/search/today`)
            .then((res) => {
                chai.expect(res.status).to.be.equal(errorCodes.UNAUTHORIZED.statusCode);
            })
        );
    });

    describe("GET /notes/search?name=searchName", () => {
        it("Should return note that match search name from database", () => chai.request(server)
            .get(`${baseRoute}/search?name=implement`)
            .set('userId', userId)
            .then((res) => {
                res.status.should.be.equal(200);
                res.body.should.be.an("array");
                res.body.forEach(note => checkValidData(note));
            })
        );
        it("Should return error with unauthorized access", () => chai.request(server)
            .get(`${baseRoute}/search?name=implement`)
            .then((res) => {
                chai.expect(res.status).to.be.equal(errorCodes.UNAUTHORIZED.statusCode);
            })
        );
    });

    describe("GET /notes/notes/:id", () => {
        it("Should return note that has id from database", () => chai.request(server)
            .get(`${baseRoute}/note/${noteId}`)
            .set('userId', userId)
            .then((res) => {
                res.status.should.be.equal(200);
                checkValidData(res.body);
            })
        );
        it("Should return error with unauthorized access", () => chai.request(server)
            .get(`${baseRoute}/note/${noteId}`)
            .then((res) => {
                chai.expect(res.status).to.be.equal(errorCodes.UNAUTHORIZED.statusCode);
            })
        );
    });

});