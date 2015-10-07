var MongoDbConnection = require("../lib/services/mongoDb");
var QAServvie = require("../lib/services/QAService");
var objectId = require("mongoose").Types.ObjectId;

var data;

init();

function init() {
  console.log("establishing connection...");

  MongoDbConnection.connect((error) => {
    if (error) {
      process.exit(2);
    }

    console.log("adding data to db...");
    data.forEach(function loopItBaby(d) {
      QAServvie.add(d, function getResult(error, data) {
        if (error) {
          throw error;
        }

        console.log("added ", data._id);
      });
    });
  });
}

data = [{
  approved: true,
  questions: [{
    question: "How are you?",
    _id: new objectId(),
    approved: true,
    answers: [{
      answer: "fucked up!",
      _id: new objectId(),
    }, {
      answer: "sleepy",
      _id: new objectId(),
      approved: true
    }, {
      answer: "it is not your problem",
      _id: new objectId(),
      approved: true
    }, {
      answer: "fine thank you!",
      _id: new objectId(),
      approved: true
    }]
  }, {
    question: "Is this product the best one",
    _id: new objectId(),
    answers: [{
      answer: "probably",
      _id: new objectId(),
    }, {
      answer: "of course no!",
      _id: new objectId(),
    }]
  }]
}, {
  questions: [{
    question: "How are you?",
    _id: new objectId(),
    answers: [{
      answer: "fucked up!",
      _id: new objectId(),
    }, {
      answer: "sleepy",
      _id: new objectId(),
    }, {
      answer: "it is not your problem",
      _id: new objectId(),
    }, {
      answer: "fine thank you!",
      _id: new objectId(),
    }]
  }, {
    question: "when did you get it at home",
    approved: true,
    _id: new objectId(),
    answers: [{
      answer: "5 min ago!",
      approved: true,

    }, {
      answer: "I ate it!",
      approved: false
    }]
  }]
}, {
  approved: true,
  questions: [{
    question: "I broke my knee, should I buy this?",
    approved: true,
    answers: [{
      answer: "first fix your knee!",
      approved: true
    }, {
      answer: "yes it is the best one",
      _id: new objectId(),
      approved: true
    }, {
      answer: "I don't care",
      _id: new objectId(),
      approved: true
    }, {
      answer: "fine thank you!",
      _id: new objectId(),
      approved: true
    }]
  }, {
    question: "I can fly, can you?",
    _id: new objectId(),
    approved: false
  }]
}];
