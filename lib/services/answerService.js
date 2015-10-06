"use strict";

var QA = require("../models").QA;

module.exports = {
  getByQuestionId: function getList(questionId, callback){
    QA.find({
      questions: {_id: questionId}
    },
    function getData(error, data) {
      return callback(error, data);
    });
  }
};