"use strict";

var QAService = require("../services/QAService");

module.exports = [{
  method: "GET",
  path: "/questions",
  handler: function hander(request, reply) {
    QAService.getQaids(function getData(error, data) {
      if (error || !data) {
        return reply.notFound();
      }

      return reply({
        qaids: data
      });
    });
  },
  config: {
    plugins: {
      hal: {
        prepare: function prepare(rep, next) {
          rep.entity.qaids.forEach(function addEachQaid(qaid) {
            qaid.questions.forEach(function addEachQuestion(item) {
              rep.link("hack:questions", "/" + qaid._id + "/" + item._id);
            });
          });
          rep.ignore("qaids");
          next();
        }
      }
    }
  }
},
  {
    method: "GET",
    path: "/questions/unanswered",
    handler: function hander(request, reply) {
      QAService.getUnansweredQuestions(function getData(error, data) {
        if (error || !data) {
          return reply.notFound();
        }

        return reply({
          qaids: data
        });
      });
    },
    config: {
      plugins: {
        hal: {
          prepare: function prepare(rep, next) {
            if (!Array.isArray(rep.entity.qaids)) {
              rep.entity.qaids = [rep.entity.qaids];
            }

            rep.entity.qaids.forEach(function addEachQaid(qaid) {

              if (!Array.isArray(rep.entity.qaids.questions)) {
                rep.entity.qaids.questions = [rep.entity.qaids.questions];
              }

              qaid.questions.forEach(function addEachQuestion(item) {
                rep.link("hack:questions", "/" + qaid._id + "/" + item._id);
              });
            });
            rep.ignore("qaids");
            next();
          }
        }
      }
    }
  }];
