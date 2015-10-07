"use strict";

var QAService = require("../services/QAService");

module.exports = [{
  method: "GET",
  path: "/{qaid}",
  handler: function hander(request, reply) {
    QAService.getQaidById(request.params.qaid, function getData(error, data) {
      if (error) {
        throw error;
      }

      return reply({
        questions: data
      });
    });
  },
  config: {
    plugins: {
      hal: {
        prepare: function prepare(rep, next) {
          rep.entity.qaids.forEach(function addEachQaid(item) {
            rep.link("hack:question", "/" + item._id);
          });
          rep.ignore("qaids");
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