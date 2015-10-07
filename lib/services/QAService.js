"use strict";

var QA = require("../models").QA;

module.exports = {
  getQaids: function getAllQaids(callback) {
    return QA.find({}, callback);
  },
  getQaidById: function getQaid(qaId, callback) {
    QA.find({
      _id: qaId
    },
    function getData(error, data) {
      return callback(error, data);
    });
  },
  getQuestionById: function getQuestions(questionId, callback) {
    QA.find({
      questions: {_id: questionId}
    },
    function getData(error, data) {
      return callback(error, data);
    });
  },
  getAnswerById: function getQuestions(answerId, callback) {
    QA.find({
      questions: {
        answers: {_id: answerId}
      }
    },
    function getData(error, data) {
      return callback(error, data);
    });
  }
};