"use strict";

var QAService = require("../services/QAService");
var notFound = require("../notFound");

module.exports = [{
  method: "GET",
  path: "/{qaid}",
  handler: function hander(request, reply) {
    QAService.getQaidById(request.params.qaid, function getData(error, data) {
      if (error || !data || !data.questions) {
        return notFound(reply);
      }

      return reply({
        questions: data.questions
      });
    });
  },
  config: {
    plugins: {
      hal: {
        prepare: function prepare(rep, next) {
          rep.entity.questions.forEach(function addEachQaid(item) {
            var embed, link;

            link = rep.link("hack:questions", rep.self + "/" + item._id);
            link.name = item.question;

            embed = rep.embed("hack:questions", rep.self + "/" + item._id, item);
            embed.name = item.question;
            embed.ignore("_id");
            embed.ignore("answers");

            item.answers.forEach(function addEachAnswerLink(answer) {
              var answerEmbed, answerLink;

              answerLink = embed.link("hack:answers", embed.self + "/" + answer._id);
              answerLink.name = answer.name;

              answerEmbed = embed.embed("hack:answers", embed.self + "/" + answer._id, answer);
              answerEmbed.name = answer.answer;
              answerEmbed.ignore("_id");
            });
          });
          rep.ignore("questions");
          next();
        }
      }
    }
  }
},
{
  method: "PUT",
  path: "/{qaid}",
  handler: function (request, reply) {
    reply("Create a QAID");
  }
},
{
  method: "POST",
  path: "/{qaid}",
  handler: function (request, reply) {
    reply("Add a question to this QAID");
  }
}];