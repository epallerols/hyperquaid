"use strict";

var Hapi = require("hapi");
var halacious = require("halacious");
var fs = require("fs");
var MongoDbConnection = require("./lib/services/mongoDb");
var decoraters = require("./lib/decoraters");

const config = require("./etc/conf.json");

var server = new Hapi.Server();

server.connection(config.connection);

server.register(halacious, function registerHalacious(error) {
  if (error) {
    return console.log(error);
  }

  var ns = server.plugins.halacious.namespaces.add({
    name: "hackathon",
    description: "Hackathon",
    prefix: "hack"
  });

  ns.rel({
    name: "qaid",
    description: "A collection of questions"
  });
  ns.rel({
    name: "question",
    description: "A question"
  });
  ns.rel({
    name: "answer",
    description: "An answer"
  });
});

// Add decoraters
decoraters(server);

fs.readdir("./lib/resources/", function getFiles(error, files) {
  if (error) {
    throw error;
  }

  files.forEach(function getFile(file) {
    if (file.includes(".js") < 0) {
      return;
    }

    server.route(require("./lib/resources/" + file));
  });
});

MongoDbConnection.connect((error) => {
  if (error) {
    process.exit(2);
  }

  // Start the Server
  server.start(() => console.log("Server running at:", server.info.uri));
});
