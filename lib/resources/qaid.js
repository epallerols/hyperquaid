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
            var link;

            link = rep.link("hack:questions", "/" + item._id);
            link.name = item.question;
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