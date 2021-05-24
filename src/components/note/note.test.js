require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../bin/www');
const errorCodes = require('../../utils/error-codes');

chai.should();
chai.use(chaiHttp);

process.env.ENV = 'TEST';

const userId = '609d2205bbbf931980da75e9';
const noteId = '60a2300e9c023005d8f0ff36';

describe("Get Route Note APIs", () => {

    describe("GET /notes", () => {
        it("Should return all notes from database", () => chai.request(server)
            .get('/notes')
            .set('userId', userId)
            .then((res) => {
                res.status.should.be.equal(200);
                res.body.should.be.an("array");
            })
        );
        it("Should return error with unauthorized access", () => chai.request(server)
            .get('/notes')
            .then((res) => {
                chai.expect(res.status).to.be.equal(errorCodes.UNAUTHORIZED.statusCode);
            })
        );
    });

    describe("GET /notes/search/today", () => {
        it("Should return note for today from database", () => chai.request(server)
            .get(`/notes/search/today`)
            .set('userId', userId)
            .then((res) => {
                res.status.should.be.equal(200);
                res.body.should.be.an("array");
            })
        );
        it("Should return error with unauthorized access", () => chai.request(server)
            .get(`/notes/search/today`)
            .then((res) => {
                chai.expect(res.status).to.be.equal(errorCodes.UNAUTHORIZED.statusCode);
            })
        );
    });

    describe("GET /notes/search?name=searchName", () => {
        it("Should return note that match search name from database", () => chai.request(server)
            .get(`/notes/search?name=Meet`)
            .set('userId', userId)
            .then((res) => {
                res.status.should.be.equal(200);
                res.body.should.be.an("array");
            })
        );
        it("Should return error with unauthorized access", () => chai.request(server)
            .get(`/notes/search?name=name`)
            .then((res) => {
                chai.expect(res.status).to.be.equal(errorCodes.UNAUTHORIZED.statusCode);
            })
        );
    });

    describe("GET /notes/notes/:id", () => {
        it("Should return note that has id from database", () => chai.request(server)
            .get(`/notes/note/${noteId}`)
            .set('userId', userId)
            .then((res) => {
                res.status.should.be.equal(200);
                res.body.should.have.property("name").be.a('string');
                res.body.should.have.property("description").be.a('string');
                res.body.should.have.property("reminderTime").be.a('string');
            })
        );
        it("Should return error with unauthorized access", () => chai.request(server)
            .get(`/notes/note/${noteId}`)
            .then((res) => {
                chai.expect(res.status).to.be.equal(errorCodes.UNAUTHORIZED.statusCode);
            })
        );
    });

});