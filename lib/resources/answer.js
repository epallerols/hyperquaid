"use strict";

var QAService = require("../services/QAService");

module.exports = {
  method: "GET",
  path: "/answers/{aid}",
  handler: function hander(request, reply) {
    QAService.getAnswerById(request.params.aid, function getData(error,
      data) {
      if (error || !data || !data.answer) {
        return reply.notFound();
      }

      return reply({
        answer: data.answer
      });
    });
  }
};
