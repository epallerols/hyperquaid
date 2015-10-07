"use strict";

var Mongoose = require("mongoose");

const config = require("./../../etc/conf.json");

exports.Client = Mongoose;

exports.connect = (callback) => {
  Mongoose.connect("mongodb://" + config.mongo.host + "/" + config.mongo.database);

  Mongoose.connection.on("error", (error) => {
    console.log("Connection error. " + error.message);
    callback(error);
  });

  Mongoose.connection.once("open", () => {
    console.log("Connection established with mongodb database.");
    callback();
  });
};