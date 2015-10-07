var faker = require("faker");
var MongoDbConnection = require("../lib/services/mongoDb");
var QAServvie = require("../lib/services/QAService");
var objectId = require("mongoose").Types.ObjectId;

var data;

data = generateData();

init();

function init() {
  console.log("establishing connection...");

  MongoDbConnection.connect((error) => {
    if (error) {
      process.exit(2);
    }

    console.log("adding data to db...");
    data.forEach((d) => {
      QAServvie.createQaid(d, (error, data) => {
        if (error) {
          throw error;
        }

        console.log("added ", data._id);
      });
    });
  });
}

function generateData() {
  var d = [];

  console.log("generating random questions...");

  for (var i = 0; i < faker.random.number(10); i++) {
    d.push({
      approved: true,
      questions: []
    });

    for (var q = 0; q < faker.random.number(5); q++) {
      d[i].questions.push({
        question: faker.lorem.sentence(),
        _id: new objectId(),
        approved: true,
        answers: []
      });

      for (var a = 0; a < faker.random.number(7); a++) {
        d[i].questions[q].answers.push({
          answer: faker.lorem.sentence(),
          _id: new objectId(),
          approved: true
        });
      }
    }
  }

  return d;
}
