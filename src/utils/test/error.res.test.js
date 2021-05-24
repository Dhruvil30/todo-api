require('dotenv').config();
const chai = require('chai');
const resGenerator = require('../response-generator');

chai.should();

describe("Error Response Test", () => {
    it("Should return error message with http status code", () => {
        const error = new Error('RESOURCE_NOT_FOUND');
        const response = resGenerator.generateErrorResponse(error);
        response.statusCode.should.be.a('number');
        response.body.should.have.property('code').be.a('string')
        response.body.should.have.property('message').be.a('string')
    })
})