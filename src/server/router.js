'use strict';

const express = require('express');
const router = express.Router();
const thisIsTheSchema = require('../../lib/database/schema/question-schema');

router.post('/question', handleQuestions);

async function handleQuestions(req, res) {

  try {
    await thisIsTheSchema.create(req.body);
    res.status(200).send('success');
  } catch (error) { 
    'error after the try in the save function', error;
  }
}

router.get('/test', async (req, res) => {
  let results = await thisIsTheSchema.find({});
  console.log(results);
});


module.exports = router;