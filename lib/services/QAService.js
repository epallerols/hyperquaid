"use strict";

var QA = require("../models").QA;

module.exports = {
  getList: function getList(callback) {
    return QA.find({}, callback);
  },
  add: function addItem(item, callback) {
    var qaModel;

    qaModel = new QA();
    qaModel.approved = item.approved;
    qaModel.questions = item.questions;

    return qaModel.save(callback);
  }
};