'use strict';

const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  answer: {type: String, required: true},
  correct : {type: Boolean, default: false, required: true },
});

const questions = mongoose.Schema({
  topic: { type: String, required: true },
  question: { type: String, required: true },
  answers:  [answerSchema],
  // answers: {type: String, required: true},
  // correctanswer: { type: String, required: true },
  
});




module.exports = mongoose.model('questions', questions);