"use strict";

var Hapi = require("hapi");
var halacious = require("halacious");
var fs = require("fs");

var server = new Hapi.Server();

server.connection({
  host: "localhost",
  port: 8000
});

server.register(halacious, function registerHalacious(error) {
  if (error) {
    return console.log(error);
  }

  var ns = server.plugins.halacious.namespaces.add({
    name: "undefined",
    description: "Hackathon",
    prefix: "hack"
  });

  ns.rel({ name: "qaid", description: "A collection of questions" });
  ns.rel({ name: "question", description: "A question" });
  ns.rel({ name: "answer", description: "An answer" });
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