var QAServvie = require("../lib/services/QAService");

var data;

data = [
  {
    approved: true,
    questions: [
      {
        question: "How are you?",
        approved: true,
        answers: [
          {
            answer: "fucked up!"
          },
          {
            answer: "sleepy",
            approved: true
          },
          {
            answer: "it is not your problem",
            approved: true
          },
          {
            answer: "fine thank you!",
            approved: true
          }]
      },
      {
        question: "Is this product the best one",
        answers: [
          {
            answer: "probably"
          },
          {
            answer: "of course no!"
          }
        ]
      }
    ]
  },
  {
    questions: [
      {
        question: "How are you?",
        answers: [
          {
            answer: "fucked up!"
          },
          {
            answer: "sleepy"
          },
          {
            answer: "it is not your problem"
          },
          {
            answer: "fine thank you!"
          }]
      },
      {
        question: "when did you get it at home",
        approved: true,
        answers: [
          {
            answer: "5 min ago!",
            approved: true
          },
          {
            answer: "I ate it!",
            approved: false
          }
        ]
      }
    ]
  },
  {
    approved: true,
    questions: [
      {
        question: "I broke my knee, should I buy this?",
        approved: true,
        answers: [
          {
            answer: "first fix your knee!",
            approved: true
          },
          {
            answer: "yes it is the best one",
            approved: true
          },
          {
            answer: "I don't care",
            approved: true
          },
          {
            answer: "fine thank you!",
            approved: true
          }]
      },
      {
        question: "I can fly, can you?",
        approved: false
      }
    ]
  }
];


data.forEach(function loopItBaby(d) {
  QAServvie.add(d, function getResult(error, data) {
    if(error) {
      throw error;
    }

    console.log("added ", data._id)
  });
});