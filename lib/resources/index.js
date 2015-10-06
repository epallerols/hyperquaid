"use strict";

module.exports = {
  method: "GET",
  path: "/",
  handler: function hander(request, reply) {
    reply({
      message: "Hyperquaid, you know for questions and answers!",
      qaids: [
        { qaid: 100 },
        { qaid: 101 }
      ]
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