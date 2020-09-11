'use strict';

const { app } = require('../src/server/server.js');
const supergoose = require('@code-fellows/supergoose');
const questionModel = require('../lib/database/schema/question-schema.js');

const mockRequest = supergoose(app);

beforeEach(async () => {
  await questionModel.deleteMany({});
});

it('can create() a new question', async () => {
  
  const testData = { 
    topic: 'trees', 
    question: 'what tree is not found native in WA?', 
    answers: [{answer: 'noble fir' , correct: false}, {answer: 'palm tree', correct: true}, {answer: 'western hemlock', correct: false}, {answer: 'red alder', correct: false}], 
    description:'this is a pencil' };
    
  const response = await mockRequest.post('/question').send(testData);
  expect(response.status).toBe(200);
    
});

