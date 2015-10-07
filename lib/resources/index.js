"use strict";

var QAService = require("../services/QAService");

module.exports = [{
  method: "GET",
  path: "/",
  handler: function hander(request, reply) {
    QAService.getQaids(function getData(error, data) {
      if (error) {
        throw error;
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
          rep.entity.qaids.forEach(function addEachQaid(item) {
            rep.link("hack:qaid", "/" + item._id);
          });
          rep.ignore("qaids");
          next();
        }
      }
    }
  }
}, {
  method: "POST",
  path: "/",
  handler: function createAQaid(request, reply) {
    QAService.createQaid(request.payload, function redirectOnSuccess(error, data) {
      if (error) {
        return reply("Creation failed").code(400);
      }

      return reply.redirect("/" + data._id);
    });
  }
}];