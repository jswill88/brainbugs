'use strict';

const {app} = require('../src/server/server.js');
const supertest = require('supertest');
const mockRequest = supertest(app);
require('./supergoose.js');


const testData = { 
  topic: 'trees', 
  question: 'what tree is not found native in WA?', 
  answers: [{answer: 'noble fir' , correct: false}, {answer: 'palm tree', correct: true}, {answer: 'western hemlock', correct: false}, {answer: 'red alder', correct: false}], 
  description:'this is a pencil' ,
};

describe('404 Error Handling', () => {

  it('should response with 404 on invalid route', async () => {
    const results = await mockRequest.post('/invalid');
    expect(results.status).toBe(404);
  });

  it('should respond with a 404 on an invalid method', () => {
    return mockRequest
      .delete('/')
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
  
  it('should respond with a 500 on an error', () => {
    return mockRequest
      .get('/bad')
      .then(results => {
        expect(results.status).toBe(500);
      }).catch(console.error);
  });
  
});

describe('Sunny Day - 200 Handling', () => {
  
  it('should respond with 200 on proper POST request to /question', () => {

    return mockRequest
      .post('/question').send(testData)
      .then( results=> {
        expect(results.status).toBe(200);
      });
  });
});