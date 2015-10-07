var mongoose = require("mongoose");

var Answer = new mongoose.Schema({
  _id: {type: mongoose.Schema.ObjectId, index: true},
  answer: String,
  approved: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now}
});

var Question = new mongoose.Schema({
  _id: {type: mongoose.Schema.ObjectId, index: true},
  question: String,
  approved: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now},
  positive: {type: Number, default: 0},
  negative: {type: Number, default: 0},
  answers: [Answer]
});

var QA = new mongoose.Schema({
  approved: {type: Boolean, default: false},
  questions: [Question]
});

module.exports = {
  QA: mongoose.model("QA", QA)
};
