'use strict';

const {app} = require('../src/server/server.js');
const supertest = require('supertest');
const mockRequest = supertest(app);
require('./supergoose.js');


describe('Sunny Day - 200 Handling', () => {
  
  it.skip('should respond with 200 on proper POST request to /question', async () => {
    const results = await mockRequest.post('/question');
    expect(results.status).toBe(200);
  });
});




describe('404 Error Handling', () => {

  it('should respond with a 404 on an invalid route', () => {
    return mockRequest
      .post('/invalid')
      .then( results=> {
        expect(results.status).toBe(404);
      });
    // have to take out the catch because it will cause the test to pass- false positive- this function will catch the error befor Jest seeing that an error exists    .catch(console.error);
  });

  it('should response with 404 on invalid route', async () => {

    //different way of writing the above test
    const results = await mockRequest.post('/invalid');
    expect(results.status).toBe(404);

  });

  it('should respond with a 404 on an invalid method', () => {
    return mockRequest
      .post('/')
      .then( results=> {
        expect(results.status).toBe(404);
      });
  });

  it('should respond with a 404 on an invalid method', async () => {
    
    const results = await mockRequest.get('/question');
    expect(results.status).toBe(404);

  });
  
});



describe('500 Error Handling', () => {
  
  it.skip('should respond with a 500 on a server error', async () => {

    // the below is what I had but it wasnt really working, and seems like it should be dif test than 404
    // HOW TO TEST FOR A 500 ERROR? SHOULDN'T IT BE DIF THAN 404 ERROR TEST?
    const results = await mockRequest.get('/badRoute');
    expect(results.status).toBe(500);

  });
  
});