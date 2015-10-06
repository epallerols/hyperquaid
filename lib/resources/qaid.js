"use strict";

module.exports = [{
  method: "GET",
  path: "/{qaid}",
  handler: function (request, reply) {
    reply("A qaid, POST to add a question");
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