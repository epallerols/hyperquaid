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
  handler: function hander(request, reply) {
    QAService.add(request.payload, function add(error, data) {
      if (error) {
        throw error;
      }

      return reply(data);
    });
  }
}];
