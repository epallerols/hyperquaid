"use strict";

var fs = require("fs");
var Hapi = require("hapi");
var hapiMongooseDbConnector = require("hapi-mongoose-db-connector");

var server;

server = new Hapi.Server();

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

// Register Hapi plugins
server.register({
  register: hapiMongooseDbConnector,
  options: {
    mongodbUrl: "mongodb://10.0.2.53/hyperquaid"
  }},
  function getError(error){
    if(error){
      throw error;
    }
  }
);