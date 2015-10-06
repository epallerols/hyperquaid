"use strict";

module.exports = {
  method: "GET",
  path: "/{qaid}/{qid}/{aid}",
  handler: function (request, reply) {
    reply("An answer");
  }
};