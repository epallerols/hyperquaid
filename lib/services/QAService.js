"use strict";

var QA = require("../models").QA;

module.exports = {
  getList: function getList(callback) {
    return QA.find({}, callback);
  }
};