"use strict";

var QA = require("../models").QA;

module.exports = {
  getByQAId: function getList(qaId, callback) {
    QA.find({
      _id: qaId
    },
    function getData(error, data) {
      return callback(error, data);
    });
  }
};