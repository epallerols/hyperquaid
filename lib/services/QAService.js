"use strict";

var mongoose = require("mongoose");
var QA = require("../models").QA;

module.exports = {
  getQaids: function getAllQaids(callback) {
    return QA.find({}, callback);
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
  createQaid: function createQaid(data, callback) {
    var qaModel;

    qaModel = new QA();
    qaModel.approved = !!data.approved;

    return qaModel.save(callback);
  },
  getQuestionById: function getQuestion(questionId, callback) {
    QA.find({
      "questions._id": mongoose.Types.ObjectId(questionId)
    },
    function returnDocument(error, data) {
      if (data) {
        return callback(error, data[0].questions.find(function findQuestion(question) {
          return question._id && question._id.toString() === questionId;
        }));
      }

      return callback(error);
    });
  },
  getAnswerById: function getAnswer(answerId, callback) {
    QA.find({
      "questions.answers._id": mongoose.Types.ObjectId(answerId)
    },
    function returnDocument(error, data) {
      if (data) {
        var theAnswer;

        data[0].questions.forEach(function findQuestion(question) {
          question.answers.forEach(function findAnswer(answer) {
            if (answer._id && answer._id.toString() === answerId) {
              theAnswer = answer;
            }
          });
        });

        return callback(error, theAnswer);
      }

      return callback(error);
    });
  }
};