"use strict";

var QA = require("../models").QA;

module.exports = {
  getQaids: function getAllQaids(callback) {
    return QA.find({}, callback);
  },
  add: function addItem(item, callback) {
    var qaModel;

    qaModel = new QA();
    qaModel.approved = item.approved;
    qaModel.questions = item.questions;

    return qaModel.save(callback);
  },
  getQaidById: function getQaid(qaId, callback) {
    QA.find({
      _id: qaId
    },
    function returnDocument(error, data) {
      if (data) {
        return callback(error, data[0]);
      }
      return callback(error);
    });
  },
  getQuestionById: function getQuestions(questionId, callback) {
    QA.find({
      questions: {_id: questionId}
    },
    function returnDocument(error, data) {
      if (data) {
        return callback(error, data[0]);
      }
      return callback(error);
    });
  },
  getAnswerById: function getQuestions(answerId, callback) {
    QA.find({
      questions: {
        answers: {_id: answerId}
      }
    },
    function returnDocument(error, data) {
      if (data) {
        return callback(error, data[0]);
      }
      return callback(error);
    });
  }
};