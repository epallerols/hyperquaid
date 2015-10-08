"use strict";

var QAService = require("../services/QAService");

module.exports = [{
  method: "GET",
  path: "/questions/{qid}",
  handler: function hander(request, reply) {
    QAService.getQuestionById(request.params.qid, function getData(error,
      data) {
      if (error || !data || !data.question) {
        return reply.notFound();
      }

      return reply({
        question: data.question,
        answers: data.answers
      });
    });
  },
  config: {
    plugins: {
      hal: {
        prepare: function prepare(rep, next) {
          rep.entity.answers.forEach(function addEachQaid(item) {
            var link;

            link = rep.link("hack:answers", rep.self + "/" + item._id);
            link.name = item.answer;
          });

          rep.ignore("answers");
          next();
        }
      }
    }
  }
}, {
  method: "POST",
  path: "/questions/{qid}/answers",
  handler: function addAnAnswer(request, reply) {
    QAService.createAnswer(
      request.params.qid,
      request.payload,
      function redirectOnSuccess(error, data) {
        if (error) {
          return reply("Creation failed").code(400);
        }

        return reply.redirect(request.url.path + "/" + data._id);
      });
  }
}];
