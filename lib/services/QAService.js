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
    qaModel.questions = data.questions;

    return qaModel.save(callback);
  },
  getQuestionById: function getQuestion(questionId, callback) {
    QA.find({
        "questions._id": mongoose.Types.ObjectId(questionId)
      },
      function returnDocument(error, data) {
        if (data) {
          return callback(error, data[0].questions.find(function findQuestion(
            question) {
            return question._id && question._id.toString() ===
              questionId;
          }));
        }

        return callback(error);
      });
  },
  createQuestion: function createQuestion(qaid, data, callback) {
    return this.getQaidById(qaid, function updateQaid(error, qaModel) {
      if (error) {
        return callback(error);
      }

      if (!qaModel.questions || !Array.isArray(qaModel.questions)) {
        qaModel.questions = [];
      }

      data._id = new mongoose.Types.ObjectId();

      qaModel.questions.push(data);

      return qaModel.save(function (error) {
        return callback(error, data);
      });
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
            if (answer._id && answer._id.toString() ===
              answerId) {
              theAnswer = answer;
            }
          });
        });

        return callback(error, theAnswer);
      }

      return callback(error);
    });
  },
  createAnswer: function createAnswer(qaid, questionId, data, callback) {
    return this.getQaidById(qaid, function updateQaid(error, qaModel) {
      var index;

      if (error) {
        return callback(error);
      }

      if (!qaModel.questions || !Array.isArray(qaModel.questions)) {
        return callback("Question does not exist");
      }

      index = qaModel.questions.findIndex(function findQuestion(question) {
        return question._id && question._id.toString() === questionId;
      });

      if (!qaModel.questions[index].answers || !Array.isArray(qaModel.questions[index].answers)) {
        qaModel.questions[index].answers = [];
      }

      data._id = new mongoose.Types.ObjectId();

      qaModel.questions[index].answers.push(data);

      return qaModel.save(function (error) {
        return callback(error, data);
      });
    });
  }
};
