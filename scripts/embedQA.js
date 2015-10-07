/* global $ */

$(() => {
  "use strict";

  var $qanda = $(".js-q-and-a");
  var url = "http://localhost:8000/5614e8bded37eded3f16a9e6";

  fetch(url).then((response) => {
    response.json().then((resp) => {
      if (!resp._embedded || !resp._embedded["hack:questions"] || !resp._embedded["hack:questions"].length) {
        throw new Error("Unable to find questions!");
      }

      let questions = resp._embedded["hack:questions"];
      console.log(resp._embedded["hack:questions"])
      $qanda.html("");

      questions.forEach((q) => {
        if (!q._embedded || !q._embedded["hack:answers"] || !q._embedded["hack:answers"].length) {
          return; // skip, no answers yet for this question
        }

        let answers = q._embedded["hack:answers"].reduce((i, answer) => {
          return `${i} <li class="question--answer">${answer.answer}</li>`;
        }, "");

        $qanda.append(`
          <div class="question">
            <h4 class="question--title">${q.question}</h4>
            <div class="question--info">
              <span>on ${q.createdAt}</span>
              | <span>Upvotes: ${q.positive}</span>
            </div>
            <ul>${answers}</ul>
          </div>
        `);
      });
    });
  });
});