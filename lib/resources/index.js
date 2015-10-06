"use strict";

var QAService = require("../services/QAService");

module.exports = {
  method: "GET",
  path: "/",
  handler: function hander(request, reply) {
    QAService.getList(function getData(error, data){
      if(error){
        throw error;
      }

      return reply(data);
    });
  },
  config: {
    plugins: {
      hal: {
        prepare: function prepare(rep, next) {
          rep.entity.qaids.forEach(function addEachQaid(item) {
            rep.link("hack:qaid", "/" + item.qaid);
          });
          rep.ignore("qaids");
          next();
        }
      }
    }
  }
};