"use strict";

module.exports = [{
  method: "GET",
  path: "/{qaid}/{qid}",
  handler: function (request, reply) {
    reply("A question, POST to add an answer");
  }
},
{
  method: "POST",
  path: "/{qaid}/{qid}",
  handler: function (request, reply) {
    reply("Add an answer to this question");
  }
}];