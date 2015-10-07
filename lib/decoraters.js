var Hapi = require('hapi');

module.exports = function addDecorates(server) {

  // notFound
  server.decorate('reply', 'notFound', function() {
    return this({
      code: 404,
      message: "Not found!"
    }).code(404);
  });
}
