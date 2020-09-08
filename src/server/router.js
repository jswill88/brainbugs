'use strict';

const express = require('express');
const router = express.Router();
const thisIsTheSchema = require('../../lib/database/schema/question-schema');

router.post('/question', handleQuestions);

async function handleQuestions(req, res) {
  console.log('from the router file');
  console.log('request.body', req.body);
  try {
    await thisIsTheSchema.create(req.body);
    // console.log(newQuestion, 'new Question');
    // newQuestion.create(); 

    console.log('after the save');
    res.status(200).send('success');
  }
  catch (error) { 'error after the try in the save function', error; }
}

router.get('/test', async (req, res) => {
  let results = await thisIsTheSchema.find({});
  console.log(results);
});


module.exports = router;