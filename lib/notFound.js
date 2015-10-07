"use strict";

module.exports = function notFound(reply) {
  return reply({
    code: 404,
    message: "Nothing found"
  }).code(404);
};