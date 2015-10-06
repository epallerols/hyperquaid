"use strict";

var Hapi = require("hapi");
var fs = require("fs");

var server = new Hapi.Server();

server.connection({
  host: "localhost",
  port: 8000
});

fs.readdir("./lib/resources/", function getFiles(error, files) {
  if (error) {
    throw error;
  }

  files.forEach(function getFile(file) {
    if (file.indexOf(".js") < 0) {
      return;
    }

    server.route(require("./lib/resources/" + file));
  });

});

// Start the server
server.start(function start() {
  console.log("Server running at:", server.info.uri);
});