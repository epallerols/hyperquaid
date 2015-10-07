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

      $qanda.html("");

      questions.forEach((q) => {
        if (!q._embedded || !q._embedded["hack:answers"] || !q._embedded["hack:answers"].length) {
          return; // skip, no answers yet for this question
        }

        q._embedded["hack:answers"].forEach((answer) => $qanda.append(`
            <div><h4>${q.question}</h4><p>${answer.answer}</p></div>
        `));
      });
    });
  });
});