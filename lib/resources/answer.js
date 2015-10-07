"use strict";

var QAService = require("../services/QAService");
var notFound = require("../notFound");

module.exports = {
  method: "GET",
  path: "/{qaid}/{qid}/{aid}",
  handler: function hander(request, reply) {
    QAService.getAnswerById(request.params.aid, function getData(error, data) {
      console.log(data);
      if (error || !data || !data.answer) {
        return notFound(reply);
      }

      return reply({
        answer: data.answer
      });
    });
  }
};