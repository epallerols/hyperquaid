var mongoose = require("mongoose");

module.exports = {
  QA: mongoose.model("QA", {
    approved: {type: Boolean, default: false},
    questions: [{
      _id: {type: mongoose.Schema.ObjectId, index: true},
      question: String,
      approved: {type: Boolean, default: false},
      createdAt: {type: Date, default: Date.now},
      positive: {type: Number, default: 0},
      negative: {type: Number, default: 0},
      answers: [{
        _id: {type: mongoose.Schema.ObjectId, index: true},
        answer: String,
        approved: {type: Boolean, default: false},
        createdAt: {type: Date, default: Date.now}
      }]
    }]
  })
};