"use strict";

var Hapi = require("hapi");

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8000
});

server.route(require("./lib/resources/hello"));

// Start the server
server.start(function () {
  console.log("Server running at:", server.info.uri);
});