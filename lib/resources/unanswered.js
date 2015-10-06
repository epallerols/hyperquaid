"use strict";

module.exports = [
  {
    method: "GET",
    path: "/unanswered",
    handler: function (request, reply) {
      reply("List of unanswered questions");
    }
  }
]