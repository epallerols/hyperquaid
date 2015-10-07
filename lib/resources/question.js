"use strict";

var QAService = require("../services/QAService");
var notFound = require("../notFound");

module.exports = [{
  method: "GET",
  path: "/{qaid}/{qid}",
  handler: function hander(request, reply) {
    QAService.getQuestionById(request.params.qid, function getData(error, data) {
      if (error || !data || !data.question) {
        return notFound(reply);
      }

      return reply({
        question: data.question
      });
    });
  }
},
{
  method: "POST",
  path: "/{qaid}/{qid}",
  handler: function (request, reply) {
    reply("Add an answer to this question");
  }
}];