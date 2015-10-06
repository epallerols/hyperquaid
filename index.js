"use strict";

var fs = require("fs");
var Hapi = require("hapi");
var hapiMongooseDbConnector = require("hapi-mongoose-db-connector");
var server, plugins;

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

// Define Hapi plugins
plugins = [
  {
    plugin: hapiMongooseDbConnector,
    options:{
      mongodbUrl: "mongodb://http://10.0.2.53"
    }
  }
];

// Register plugins
server.pack.register(plugins, function(error) {
  if(error){
    throw error;
  }
});

server.register({
  register: hapiMongooseDbConnector,
  options: {
    mongodbUrl: "mongodb://http://10.0.2.53"
  }},
  function getError(error){
    if(error){
      throw error;
    }
  }
);